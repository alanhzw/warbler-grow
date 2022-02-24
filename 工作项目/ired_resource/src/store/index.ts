import { createStore } from 'vuex';
import userStore from './user';

const store = createStore({
  state: {
    token: sessionStorage.getItem('IRED_TOKEN'),
  },
  mutations: {
    setToken(state, token) {
      sessionStorage.setItem('IRED_TOKEN', token);
      state.token = token;
    },
    removeToken(state) {
      sessionStorage.removeItem('IRED_TOKEN');
      state.token = '';
    },
  },
  modules: {
    user: userStore,
  },
});

export default store;
