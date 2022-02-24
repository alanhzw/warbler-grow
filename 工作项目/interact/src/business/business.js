
import Vue from 'vue';
import { setLibraryName, getMountNode, registerAppEnter, registerAppLeave } from '@ice/stark-app';
import LzComponents from '@/components';
import './lib/element';
import './lib/vant';
// import templates from 'lz-crm-vue-template';
import templates from '@/tpls';
import 'lz-crm-vue-template/lib/index.css';
import '@/mobile/modules';
import App from './BizApp.vue';
import router from './router';

Vue.use(templates);
Vue.use(LzComponents);

// 注意：`setLibraryName` 的入参需要与 webpack 工程配置的 output.library 保持一致
// 警告：这行代码必须设置，否则在主系统中引用，会导致F5刷新页面的时候，丢失路由
setLibraryName('crm-jd-interact');

sessionStorage.setItem('LZ_CRM_CLIENT_TYPE', 1);

// 处理一下html的font-size，所有c端使用的是rem作为长度单位，为了在B端可以正常显示这里设置一下
// eslint-disable-next-line func-names
(function (doc, win) {
  const docEl = doc.documentElement;
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  // eslint-disable-next-line func-names
  const recalc = function () {
    // 设置html的字体，便于使用rem
    docEl.style.fontSize = `${100 * (375 / 750)}px`;
    // 重制body的字号为16px，避免html的字号对B端页面的影响
  };
  recalc();
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
}(document, window));

// 获取挂载的节点
const mountNode = getMountNode(document.getElementById('app'));
console.log('🚀🚀~ 123123:', process.env.NODE_ENV);

const vue = new Vue({
  router,
  mounted: () => {
  },
  destroyed: () => {
  },
  render: h => h(App),
}).$mount();

// 清理一下原先的跟节点的内容
mountNode.innerHTML = '';

// 重新绘制页面的内容
mountNode.appendChild(vue.$el);

Vue.directive('lz-click', {});
Vue.directive('lz-floor', {});

// trigger unmount manually
registerAppLeave(() => {
  vue.$destroy();
});

// trigger unmount manually
registerAppEnter(() => {
});
