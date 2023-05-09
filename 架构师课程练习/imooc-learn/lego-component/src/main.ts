/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2022-06-10 15:21:30
 * @LastEditTime: 2022-06-10 17:35:25
 * @FilePath: \lego-component\src\main.ts
 */
import { createApp } from 'vue';
import App from './App.vue';
import testPlugin from './test.plugin';

const app = createApp(App);
app.use(testPlugin);
app.mount('#app');

export default App;
