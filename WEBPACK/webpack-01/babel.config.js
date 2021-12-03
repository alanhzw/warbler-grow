/*
 * @Author: 一尾流莺
 * @Description:babel配置文件
 * @Date: 2021-12-02 23:04:00
 * @LastEditTime: 2021-12-03 11:04:34
 * @FilePath: \webpack-01\babel.config.js
 */
module.exports = {
  presets: [
    ["@babel/preset-env", {
      // 单独指定浏览器集合
      targets: {
      },
      // 指定core-js的版本
      corejs: 3,
      /**
       * false 当我们引入polyfill,不会进行按需引入,bundle体积会很大
       * entry 需要在入口文件里导入 import "@babel/polyfill" babel会帮我们按需引入
       * usage 全自动检测 不需要导入polyfill 即可达到按需引入的目的
       */
      useBuiltIns: "usage"
    }],
    ["@babel/preset-react", {

    }]
  ]
}