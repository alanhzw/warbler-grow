/*
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2020-12-03 14:09:48
 * @LastEditTime: 2020-12-31 16:43:50
 * @FilePath: \SNActivity\src\store\index.js
 */
import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import pointPK from './modules/pointPK/index';
import pointGuess from './modules/pointGuess/index';
import pointsExchange from './modules/pointsExchange/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    pointPK,
    pointGuess,
    pointsExchange,
  },
});
