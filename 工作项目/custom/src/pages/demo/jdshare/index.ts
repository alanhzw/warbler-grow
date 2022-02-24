import { createApp } from 'vue';
// 引入根组件
import { initRem } from '@/utils/client';
import root from './App.vue';

// 设置页面title
document.title = '京东分享';

// skii 给定设计稿页面宽度375px
initRem(750);

const app = createApp(root).mount('#app');
