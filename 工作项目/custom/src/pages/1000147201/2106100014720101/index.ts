/*
 * @Description:韩志伟
 * @Date: 2021-06-24 10:47:07
 * @LastEditTime: 2021-07-15 10:00:09
 * @FilePath: \custom\src\pages\1000147201\2106100014720101\index.ts
 */
import { createApp } from 'vue';
import '@/style/reset.scss';
import 'animate.css';
import 'swiper/dist/css/swiper.min.css';
import { init } from '@/utils';
import { initRem } from '@/utils/client';
import root from './App.vue';

initRem(1125);

// 设置页面title
document.title = 'Swisse自营下单送E卡';

const app = createApp(root);

// 初始化页面,
init({
  platform: 'jd',
  sysCode: 'cjwx',
  urlPattern: '/m/:venderId/:activityId',
}).then(({ baseInfo, isOpenCard }) => {
  app.provide('baseInfo', baseInfo);
  app.mount('#app');
});
