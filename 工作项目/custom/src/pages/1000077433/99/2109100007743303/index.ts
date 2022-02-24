import '@/style/reset.scss';
import { createApp } from 'vue';
import { Popup } from 'vant';
import { initRem } from '@/utils/client';
import { init } from '@/utils';
import JD from '@/utils/platforms';
import root from './App.vue';

initRem(750);

// 设置页面title
document.title = '会员神券';

const app = createApp(root);
app.use(Popup);

// 初始化页面,
init({
  platform: 'jd',
  sysCode: 'cjwx',
  urlPattern: '/m/:venderId/:activityType/:activityId',
  mockPin: {
    pin: 'lr8PqT+bO2uP/yIMyEy4kvkaL5GGqMTUc8u/otw2E+a7Ak3lgFoFQlZmf45w8Jzw',
    nickname: 'genblade',
  },
}).then(({ baseInfo, isOpenCard }) => {
  app.provide('isOpenCard', isOpenCard);
  app.provide('baseInfo', baseInfo);
  app.mount('#app');
  JD.setHeaderShare({
    type: baseInfo?.shareType,
    title: 'GNC会员券免费抢！',
    content: '0元入会，抢大额优惠券',
    imageUrl: 'https://img20.360buyimg.com/imgzone/jfs/t1/89325/15/19125/16803/61543154Ee8a03ca9/b22cb0d388ca5594.jpg?1632910231505',
  });
});
