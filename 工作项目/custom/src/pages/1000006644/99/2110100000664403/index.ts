/*
 * @Description:韩志伟
 * @Date: 2021-06-24 10:47:07
 * @LastEditTime: 2021-09-06 11:52:36
 * @FilePath: \custom\src\pages\1000006644\99\2108100000664405\index.ts
 */
import { createApp } from 'vue';
import '@/style/reset.scss';
import { initRem } from '@/utils/client';
import 'animate.css';
// import 'swiper/dist/css/swiper.min.css';
import { init } from '@/utils';

import App from './App.vue';

// 设置页面title
document.title = 'a2至初品牌新客专享价';

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
  app.provide('baseInfo', { ...baseInfo, adSource: 'JD' });
  app.provide('isOpenCard', isOpenCard);
  app.mount('#app');
});
