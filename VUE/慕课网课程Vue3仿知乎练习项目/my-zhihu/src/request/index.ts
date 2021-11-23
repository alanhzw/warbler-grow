/*
 * @Description:
 * @Date: 2021-04-09 15:53:11
 * @LastEditTime: 2021-04-14 15:58:45
 * @FilePath: \my-zhihu\src\request\index.ts
 */
import axios, { AxiosRequestConfig } from 'axios';
import store from '../store/index';
const baseURL = '';
const service = axios.create({
  baseURL,
  timeout: 5000, // request timeout
});
// 发起请求之前的拦截器
service.interceptors.request.use(
  (config) => {
    store.commit('setLoading', true);
    // 如果有token 就携带tokon
    // const token = window.localStorage.getItem('accessToken');
    const token = store.state.token;

    if (token) {
      config.headers.common.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// 响应拦截器
service.interceptors.response.use(
  (response) => {
    setTimeout(() => {
      store.commit('setLoading', false);
    }, 500);
    const res = response.data;
    if (response.status !== 200) {
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res;
    }
  },
  (error) => {
    store.commit('setError', { status: true, message: error });
    store.commit('setLoading', false);
    return Promise.reject(error);
  }
);
export type AxiosRequestConfig = AxiosRequestConfig;

export default service;
