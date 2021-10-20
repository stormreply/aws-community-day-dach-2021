module.exports = {
  env: {
    es2021: true,
    'jest/globals': true,
  },
  extends: ['standard', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'cdk', 'jest'],
  rules: {
    'no-new': 0,
  },
};
