/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-09-10 10:04:44
 * @LastEditTime: 2021-09-10 10:49:27
 * @FilePath: \ts-express\src\router\index.ts
 */

// 创建注册页面路由
const lolSpider = require('./spider_LOL/index')

module.exports = (app) => {
// 为路由匹配一级请求路径
  app.use('/lol', lolSpider)
}

export {}
