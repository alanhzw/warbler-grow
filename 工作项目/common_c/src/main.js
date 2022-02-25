// import Vue from 'vue';
import LzEvent from 'lz-event-tracking/lib/vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/css/common.css';
// import LocalScrollFix from './assets/js/LocalScrollFix.js'
import 'vant/lib/index.css';
import core from './assets/js/core';
// 执行部分初始化的工作
import '@/utils/jd';
import Moment from 'moment';
import axios from 'axios';
import { MD_Mixin } from './assets/js/mixin';

import {
  AddressEdit,
  AddressList,
  Area,
  Button,
  Cascader,
  Cell,
  CountDown,
  DatetimePicker,
  Dialog,
  Field,
  Form,
  Icon,
  Calendar,
  Lazyload,
  List,
  Loading,
  Overlay,
  Picker,
  Popup,
  PullRefresh,
  Radio,
  RadioGroup,
  Sticky,
  Swipe,
  SwipeItem,
  SwitchCell,
  Tab,
  Tabs,
  Toast,
} from 'vant';
import Vue from 'vue';

Vue.use(LzEvent, {
  // env: process.env.NODE_ENV === 'production' ? 'prod' : 'test',
  env: 'prod',
  platform: 'JD', // JD、SUNING、…………
  sys: 'crm', // 系统来源，例如：crm-云鹿 market - 营销子系统， decoration - 装修子系统，不可以为空
  appName: 'crm', // 应用名称：crm - 云鹿， cjwx - 超级无线，不可以为空
  scrollOnBody: true, // 页面body元素是否可以滚动，可以为空
  axios, // axios，不可以为空
  requestType: 1, // 请求使用的类库 1 - axios，可以为空
});

// LocalScrollFix('.allPage')

Vue.prototype.$core = core;
Vue.prototype.$moment = Moment;

Vue.use(Lazyload);
Vue.use(Cascader);

Vue.use(Button);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Icon);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(Field);
Vue.use(Calendar);
Vue.use(Area);
Vue.use(AddressEdit);
Vue.use(AddressList);
Vue.use(Popup);
Vue.use(Toast);
Vue.use(CountDown);
Vue.use(Sticky);
Vue.use(List);
Vue.use(Cell);
Vue.use(DatetimePicker);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(SwitchCell);
Vue.use(Picker);
Vue.use(Picker);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(PullRefresh);
Vue.use(Loading);
Vue.use(Overlay);

Window.firstTime = 1;
Vue.mixin(MD_Mixin);

Vue.config.productionTip = false;

const vm = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
