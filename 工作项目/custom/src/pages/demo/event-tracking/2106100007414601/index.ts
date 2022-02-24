import { createApp } from 'vue';
import { clickTracking, init } from '@/utils';
import root from './App.vue';

document.title = '测试埋点';

const app = createApp(root);

init({
  platform: 'jd',
  sysCode: 'cjwx',
  urlPattern: '/m/demo/event-tracking/:activityId',
}).then(async ({ baseInfo, pathParams }) => {
  app.provide('baseInfo', baseInfo);
  app.use(clickTracking);
  app.mount('#app');
});
