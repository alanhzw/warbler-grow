import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import root from './App.vue';
import routes from './routers';

document.title = '测试活动。。。';

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(root);
app.use(router);

console.log('准备挂载页面');
app.mount('#app');
