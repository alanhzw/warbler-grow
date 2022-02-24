import '@/style/reset.scss';
import { createApp } from 'vue';
import { init } from '@/utils';

import { initRem } from '@/utils/client';
import JiuGongLottery from '@/widgets/JiuGongLottery';
import root from './App.vue';

initRem(750);

// 设置页面title
document.title = '大转盘demo';

const app = createApp(root);

// 初始化页面,
init({
  platform: 'jd',
  sysCode: 'cjwx',
  urlPattern: '/m/wxDaZhuanPan/:tmpType:/:activityId',
}).then(({ baseInfo, isOpenCard }) => {
  app.use(JiuGongLottery);
  app.mount('#app');
});
