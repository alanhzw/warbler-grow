/**
 * @Description:caoshijie
 * @Date: 2021/12/9
 * @Description:  洋河 新客福利站
 * @FilePath:src\pages\1000015502\99\2112100001550201\index.ts
*/
import { createApp } from 'vue';
import { initRem } from '@/utils/client';
import '@/style/reset.scss';
import { init } from '@/utils';
import root from './App.vue';

const app = createApp(root);

initRem(750);

// 设置页面title
document.title = '新客福利站';

// 初始化页面,
init({
  platform: 'jd',
  sysCode: 'cjwx',
  urlPattern: '/m/:venderId/:activityType/:activityId',
}).then(({ baseInfo, isOpenCard }) => {
  app.provide('baseInfo', baseInfo);
  app.provide('isOpenCard', isOpenCard);
  app.mount('#app');
});
