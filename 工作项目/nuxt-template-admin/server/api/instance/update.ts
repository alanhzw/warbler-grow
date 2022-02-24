/*
 * @Author: 一尾流莺
 * @Description:编辑实例接口
 * @Date: 2021-12-15 16:06:30
 * @LastEditTime: 2021-12-18 15:17:41
 * @FilePath: \nuxt-template-admin\server\api\instance\update.ts
 */
export interface UpdateInstanceResult {
  status: number;
  result: boolean;
  message: string;
}

export default async (req, res): Promise<UpdateInstanceResult> => {
  console.log('🚀🚀~ 编辑实例:', req.body);
  return {
    status: 200,
    result: true,
    message: '编辑实例成功',
  };
};
