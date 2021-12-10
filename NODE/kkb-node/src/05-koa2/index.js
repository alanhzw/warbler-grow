
/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-12-08 22:50:47
 * @LastEditTime: 2021-12-10 15:43:50
 * @FilePath: \kkb-node\src\05-koa2\index.js
 */
// const http = require("http")
// const fs = require("fs")
// const server = http.createServer((req, res) => {

//   res.writeHead(200)
//   res.end("hello,koa")


// })
// server.listen(3000, () => {
//   console.log('🚀🚀~ sever at 3000');
// })


// 引入 MyKoa
const MyKoa = require('./mykoa')

// 创建 MyKoa 实例
const app = new MyKoa()

// 调用 use 方法
app.use((req, res) => {
  res.writeHead(200)
  res.end("hello, MyKoa!")
})

// 调用 listen 方法
app.listen(3000, () => {
  console.log('🚀🚀~ sever at 3000');
})