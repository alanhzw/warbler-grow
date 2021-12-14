import { Module } from 'vuex';
import { USER_KEY } from '@/utils/constant';

interface UserInfo {
  avatar: string,
  firstLogin: string,
  realName: string,
  roles: Array<string>,
}

const blankInfo = {
  avatar: '',
  firstLogin: '',
  realName: '',
  roles: [],
};

const getInitInfo = (): UserInfo => {
  try {
    return JSON.parse(sessionStorage.getItem(USER_KEY) ?? '');
  } catch {
    return { ...blankInfo };
  }
};
const initInfo: UserInfo = getInitInfo();
const userStore: Module<UserInfo, any> = {
  namespaced: true,
  state: initInfo,
  mutations: {
    setUser(state, info) {
      sessionStorage.setItem(USER_KEY, JSON.stringify(info));
      Object.assign(state, info);
    },
    clearUser(state) {
      sessionStorage.removeItem(USER_KEY);
      Object.assign(state, blankInfo);
    },
  },

};

export default userStore;
