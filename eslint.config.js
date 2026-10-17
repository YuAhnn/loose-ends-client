import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'

// Flat config, the standard format for ESLint 9+.
// https://eslint.org/docs/latest/use/configure/configuration-files
export default [
  { ignores: ['dist'] },
  js.configs.recommended,
  reactHooks.configs.flat.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      // The client runs in a browser tab. Nothing else.
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  {
    // This page is a one-shot hand-off: it reads the token from the URL once,
    // then navigates away. Setting state in the effect is the entire job, and
    // the effect runs exactly once, so there is no cascading render to avoid.
    files: ['src/pages/AuthSuccess.jsx'],
    rules: { 'react-hooks/set-state-in-effect': 'off' },
  },
]
