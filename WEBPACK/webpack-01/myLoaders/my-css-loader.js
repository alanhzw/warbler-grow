/*
 * @Author: 一尾流莺
 * @Description:将css语法序列化
 * @Date: 2021-12-01 21:10:06
 * @LastEditTime: 2021-12-01 21:16:31
 * @FilePath: \webpack-01\myLoaders\my-css-loader.js
 */
module.exports = function(source) {
  return JSON.stringify(source)
}