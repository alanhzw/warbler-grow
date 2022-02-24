import { createApp } from 'vue';
import { initRem } from '@/utils/client';
import '@/style/reset.scss';
import { init } from '@/utils';
import JD from '@/utils/platforms';
import root from './App.vue';

const app = createApp(root);

initRem(750);

// 初始化页面,
init({
  platform: 'jd',
  sysCode: 'cjwx',
  urlPattern: '/m/:venderId/:activityType/pointsMall/?activityId=:activityId',
}).then(({ baseInfo, isOpenCard }) => {
  app.provide('baseInfo', baseInfo);
  app.provide('isOpenCard', isOpenCard);
  app.mount('#app');
  JD.setHeaderShare({
    type: baseInfo?.shareType,
    title: '三元奶粉会员积分商城',
    content: '三元奶粉会员福利多，超多好物欢乐兑兑兑',
  });
});
