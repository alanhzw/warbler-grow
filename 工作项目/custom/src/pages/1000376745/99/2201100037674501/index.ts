/**
 * @Description:caoshijie
 * @Date: 2021/12/30
 * @Description: 雅诗兰黛复购礼
 * @FilePath:src\pages\1000376745\99\2201100037674501\index.ts
*/

import '@/style/reset.scss';
import { createApp, inject } from 'vue';
import { cjwxRequest } from '@/utils/service';
import JD from '@/utils/platforms';
import { initRem } from '@/utils/client';
import { init } from '@/utils';
import root from './App.vue';

initRem(750);

document.title = '雅诗兰黛会员复购礼';

const app = createApp(root);
// 初始化页面,
init({
  platform: 'jd',
  sysCode: 'cjwx',
  urlPattern: '/m/:venderId/:activityType/:activityId',
  openCardLink: `https://shopmember.m.jd.com/shopcard/?venderId=1000376745&channel=7015&returnUrl=${encodeURIComponent(`https://${window.location.host}/m/1000376745/99/2111100037674501/`)}`,
})
  .then(({
    baseInfo,
    isOpenCard,
  }) => {
    app.provide('isOpenCard', isOpenCard);
    app.provide('baseInfo', baseInfo);
    app.directive('insertCrm', {
      mounted(el, binding, vnode, ...arg) {
        el.addEventListener('click', () => {
          cjwxRequest.post('/crm/pageVisit/insertCrmPageVisit', {
            venderId: (baseInfo as any).venderId,
            elementId: binding.value,
            pageId: (baseInfo as any).activityId,
          });
        });
      },
    });
    app.mount('#app');
    JD.setHeaderShare({
      type: baseInfo?.shareType,
      title: '雅诗兰黛复购赢好礼',
      content: '会员复购正装，享明星试用礼',
      shareUrl: `https://${window.location.host}/m/1000376745/99/2111100037674501`,
    });
  });
