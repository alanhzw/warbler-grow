/*
 * @Author: 一尾流莺
 * @Description:【三元奶粉】复购活动满罐有礼 基本配置项
 * @Date: 2021-09-16 14:39:03
 * @LastEditTime: 2021-12-21 11:23:10
 * @FilePath: \custom\src\pages\1000123965\99\2110100012396501\config\index.ts
 */
import { ref } from 'vue';
import bgPart01 from '../assets/part01.png';
import bgPart02 from '../assets/part02.png';
import bgPart03 from '../assets/part03.png';
import bgPart04 from '../assets/part04.png';

interface PartOptions {
  width?: string,
  height?: string,
  margin?: string,
  [prop: string]: string | undefined
}

interface ApiOptions {
  main: string,
  getActivityInfo: string,
  getRule: string,
  getPrize: string,
  addAddress: string,
  getAddress: string,
  getMyPrize:string
}

// 三元-爱力优系列
const partOptions01 = ref<PartOptions>({
  backgroundImage: `url(${bgPart01})`,
  width: '7.5rem',
  height: '17rem',
  margin: '0rem',
});

// 三元-爱倍益系列
const partOptions02 = ref<PartOptions>({
  backgroundImage: `url(${bgPart02})`,
  width: '7.5rem',
  height: '7rem',
  margin: '0rem auto',
});

// 三元-爱诺星系列
const partOptions03 = ref<PartOptions>({
  backgroundImage: `url(${bgPart03})`,
  width: '7.5rem',
  height: '7rem',
  margin: '0rem auto',
});

// 三元-爱韵天使妈妈粉
const partOptions04 = ref<PartOptions>({
  backgroundImage: `url(${bgPart04})`,
  width: '7.5rem',
  height: '7.5rem',
  margin: '0rem auto',
});

// apis
const apisOptions:ApiOptions = {
  main: '/wx/sanyuan/repurchasegift/prizeStatus',
  getActivityInfo: '/wx/sanyuan/repurchasegift/finishInfoResult',
  getRule: '/common/brand/getFullActInfoVo',
  getPrize: '/wx/sanyuan/repurchasegift/getPrize',
  getMyPrize: '/wx/sanyuan/repurchasegift/myPrize',
  addAddress: '/wx/sanyuan/repurchasegift/insertPrizeInfo',
  getAddress: '/wx/sanyuan/repurchasegift/getAddressInfo',
};

export {
  apisOptions,
  partOptions01,
  partOptions02,
  partOptions03,
  partOptions04,
};

export type {
  PartOptions,
  ApiOptions,
};
