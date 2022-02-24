/*
 * @Author: YC
 * @Date: 2020-12-14 17:20:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-26 11:33:24
 * @Description:
 */
import Vue from 'vue';
import LzEvent from 'lz-event-tracking/lib/vue';
import axios from 'axios';
import {
  CountDown,
  Toast,
  Loading,
  Tab,
  Tabs,
  Overlay,
  Swipe,
  SwipeItem,
  Dialog,
  Popup,
  DatetimePicker,
} from 'vant';
import router from './router';
import store from './store';
import App from './MobileApp.vue';
import service from './service';


const env = window.location.href.indexOf('lzbk-isv.isvjcloud.com') > -1 ? 'prod' : 'test';


Vue.use(LzEvent, {
  env, // test - 测试， prod - 正式
  platform: 'JD', // JD、SUNING、…………
  sys: 'decoration', // 系统来源，例如：crm-云鹿 market - 营销子系统， decoration - 装修子系统，不可以为空
  appName: 'crm', // 应用名称：crm - 云鹿， cjwx - 超级无线，不可以为空
  scrollOnBody: true, // 页面body元素是否可以滚动，可以为空
  axios, // axios，不可以为空
  requestType: 1, // 请求使用的类库 1 - axios，可以为空
});

Vue.use(CountDown);
Vue.use(Dialog);
Vue.use(DatetimePicker);
Vue.use(Toast);
Vue.use(Loading);
Vue.use(Popup);
Vue.use(Overlay);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Tab);
Vue.use(Tabs);

sessionStorage.setItem('LZ_CRM_CLIENT_TYPE', 2);


// 处理一下html的font-size，所有c端使用的是rem作为长度单位，为了在B端可以正常显示这里设置一下
(function(doc, win) {
  const docEl = doc.documentElement;
  const bodyEl = doc.body;
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  const recalc = function() {
    const clientWidth = docEl.clientWidth;
    const clientHeight = docEl.clientHeight;

    if (!clientWidth) return;
    // 设置html的字体，便于使用rem

    if (clientWidth <= clientHeight) { // 竖屏
      docEl.style.fontSize = `${100 * (clientWidth / 750)}px`;
    } else { // 横屏
      docEl.style.fontSize = `${100 * (clientHeight / 750)}px`;
    }
    // 重制body的字号为16px，避免html的字号对B端页面的影响
    bodyEl.style.fontSize = '16px';
  };
  recalc();
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
}(document, window));


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#mobile-app');
