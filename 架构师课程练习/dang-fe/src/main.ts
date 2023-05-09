import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { ImgUtil } from '@/utils/imgUtil';
import 'modern-normalize';
//缓存图片
ImgUtil.storageImgList();

const app = createApp(App);

app.mount('#app');
