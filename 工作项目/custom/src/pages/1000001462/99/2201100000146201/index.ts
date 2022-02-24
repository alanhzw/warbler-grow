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
    title: '会员领永劫无间微信红包封面',
    content: '加入杜蕾斯会员，领永劫无间限量微信红包封面',
  });
});
