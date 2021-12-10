/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-12-09 21:31:37
 * @LastEditTime: 2021-12-10 15:46:38
 * @FilePath: \kkb-node\src\05-koa2\mykoa.js
 */

// 引入原生 http 模块
const http = require("http")

// 声明 MyKoa 类
class MyKoa {
  // 实现 listen 方法
  listen(...args) {
    // 调用原生 http.createServer 创建服务
    const server = http.createServer((req, res) => {
      // 调用 callback
      this.callback(req, res)
    })
    // 调用原生 server.listen 监听端口
    server.listen(...args)
  }
  // 实现 use 方法
  use(callback) {
    // 真正的业务逻辑代码通过 use方法保存
    this.callback = callback
  }
}

module.exports = MyKoa