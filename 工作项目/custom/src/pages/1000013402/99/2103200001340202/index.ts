/*
 * @Description:林某
 * @Date: 2021-06-24 10:47:07
 * @LastEditTime: 2021-07-15 10:00:09
 * @FilePath: \custom\src\pages\1000147201\2106100014720101\index.ts
 */
import '@/style/reset.scss';
import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import { initRem } from '@/utils/client';
import { init } from '@/utils';
import JD from '@/utils/platforms';
import routes from './routers';
import root from './App.vue';

import 'swiper/swiper.min.css';
// import 'swiper/dist/css/swiper.min.css';
import 'swiper/components/pagination/pagination.scss';

initRem(750);

// 设置页面title
document.title = '舒化勋章馆';

const app = createApp(root);

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
SwiperCore.use([Autoplay, Pagination]);

app.use(router);

// 初始化页面,
init({
  platform: 'jd',
  sysCode: 'cjwx',
  urlPattern: '/m/:venderId/:activityType/:activityId',
}).then(({ baseInfo, isOpenCard }) => {
  app.provide('isOpenCard', isOpenCard);
  app.provide('baseInfo', baseInfo);
  app.mount('#app');

  JD.setHeaderShare({
    type: baseInfo?.shareType,
    title: '伊利勋章',
    content: '多重福利等你来',
  });
});
