/*
 * @Description:个人中心组件注册
 * @Autor: hanzhiwei
 * @Date: 2021-01-07 13:39:15
 * @LastEditTime: 2021-01-07 18:45:30
 * @FilePath: \SNActivity\src\components\personalCenter\index.js
 */
import Vue from 'vue';

Vue.component('ActivityRecords', () => import('./ActivityRecords.vue'));
Vue.component('ExchangeRecords', () => import('./ExchangeRecords.vue'));
Vue.component('GiftRecords', () => import('./GiftRecords.vue'));
Vue.component('MemberRecords', () => import('./MemberRecords.vue'));
Vue.component('Header', () => import('./Header.vue'));
Vue.component('NoData', () => import('./NoData.vue'));
