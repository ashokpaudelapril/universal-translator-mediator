import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';

// Import the new components with .jsx extensions
import TranslatorForm from './components/TranslatorForm.jsx';
import TranslationResults from './components/TranslationResults.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';

function App() {
  const [inputText, setInputText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [translatedText, setTranslatedText] = useState('');
  const [culturalExplanation, setCulturalExplanation] = useState('');
  const [suggestedPhrasing, setSuggestedPhrasing] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null); // State to store the user ID

  // Firebase initialization and authentication
  useEffect(() => {
    let app;
    let auth;

    try {
      // MANDATORY: Use __app_id and __firebase_config from the environment
      const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};

      if (Object.keys(firebaseConfig).length > 0) {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);

        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setUserId(user.uid);
            console.log('User authenticated:', user.uid);
          } else {
            // If no user, sign in anonymously
            signInAnonymously(auth)
              .then((userCredential) => {
                setUserId(userCredential.user.uid);
                console.log('Signed in anonymously:', userCredential.user.uid);
              })
              .catch((anonError) => {
                console.error('Anonymous sign-in failed:', anonError);
                setError('Failed to sign in anonymously. Some features may not work.');
                setUserId(crypto.randomUUID()); // Fallback to a random ID if anonymous sign-in fails
              });
          }
        });

        // MANDATORY: Use __initial_auth_token for custom token sign-in
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          signInWithCustomToken(auth, __initial_auth_token)
            .then((userCredential) => {
              setUserId(userCredential.user.uid);
              console.log('Signed in with custom token:', userCredential.user.uid);
            })
            .catch((tokenError) => {
              console.error('Custom token sign-in failed:', tokenError);
              // Fallback to anonymous sign-in if custom token fails
              signInAnonymously(auth)
                .then((userCredential) => {
                  setUserId(userCredential.user.uid);
                  console.log('Signed in anonymously after token failure:', userCredential.user.uid);
                })
                .catch((anonError) => {
                  console.error('Fallback anonymous sign-in failed:', anonError);
                  setError('Authentication failed. Some features may not work.');
                  setUserId(crypto.randomUUID()); // Fallback to a random ID
                });
            });
        }
        return () => unsubscribe(); // Cleanup auth listener on unmount
      } else {
        console.warn('Firebase config not found. Running without Firebase authentication.');
        setUserId(crypto.randomUUID()); // Generate a random ID if Firebase is not configured
      }
    } catch (e) {
      console.error('Error initializing Firebase:', e);
      setError('Failed to initialize Firebase. Some features may not work.');
      setUserId(crypto.randomUUID()); // Fallback to a random ID
    }
  }, []); // Empty dependency array means this runs once on mount

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'ja', name: 'Japanese' },
    { code: 'zh', name: 'Chinese (Simplified)' },
    { code: 'ko', name: 'Korean' },
    { code: 'ar', name: 'Arabic' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
  ];

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setError('Please enter text to translate.');
      return;
    }

    setIsLoading(true);
    setError('');
    setTranslatedText('');
    setCulturalExplanation('');
    setSuggestedPhrasing([]);

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inputText,
          sourceLanguage,
          targetLanguage,
          languages
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API error: ${response.status} - ${errorData.message || 'Unknown error'}`);
      }

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
        result.candidates[0].content && result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0) {
        const jsonString = result.candidates[0].content.parts[0].text;
        const parsedJson = JSON.parse(jsonString);

        setTranslatedText(parsedJson.directTranslation || 'No direct translation provided.');
        setCulturalExplanation(parsedJson.culturalExplanation || 'No cultural explanation provided.');
        setSuggestedPhrasing(parsedJson.suggestedPhrasing || []);
      } else {
        setError('No valid response from AI. Please try again.');
      }
    } catch (err) {
      console.error('Error during translation:', err);
      setError(`Failed to translate: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-inter">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Universal Translator & Cultural Mediator
        </h1>

        {/* Display User ID */}
        {userId && (
          <div className="text-sm text-gray-600 text-center mb-4 p-2 bg-gray-50 rounded-md">
            Your User ID: <span className="font-mono break-all">{userId}</span>
          </div>
        )}

        <TranslatorForm
          inputText={inputText}
          sourceLanguage={sourceLanguage}
          targetLanguage={targetLanguage}
          languages={languages}
          isLoading={isLoading}
          onInputChange={(e) => setInputText(e.target.value)}
          onSourceLangChange={(e) => setSourceLanguage(e.target.value)}
          onTargetLangChange={(e) => setTargetLanguage(e.target.value)}
          onSubmit={handleTranslate}
        />

        <ErrorMessage message={error} />

        <TranslationResults
          translatedText={translatedText}
          culturalExplanation={culturalExplanation}
          suggestedPhrasing={suggestedPhrasing}
        />
      </div>
    </div>
  );
}

export default App;
