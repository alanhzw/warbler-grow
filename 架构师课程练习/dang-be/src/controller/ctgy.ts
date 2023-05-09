import { type Context } from 'koa';
import { get, post } from '../decorator/reqmethoddecorator';
import { Controller } from '../decorator/controllerdecorator';
import { ctgyDao } from '@/modules/ctgy/dao/CtgyDao';
import { success } from '@/common/ResResult';

@Controller('/ctgymodule')
class CtgyController {
  @get('/findCtgys/:firstctgyId')
  async findSecThrCtgys(ctx: Context) {
    const { firstctgyId } = ctx.params;
    const ctgys = await ctgyDao.findCtgys(firstctgyId);
    ctx.body = success(ctgys);
  }

  @post('/findCtgys2/:firstctgyId')
  async findSecThrCtgys2(ctx: Context) {}
}

export default CtgyController;
