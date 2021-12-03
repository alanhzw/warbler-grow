/*
 * @Author: 一尾流莺
 * @Description:实现自定义plugin
 * @Date: 2021-12-03 16:53:49
 * @LastEditTime: 2021-12-03 18:25:34
 * @FilePath: \webpack-01\myPlugins\my-plugin.js
 */

// 插件的基本结构 是一个类

// 必须内置一个 apply 函数
class MyPlugin {
  constructor(options) {
  }
  // 接收一个参数 compiler 就是实例化的webpack 包含配置等信息
  apply(compiler) {
    // 注册事件  同步钩子用tap  异步钩子用tapAsync注册
    // 事件名称可以为任意值,建议和插件名称保持语义一致
    compiler.hooks.emit.tapAsync('xxx', (compilation, cb) => {
      cb()
    })
  }
}

// 插件配置


module.exports = MyPlugin