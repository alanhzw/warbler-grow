/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-06-16 10:00:55
 * @LastEditTime: 2021-12-01 14:43:02
 * @FilePath: \interact\src\mobile\modules\index.js
 */
import Vue from 'vue';
import './dettol/index';
import './durex0/index';


Vue.component('MainPic', () => import('./MainPic'));
Vue.component('Countdown', () => import('./Countdown'));
Vue.component('Rule', () => import('./Rule'));
Vue.component('Enroll', () => import('./Enroll'));
Vue.component('Winners', () => import('./Winners'));
Vue.component('MyPrizes', () => import('./MyPrizes'));
Vue.component('MyDrawPrizes', () => import('./MyDrawPrizes'));
Vue.component('Draw', () => import('./Draw'));
Vue.component('OrderTip', () => import('./OrderTip'));
Vue.component('MyPrizesManual', () => import('./MyPrizesManual'));
Vue.component('TimeRange', () => import('./TimeRange'));
Vue.component('AmountRankInfo', () => import('./AmountRankInfo'));
Vue.component('DoubleTimeRange', () => import('./DoubleTimeRange'));
Vue.component('TimeRankInfo', () => import('./TimeRankInfo'));
