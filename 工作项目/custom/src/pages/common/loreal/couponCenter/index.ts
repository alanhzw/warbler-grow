import '@/style/reset.scss';
import { createApp } from 'vue';
import constant from '@/utils/constant';
import { initRem, parsePathByPattern } from '@/utils/client';
import root from './App.vue';
import { startUp, getPin } from '@/utils/products/cjwx';

initRem(750);

// 设置页面title
document.title = '卡券中心';

const app = createApp(root);

const init = async () => {
  const urlPattern = '/m/common/loreal/couponCenter/?venderId=:venderId';
  const pathParams: { [propName: string]: string; } = parsePathByPattern(urlPattern);
  await startUp();
  const userPin = await getPin(pathParams.venderId);
  // 将用户的pin填入sessionStorage
  window.sessionStorage.setItem(constant.LZ_JD_USER_PIN, userPin.pin);
  // 商家id
  sessionStorage.setItem(constant.LZ_VENDER_ID, pathParams.venderId);
  return {
    ...userPin,
    venderId: pathParams.venderId,
  };
};

init().then((baseInfo) => {
  console.log(baseInfo);

  app.provide('baseInfo', baseInfo);
  app.mount('#app');
});

//
// init().then((baseInfo) => {
//   console.log(baseInfo);
//
//   app.provide('baseInfo', baseInfo);
//   app.mount('#app');
// });

// 初始化页面,
// init({
//   platform: 'jd',
//   sysCode: 'cjwx',
//   activityType: '99',
//   urlPattern: '/m/common/loreal/couponCenter/?venderId=:venderId&activityId=:activityId',
// }).then(({ baseInfo, isOpenCard }) => {
//   app.provide('isOpenCard', isOpenCard);
//   app.provide('baseInfo', baseInfo);
//   app.mount('#app');
// });
