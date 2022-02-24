/* eslint-disable import/first */
/* eslint-disable import/order */
/* eslint-disable func-names */
/*
 * @Author: YC
 * @Date: 2020-12-11 11:27:10
 * @LastEditors: YC
 * @LastEditTime: 2021-08-09 05:00:17
 * @Description:
 */
import Vue from 'vue';
import {
  getMountNode,
  registerAppLeave,
  setLibraryName,
} from '@ice/stark-app';
import './styles/global.scss';
import LzComponents from '@/components';
import App from './BizApp.vue';
import router from './router';

import imageSelector from '../ctrls/components/ImageSelector.vue';
import imageSelectorTm from '../ctrls/components/ImageSelectorTM.vue';
// 引入@vue/composition-api插件
import VueCompositionAPI from '@vue/composition-api';

// import '@/assets/element/theme/index.css';

// 按需引入Element组件
import {
  Button,
  Form,
  FormItem,
  Input,
  Dialog,
  Pagination,
  Table,
  TableColumn,
  Tabs,
  TabPane,
  Checkbox,
  Upload,
  Popover,
  RadioButton,
  RadioGroup,
  Select,
  Switch,
  Option,
  Tooltip,
  InputNumber,
  DatePicker,
  Dropdown,
  Radio,
  Progress,
  DropdownMenu,
  DropdownItem,
  Tree,
  Loading,
  OperateGroupLayout,
} from 'lz-element-ui';

// 按需引入vant组件
import {
  CountDown,
  Swipe,
  SwipeItem,
  Tab as VanTab,
  Tabs as VanTabs,
  Dialog as VanDialog,
  Popup,
  DatetimePicker,
} from 'vant';

// 陆泽PC端通用样式
import '@/style/lz-web.scss';

Vue.prototype.$ELEMENT = { size: 'medium' };

Vue.use(LzComponents);
Vue.use(VanTab);
Vue.use(VanTabs);
Vue.use(Button);
Vue.use(Form);
Vue.use(VanDialog);
Vue.use(Popup);
Vue.use(DatetimePicker);
Vue.use(Tree);
Vue.use(Loading);

Vue.use(Radio);

Vue.use(RadioButton);
Vue.use(RadioGroup);
Vue.use(InputNumber);
Vue.use(Progress);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Tooltip);
Vue.use(Dialog);
Vue.use(Pagination);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Checkbox);
Vue.use(Upload);
Vue.use(Popover);
Vue.use(Select);
Vue.use(Switch);
Vue.use(Option);
Vue.use(DatePicker);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(OperateGroupLayout);

Vue.use(CountDown);
Vue.use(Swipe);
Vue.use(SwipeItem);
//
// Vue.use(Loading.directive);
// Vue.prototype.$loading = Loading.service;

// 注册使用@vue/composition-api插件
Vue.use(VueCompositionAPI);

sessionStorage.setItem('LZ_CRM_CLIENT_TYPE', 1);

Vue.config.productionTip = false;

// 处理一下html的font-size，所有c端使用的是rem作为长度单位，为了在B端可以正常显示这里设置一下
(function (doc, win) {
  const docEl = doc.documentElement;
  // var bodyEl = doc.body;
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  const recalc = function () {
    // 设置html的字体，便于使用rem
    docEl.style.fontSize = `${100 * (375 / 750)}px`;
    // 重制body的字号为16px，避免html的字号对B端页面的影响
    // bodyEl.style.fontSize = '16px';
  };
  recalc();
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
}(document, window));

const mountNode = getMountNode(document.getElementById('app'));


const isTmall = process.env.VUE_APP_PLATEFORM === 'tmall';


if (isTmall) {
  Vue.component('image-selector', imageSelectorTm);
} else {
  Vue.component('image-selector', imageSelector);
}

const vue = new Vue({
  router,
  mounted: () => {
    // 子应用已加载
  },
  destroyed: () => {
    // 子应用已销毁
  },
  render: h => h(App),
}).$mount();
// for vue don't replace mountNode

mountNode.innerHTML = '';
mountNode.appendChild(vue.$el);

Vue.directive('lz-click', {});
Vue.directive('lz-floor', {});

// 注意：`setLibraryName` 的入参需要与 webpack 工程配置的 output.library 保持一致
// 警告：这行代码必须设置，否则在主系统中引用，会导致F5刷新页面的时候，丢失路由
setLibraryName('subapp-decoration');

// trigger unmount manually
registerAppLeave(() => {
  vue.$destroy();
});
