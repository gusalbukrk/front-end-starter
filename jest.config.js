module.exports = {
  projects: [
    {
      displayName: 'jest',
      preset: 'ts-jest', // write tests in typescript
      transform: {
        "^.+\\.jsx?$": "babel-jest", // to also be able to write tests in javascript
        "^.+\\.tsx?$": "ts-jest",
      },
      moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif)$': '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|s[ac]ss)$': 'identity-obj-proxy',
      },
    },
    {
      runner: 'jest-runner-eslint',
      displayName: 'eslint',
      testMatch: ['<rootDir>/src/**/*.(spec|test).(ts|tsx|js)'],
    },
  ],
  watchPlugins: ['jest-runner-eslint/watch-fix'], // toggle --fix in watch mode pressing 'F'
};
