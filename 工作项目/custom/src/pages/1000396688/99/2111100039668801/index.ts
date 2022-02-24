/*
 * @Description:YSL关注店铺送积分
 * @Date: 2021-06-24 10:47:07
 * @LastEditTime: 2021-12-07 15:35:46
 * @FilePath: \custom\src\pages\1000396688\99\2111100039668801\index.ts
 */
import { createApp } from 'vue';
import { initRem } from '@/utils/client';
import { init } from '@/utils';
import JD from '@/utils/platforms';
import App from './App.vue';

// 设置页面title
document.title = '关注店铺送积分';

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
    title: '关注店铺送积分',
    content: '关注店铺送积分',
  });
});
