/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-11-15 17:59:57
 * @LastEditTime: 2021-11-23 16:35:43
 * @FilePath: \jest-test\.eslintrc.js
 */

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    'prettier/prettier': 'off',
    '@typescript-eslint/ban-ts-comment': "off",
    '@typescript-eslint/no-non-null-assertion': 'off'
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};