/*
 * @Author: 一尾流莺
 * @Description:全局异常处理中间件
 * @Date: 2023-02-20 15:46:11
 * @LastEditTime: 2023-02-23 17:05:48
 * @FilePath: \dang-be\src\common\GlobalException.ts
 */
import type { Context, Next } from 'koa';
import { fail } from '@/common/ResResult';

/**
 * @description:全局异常处理中间件
 */
const globalException = async (ctx: Context, next: Next): Promise<void> => {
  try {
    await next();
  } catch (error) {
    const err = error as Error;
    ctx.body = fail(`服务器错误${err.message}`);
  }
};

export default globalException;
