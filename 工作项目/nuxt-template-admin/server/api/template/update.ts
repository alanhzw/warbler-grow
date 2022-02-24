/*
 * @Author: 一尾流莺
 * @Description:编辑模板接口
 * @Date: 2021-12-15 16:06:30
 * @LastEditTime: 2021-12-18 15:16:53
 * @FilePath: \nuxt-template-admin\server\api\template\update.ts
 */
export interface UpdateTemplateResult {
  status: number;
  result: boolean;
  message: string;
}

export default async (req, res): Promise<UpdateTemplateResult> => {
  console.log('🚀🚀~ 编辑模板:', req.body);
  return {
    status: 200,
    result: true,
    message: '编辑模板成功',
  };
};
