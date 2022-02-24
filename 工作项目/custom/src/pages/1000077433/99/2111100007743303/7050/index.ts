/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-11-29 16:34:09
 * @LastEditTime: 2021-11-30 09:40:01
 * @FilePath: \custom\src\pages\1000077433\99\11111111111\7050\index.ts
 */
import '@/style/reset.scss';
import { createApp } from 'vue';
import { Popup } from 'vant';
import { initRem } from '@/utils/client';
import { init } from '@/utils';
import JD from '@/utils/platforms';
import root from '../App.vue';

initRem(750);

// 设置页面title
document.title = '新会员专享券包';

const app = createApp(root);
app.use(Popup);

// 初始化页面,
init({
  platform: 'jd',
  sysCode: 'cjwx',
  urlPattern: '/m/:venderId/:activityType/:activityId/:channel',
}).then(({ baseInfo, isOpenCard, pathParams }) => {
  app.provide('isOpenCard', isOpenCard);
  app.provide('pathParams', pathParams);
  app.provide('baseInfo', baseInfo);
  app.mount('#app');
});
