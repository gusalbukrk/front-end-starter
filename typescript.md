# How to add Typescript

- [How to add Typescript](#how-to-add-typescript)
  - [Initial setup](#initial-setup)
  - [ts-loader](#ts-loader)
    - [fork-ts-checker(-webpack-plugin (optional)](#fork-ts-checker-webpack-plugin-optional)
  - [preset-typescript](#preset-typescript)
    - [setup](#setup)
  - [Eslint & Typescript](#eslint--typescript)

## Initial setup

- `npm i -D typescript`
- install types from previous installed libraries: `npm i -D @types/react @types/react-dom @types/jest @types/styled-components @types/react-test-renderer`
- at `webpack.common.js`:

```js
// will fix "Field 'browser' doesn't contain a valid alias configuration"
resolve: {
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
},
```

- from here, you have 2 options:
  - **ts-loader**: to compile typescript with ts-loader, not with babel
  - **babel typescript preset**: to compile typescript with babel

## ts-loader

- `npm i -D ts-loader`
- `npx tsc --init`
  - open the file and edit: `"module": "es2015"`, `"jsx": "react"`, `"moduleResolution": "node"`
- `npm i -D ts-jest`, `jest.config.js`:

```js
module.exports = {
  projects: [
    {
      displayName: 'jest',
      preset: 'ts-jest', // makes possible to write tests in typescript
      // ...
    },
    {
      // ...
    },
  ],
};

```

- `webpack.common.js`, add to `module.rules`:

```js
{
  test: /\.tsx?$/,
  loader: "ts-loader",
},
```

### fork-ts-checker(-webpack-plugin (optional)

- `npm i -D fork-ts-checker-webpack-plugin`
  - speed up compilation by moving type checking and (optionally) EsLint to a separate process
  - **recommended** to large projects in which compilation is taking too long
- `webpack.config.js`:

```js
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

// module.rules
{
  test: /\.tsx?$/,
  loader: 'ts-loader',
  exclude: /node_modules/,
  options: {
    transpileOnly: true
  }
}

plugins: [
  new ForkTsCheckerWebpackPlugin({
    // optional - move lint to a separate process
    // eslint: {
    //   files: './src/**/*.{ts,tsx,js,jsx}',
    // },
  }),
];
```

## preset-typescript

- `@babel/preset-typescript` can't do type checking, its only job is to compile from ts to js (even if there're errors)
- you can type check by:
  - run `tsc -w` in a separate terminal tab
  - or use an editor which supports typescript and will highlight errors (e.g. vscode)

### setup

- `npm i -D @babel/preset-typescript`
- at `babel.config.js` add to `presets` array: `@babel/preset-typescript`
- at `webpack.common.js`, erase the previous `js` rule and add:

```js
{
  test: /\.(js|ts)x?$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
  },
},
```

- `tsconfig.json`:

```js
{
  // NOTE: because `@babel/preset-typescript` doesn't run `tsc` directly,
  // these options will only be used when running `tsc` manually
  "compilerOptions": {
    "target": "es2020", // babel will transpile
    "module": "es2015",
    "strict": true,
    "allowJs": true,
    "jsx": "react",
    "noEmit": true,

    // make `tsc` throw an error if an unsupported feature is used
    // if set true all implementation files must be modules (import or export something)
    "isolatedModules": true,


    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

## Eslint & Typescript

- `npm i -D @typescript-eslint/parser @typescript-eslint/eslint-plugin`
- at `webpack.common.js`, in `ESLintPlugin` options add: `extensions: ['js', 'jsx', 'ts', 'tsx'],`
- `.eslintrc.js`:

```js
module.exports = {
  // ...
  rules: {
    'prettier/prettier': 'error',

    // fix 'missing file extension' error
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
    // fix 'unable to resolve path' error
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    },
  },
  overrides: [
    {
      files: ['*.ts', '*tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:@typescript-eslint/recommended'
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: { project: './tsconfig.json' },
      plugins: [ '@typescript-eslint' ],
      rules: {
        // note you must disable the following base rule as they can report incorrect errors
        'no-use-before-define': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        '@typescript-eslint/no-shadow': ['error'],
      },
    },
  ],
};
```
