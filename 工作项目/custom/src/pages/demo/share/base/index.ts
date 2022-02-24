import { createApp } from 'vue';
import root from './App.vue';

document.title = '测试';

const app = createApp(root);

console.log('准备挂载页面');
app.mount('#app');
