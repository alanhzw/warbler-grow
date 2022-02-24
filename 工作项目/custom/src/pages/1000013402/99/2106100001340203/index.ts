/*
 * @Description:韩志伟
 * @Date: 2021-06-24 10:47:07
 * @LastEditTime: 2021-07-15 10:00:09
 * @FilePath: \custom\src\pages\1000147201\2106100014720101\index.ts
 */
import { createApp } from 'vue';
import '@/style/reset.scss';
import { initRem } from '@/utils/client';
import 'animate.css';
import 'swiper/dist/css/swiper.min.css';
import { init } from '@/utils';

import App from './App.vue';

// 设置页面title
document.title = 'Swisse自营下单送E卡';

// 给定设计稿页面宽度
initRem(1125);

const app = createApp(App);

// 初始化页面,
init({
  platform: 'jd',
  sysCode: 'cjwx',
  urlPattern: '/m/:venderId/:activityType/:activityId',
}).then((info) => {
  app.provide('baseInfo', info);
  app.mount('#app');
});
