/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-12-12 14:21:41
 * @LastEditTime: 2021-12-12 15:13:02
 * @FilePath: \kkb-node\src\07-kao2\router.js
 */

class Router {

  constructor() {
    // 策略库
    this.stack = []
  }

  /**
   * 注册策略到策略库中
   * @param {*} path 请求路径
   * @param {*} method 请求方法
   * @param {*} middleWare 中间件
   */
  register(path, method, middleWare) {
    let route = { path, method, middleWare }
    this.stack.push(route)
  }

  // 注册 get 请求
  get(path, middleWare) {
    this.register(path, 'get', middleWare)
  }

  // 注册 post 请求
  post(path, middleWare) {
    this.register(path, 'post', middleWare)
  }

  // 路由中间件
  routes() {
    let _stack = this.stack
    // 返回的是一个中间件
    return async function(ctx, next) {
      // 获取到上下文中的 url
      let currentPath = ctx.url
      // 声明一个策略
      let route
      // 根据上下文中的 method 查找对应的策略
      for (let i = 0; i < _stack.length; i++) {
        const item = _stack[i];
        if (currentPath === item.path && item.method === ctx.method) {
          route = item.middleWare
          break
        }
      }
      // 如果取出的策略是一个函数,执行这个函数
      if (typeof route === 'function') {
        route(ctx, next)
        return
      }
      // 进入下一个中间件
      await next()
    }
  }
}

module.exports = Router