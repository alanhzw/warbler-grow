/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-12-09 21:31:37
 * @LastEditTime: 2021-12-12 15:09:18
 * @FilePath: \kkb-node\src\07-kao2\myKoa.js
 */

const http = require("http")
const context = require("./context");
const request = require("./request");
const response = require("./response");

class MyKoa {

  constructor() {
    this.middleWares = []
  }

  listen(...args) {
    const server = http.createServer(async (req, res) => {
      // 创建上下⽂
      let ctx = this.createContext(req, res);
      // 合成函数
      const fn = this.compose(this.middleWares)
      await fn(ctx)
      // 响应
      res.end(ctx.body);
    })
    server.listen(...args)
  }

  use(middleWare) {
    this.middleWares.push(middleWare)
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

  // 合成函数
  compose(middleWares) {
    return function(ctx) {
      return dispatch(0)
      function dispatch(i) {
        let fn = middleWares[i]
        if (!fn) {
          return Promise.resolve()
        }
        return Promise.resolve(
          // 在这里传入上下文 ctx
          fn(ctx, function next() {
            return dispatch(i + 1)
          })
        )
      }
    }
  }

}

const mid = async (ctx, next) => {
  // 来到中间件，洋葱圈左边
  next() // 进⼊其他中间件
  // 再次来到中间件，洋葱圈右边
};

module.exports = MyKoa