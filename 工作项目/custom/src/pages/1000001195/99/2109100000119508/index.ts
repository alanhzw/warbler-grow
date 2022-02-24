/*
 * @Description:韩志伟
 * @Date: 2021-06-24 10:47:07
 * @LastEditTime: 2021-12-27 14:44:22
 * @FilePath: \custom\src\pages\1000001195\99\2109100000119507\index.ts
 */
import { createApp } from 'vue';
import '@/style/reset.scss';
import { initRem } from '@/utils/client';
import 'animate.css';
import { init } from '@/utils';
import JD from '@/utils/platforms';

import App from './App.vue';

// 设置页面title
document.title = '已购用户入会好礼';

// 给定设计稿页面宽度
initRem(750);

const app = createApp(App);

// 初始化页面,
init({
  platform: 'jd',
  sysCode: 'cjwx',
  urlPattern: '/m/:venderId/:activityType/:activityId',
}).then(({ baseInfo, isOpenCard }) => {
  app.provide('baseInfo', baseInfo);
  app.provide('isOpenCard', isOpenCard);
  app.mount('#app');
  JD.setHeaderShare({
    type: baseInfo?.shareType,
    title: '加入蓝月亮会员，新品好礼抢先尝',
  });
});
