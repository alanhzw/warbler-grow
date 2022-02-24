import '@/style/reset.scss';
import { createApp } from 'vue';
import { initRem } from '@/utils/client';
import { init } from '@/utils';
import root from './App.vue';

initRem(750);

// 设置页面title
document.title = '中奖名单';

const app = createApp(root);

// 初始化页面,
init({
  platform: 'jd',
  sysCode: 'cjwx',
  activityType: '40',
  checkOpenCard: false,
  urlPattern: '/m/common/babycare/lotteryList/?venderId=:venderId&activityId=:activityId',
}).then(({ baseInfo, isOpenCard, pathParams }) => {
  app.provide('isOpenCard', isOpenCard);
  app.provide('baseInfo', baseInfo);
  app.mount('#app');
});
