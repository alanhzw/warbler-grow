/**
 * @Description:caoshijie
 * @Date: 2021/12/15
 * @Description: 小糊涂仙 重启
 * @FilePath:src\pages\1000088382\99\2112100008838203\index.ts
*/
import { createApp } from 'vue';
import { initRem } from '@/utils/client';
import '@/style/reset.scss';
import { clickTracking, init } from '@/utils';
import root from './App.vue';

const app = createApp(root);

initRem(750);
document.title = '0元试饮';

// 初始化页面,
init({
  platform: 'jd',
  sysCode: 'cjwx',
  urlPattern: '/m/:venderId/:activityType/:activityId',
}).then(({ baseInfo, isOpenCard, pathParams }) => {
  app.provide('baseInfo', baseInfo);
  app.provide('isOpenCard', isOpenCard);
  app.use(clickTracking);
  app.mount('#app');
});
