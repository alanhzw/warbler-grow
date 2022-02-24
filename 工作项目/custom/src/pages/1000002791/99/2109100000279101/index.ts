/*
 * @Description:【滴露】明星集卡抽奖
 * @Date: 2021-06-24 10:47:07
 * @LastEditTime: 2021-10-09 10:32:37
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\index.ts
 */
import { createApp } from 'vue';
import { initRem } from '@/utils/client';
import { init } from '@/utils';
import JD from '@/utils/platforms';
import App from './App.vue';

// 设置页面title
document.title = '滴露会员集卡活动';

// 给定设计稿页面宽度
initRem(750);

const app = createApp(App);

// 初始化页面,
init({
  platform: 'jd',
  sysCode: 'cjwx',
  urlPattern: '/m/:venderId/:activityType/:activityId',
}).then(({ baseInfo, isOpenCard }) => {
  app.provide('baseInfo', baseInfo);
  app.provide('isOpenCard', isOpenCard);
  app.mount('#app');
  JD.setHeaderShare({
    type: baseInfo?.shareType,
    title: '会员集卡有机会赢代言人红包封面及正装商品',
    content: '会员集卡有机会赢代言人红包封面及正装商品',
  });
});
