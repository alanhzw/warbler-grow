import { createApp } from 'vue';
import { initRem } from '@/utils/client';
import '@/style/reset.scss';
import { init } from '@/utils';
import JD from '@/utils/platforms';
import root from './App.vue';

const app = createApp(root);

initRem(750);

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
    title: '会员专享首购礼，速戳领2件礼',
    imageUrl: 'https://img10.360buyimg.com/imgzone/jfs/t1/214800/14/8540/146457/61c1390aEa86cb722/a2c6dad142998241.jpg',
  });
});
