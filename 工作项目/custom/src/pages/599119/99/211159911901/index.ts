/**
 * @Description:caoshijie
 * @Date: 2021/11/17
 * @Description: 京东科技 一键领取优惠券
 * @FilePath:src\pages\599119\99\211159911901\index.ts
*/
import '@/style/reset.scss';
import { createApp } from 'vue';
import { Popup } from 'vant';
import { initRem } from '@/utils/client';
import { init } from '@/utils';
import root from './App.vue';

initRem(750);

// 设置页面title
document.title = '京东科技 一键领取优惠券';

const app = createApp(root);
app.use(Popup);
app.mount('#app');
