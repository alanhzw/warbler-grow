import { createApp } from 'vue';
import BigWheel from '@/widgets/BigWheel';
import { initRem } from '@/utils/client';
import root from './App.vue';

// 设置页面title
document.title = 'big wheel';

// skii 给定设计稿页面宽度375px
initRem(750);

const app = createApp(root);
app.use(BigWheel);
app.mount('#app');
