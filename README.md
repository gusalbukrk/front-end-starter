# Front-end Starter Kit

- [Front-end Starter Kit](#front-end-starter-kit)
  - [How to add Typescript](#how-to-add-typescript)
    - [ts-loader](#ts-loader)
      - [fork-ts-checker-webpack-plugin](#fork-ts-checker-webpack-plugin)
    - [preset-typescript](#preset-typescript)
      - [setup](#setup)
    - [Eslint & Typescript](#eslint--typescript)
  - [Known issues](#known-issues)
    - [webpack-dev-server & .browserslistrc](#webpack-dev-server--browserslistrc)
    - [mini-css-extract-plugin](#mini-css-extract-plugin)
    - [html-loader bug](#html-loader-bug)
  - [To-Do](#to-do)

## How to add Typescript

- `npm i -D typescript`
- `npx tsc --init`
  - open the file and edit: `"module": "es2015"`
- from here, you have 2 options:
  - **ts-loader**: to use without babel
  - **babel typescript preset**: to use with babel

### ts-loader

- `npm i -D ts-loader`
- `webpack.common.js`, add to `module.rules`:

```js
{
  test: /\.tsx?$/,
  loader: "ts-loader",
},
```

#### fork-ts-checker-webpack-plugin

- `npm i -D fork-ts-checker-webpack-plugin` = speed up compilation by moving type checking and (optionally) EsLint to a separate process
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

### preset-typescript

- `@babel/preset-typescript` can't do type checking, its only job is to compile from ts to js (even if there're errors)
- you can type check by:
  - run `tsc -w` in a separate terminal tab
  - or use an editor which supports typescript and will highlight errors (e.g. vscode)

#### setup

- `npm i -D @babel/preset-typescript`
- at `babel.config.js` add to `presets` array: `@babel/preset-typescript`
- at `webpack.common.js`, add to module.rules:

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

### Eslint & Typescript

- `npm i -D @typescript-eslint/parser @typescript-eslint/eslint-plugin`
- at `webpack.common.js`, in `ESLintPlugin` options add: `extensions: ['js', 'ts'],`
- `.eslintrc.js`:

```js
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

        // fix 'missing file extension' error
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never',
          }
        ],
      },
      settings: {
        // fix 'unable to resolve path' error
        'import/resolver': {
          node: {
            extensions: ['.js', '.json', '.ts'],
          },
        },
      },
    },
  ],
```

## Known issues

### webpack-dev-server & .browserslistrc

- webpack-dev-server's auto-reloading doesn't work when there's a `.browserslistrc` file or a `browserslist` key in `package.json`
- this happens because webpack-dev-server isn't yet 100% compatible with webpack 5
- **solution**:
  - `target: 'web',` at `webpack.config.js`
    - after bug is fixed, remove `target` key to re-enable default behavior
  - wait for `webpack-dev-server v4`

### mini-css-extract-plugin

- is best practice to have duplicate css/sass loaders:
  - `webpack.common.js` loads with `style-loader`
  - `webpack.prod.js` loads with `MiniCssExtractPlugin.loader`
- however this causes a bug when trying to load a css module
- **solution**: move `style-loader` from common to `webpack.dev.js`

### html-loader bug

- [URL is not defined](https://github.com/webpack-contrib/html-loader/issues/361)
- it happens at `version 2.0.0`
- **solution**: use `version 1.3.2`

## To-Do

- continuously update dependencies
