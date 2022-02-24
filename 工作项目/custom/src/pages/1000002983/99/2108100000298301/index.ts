/*
 * @Description:韩志伟
 * @Date: 2021-06-24 10:47:07
 * @LastEditTime: 2021-08-27 15:50:31
 * @FilePath: \custom\src\pages\1000002983\99\2108100000298301\index.ts
 */
import { createApp } from 'vue';
import '@/style/reset.scss';
import { initRem } from '@/utils/client';
import 'animate.css';
import 'swiper/dist/css/swiper.min.css';
import { init } from '@/utils';

import App from './App.vue';

// 设置页面title
document.title = '首购有礼';

// 给定设计稿页面宽度
initRem(750);

const app = createApp(App);

// h97bIvzxR2L0SJw8LIDUE/kaL5GGqMTUc8u/otw2E+a7Ak3lgFoFQlZmf45w8Jzw

// 初始化页面,
init({
  platform: 'jd',
  sysCode: 'cjwx',
  urlPattern: '/m/:venderId/:activityType/:activityId',
}).then(({ baseInfo, isOpenCard }) => {
  app.provide('baseInfo', baseInfo);
  app.provide('isOpenCard', isOpenCard);
  app.mount('#app');
});
