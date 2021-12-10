/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-12-09 21:49:01
 * @LastEditTime: 2021-12-10 16:11:52
 * @FilePath: \kkb-node\src\06-kao2\index.js
 */


const MyKoa = require('./myKoa')

const app = new MyKoa()

app.use(ctx => {
  console.log('🚀🚀~ ctx:', ctx);
  ctx.body = 'welcome to MyKoa'
})

app.listen(3000, () => {
  console.log('🚀🚀~ sever at 3000 ~~~');
})