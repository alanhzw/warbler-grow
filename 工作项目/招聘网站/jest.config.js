const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname),
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  // 别名设置
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // 测试文件
  testMatch: ['<rootDir>/tests/**/*.(spec|test).ts?(x)'],

  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\js$': 'babel-jest',
    '^.+\\ts$': 'ts-jest',
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
};
