/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-12-03 17:59:13
 * @LastEditTime: 2021-12-03 18:19:48
 * @FilePath: \webpack-01\webpack.js
 */

// 引入 webpack
const webpack = require("webpack")

// 引入配置文件
const config = require("./webpack.config.js")

// 根据配置文件 生产 webpack 实例
const compiler = webpack(config)

// 打印 webpack 的 生命周期钩子
Object.keys(compiler.hooks).forEach((hookName) => {
  compiler.hooks[hookName].tap("xxx", (compilation) => {
    console.log('🚀🚀----------->:', hookName);
  })
})

// 执行 编译
compiler.run()

