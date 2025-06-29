import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']), // Ignore the build output directory
  {
    files: ['**/*.{js,jsx}'], // Apply this config to .js and .jsx files
    extends: [
      js.configs.recommended, // ESLint's recommended rules
      reactHooks.configs['recommended-latest'], // Recommended rules for React Hooks
      reactRefresh.configs.vite, // Rules specific to React Fast Refresh with Vite
    ],
    languageOptions: {
      ecmaVersion: 2020, // ECMAScript version
      globals: globals.browser, // Predefined global variables for browser environment
      parserOptions: {
        ecmaVersion: 'latest', // Allow latest ECMAScript features
        ecmaFeatures: { jsx: true }, // Enable JSX parsing
        sourceType: 'module', // Use ES Modules
      },
    },
    rules: {
      // Custom rule: disallow unused variables, but ignore variables starting with uppercase letters or underscore
      // This is often used for React components or utility functions that might be imported but not directly used in every file.
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      // Add other rules as needed, e.g., 'react/react-in-jsx-scope': 'off' for React 17+
    },
  },
])
