/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-10-28 09:50:36
 * @LastEditTime: 2021-11-04 09:58:30
 * @FilePath: \ired_resource\.eslintrc.js
 */
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
  },
  settings: {
    // 'import/parsers': {
    //   // 使用 TypeScript parser
    //   '@typescript-eslint/parser': ['.ts', '.tsx', '.vue'],
    // },
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['layout', './src/layout'],
          ['pages', './src/pages'],
          ['components', './src/components'],
          ['utils', './src/utils'],
          ['styles', './src/styles'],
        ],
      },
      node: {
        extensions: ['.js', '.ts', '.tsx', '.jsx', '.mjs'],
      },
      // 解决tsconfig下的path别名导致eslint插件无法解决的bug
      // typescript: {
      //   alwaysTryTypes: true,
      //   paths: './tsconfig.json',
      // },
    },
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-named-as-default': 'off',
    'import/no-unresolved': 'off',
    'prefer-destructuring': 'warn',
    'no-useless-escape': 'warn',
    'max-len': 'off',
    'import/extensions': 'off',
    'linebreak-style': ['off', 'windows'],
    'no-param-reassign': 'off',
    'import/prefer-default-export': 'off',
  },
};
