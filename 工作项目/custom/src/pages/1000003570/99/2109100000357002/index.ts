import '@/style/reset.scss';
import { createApp } from 'vue';
import { initRem } from '@/utils/client';
import { init } from '@/utils';
import JD from '@/utils/platforms';
import root from './App.vue';

initRem(750);

// 设置页面title
document.title = '下单享好礼';

const app = createApp(root);

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
  JD.setHeaderShare({
    type: baseInfo?.shareType,
    title: '下单享好礼，宠粉狂撒',
    content: '下单享好礼，宠粉狂撒',
    imageUrl: 'https://img10.360buyimg.com/imgzone/jfs/t1/203677/32/10773/651846/6164eb81E1b38ef4f/649d955d5b721977.png',
  });
});
