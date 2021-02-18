# Front-end Starter Kit

- [Front-end Starter Kit](#front-end-starter-kit)
  - [How to add Typescript](#how-to-add-typescript)
  - [Known issues](#known-issues)
    - [webpack-dev-server & .browserslistrc](#webpack-dev-server--browserslistrc)
    - [mini-css-extract-plugin](#mini-css-extract-plugin)
    - [html-loader bug](#html-loader-bug)
  - [To-Do](#to-do)

## How to add Typescript

- instructions on how to add typescript [here](typescript.md)

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
