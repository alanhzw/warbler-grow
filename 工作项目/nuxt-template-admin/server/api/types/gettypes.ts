/*
 * @Author: 一尾流莺
 * @Description:获取模板类型接口
 * @Date: 2021-12-15 16:04:39
 * @LastEditTime: 2021-12-27 11:13:34
 * @FilePath: \nuxt-template-admin\server\api\types\gettypes.ts
 */
import crmTest from "../../db/crmTest";

export interface TemplateType {
  tType: number; // 模版类型ID
  tTypeName: string; // 模版类型名称
  tTypeDesc: string; // 模版类型描述
  orderValue: number; // 排序信息
  isOpen: number; // 是否开启
  scene: number; // 模版的使用场景： 1-权益活动， 2-互动活动
  refer: string; // 关联的信息（例如：权益活动的活动类型）
  createTime: string; // 创建时间
  updateTime: string; // 更新时间
}

export type TemplateTypeList = TemplateType[];

export default async (req, res): Promise<TemplateTypeList> => {
  console.log("🚀🚀~ 获取模板类型:");
  const types = (await crmTest.getTemplateTypes()) as TemplateTypeList;
  console.log("🚀🚀~ 模板类型列表:", types);
  return types;
};
