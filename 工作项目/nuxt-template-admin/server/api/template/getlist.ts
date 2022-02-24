/*
 * @Author: 一尾流莺
 * @Description:获取模板列表接口
 * @Date: 2021-12-15 16:06:43
 * @LastEditTime: 2021-12-27 11:13:07
 * @FilePath: \nuxt-template-admin\server\api\template\getlist.ts
 */
import crmTest from "../../db/crmTest";

export interface Template {
  templateId: number;
  templateName: string;
  templateDesc: string;
  templateKey: string;
  tType: number;
  createTime: string;
  updateTime: string;
}

export type TemplateList = Template[];

export default async (req, res): Promise<TemplateList> => {
  console.log("🚀🚀~ 获取模板列表:", req.query);
  const list = (await crmTest.getTemplateList(req.query)) as TemplateList;
  return list;
};
