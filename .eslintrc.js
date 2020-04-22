module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  extends: ['airbnb-typescript', 'prettier/@typescript-eslint'],
  rules: {
    'react/prop-types': 0,
    'import/prefer-default-export': 0,
    'arrow-parens': [2, 'as-needed'],
  },
};
