/*
 * @Author: 一尾流莺
 * @Description:webpack 配置文件
 * @Date: 2021-11-26 00:21:48
 * @LastEditTime: 2021-11-26 00:32:45
 * @FilePath: \webpack-01\webpack.config.js
 */
// webpack 基于 nodejs  核心模块的api 都可以直接用

const path = require('path')

// 配置文件 就是一个对象
module.exports = {
  // 执行打包任务的入口  默认 src/index  支持相对路径 也支持绝对路径
  entry: "./src/index.js",
  // 输入资源文件的信息  包括 存储位置  文件名称
  output: {
    path: path.resolve(__dirname, './dist'), // 存储位置 打包出来的文件放在哪里 默认是dist  要求是绝对路径
    filename: "main.js" // 文件名称 打包出来的文件叫什么
  },
  // 打包模式
  mode: "development", // development production none 开发模式  生产模式 默认是生产模式

}
