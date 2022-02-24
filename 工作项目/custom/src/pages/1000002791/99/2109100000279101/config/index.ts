/*
 * @Author: 一尾流莺
 * @Description:【滴露】明星集卡抽奖 基本配置项
 * @Date: 2021-09-16 14:39:03
 * @LastEditTime: 2021-10-11 15:09:08
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\config\index.ts
 */
import { ref } from 'vue';
import bgPart01 from '../assets/part01.png';
import bgPart03 from '../assets/part03.png';
import bgPart04 from '../assets/part04.png';
import bgPart05 from '../assets/part05.png';
import bgPart06 from '../assets/part06.png';
import good1 from '../assets/sku01.png';
import good2 from '../assets/sku02.png';
import good3 from '../assets/sku03.png';
import good4 from '../assets/sku04.png';

interface PartOptions {
  width?: string,
  height?: string,
  margin?: string,
  [prop: string]: string | undefined
}

interface ApiOptions {
  main: string,
  luckyDraw: string,
  getRecord: string,
  redeem: string,
  getAddress: string,
  saveAddress: string,
  click: string,
  firstEnter:string
}

// KV
const partOptions01 = ref<PartOptions>({
  backgroundImage: `url(${bgPart01})`,
  width: '7.5rem',
  height: '8.7rem',
  margin: '0rem',
});

// 立即入会/显示等级
const partOptions02 = ref<PartOptions>({
  width: '7.5rem',
  height: '1.3rem',
  margin: '0rem auto',
});

// 卡片展示
const partOptions03 = ref<PartOptions>({
  backgroundImage: `url(${bgPart03})`,
  width: '7.2rem',
  height: '5.2rem',
  margin: '0rem auto',
});

// 抽限定红包封面
const partOptions04 = ref<PartOptions>({
  backgroundImage: `url(${bgPart04})`,
  width: '7.2rem',
  height: '18.4rem',
  margin: '0rem auto',
});

// 卡片获取方式
const partOptions05 = ref<PartOptions>({
  backgroundImage: `url(${bgPart05})`,
  width: '7.2rem',
  height: '7.5rem',
  margin: '0rem auto',
});

// 店铺热卖
const partOptions06 = ref<PartOptions>({
  backgroundImage: `url(${bgPart06})`,
  width: '7.2rem',
  height: '11.5rem',
  margin: '0rem auto',
});

// apis
const apisOptions:ApiOptions = {
  main: '/wx/dettol/collectCard/activityContent',
  luckyDraw: '/wx/dettol/collectCard/luckyDraw',
  getRecord: '/wx/dettol/collectCard/record',
  redeem: '/wx/dettol/collectCard/redeem',
  getAddress: '/wx/dettol/collectCard/getPerfectInfo',
  saveAddress: '/wx/dettol/collectCard/saveRedPerfectInfo',
  click: '/crm/pageVisit/insertCrmPageVisit',
  firstEnter: '/wx/dettol/collectCard/accessLog',
};

// 热卖商品
const hootGoods = [
  {
    sku: '1336052',
    image: good1,
  },
  {
    sku: '100025319742',
    image: good4,
  },
  {
    sku: '100021750550',
    image: good2,
  },
  {
    sku: '100014804924',
    image: good3,
  },
];

// 等级映射
const levelMap = ['', '骑士', '伯爵', '侯爵', '公爵'];

export {
  hootGoods,
  apisOptions,
  partOptions01,
  partOptions02,
  partOptions03,
  partOptions04,
  partOptions05,
  partOptions06,
  levelMap,
};

export type {
  PartOptions,
  ApiOptions,
};
