/**
 * @Description:caoshijie
 * @Date: 2021/10/14
 * @Description: 【珀莱雅pop】 复购有礼
 * @FilePath:src\pages\691846\99\211069184602\index.ts
 */
import { createApp } from 'vue';
import '@/style/reset.scss';
import { initRem } from '@/utils/client';
import { init } from '@/utils';

import App from './App.vue';

// 设置页面title
document.title = '会员复购加赠';

// 给定设计稿页面宽度
initRem(750);

const app = createApp(App);

// 初始化页面,
init({
  platform: 'jd',
  sysCode: 'cjwx',
  urlPattern: '/m/:venderId/:activityType/:activityId',
  // openCardLink: `https://shopmember.m.jd.com/shopcard?venderId=1000002743&channel=7038&returnUrl=${window.location.href}`,
})
  .then(({
    baseInfo,
    isOpenCard,
  }) => {
    app.provide('baseInfo', baseInfo);
    app.provide('isOpenCard', isOpenCard);
    app.mount('#app');
  });
