/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-11-30 19:17:43
 * @LastEditTime: 2021-11-30 23:02:22
 * @FilePath: \webpack-01\myLoaders\aaa-loader.js
 */
module.exports = function(source) {
  const _source = source.replace('hello', this.query.name)
  return _source
}
