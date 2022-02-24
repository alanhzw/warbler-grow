import '@/style/reset.scss';
import { createApp } from 'vue';
import { Popup } from 'vant';
import { initRem } from '@/utils/client';
import { init } from '@/utils';
import root from './App.vue';

initRem(750);

// 设置页面title
document.title = '斯维诗海外下单送E卡';

const app = createApp(root);
app.use(Popup);

// 初始化页面,
init({
  platform: 'jd',
  sysCode: 'cjwx',
  urlPattern: '/m/:venderId/:activityType/:activityId',
  mockPin: {
    pin: 'lr8PqT+bO2uP/yIMyEy4kvkaL5GGqMTUc8u/otw2E+a7Ak3lgFoFQlZmf45w8Jzw',
    nickname: 'genblade',
  },
}).then(({ baseInfo, isOpenCard }) => {
  app.provide('isOpenCard', isOpenCard);
  app.provide('baseInfo', baseInfo);
  app.mount('#app');
});
