/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2022-05-08 16:32:35
 * @LastEditTime: 2023-03-07 13:47:18
 * @FilePath: \lego-fe\src\main.ts
 */
import { createApp } from 'vue';
import App from './App.vue';
import ColorPicker from '@/components/ColorPicker.vue';

// 引入 Antd 组件库
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

// 引入 vue-router
import router from './routes/index';

//引入 vuex
import vuex from './store/index';

import LegoComponents from 'lego-Component';

const app = createApp(App);
app.component('ColorPicker', ColorPicker);
app.use(Antd);
app.use(router);

app.use(LegoComponents);

app.use(vuex);
app.mount('#app');
