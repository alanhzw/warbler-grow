import { createApp } from 'vue';
// 引入根组件
import { initRem, loadScript } from '@/utils/client';
import { setHeaderShare } from '@/utils';
import root from './App.vue';

// skii 给定设计稿页面宽度375px
initRem(750);

document.title = '京东组织架构结构图';

const app = createApp(root).mount('#app');
