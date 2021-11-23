/*
 * @Description:
 * @Date: 2021-03-19 17:13:28
 * @LastEditTime: 2021-07-14 11:44:01
 * @FilePath: \vite-project-js\src\main.js
 */
import { createApp } from 'vue';
import user from '../mock/user';
import App from './App.vue';
import store from './store';
import router from './router';
import './utils/rem';
import './styles/index.scss';

import ElementPlus from 'plugins/element';
import Vant from 'plugins/vant';

import EditTodo from './components/todos/EditTodo.vue';

import testA from './lazy/a.vue';
import testB from './lazy/b.vue';
import testC from './lazy/c.vue';
import testD from './lazy/d.vue';
import testE from './lazy/e.vue';
import testF from './lazy/f.vue';
import testG from './lazy/g.vue';
import testH from './lazy/h.vue';
import testI from './lazy/i.vue';
import testJ from './lazy/j.vue';
import testK from './lazy/k.vue';
import testL from './lazy/l.vue';
import testM from './lazy/m.vue';
import testN from './lazy/n.vue';
import testO from './lazy/o.vue';
import testP from './lazy/p.vue';
import testQ from './lazy/q.vue';


createApp(App)
  .use(router)
  .use(store)
  .use(ElementPlus)
  .use(Vant)
  .component('EditTodo', EditTodo)
  .component('testA', testA)
  .component('testB', testB)
  .component('testC', testC)
  .component('testD', testD)
  .component('testE', testE)
  .component('testF', testF)
  .component('testG', testG)
  .component('testH', testH)
  .component('testI', testI)
  .component('testJ', testJ)
  .component('testK', testK)
  .component('testL', testL)
  .component('testM', testM)
  .component('testN', testN)
  .component('testO', testO)
  .component('testP', testP)
  .component('testQ', testQ)
  .mount('#app');
