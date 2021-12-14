/*
 * @Description:积分兑换
 * @Autor: hanzhiwei
 * @Date: 2020-12-31 16:42:25
 * @LastEditTime: 2021-01-06 15:02:01
 * @FilePath: \SNActivity\src\store\modules\pointsExchange\index.js
 */

// eslint-disable-next-line one-var
const pointsExchange = {
  namespaced: true,
  state: {
    selectAddressForm: {
      a: 1,
    }, // 选择的地址详情
  },
  getters: {},
  mutations: {
    changeAddress(state, form) {
      state.selectAddressForm = form;
    },
  },
  actions: {},
};
export default pointsExchange;
