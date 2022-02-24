/**
 * @Description:caoshijie
 * @Date: 2021/11/9
 * @Description:【swisse】会员下单送E卡-跨境
 * @FilePath:src\pages\1000074146\99\2111100007414601\index.ts
*/
import '@/style/reset.scss';
import { createApp } from 'vue';
import { Popup } from 'vant';
import { initRem } from '@/utils/client';
import { init } from '@/utils';
import root from './App.vue';

initRem(750);

// 设置页面title
document.title = '斯维诗海外下单送E卡';

const app = createApp(root);
app.use(Popup);

// 初始化页面,
init({
  platform: 'jd',
  sysCode: 'cjwx',
  urlPattern: '/m/:venderId/:activityType/:activityId',
  openCardLink: `https://shopmember.m.jd.com/shopcard?venderId=100000000000198&shopId=1000002672&venderType=1&channel=7039&returnUrl=${window.location.href}`,
}).then(({ baseInfo, isOpenCard }) => {
  app.provide('isOpenCard', isOpenCard);
  app.provide('baseInfo', baseInfo);
  app.mount('#app');
});
