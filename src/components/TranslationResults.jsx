import React from 'react';

function TranslationResults({ translatedText, culturalExplanation, suggestedPhrasing }) {
  const hasResults = translatedText || culturalExplanation || suggestedPhrasing.length > 0;

  if (!hasResults) return null;

  return (
    <div className="mt-8 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Results:</h2>

      {translatedText && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Direct Translation:</h3>
          <p className="p-4 bg-blue-50 rounded-lg text-gray-800 leading-relaxed">
            {translatedText}
          </p>
        </div>
      )}

      {culturalExplanation && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Cultural Explanation:</h3>
          <p className="p-4 bg-green-50 rounded-lg text-gray-800 leading-relaxed">
            {culturalExplanation}
          </p>
        </div>
      )}

      {suggestedPhrasing.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Suggested Culturally Appropriate Phrasing:</h3>
          <ul className="list-disc list-inside p-4 bg-yellow-50 rounded-lg text-gray-800">
            {suggestedPhrasing.map((phrase, index) => (
              <li key={index} className="mb-2 last:mb-0">
                {phrase}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TranslationResults;
