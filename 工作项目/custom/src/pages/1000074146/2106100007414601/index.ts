/*
 * @Description:韩志伟
 * @Date: 2021-06-24 10:47:07
 * @LastEditTime: 2021-07-15 09:53:37
 * @FilePath: \custom\src\pages\1000074146\2106100007414601\index.ts
 */
import '@/style/reset.scss';
import 'animate.css';
import 'swiper/dist/css/swiper.min.css';
import { createApp } from 'vue';
import { init } from '@/utils';
import { initRem } from '@/utils/client';
import baseComponent from './App.vue';

// 设置页面title
document.title = 'Swisse跨境下单送E卡';

// h97bIvzxR2L0SJw8LIDUE/kaL5GGqMTUc8u/otw2E+a7Ak3lgFoFQlZmf45w8Jzw

const app = createApp(baseComponent);

initRem(1125);

// 初始化页面,
init({
  platform: 'jd',
  sysCode: 'cjwx',
  urlPattern: '/m/:venderId/:activityId',
}).then(({ baseInfo, isOpenCard }) => {
  app.provide('baseInfo', baseInfo);
  app.mount('#app');
});
