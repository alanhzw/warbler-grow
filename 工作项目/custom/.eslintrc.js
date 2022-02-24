
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-unused-expressions': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-named-as-default': 'off',
    'max-len': 'off',
    'import/extensions': 'off',
    'linebreak-style': ['off', 'windows'],
    'no-param-reassign': 'off',
    'import/order': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
    'object-curly-newline': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
  overrides: [
    {
      files: [
        // '**/__tests__/*.{j,t}s?(x)',
        // '**/tests/unit/**/*.spec.{j,t}s?(x)',
        '**/**/*.spec.(ts|tsx)'
      ],
      env: {
        jest: true,
      },
    },
  ],

  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
        ],
      },
      node: {
        'paths': ['src'],
        extensions: ['.js', '.ts', '.tsx', 'jsx', '.vue'],
      },
    },
  },
};
