import '@/style/reset.scss';
import { createApp } from 'vue';
import { initRem } from '@/utils/client';
import { init } from '@/utils';
import root from './App.vue';

initRem(750);

// 设置页面title
// document.title = '邀新有礼';

const app = createApp(root);

// 初始化页面,
init({
  platform: 'jd',
  sysCode: 'cjwx',
  activityType: '40',
  checkOpenCard: false,
  urlPattern: '/m/common/nestle/invite/?venderId=:venderId&activityId=:activityId&helpUuid=:helpUuid',
}).then(({ baseInfo, isOpenCard, pathParams }) => {
  app.provide('isOpenCard', isOpenCard);
  app.provide('baseInfo', baseInfo);
  app.provide('helpUuid', pathParams.helpUuid);
  app.mount('#app');
});
