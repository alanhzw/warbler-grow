// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)
import { PointsService } from '@/http';

export default new Vuex.Store({
  state: {
    loading: false,
    msg: ['请填写收货地址', '权益已兑完', '权益兑换成功', '权益领取成功'],
    prizeIndex: 0,
    addressToProduct: {},
    showDetail: false,
    styleOptions: {},
  },
  mutations: {
    setLoading(state, value) {
      state.loading = value;
    },
    setAddressToProduct(state, value) {
      state.addressToProduct = value;
    },
    setPrizeIndex(state, value) {
      state.prizeIndex = value;
    },
    setShowDetail(state, value) {
      state.showDetail = value;
    },
    changeStyleOptions(state, styleOptions) {
      state.styleOptions = styleOptions;
    },
  },
  actions: {
    async asyncChangeStyleOptions({ commit }, activityId) {
      const { data } = await PointsService.getCActivityBaseStyle({
        activityId,
      });
      const styleOptions = JSON.parse(data.configJson);
      commit('changeStyleOptions', styleOptions);
    },
  },
  modules: {},
});
