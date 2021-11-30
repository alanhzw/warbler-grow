/*
 * @Author: 一尾流莺
 * @Description:postcss 配置
 * @Date: 2021-11-30 16:17:16
 * @LastEditTime: 2021-11-30 17:57:56
 * @FilePath: \webpack-01\postcss.config.js
 */
module.exports = {
  plugins: [
    require("autoprefixer"),
    require("cssnano")
  ]
}