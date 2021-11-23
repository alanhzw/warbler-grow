/*
 * @Description:
 * @Date: 2021-03-23 19:08:46
 * @LastEditTime: 2021-03-23 19:09:19
 * @FilePath: \vite-project-js\src\utils\request.js
 */
import axios from 'axios';
const baseURL = '';
const service = axios.create({
  baseURL,
  timeout: 5000, // request timeout
});
// 发起请求之前的拦截器
service.interceptors.request.use(
  (config) => {
    // 如果有token 就携带tokon
    const token = window.localStorage.getItem('accessToken');
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
    const res = response.data;

    if (response.status !== 200) {
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default service;
