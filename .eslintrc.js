module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
