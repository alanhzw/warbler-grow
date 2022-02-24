/**
 * @Description:caoshijie
 * @Date: 2021/10/18
 * @Description:欧乐B首购有礼
 * @FilePath:src\pages\1000003005\99\2110100000300501\index.ts
 */
import { createApp } from 'vue';
import '@/style/reset.scss';
import { initRem } from '@/utils/client';
import { init } from '@/utils';

import App from './App.vue';

// 设置页面title
document.title = '会员首购有礼';

// 给定设计稿页面宽度
initRem(750);

const app = createApp(App);

// 初始化页面,
init({
  platform: 'jd',
  sysCode: 'cjwx',
  urlPattern: '/m/:venderId/:activityType/:activityId',
  openCardLink: `https://shopmember.m.jd.com/shopcard?venderId=1000003005&shopId=1000003005&venderType=5&channel=7018&returnUrl=${window.location.href}`,
})
  .then(({
    baseInfo,
    isOpenCard,
  }) => {
    app.provide('baseInfo', baseInfo);
    app.provide('isOpenCard', isOpenCard);
    app.mount('#app');
  });
