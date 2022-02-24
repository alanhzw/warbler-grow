import '@/style/reset.scss';
import { createApp } from 'vue';
import { Toast } from 'vant';
import { initRem } from '@/utils/client';
import { init } from '@/utils';
import { cjwxRequest } from '@/utils/service';
import root from './App.vue';

initRem(750);

// 设置页面title
document.title = '雀巢母婴';

const app = createApp(root);

// 初始化页面,
init({
  platform: 'jd',
  sysCode: 'cjwx',
  activityType: '99',
  checkOpenCard: false,
  urlPattern: '/m/common/nestle/customMade/?venderId=:venderId&activityId=:activityId',
}).then(({ baseInfo, isOpenCard }) => {
  app.provide('isOpenCard', isOpenCard);
  app.provide('baseInfo', baseInfo);
  cjwxRequest.post('/nestle/customized/getUserStatus', {
    venderId: baseInfo?.venderId,
    activityId: baseInfo?.activityId,
    pin: baseInfo?.pin,
  }).then((data) => {
    if (data.result) {
      if (data.data) {
        window.location.href = 'https://hlc.m.jd.com/JDH_FamilyDoctor/';
      } else {
        app.mount('#app');
      }
    } else {
      Toast(data.errorMessage);
    }
  });
});
