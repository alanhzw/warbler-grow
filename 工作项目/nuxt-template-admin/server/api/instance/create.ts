/*
 * @Author: 一尾流莺
 * @Description:新建实例接口
 * @Date: 2021-12-15 16:06:22
 * @LastEditTime: 2021-12-18 15:17:22
 * @FilePath: \nuxt-template-admin\server\api\instance\create.ts
 */

export interface CreateInstanceResult {
  status: number;
  result: boolean;
  message: string;
}

export default async (req, res): Promise<CreateInstanceResult> => {
  console.log('🚀🚀~ 新建实例:', req.body);
  return {
    status: 200,
    result: true,
    message: '新建实例成功',
  };
};
