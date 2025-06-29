import React from 'react';
import LoadingSpinner from './LoadingSpinner.jsx'; // Updated import path to .jsx

function TranslatorForm({
  inputText,
  sourceLanguage,
  targetLanguage,
  languages,
  isLoading,
  onInputChange,
  onSourceLangChange,
  onTargetLangChange,
  onSubmit
}) {
  return (
    <>
      <div className="mb-6">
        <label htmlFor="inputText" className="block text-gray-700 text-sm font-medium mb-2">
          Enter Text:
        </label>
        <textarea
          id="inputText"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
          rows="5"
          placeholder="Type your text here..."
          value={inputText}
          onChange={onInputChange}
        ></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="sourceLang" className="block text-gray-700 text-sm font-medium mb-2">
            Source Language:
          </label>
          <select
            id="sourceLang"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
            value={sourceLanguage}
            onChange={onSourceLangChange}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="targetLang" className="block text-gray-700 text-sm font-medium mb-2">
            Target Language:
          </label>
          <select
            id="targetLang"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
            value={targetLanguage}
            onChange={onTargetLangChange}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={onSubmit}
        className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? <LoadingSpinner /> : 'Translate & Mediate'}
      </button>
    </>
  );
}

export default TranslatorForm;
