/*
 * @Author: 一尾流莺
 * @Description:【三元奶粉】复购活动满罐有礼 基本配置项
 * @Date: 2021-09-16 14:39:03
 * @LastEditTime: 2021-12-22 10:37:31
 * @FilePath: \custom\src\pages\1000015502\99\2112100001550202\config\index.ts
 */
import { ref } from 'vue';
import bgPart01 from '../assets/part01.png';

interface PartOptions {
  width?: string,
  height?: string,
  margin?: string,
  [prop: string]: string | undefined
}

interface ApiOptions {
  getActivityInfo: string,
  getList: string,
  getPrize: string,
  getMyPrize:string
}

// 三元-爱力优系列
const partOptions01 = ref<PartOptions>({
  backgroundImage: `url(${bgPart01})`,
  width: '7.5rem',
  height: '38rem',
  margin: '0rem',
});

// apis
const apisOptions:ApiOptions = {
  getActivityInfo: '/wx/yanghe/receiveEcard/activityContent',
  getList: '/wx/yanghe/receiveEcard/rankList',
  getPrize: '/wx/yanghe/receiveEcard/receive',
  getMyPrize: '/wx/sanyuan/repurchasegift/myPrize',
};

export {
  apisOptions,
  partOptions01,
};

export type {
  PartOptions,
  ApiOptions,
};
