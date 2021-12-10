/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-12-09 16:21:03
 * @LastEditTime: 2021-12-10 15:31:17
 * @FilePath: \kkb-node\src\05-koa2\sample.js
 */

const imitateDelay = (timeout) =>
  new Promise((resolve) => {
    const timeoutHandle = setTimeout(() => {
      clearTimeout(timeoutHandle);
      resolve();
    }, timeout);
  });

// 引入 koa
const Koa = require("koa")

// 创建 koa 实例
const app = new Koa()

// 计算请求耗时
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const end = Date.now()
  console.log(`🚀🚀~ 请求${ctx.url}耗时${parseInt(end - start)}ms`);
})

// 请求
app.use(async (ctx, next) => {
  // 模拟一些耗时的操作
  await imitateDelay(1000);
  ctx.body = {
    name: 'warbler'
  }
})

// 启动服务 监听3000端口
app.listen(3000, () => {
  console.log('🚀🚀~ 3000:', 3000);
})


