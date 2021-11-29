/*
 * @Author: 一尾流莺
 * @Description:webpack 配置文件
 * @Date: 2021-11-26 00:21:48
 * @LastEditTime: 2021-11-29 23:45:32
 * @FilePath: \webpack-01\webpack.config.js
 */
// webpack 基于 nodejs  核心模块的api 都可以直接用

const path = require('path')
const htmlWebpackPlugin = require("html-webpack-plugin")
// 配置文件 就是一个对象
module.exports = {
  // 执行打包任务的入口  默认 src/index  支持相对路径 也支持绝对路径
  // 支持 string arr object 字符串也会被转换成对象格结构
  // 区分 spa(单入口) mpa(多入口)
  // entry: "./src/index.js",  等价于 main:"./src/index.js"
  // entry: {
  //   main: "./src/index.js"
  // },
  // 多入口
  entry: {
    index: "./src/index.js",
    login: "./src/login.js",
    home: "./src/home.js"
  },
  // 输出资源文件的信息  包括 存储位置  文件名称
  output: {
    path: path.resolve(__dirname, './dist'), // 存储位置 打包出来的文件放在哪里 默认是dist  要求是绝对路径
    // 文件名称 打包出来的文件叫什么
    // filename: "main.js"
    // 占位符[]  entry中的key叫什么  打包后的filename就叫什么 多个入口就要对应多个出口
    filename: "[name].js"
  },
  // 打包模式
  mode: "development", // development production none 开发模式  生产模式 默认是生产模式
  // 插件 插件的本质就是一个类
  plugins: [
    // 自动生成html 文件 ,引入bundle文件,压缩html
    new htmlWebpackPlugin({
      // 模板匹配
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["index", 'login'],
    }),
    // 自动生成html 文件 ,引入bundle文件,压缩html
    new htmlWebpackPlugin({
      // 模板匹配
      template: "./src/index.html",
      filename: "login.html",
      chunks: ["login"],
    }),
    // 自动生成html 文件 ,引入bundle文件,压缩html
    new htmlWebpackPlugin({
      // 模板匹配
      template: "./src/index.html",
      filename: "home.html",
      chunks: ["home"],
    }),
  ]
}

/**
 * chunk 代码片段
 * chunks chunk组 chunk Names 可以理解为同一个概念
 * 打包出来的对象就是chunk组
 *  每一个key就是一个chunk
 *
 */

/**
 * bundle 构建后产生的资源文件 称呼为 bundle文件
 * bundle 至少对应一个 chunks
 *  一个 chunks 对应至少一个 module
 * 一个 module 对应至少一个 chunk
 */