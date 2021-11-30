/*
 * @Author: 一尾流莺
 * @Description:webpack 配置文件
 * @Date: 2021-11-26 00:21:48
 * @LastEditTime: 2021-11-30 18:21:14
 * @FilePath: \webpack-01\webpack.config.js
 */

const path = require('path')
const htmlWebpackPlugin = require("html-webpack-plugin")
const minicss = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 配置文件
module.exports = {
  // 执行打包任务的入口
  entry: {
    index: "./src/index.js",
    login: "./src/login.js",
    home: "./src/home.js"
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
      chunks: ["index", 'login'],
    }),
    // 把css抽离成独立文件 , 不用style的方式
    new minicss({
      filename: 'style/index.css'
    }),
    new CleanWebpackPlugin()
  ],
  // 模块
  module: {
    // 匹配的规则
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      // 处理 less
      // {
      //   test: /\.less$/,
      //   use: ["style-loader", "css-loader", 'less-loader']
      // },
      // 对象形式 可以给loader写配置
      {
        test: /\.less$/,
        use: [
          minicss.loader,
          {
            loader: "css-loader",
            options: {
              // css 模块化
              modules: true
            }
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'less-loader',
          }
        ]
      }
    ]
  }

}






