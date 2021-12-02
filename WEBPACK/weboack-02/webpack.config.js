/*
 * @Author: 一尾流莺
 * @Description:webpack 配置文件
 * @Date: 2021-11-26 00:21:48
 * @LastEditTime: 2021-12-02 16:17:54
 * @FilePath: \weboack-02\webpack.config.js
 */

const path = require('path')

// 配置文件
module.exports = {
  // 执行打包任务的入口
  entry: {
    index: "./src/index.js",
    // login: "./src/login.js",
    // home: "./src/home.js"
  },
  // 输出资源文件的信息
  output: {
    // 存储位置
    path: path.resolve(__dirname, './dist'),
    // 文件名称
    filename: "[name].js"
  },

  // 模块
  module: {
    // 匹配的规则
    rules: [
      {
        test: /\.(jpe?g|png|gif|webp)$/,
        type: "asset",// asset asset/resource asset/inline
        parser: {
          dataUrlCondition: {
            maxSize: 1 * 1024
          }
        }
      }
    ]
  }

}





