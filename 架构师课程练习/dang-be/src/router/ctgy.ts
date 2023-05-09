import { type Context } from 'koa';
import Router from 'koa-router';
import { success } from '@/common/ResResult';
import { ctgyDao } from '@/modules/ctgy/dao/CtgyDao';

const router = new Router();

// 定义模块前缀
router.prefix('/ctgymodule');

// 根据一级图书分类查询二三级图书分类
router.get('/findCtgys/:firstctgyId', async (ctx: Context) => {
  const { firstctgyId } = ctx.params;
  const ctgys = await ctgyDao.findCtgys(firstctgyId);
  ctx.body = success(ctgys);
});

export default router;

module.exports = router;
