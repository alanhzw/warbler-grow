/*
 * @Author: 一尾流莺
 * @Description:通用请求成功/失败 返回处理
 * @Date: 2023-02-20 16:21:49
 * @LastEditTime: 2023-02-22 16:11:11
 * @FilePath: \dang-be\src\common\ResResult.ts
 */
enum Code {
  SUCCESS = 200,
  SERVER_ERROR = 500,
}

/**
 * @description: 通用请求成功/失败 返回处理
 */
class ResResult {
  static success(data: any = undefined, msg: any = '') {
    const code: Code = Code.SUCCESS;
    return { data, msg, code };
  }

  static fail(msg: any = '') {
    const code: Code = Code.SERVER_ERROR;
    return { undefined, msg, code };
  }
}

export const { success, fail } = ResResult;
