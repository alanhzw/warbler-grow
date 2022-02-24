import { createApp } from 'vue';
import { initRem } from '@/utils/client';
import JD from '@/utils/platforms';
import '@/style/reset.scss';
import { clickTracking, init } from '@/utils';
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
  app.use(clickTracking);
  app.mount('#app');
  JD.setHeaderShare({
    content: '小糊涂仙品牌会员盛典',
  });
});
