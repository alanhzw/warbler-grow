import { createApp } from 'vue';
import { initRem } from '@/utils/client';
import '@/style/reset.scss';
import { init } from '@/utils';
import root from './App.vue';

const app = createApp(root);

initRem(750);

// 初始化页面,
init({
  platform: 'jd',
  sysCode: 'cjwx',
  urlPattern: '/m/:venderId/:activityType/:activityId',

}).then(({ baseInfo, isOpenCard }) => {
  app.provide('baseInfo', baseInfo);
  app.provide('isOpenCard', isOpenCard);
  app.mount('#app');
});
