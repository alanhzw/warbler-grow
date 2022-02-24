/**
 * @Description:caoshijie
 * @Date: 2021/12/20
 * @Description: 帝亚吉欧会员首购礼
 * @FilePath:src\pages\726325\99\211272632501\index.ts
*/
import '@/style/reset.scss';
import 'swiper/swiper.min.css';

import { createApp, inject } from 'vue';
import { initRem } from '@/utils/client';
import { init, clickTracking } from '@/utils';
import root from './App.vue';

initRem(750);

document.title = '帝亚吉欧会员首购礼';

const app = createApp(root);
// 初始化页面,
init({
  platform: 'jd',
  sysCode: 'cjwx',
  urlPattern: '/m/:venderId/:activityType/:activityId',
  openCardLink: `https://shopmember.m.jd.com/shopcard?venderId=726325&shopId=721466&venderType=1&channel=7001&returnUrl=${encodeURIComponent(`https://${window.location.host}/m/1000376745/99/2111100037674501/`)}`,
})
  .then(({
    baseInfo,
  }) => {
    app.provide('baseInfo', baseInfo);
    app.use(clickTracking);
    app.mount('#app');
  });
