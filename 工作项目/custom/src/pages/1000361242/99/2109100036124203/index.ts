import { createApp } from 'vue';
import { initRem } from '@/utils/client';
import JD from '@/utils/platforms';
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
}).then(({ baseInfo, isOpenCard, pathParams }) => {
  app.provide('baseInfo', baseInfo);
  app.provide('isOpenCard', isOpenCard);
  app.provide('helpUuid', pathParams.helpUuid);
  app.mount('#app');
  JD.setHeaderShare({
    title: '加入qq星会员购买产品，领取京豆权益',
  });
});
