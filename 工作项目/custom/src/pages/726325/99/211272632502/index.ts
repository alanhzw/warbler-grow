/**
 * @Description:caoshijie
 * @Date: 2021/12/22
 * @Description: 帝亚吉欧满额有礼
 * @FilePath:src\pages\726325\99\211272632502\index.ts
*/
import '@/style/reset.scss';
import { createApp, inject } from 'vue';
import { initRem } from '@/utils/client';
import { init, clickTracking, setHeaderShare } from '@/utils';
import root from './App.vue';
import 'swiper/swiper.min.css';

initRem(750);

document.title = '帝亚吉欧满额有礼';

const app = createApp(root);
// 初始化页面,
init({
  platform: 'jd',
  sysCode: 'cjwx',
  urlPattern: '/m/:venderId/:activityType/:activityId',
  openCardLink: `https://shopmember.m.jd.com/shopcard?venderId=726325&shopId=721466&venderType=1&channel=7002&returnUrl=${window.location.href}`,
})
  .then(({
    baseInfo,
  }) => {
    app.provide('baseInfo', baseInfo);
    app.use(clickTracking);
    app.mount('#app');
    setHeaderShare({
      type: baseInfo?.shareType,
      title: '叠加好礼，多买多送',
      content: '叠加好礼，多买多送',
    });
  });
