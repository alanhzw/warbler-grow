/*
 * @Description:
 * @Date: 2021-03-29 18:50:51
 * @LastEditTime: 2021-04-09 18:50:52
 * @FilePath: \my-zhihu\src\main.ts
 */
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
