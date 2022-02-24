/**
 * @Description:caoshijie
 * @Date: 2022/1/7
 * @Description:水井坊复购送小酒
 * @FilePath:src\pages\1000086084\99\2201100008608401\index.ts
*/
import { createApp } from 'vue';
import '@/style/reset.scss';
import { initRem } from '@/utils/client';
import { init } from '@/utils';

import App from './App.vue';

// 设置页面title
document.title = '会员复购';

// 给定设计稿页面宽度
initRem(750);

const app = createApp(App);

// 初始化页面,
init({
  platform: 'jd',
  sysCode: 'cjwx',
  urlPattern: '/m/:venderId/:activityType/:activityId',
  // openCardLink: `&returnUrl=${window.location.href}`,
})
  .then(({
    baseInfo,
    isOpenCard,
  }) => {
    app.provide('baseInfo', baseInfo);
    app.provide('isOpenCard', isOpenCard);
    app.mount('#app');
  });
