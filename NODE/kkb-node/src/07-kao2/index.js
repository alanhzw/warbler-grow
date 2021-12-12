/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-12-09 21:49:01
 * @LastEditTime: 2021-12-12 14:58:47
 * @FilePath: \kkb-node\src\07-kao2\index.js
 */


const MyKoa = require('./myKoa')
const Router = require('./router')

const app = new MyKoa()
const router = new Router();
router.get('/index', async ctx => {
  ctx.body = 'index page';
});
router.get('/post', async ctx => { ctx.body = 'post page'; });
router.get('/list', async ctx => { ctx.body = 'list page'; });
router.post('/index', async ctx => { ctx.body = 'post page'; });


// 路由实例输出⽗中间件 router.routes()
app.use(router.routes());

app.listen(3000, () => {
  console.log('🚀🚀~ sever at 3000 ~~~');
})