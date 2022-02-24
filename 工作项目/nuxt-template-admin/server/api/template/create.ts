/*
 * @Author: 一尾流莺
 * @Description:新建模板接口
 * @Date: 2021-12-15 16:06:22
 * @LastEditTime: 2021-12-17 16:57:55
 * @FilePath: \nuxt-template-admin\server\api\template\create.ts
 */

export interface CreateTemplateResult {
  status: number;
  result: boolean;
  message: string;
}

export default async (req, res): Promise<CreateTemplateResult> => {
  console.log('🚀🚀~ 新建模板:', req.body);
  return {
    status: 200,
    result: true,
    message: '新建模板成功',
  };
};
