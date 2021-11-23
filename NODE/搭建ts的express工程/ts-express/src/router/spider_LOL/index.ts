/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-09-10 10:46:45
 * @LastEditTime: 2021-09-10 10:49:07
 * @FilePath: \ts-express\src\router\spider_LOL\index.ts
 */
// 引用express框架
const express = require('express')
// 创建注册页面路由
const lolSpider = express.Router()

// 匹配二级请求路径
lolSpider.get('/spider', (req, res) => {
  res.send('hello world1234567')
})
module.exports = lolSpider
export {}
