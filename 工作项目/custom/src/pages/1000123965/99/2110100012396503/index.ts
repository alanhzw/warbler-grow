/*
 * @Author: 一尾流莺
 * @Description:【三元奶粉】复购活动满罐有礼
 * @Date: 2021-10-09 14:25:53
 * @LastEditTime: 2021-10-12 11:50:09
 * @FilePath: \custom\src\pages\1000123965\99\2110100012396501\index.ts
 */
import { createApp } from 'vue';
import { initRem } from '@/utils/client';
import { init } from '@/utils';
import JD from '@/utils/platforms';
import App from './App.vue';

// 设置页面title
document.title = '三元奶粉满罐赠好礼';

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
    title: '三元奶粉满罐赠好礼',
    content: '三元奶粉会员福利多，购物满罐即赠好礼',
    imageUrl: 'https://img10.360buyimg.com/imgzone/jfs/t1/208919/36/4977/277043/616505b3E9de5a2d1/9413cb72561b29d9.png',
  });
});
