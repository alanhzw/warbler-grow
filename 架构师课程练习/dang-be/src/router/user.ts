import { type Context } from 'koa';
import Router from 'koa-router';
import { success } from '@/common/ResResult';
import { userDao, type Userinfo } from '@/modules/userinfo/dao';

const router = new Router();

// 定义模块前缀
router.prefix('/usermodule');

// 根据用户名密码单个查询用户信息
router.get('/findUserinfo/:username/:psw', async (ctx: Context) => {
  const { username } = ctx.params;
  ctx.body = success(`欢迎${username}`);
});

// 添加用户
router.post('/addUser', async (ctx: Context) => {
  const userinfo: Userinfo = ctx.request.body;
  const dbUserinfo = await userDao.addUser(userinfo);
  ctx.body = success(dbUserinfo);
});

// 查询全部用户
router.get('/findAllUser', async (ctx: Context) => {
  const allUser = await userDao.findAllUser();
  ctx.body = success(allUser);
});

// 只查看部分属性
router.get('/findByProps', async (ctx: Context) => {
  const allUser = await userDao.findByProps();
  ctx.body = success(allUser);
});

// 用户名密码精确查询
router.get('/findByUsernameAndPsw/:username/:psw', async (ctx: Context) => {
  const { username, psw } = ctx.params;
  const allUser = await userDao.findByUsernameAndPsw(username, psw);
  ctx.body = success(allUser);
});

// 模糊查询
router.get('/findByLike/:key', async (ctx: Context) => {
  const { key } = ctx.params;
  const allUser = await userDao.findByLike(key);
  ctx.body = success(allUser);
});

// 模糊查询 or
router.get('/findByUsmAndAddr', async (ctx: Context) => {
  const allUser = await userDao.findByUsmAndAddr();
  ctx.body = success(allUser);
});

// 聚合查询
router.get('/countUserInfo', async (ctx: Context) => {
  const allUser = await userDao.countUserInfo();
  ctx.body = success(allUser);
});

// 分页查询
router.get('/findUserWithPager/:pageNo/:pageSize', async (ctx: Context) => {
  const { pageNo, pageSize } = ctx.params;
  const offset = (pageNo - 1) * pageSize;
  const allUser = await userDao.findUserWithPager(offset, pageSize);
  ctx.body = success(allUser);
});
export default router;

module.exports = router;
