/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-09-09 16:49:16
 * @LastEditTime: 2021-09-10 16:06:41
 * @FilePath: \ts-express\src\app.ts
 */
// 引用express框架
const express = require('express')
const useRouter = require('./router/index')
const lolSpider = require('./spider/LOL/index')
// 创建网站服务器
const app = express()
// 启用路由
useRouter(app)
lolSpider()
// 监听端口
app.listen(3000, () => {
  console.log('服务器启动成功')
})
