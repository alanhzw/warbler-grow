/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-12-09 21:31:37
 * @LastEditTime: 2021-12-10 16:15:25
 * @FilePath: \kkb-node\src\06-kao2\myKoa.js
 */

const http = require("http")
const context = require("./context");
const request = require("./request");
const response = require("./response");

class MyKoa {
  listen(...args) {
    const server = http.createServer((req, res) => {
      // 创建上下⽂
      let ctx = this.createContext(req, res);
      this.callback(ctx)
      // 响应
      res.end(ctx.body);
    })
    server.listen(...args)
  }
  use(callback) {
    this.callback = callback
  }
  // 构建上下⽂, 把res和req都挂载到ctx之上，并且在ctx.req和ctx.request.req同时保存
  createContext(req, res) {
    const ctx = Object.create(context);
    ctx.request = Object.create(request);
    ctx.response = Object.create(response);
    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;
    return ctx;
  }
}

module.exports = MyKoa