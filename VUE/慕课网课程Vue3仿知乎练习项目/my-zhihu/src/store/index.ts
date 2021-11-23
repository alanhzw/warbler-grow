/*
 * @Description:
 * @Date: 2021-04-02 16:06:00
 * @LastEditTime: 2021-04-14 17:32:23
 * @FilePath: \my-zhihu\src\store\index.ts
 */
import { createStore, Commit } from 'vuex';
import request, { AxiosRequestConfig } from '../request/index';
import { testData, testPosts, ColumnProps, PostProps, UserProps } from '../data/testData';

export interface ListProps<P> {
  [id: string]: P;
}

export interface GlobalDataProps {
  columns: ListProps<ColumnProps>;
  posts: ListProps<PostProps>;
  user: UserProps;
  loading: boolean;
  token: string;
  error: GlobalErrorProps;
}

export interface GlobalErrorProps {
  status: boolean;
  message?: string;
}

const getAndCommit = async (url: string, mutationName: string, commit: Commit, cid?: any) => {
  const { data } = await request({
    url: url,
    method: 'get',
    params: {
      cid: cid,
    },
  });
  commit(mutationName, data);
  return data;
};

const postAndCommit = async (
  url: string,
  mutationName: string,
  commit: Commit,
  cid?: any,
  payload?: any
) => {
  const { data } = await request({
    url: url,
    method: 'post',
    data: payload,
  });
  commit(mutationName, data);
  return data;
};

const store = createStore<GlobalDataProps>({
  state: {
    columns: {},
    posts: {},
    user: {
      isLogin: false,
      name: 'hzw',
      columnId: 1,
    },
    loading: false,
    token: localStorage.getItem('token') || '',
    error: {
      status: false,
    },
  },
  mutations: {
    createPost(state, newPost) {
      // state.posts[]
    },
    fecthColumns(state, rawData) {
      state.columns = rawData;
    },
    fetchColumn(state, rawData) {
      state.columns = rawData;
    },
    fetchPosts(state, rawData) {
      state.posts = rawData;
    },
    setLoading(state, status) {
      state.loading = status;
    },
    login(state, rawData) {
      state.token = rawData.token;
      localStorage.setItem('token', rawData.token);
    },
    logout(state) {
      localStorage.removeItem('token');
      state.token = '';
    },
    fetchCurrentUser(state, rawData) {
      state.user = { isLogin: true, ...rawData };
    },
    setError(state, e: GlobalErrorProps) {
      state.error = e;
    },
  },
  actions: {
    fetchColumns({ commit }) {
      return getAndCommit('/api/columns', 'fecthColumns', commit);
    },
    fetchColumn({ commit }, cid) {
      return getAndCommit('/api/column', 'fetchColumn', commit, cid);
    },
    fetchPosts({ commit }, cid) {
      return getAndCommit('/api/column/posts', 'fetchPosts', commit, cid);
    },
    fetchCurrentUser({ commit }) {
      return getAndCommit('/user/current', 'fetchCurrentUser', commit);
    },
    login({ commit }, payload) {
      return postAndCommit('/user/login', 'login', commit, payload);
    },
    loginAndFetch({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => dispatch('fetchCurrentUser'));
    },
  },
  getters: {
    biggerColumnLen(state) {
      return state.columns.filter((c) => c.id > 1).length;
    },
    getColumnById: (state) => (id: number) => {
      return state.columns.find((c) => c.id === id);
    },
    getPostsByCid: (state) => (cid: number) => {
      return state.posts.filter((post) => post.columnId === cid);
    },
  },
  modules: {},
});
export default store;
