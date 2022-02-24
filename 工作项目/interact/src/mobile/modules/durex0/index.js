/*
 * @Author: 一尾流莺
 * @Description:杜蕾斯组件
 * @Date: 2021-12-01 09:22:46
 * @LastEditTime: 2021-12-02 14:12:25
 * @FilePath: \interact\src\mobile\modules\durex0\index.js
 */
import Vue from 'vue';

Vue.component('DurexMainPic', () => import('./MainPic.vue'));
Vue.component('DurexRule', () => import('./Rule.vue'));
Vue.component('DurexOrders', () => import('./MyOrders.vue'));
Vue.component('DurexDraw', () => import('./Draw.vue'));
Vue.component('DurexPrizes', () => import('./MyDrawPrizes.vue'));
Vue.component('DurexSwiper', () => import('./Swiper.vue'));
Vue.component('DurexWinners', () => import('./Winners.vue'));
Vue.component('DurexAddressEdit', () => import('./AddressEdit.vue'));

