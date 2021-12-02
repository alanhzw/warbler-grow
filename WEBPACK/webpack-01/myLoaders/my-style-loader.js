/*
 * @Author: 一尾流莺
 * @Description:动态创建 style 标签 内容是上一个 loader 返回的内容 dom 操作塞入头部
 * @Date: 2021-12-01 21:10:06
 * @LastEditTime: 2021-12-01 21:24:12
 * @FilePath: \webpack-01\myLoaders\my-style-loader.js
 */

module.exports = function(source) {
  console.log('🚀🚀~ source:', source);
  return `
    const tag = document.createElement("style")
    tag.innerHTML = ${source}
    document.head.appendChild(tag)
  `
}