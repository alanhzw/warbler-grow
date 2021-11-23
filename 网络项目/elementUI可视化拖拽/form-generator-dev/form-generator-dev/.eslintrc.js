/*
 * @Description:
 * @Date: 2020-12-14 10:46:47
 * @LastEditTime: 2021-03-15 16:51:18
 * @FilePath: \form-generator-dev\.eslintrc.js
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/recommended", "eslint:recommended", "airbnb-base"],
  rules: {},
  parserOptions: {
    parser: "babel-eslint"
  },
  globals: {
    location: false
  }
};
