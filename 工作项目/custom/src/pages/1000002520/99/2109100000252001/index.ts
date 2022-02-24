/*
 * @Description:【惠氏】0元试用
 * @Date: 2021-06-24 10:47:07
 * @LastEditTime: 2021-10-11 16:35:26
 * @FilePath: \custom\src\pages\1000002520\99\2109100000252001\index.ts
 */
import { createApp } from 'vue';
import { initRem } from '@/utils/client';
import { init } from '@/utils';
import JD from '@/utils/platforms';
import App from './App.vue';

// 设置页面title
document.title = '惠氏0元试用';

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
    title: '大牌奶粉新客0元试用，多重福利等你来',
    content: '大牌奶粉新客0元试用，多重福利等你来',
    imageUrl: 'https://img10.360buyimg.com/imgzone/jfs/t1/210129/26/4714/187430/6163ec3bE539a9f29/69985ad74d67c5e6.jpg',
  });
});
