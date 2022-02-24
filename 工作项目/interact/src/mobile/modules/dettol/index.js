/*
 * @Description:
 * @Date: 2021-03-03 16:40:34
 * @LastEditTime: 2021-09-16 10:06:28
 * @FilePath: \interact\src\mobile\modules\dettol\index.js
 */
import Vue from 'vue';

Vue.component('DettolButtons', () => import('./Buttons.vue'));
Vue.component('DettolRule', () => import('./Rule.vue'));
Vue.component('DettolMyDrawPrizes', () => import('./MyDrawPrizes.vue'));
Vue.component('DettolMyQuoTaPrizes', () => import('./MyQuoTaPrizes.vue'));
Vue.component('DettolEnroll', () => import('./Enroll.vue'));
Vue.component('DettolWinners', () => import('./Winners.vue'));
Vue.component('DettolDraw', () => import('./Draw.vue'));
Vue.component('DettolCountDown', () => import('./Countdown.vue'));
Vue.component('DettolSwiper', () => import('./Swiper.vue'));
Vue.component('DettolRuleQuotaPrize', () => import('./RuleQuotaPrize.vue'));
Vue.component('DettolWinnersQuotaPrize', () => import('./WinnersQuotaPrize.vue'));
Vue.component('DettolRuleAndPrize', () => import('./RuleAndPrize.vue'));
Vue.component('DettolMyOrders', () => import('./MyOrders.vue'));

