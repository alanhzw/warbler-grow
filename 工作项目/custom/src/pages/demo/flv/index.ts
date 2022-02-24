/*
 * @Author: YC
 * @Date: 2021-07-30 11:08:50
 * @LastEditors: YC
 * @LastEditTime: 2021-07-30 11:11:23
 * @Description: FLV demo
 */
/*
* @Author: YC
* @Date: 2021-07-11 15:56:23
 * @LastEditors: YC
 * @LastEditTime: 2021-07-20 16:17:40
* @Description: demo page entry
*/

import { createApp } from 'vue';
// 引入根组件
import { initRem } from '@/utils/client';
import root from './App.vue';

// 设置页面title
document.title = 'flv测试活动。。。';

// skii 给定设计稿页面宽度375px
initRem(750);

const app = createApp(root).mount('#app');
