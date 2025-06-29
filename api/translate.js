// api/translate.js
// This is a Vercel Serverless Function that acts as a proxy for the Gemini API.

const fetch = require('node-fetch'); // node-fetch is needed for fetch API in Node.js environments

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed', message: 'Only POST requests are accepted.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('GEMINI_API_KEY environment variable is not set.');
    return res.status(500).json({ error: 'Server Configuration Error', message: 'API key not configured.' });
  }

  const { inputText, sourceLanguage, targetLanguage, languages } = req.body;

  if (!inputText || !sourceLanguage || !targetLanguage || !languages) {
    return res.status(400).json({ error: 'Bad Request', message: 'Missing required parameters.' });
  }

  try {
    let chatHistory = [];
    const sourceLangName = languages.find(l => l.code === sourceLanguage)?.name;
    const targetLangName = languages.find(l => l.code === targetLanguage)?.name;

    const prompt = `Translate the following text from ${sourceLangName} to ${targetLangName}.
    Additionally, analyze the cultural context and social cues present in the original text.
    Provide a JSON object with the following structure:
    {
      "directTranslation": "string",
      "culturalExplanation": "string",
      "suggestedPhrasing": ["string"]
    }

    Text: "${inputText}"`;

    chatHistory.push({ role: "user", parts: [{ text: prompt }] });

    const payload = {
      contents: chatHistory,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            "directTranslation": { "type": "STRING" },
            "culturalExplanation": { "type": "STRING" },
            "suggestedPhrasing": {
              "type": "ARRAY",
              "items": { "type": "STRING" }
            }
          },
          "propertyOrdering": ["directTranslation", "culturalExplanation", "suggestedPhrasing"]
        }
      }
    };

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const geminiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.json();
      console.error('Gemini API error:', errorData);
      return res.status(geminiResponse.status).json({
        error: 'Gemini API Error',
        message: errorData.error?.message || 'Unknown error from Gemini API'
      });
    }

    const geminiResult = await geminiResponse.json();
    res.status(200).json(geminiResult);

  } catch (error) {
    console.error('Serverless function error:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};
