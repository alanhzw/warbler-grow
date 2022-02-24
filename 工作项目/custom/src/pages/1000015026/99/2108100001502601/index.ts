// 引入根组件
import { createApp } from 'vue';
import { init } from '@/utils';
import JD from '@/utils/platforms';
import { initRem } from '@/utils/client';
import root from './App.vue';

// 设置页面title
document.title = 'a2闯关';

initRem(750);

const app = createApp(root);

init({
  platform: 'jd',
  sysCode: 'cjwx',
  mockPin: {
    pin: 'lr8PqT+bO2uP/yIMyEy4kvkaL5GGqMTUc8u/otw2E+a7Ak3lgFoFQlZmf45w8Jzw',
    nickname: 'genblade',
  },
}).then(({ baseInfo, isOpenCard }) => {
  app.provide('isOpenCard', isOpenCard);
  app.provide('baseInfo', baseInfo);
  app.mount('#app');
  // try {
  //   JD.setHeaderShare({
  //     type: '2',
  //     title: '测试头部分享',
  //   });
  // } catch (e) {
  //   console.error(e);
  // }
});
