// @ts-check
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defineConfig } = require('eslint-define-config')
module.exports = defineConfig({
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false,
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'testing-library'],
  extends: [
    'plugin:react/recommended',
    'react-app',
    // 'react-app/jest',
    // 'airbnb',
    // 'airbnb-typescript',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    // 'plugin:jest-dom/recommended',
  ],
  rules: {
    'no-trailing-spaces': 'error',
    semi: ['error', 'never'],
    quotes: ['error', 'single', { avoidEscape: true }],
    'no-console': 'warn',
    'comma-dangle': ['error', 'always-multiline'],
    camelcase: 'off',
    'eol-last': ['error', 'always'],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
    'space-before-function-paren': [
      'warn',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'no-unused-vars': 'error',
    'react/jsx-no-undef': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-unescaped-entities': 'off',
    'testing-library/no-container': 'off',
    'testing-library/no-node-access': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/semi': ['error', 'never'],
    '@typescript-eslint/no-explicit-any': 'off',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.eslint.json',
      },
    },
  },
})
