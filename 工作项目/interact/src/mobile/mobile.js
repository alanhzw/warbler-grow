import Vue from 'vue';
import App from './MobileApp.vue';
import router from './router';
import store from './store';
import 'vant/lib/index.css';
import LzEvent from 'lz-event-tracking/lib/vue';
import axios from 'axios';

import {
  AddressEdit,
  Area,
  Button,
  Cell,
  CellGroup,
  CountDown,
  Dialog,
  Field,
  Loading,
  Overlay,
  Picker,
  Popup,
  Swipe,
  SwipeItem,
  Toast,
} from 'vant';

// 引入组件
import templates from '@/tpls';

const env = window.location.href.indexOf('lzbk-isv.isvjcloud.com') > -1 ? 'prod' : 'test';

Vue.use(LzEvent, {
  env,
  platform: 'JD', // JD、SUNING、…………
  sys: 'crm', // 系统来源，例如：crm-云鹿 market - 营销子系统， decoration - 装修子系统，不可以为空
  appName: 'crm', // 应用名称：crm - 云鹿， cjwx - 超级无线，不可以为空
  scrollOnBody: true, // 页面body元素是否可以滚动，可以为空
  axios, // axios，不可以为空
  requestType: 1, // 请求使用的类库 1 - axios，可以为空
});
console.log('🚀🚀~ 123123:', process.env.NODE_ENV);
sessionStorage.setItem('LZ_CRM_CLIENT_TYPE', 2);
localStorage.setItem('LZ_CRM_CLIENT_TYPE', 2);
Vue.use(AddressEdit);
Vue.use(Button);
Vue.use(CountDown);
Vue.use(Dialog);
Vue.use(Toast);
Vue.use(Loading);
Vue.use(Overlay);
Vue.use(Popup);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Field);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Picker);
Vue.use(Area);
Vue.config.productionTip = false;

Vue.component('AddressEdit', () => import('./components/AddressEdit.vue'));

// alert('main.js')
console.log('main.js');
Vue.use(templates);
// 处理一下html的font-size，所有c端使用的是rem作为长度单位，为了在B端可以正常显示这里设置一下
// eslint-disable-next-line func-names
(function (doc, win) {
  const docEl = doc.documentElement;
  const bodyEl = doc.body;
  const resizeEvt =
    'orientationchange' in window ? 'orientationchange' : 'resize';
  // eslint-disable-next-line func-names
  const recalc = function () {
    const clientWidth = docEl.clientWidth;
    const clientHeight = docEl.clientHeight;

    if (!clientWidth) {
      return;
    }
    // 设置html的字体，便于使用rem

    if (clientWidth <= clientHeight) {
      // 竖屏
      docEl.style.fontSize = `${100 * (clientWidth / 750)}px`;
    } else {
      // 横屏
      docEl.style.fontSize = `${100 * (clientHeight / 750)}px`;
    }
    // 重制body的字号为16px，避免html的字号对B端页面的影响
    bodyEl.style.fontSize = '16px';
  };
  recalc();
  if (!doc.addEventListener) {
    return;
  }
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
}(document, window));

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#mobile-app');
