import CONST from '@/utils/constant';

import activityApis from './activity.apis';
import userApis from './user.apis';
import Axios from 'axios';
import Qs from 'qs';
import JD from '@/mobile/utils/jd';

console.log('process.env', process.env);
console.log('process.env.VUE_APP_BASEURL', process.env.VUE_APP_BASEURL);

const axios = Axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
  timeout: 1 * 60 * 1000, // Timeout
});

// request拦截器，主要用来解析数据
axios.interceptors.request.use(
  (config) => {
    config.headers['x-token-header'] = sessionStorage.getItem(CONST.LZ_CRM_CUSTOMER_TOKEN);
    return config;
  },
  error => Promise.reject(error),
);

// response拦截器，主要用来解析数据
axios.interceptors.response.use(
  ({ data }) => {
    // 根据服务端返回的resp_code走进不同的请求处理分支
    const {
      resp_code, resp_msg, success, ...payload
    } = data;
    if (resp_code === 0) {
      // 请求成功，执行正常逻辑
      return payload;
    }
    // 服务端返回异常，走入异常逻辑
    return Promise.reject({
      code: resp_code,
      message: resp_msg,
    });
  },
  // 接口错误状态处理，也就是说无响应时的处理
  (error) => {
    // 请求异常处理
    if (error && error.response && error.response.data) {
      // 接收到返回数据
      const err = error.response.data;
      if (err.resp_code === 2000 && err.resp_msg === 'invalid_token') {
        // TODO: 退到登录页面
      } else {
        return Promise.reject({
          ...error.response.data,
          message: error.response.data.resp_msg,
        });
      }
    } else {
      // 网络请求失败走入异常逻辑
      return Promise.reject(error);
    }
  },
);

const loginAxios = Axios.create({
  // 开发环境请求域名使用ip， 打包环境使用和页面域名一致
  baseURL: process.env.VUE_APP_BASEURL, // process.env.NODE_ENV === 'development' ? '//116.196.106.97:30004/c' : '/api/c',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded', // 登录使用的数据格式不是json需要单独处理
  },
});

/**
 * 获取用户token
 */
export const getToken = async () => {
  // 获取京东侧的登录信息，用来登录crm
  const params = await JD.getToken();
  const { data } = await loginAxios.post('/login', Qs.stringify(params));
  // 将token写入sessionStorage
  sessionStorage.setItem(CONST.LZ_CRM_CUSTOMER_TOKEN, data.data.token);
  localStorage.setItem(CONST.LZ_CRM_CUSTOMER_TOKEN, data.data.token);
};

/**
 * 确保token存在，只保证存在不保证有效
 */
const ensureToken = async () => {
  const token = sessionStorage.getItem(CONST.LZ_CRM_CUSTOMER_TOKEN);
  if (!token) {
    // token不存在，获取token在进入页面
    await getToken();
  }
};

/**
 * service 工厂
 * @param {Object} apis 接口集
 */
const factory = (apis, request = axios) => {
  const service = {};
  for (const api in apis) {
    service[api] = async (data = {}) => {
      // 获取请求的相关设置，默认是post请求，路径中无参数，非下载方法
      const {
        url, method = 'POST', headers = {},
      } = apis[
        api
      ];
      // 请求使用的url
      let requestUrl = url;
      // 如果请求中有pathParams则进行替换
      if (typeof data !== 'string') {
        for (const key of Object.keys(data)) {
          requestUrl = requestUrl.replace(`{${key}}`, data[key]);
        }
      }
      // 组织请求参数
      const req = {
        url: requestUrl,
        method: method.toUpperCase(),
        headers,
      };
      if (req.method === 'GET') {
        req.params = data;
      } else if (req.method === 'POST') {
        req.data = data;
      }
      await ensureToken();
      return await request(req);
    };
  }
  return service;
};

// 独立导出
export const ActivityService = factory(activityApis);
export const UserService = factory(userApis);

// 整体导出
export default ActivityService;
