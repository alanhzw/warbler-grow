/*
 * @Author: 一尾流莺
 * @Description:自定义loader
 * @Date: 2021-11-30 18:46:52
 * @LastEditTime: 2021-11-30 23:13:53
 * @FilePath: \webpack-01\myLoaders\my-loader.js
 */

// loader 结构

// 不可以是箭头函数 因为loaderapi都是挂载到this上的
// 一个函数  必须有返回值
// source 所有满足条件的模块
module.exports = function(source) {
  const _callback = this.async();
  const _source = source.replace('world', this.query.name)
  setTimeout(() => {
    _callback(null, _source)
  }, 3000)
  // 告诉loader解析器  loader里面存在异步操作
  // this.callback(null, _source)
  // return _source
}

// 如何获取options
// this.query

// this.callback
  // this.callback(null, _source)

// this.async
// 异步loader不会影响其他模块的loader,但是会影响多个loader作用于一个模块的loader
// const _callback = this.async();
// setTimeout(() => {
//   _callback(null, _source)
// }, 3000)


// 多个loader如何配合


// 一个loader执行完 会交给下一个loader  直到没有loader 最后交给webpack

// 解决loader的路径问题