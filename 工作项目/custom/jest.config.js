// const path = require('path');

module.exports = {
  // rootDir: path.resolve(__dirname),
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  testPathIgnorePatterns: ['/node_modules/'],
  // 别名设置
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/**/*.spec.(ts|tsx)'],
  // testMatch: [
  //   '<rootDir>/**/__tests__/*.spec.{j,t}s?(x)',
  //   '<rootDir>/tests/unit/**/*.spec.ts?(x)',
  // ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
};
