/*
 * @Author: 一尾流莺
 * @Description:webpack 配置文件
 * @Date: 2021-11-26 00:21:48
 * @LastEditTime: 2021-12-02 17:23:21
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
  // 解析loader 告知webpack如何匹配loader
  resolveLoader: {
    // 默认是 node_modules
    modules: ["node_modules", "./myLoaders"]
  },

  // 插件
  plugins: [
    // 自动生成html 文件 ,引入bundle文件,压缩html
    new htmlWebpackPlugin({
      // 模板匹配
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["index"],
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
        test: /\.less$/,
        use: [
          minicss.loader,
          {
            loader: "css-loader",
            options: {
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
      },
      {
        test: /\.(jpe?g|png|gif|webp)$/,
        use: [
          {
            // loader: 'file-loader',//导出一个资源 并返回路径
            loader: "url-loader",// url-loader 依赖 file-loader 把图片转成base64编码 减少图片请求
            options: {
              name: "[name].[ext]",//图片名称  ext 后缀占位符
              outputPath: "images",//输出目录 默认相对于dist 资源的存储位置
              publicPath: "../images",//资源的使用位置 publicPath + name = css中图片的使用路径
              limit: 4 * 102, // 单位字节 超过单位的不会被转化成base64
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',//导出一个资源 并返回路径
            // loader: "url-loader",// url-loader 依赖 file-loader 把图片转成base64编码 减少图片请求
            options: {
              name: "[name].[ext]",//图片名称  ext 后缀占位符
              outputPath: "font",//输出目录 默认相对于dist 资源的存储位置
              publicPath: "../font",//资源的使用位置 publicPath + name = css中图片的使用路径
              // limit: 4 * 102, // 单位字节 超过单位的不会被转化成base64
            }
          },
        ]
      }
    ]
  }

}





