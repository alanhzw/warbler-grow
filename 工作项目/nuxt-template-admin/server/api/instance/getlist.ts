/*
 * @Author: 一尾流莺
 * @Description:获取实例列表接口
 * @Date: 2021-12-15 16:06:43
 * @LastEditTime: 2021-12-18 15:36:55
 * @FilePath: \nuxt-template-admin\server\api\instance\getlist.ts
 */
export interface Instance {
  instanceId: string;
  instanceName: string;
  isOpen: number;
  configJson: string;
  createTime: string;
  updateTime: string;
  parentId: string;
  isGeneral: number;
}

export type InstanceList = Instance[];

export default async (req, res): Promise<InstanceList> => {
  console.log('🚀🚀~ 获取实例列表:', req.query);
  return [
    {
      instanceId: 'instanceId01',
      instanceName: '实例一号',
      createTime: '2020-01-01',
      updateTime: '2021-11-11',
      parentId: '111',
      isGeneral: 1,
      isOpen: 1,
      configJson: 'asdasdasd',
    },
    {
      instanceId: 'instanceId02',
      instanceName: '实例二号',
      createTime: '2020-02-02',
      updateTime: '2021-12-12',
      parentId: '111',
      isGeneral: 1,
      isOpen: 1,
      configJson: 'asdasdasd',
    },
    {
      instanceId: 'instanceId03',
      instanceName: '实例三号',
      createTime: '2020-03-03',
      updateTime: '2021-13-13',
      parentId: '111',
      isGeneral: 1,
      isOpen: 1,
      configJson: 'asdasdasd',
    },
  ];
};
