/*
 * @Author: 一尾流莺
 * @Description: alias.js 是模块导入所有源代码和测试中使用的别名，其功能等同于 webpack.config.js 中 resolve 配置项的 alias 。
 * @Date: 2021-07-07 17:46:27
 * @LastEditTime: 2021-07-09 15:41:48
 * @FilePath: \vue-dev\scripts\alias.js
 */


// 引入path模块  用来处理路径
const path = require('path')

/**
 * resolve方法
 * 就是提供一个映射,可以通过简洁的标识找到目标文件 比如说传入一个参数"web" 其实对应的就是src/platforms/web目录
 * __dirname 指的是当前目录 也就是scripts
 * 再向上查找一级 也就是根目录 vue-dev
 * @param {*} p 路径别名
 */
const resolve = p => path.resolve(__dirname, '../', p)

module.exports = {
  vue: resolve('src/platforms/web/entry-runtime-with-compiler'), // /vue-dev/src/platforms/web/entry-runtime-with-compiler
  compiler: resolve('src/compiler'),// /vue-dev/src/compiler
  core: resolve('src/core'),// /vue-dev/src/core
  shared: resolve('src/shared'),// /vue-dev/src/shared
  web: resolve('src/platforms/web'),// /vue-dev/src/platforms/web
  weex: resolve('src/platforms/weex'),// /vue-dev/src/platforms/weex
  server: resolve('src/server'),// /vue-dev/src/server
  sfc: resolve('src/sfc')// /vue-dev/src/sfc
}
