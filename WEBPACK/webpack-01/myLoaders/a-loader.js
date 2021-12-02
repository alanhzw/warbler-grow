/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-11-30 19:17:43
 * @LastEditTime: 2021-12-01 11:22:02
 * @FilePath: \webpack-01\myLoaders\a-loader.js
 */
module.exports = function(source) {
  const _source = source.replace('hello', '你好')
  return _source
}

