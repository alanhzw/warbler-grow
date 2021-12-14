/* eslint-disable new-cap */
/*
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2020-12-19 16:28:17
 * @LastEditTime: 2020-12-19 17:29:12
 * @FilePath: \SNActivity\src\store\modules\pointPK\index.js
 */
import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
// eslint-disable-next-line one-var
const pointPK = {
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions,
};
export default pointPK;
