import '@/style/reset.scss';
import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import { initRem } from '@/utils/client';
import { init } from '@/utils';
import routes from './routers';
import root from './App.vue';

// import 'swiper/dist/css/swiper.min.css';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.scss';

initRem(750);

// 设置页面title
document.title = '优酸乳勋章馆';

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
});
