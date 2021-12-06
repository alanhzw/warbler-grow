/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-12-06 11:03:21
 * @LastEditTime: 2021-12-06 11:09:59
 * @FilePath: \webpack-04\webpack.config.js
 */
const path = require('path')

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist')
  },
  mode: 'development',
}