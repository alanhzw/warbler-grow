/*
 * @Author: 一尾流莺
 * @Description:入口文件
 * @Date: 2021-10-14 14:47:09
 * @LastEditTime: 2021-10-19 15:16:53
 * @FilePath: \elsfk3\src\main.ts
 */
import { createApp } from 'vue';
import App from './App.vue';
import { initGame } from './game';
initGame();
createApp(App).mount('#app');
