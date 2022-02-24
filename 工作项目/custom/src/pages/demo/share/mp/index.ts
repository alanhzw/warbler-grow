import { createApp } from 'vue';
import { setHeaderShare } from '@/utils';
import root from './App.vue';

document.title = '测试';

const app = createApp(root);

app.mount('#app');

const shareConfig = {
  type: '2',
  title: '自定义标题',
  content: '自定义内容',
  imageUrl: 'https://img10.360buyimg.com/imgzone/jfs/t1/210129/26/4714/187430/6163ec3bE539a9f29/69985ad74d67c5e6.jpg',
};

setHeaderShare(shareConfig);
