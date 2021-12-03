/*
 * @Author: 一尾流莺
 * @Description:webpack 配置文件
 * @Date: 2021-11-26 00:21:48
 * @LastEditTime: 2021-12-03 17:06:45
 * @FilePath: \webpack-01\webpack.config.js
 */

const path = require('path')
const htmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MyPlugin = require("./myPlugins/my-plugin")
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
    // 自动生成html 文件 ,引入bundle文件,压缩html
    new htmlWebpackPlugin({
      // 模板匹配
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["index"],
    }),
    new CleanWebpackPlugin(),
    new MyPlugin({
      name: '一尾流莺'
    })
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
          }
        ]
      },
    ]
  }

}





