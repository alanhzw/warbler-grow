/*
 * @Author: 一尾流莺
 * @Description:将less语法转成css语法
 * @Date: 2021-12-01 21:10:06
 * @LastEditTime: 2021-12-01 21:24:30
 * @FilePath: \webpack-01\myLoaders\my-less-loader.js
 */
const less = require("less")
module.exports = function(source) {
  console.log('🚀🚀~ source:', source);

  less.render(source, (error, output) => {
    const cssInfo = output.css
    this.callback(error, cssInfo)
  })
}