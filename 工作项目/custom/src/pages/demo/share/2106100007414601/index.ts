import { createApp } from 'vue';
import { initRem } from '@/utils/client';
import utils from '@/utils';
import root from './App.vue';

document.title = '测试活动。。。';

initRem(750);

const app = createApp(root);

utils
  .init({ urlPattern: '/m/demo/99/:activityId' })
  .then(async ({ baseInfo }) => {
    app.provide('baseInfo', baseInfo);
    app.mount('#app');
  });
