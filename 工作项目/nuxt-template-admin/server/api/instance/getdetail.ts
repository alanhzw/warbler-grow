/*
 * @Author: 一尾流莺
 * @Description:获取实例详情接口
 * @Date: 2021-12-15 16:08:11
 * @LastEditTime: 2021-12-18 15:35:51
 * @FilePath: \nuxt-template-admin\server\api\instance\getdetail.ts
 */

import type { Instance } from './getlist';

export default async (req, res): Promise<Instance> => {
  console.log('🚀🚀~ 获取实例详情:', req.query);
  return {
    instanceId: 'instanceId01',
    parentId: 'templateId01',
    instanceName: '实例一号',
    isOpen: 1,
    isGeneral: 1,
    configJson: '{"aa":"bb"}',
    createTime: '2020-01-01',
    updateTime: '2021-11-11',
  };
};
