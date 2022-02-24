import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    enterLoading: true,
    pageLoading: true,
  },
  mutations: {
    setLoading(state, enable) {
      state.pageLoading = enable;
    },
    setEnterLoading(state, enable) {
      state.enterLoading = enable;
    },
  },
  actions: {
  },
  modules: {
  },
});
