/*
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2020-12-03 14:09:48
 * @LastEditTime: 2021-01-07 16:10:22
 * @FilePath: \SNActivity\src\main.js
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import {
  CountDown,
  Toast,
  Button,
  Cell,
  Tab,
  Tabs,
  Form,
  Area,
  AddressEdit,
  AddressList,
  Field,
  Swipe,
  Sticky,
  RadioGroup,
  Radio,
  SwipeItem,
  Icon,
  Popup,
  Dialog,
  SwitchCell,
  DatetimePicker,
  List,
} from 'vant';

// 引入全局css
import './assets/css/index.css';

// 引入全局过滤器
import * as filters from './filters/index';
// 挂载全局过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

// 引入axios配置文件
import axios from './axios/index';

// import Vconsole from 'vconsole';
// Vue.prototype.$vConsole = new Vconsole();

// 将axios添加到vue原型链上
Vue.prototype.$axios = axios;

Vue.use(ElementUI);
Vue.use(Area);
Vue.use(Cell);
Vue.use(SwitchCell);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(AddressEdit);
Vue.use(AddressList);
Vue.use(CountDown);
Vue.use(Toast);
Vue.use(Sticky);
Vue.use(Dialog);
Vue.use(Button);
Vue.use(DatetimePicker);
Vue.use(List);
Vue.use(Popup);
Vue.use(Form);
Vue.use(Field);
Vue.use(Swipe);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Icon);
Vue.use(SwipeItem);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
