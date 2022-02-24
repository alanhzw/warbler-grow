/**
 * @Description:caoshijie
 * @Date: 2022/1/19
 * @Description: 羽西首购送京豆
 * @FilePath:src\pages\1000002744\99\2201100000274401\index.ts
*/
import '@/style/reset.scss';
import { createApp, inject } from 'vue';
import { initRem } from '@/utils/client';
import { init, clickTracking, setHeaderShare } from '@/utils';
import root from './App.vue';
import 'swiper/swiper.min.css';

initRem(750);

document.title = '羽西首单会员礼';

const app = createApp(root);
// 初始化页面,
init({
  platform: 'jd',
  sysCode: 'cjwx',
  urlPattern: '/m/:venderId/:activityType/:activityId',
  // urlPattern: '/m/:oldvenderId/:activityType/:activityId/?venderId=:venderId',

})
  .then(({
    baseInfo,
    isOpenCard,
  }) => {
    app.provide('baseInfo', baseInfo);
    app.provide('isOpenCard', isOpenCard);
    app.use(clickTracking);
    app.mount('#app');
  });
