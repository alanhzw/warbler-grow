/*
 * @Author: 
 * @Description: 
 * @Date: 2021-07-07 17:46:27
 * @LastEditTime: 2021-07-09 16:30:33
 * @FilePath: \vue-dev\.eslintrc.js
 */
module.exports = {
  root: true,
  parserOptions: {
    parser: require.resolve('babel-eslint'),
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  env: {
    es6: true,
    node: true,
    browser: true
  },
  plugins: [
    "flowtype"
  ],
  extends: [
    // "eslint:recommended",
    // "plugin:flowtype/recommended"
  ],
  globals: {
    "__WEEX__": true,
    "WXEnvironment": true
  },
  rules: {
    'no-console': process.env.NODE_ENV !== 'production' ? 0 : 2,
    'no-useless-escape': 0,
    'no-empty': 0
  }
}
