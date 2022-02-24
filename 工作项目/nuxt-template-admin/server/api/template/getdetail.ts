/*
 * @Author: 一尾流莺
 * @Description:获取模板详情接口
 * @Date: 2021-12-15 16:08:11
 * @LastEditTime: 2021-12-20 17:22:49
 * @FilePath: \nuxt-template-admin\server\api\template\getdetail.ts
 */
import crmTest from "../../db/crmTest";
import type { IncomingMessage, ServerResponse } from "http";
export interface SuperIncomingMessage extends IncomingMessage {
  query: Record<string, any>;
  body: string;
}
export interface TemplateDetail {
  templateId: number;
  templateName: string;
  templateDesc: string;
  templateKey: string;
  tType: number;
  createTime: string;
  updateTime: string;
}

export default async (req: SuperIncomingMessage, res: ServerResponse): Promise<TemplateDetail> => {
  console.log("🚀🚀~ 获取模板详情:", req.query);
  const detail = (await crmTest.getTemplateDetail(req.query.templateId)) as TemplateDetail;
  console.log("🚀🚀~ 模板详情:", detail);
  return detail[0];
};
