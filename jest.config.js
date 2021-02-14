module.exports = {
  projects: [
  {
    displayName: 'jest',
    "moduleNameMapper": {
      "\\.(jpg|jpeg|png|gif)$": "<rootDir>/__mocks__/fileMock.js",
      "\\.(css|s[ac]ss)$": "identity-obj-proxy",
    },
  },
  {
    runner: 'jest-runner-eslint',
    displayName: 'eslint',
    testMatch: ['<rootDir>/src/**/*.(spec|test).js'],
  },
],
watchPlugins: ['jest-runner-eslint/watch-fix'], // toggle --fix in watch mode pressing 'F'
};
