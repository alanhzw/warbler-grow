/* eslint-disable new-cap */
/*
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2020-12-19 16:28:17
 * @LastEditTime: 2020-12-19 17:32:15
 * @FilePath: \SNActivity\src\store\modules\pointGuess\index.js
 */
import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
// eslint-disable-next-line one-var
const pointGuess = {
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions,
};
export default pointGuess;
