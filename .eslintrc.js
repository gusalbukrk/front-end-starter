module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'prettier',
    'plugin:jest/all',
    'plugin:react/recommended',
  ],
  plugins: [
    'prettier',
    'jest',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
  },
  settings: {
    'react': {
      version: 'detect',
    },
  },
};
