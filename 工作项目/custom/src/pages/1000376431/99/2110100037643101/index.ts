/**
 * @Description:caoshijie
 * @Date: 2021/10/9
 * @Description: 【倩碧自营】 首复购有礼
 * @FilePath:src\pages\1000376431\99\2110100037643101\index.ts
 */
import { createApp } from 'vue';
import '@/style/reset.scss';
import { initRem } from '@/utils/client';
import { init } from '@/utils';

import App from './App.vue';

// 设置页面title
document.title = '会员首购加赠';

// 给定设计稿页面宽度
initRem(750);

const app = createApp(App);

// h97bIvzxR2L0SJw8LIDUE/kaL5GGqMTUc8u/otw2E+a7Ak3lgFoFQlZmf45w8Jzw

// 初始化页面,
init({
  platform: 'jd',
  sysCode: 'cjwx',
  urlPattern: '/m/:venderId/:activityType/:activityId',
  openCardLink: `https://shopmember.m.jd.com/shopcard/?venderId=1000376431&shopId=1000376431&channel=7035&returnUrl=${window.location.href}`,
})
  .then(({
    baseInfo,
    isOpenCard,
  }) => {
    app.provide('baseInfo', baseInfo);
    app.provide('isOpenCard', isOpenCard);
    app.mount('#app');
  });
