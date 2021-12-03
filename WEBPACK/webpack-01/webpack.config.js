/*
 * @Author: 一尾流莺
 * @Description:webpack 配置文件
 * @Date: 2021-11-26 00:21:48
 * @LastEditTime: 2021-12-02 22:55:21
 * @FilePath: \webpack-01\webpack.config.js
 */

const path = require('path')
const htmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 配置文件
module.exports = {
  // 执行打包任务的入口
  entry: {
    index: "./src/index.js",
  },
  // 输出资源文件的信息
  output: {
    // 存储位置
    path: path.resolve(__dirname, './dist'),
    // 文件名称
    filename: "[name].js"
  },
  // 打包模式
  mode: "development",
  // 插件
  plugins: [
    new CleanWebpackPlugin()
  ],
  // 模块
  module: {
    // 匹配的规则
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ["@babel/preset-env", {
                  // 单独指定浏览器集合
                  targets: {

                  },
                  // 指定core-js的版本
                  corejs: 3,
                  /**
                   * false 当我们引入polyfill,不会进行按需引入,bundle体积会很大
                   * entry 需要在入口文件里导入 import "@babel/polyfill" babel会帮我们按需引入
                   * usage 全自动检测 不需要导入polyfill 即可达到按需引入的目的
                   */
                  useBuiltIns: "usage"
                }]
              ]
            }
          }
        ]
      },
    ]
  }

}





