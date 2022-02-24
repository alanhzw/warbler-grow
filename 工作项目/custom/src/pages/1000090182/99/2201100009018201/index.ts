import '@/style/reset.scss';
import { createApp } from 'vue';
import { initRem } from '@/utils/client';
import { init } from '@/utils';
import root from './App.vue';
import JD from '@/utils/platforms';

initRem(750);

const app = createApp(root);

// 初始化页面,
init({
  platform: 'jd',
  sysCode: 'cjwx',
  // activityType: '40',
  urlPattern: '/m/:venderId/:activityType/:activityId',
  // showFinishedPage: false,
}).then(({ baseInfo, isOpenCard, pathParams }) => {
  // app.provide('isOpenCard', isOpenCard);
  app.provide('baseInfo', baseInfo);
  // app.provide('helpUuid', pathParams.helpUuid);
  app.mount('#app');
  JD.setHeaderShare({
    title: '加入会员立刻积分兑换益节专属虎年红包封面',
    content: '加入会员立刻积分兑换益节专属虎年红包封面',
  });
});
