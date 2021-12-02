/*
 * @Author: 一尾流莺
 * @Description:自定义loader
 * @Date: 2021-11-30 18:46:52
 * @LastEditTime: 2021-12-01 11:33:35
 * @FilePath: \webpack-01\myLoaders\b-loader.js
 */


// source 所有满足条件的模块
module.exports = function(source) {
  const _callback = this.async();
  const _source = source.replace('world', this.query.name)
  setTimeout(() => {
    _callback(null, _source)
  }, 3000)
}




// 多个loader如何配合


//

// 解决loader的路径问题