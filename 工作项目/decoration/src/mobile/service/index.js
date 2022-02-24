import Axios from 'axios';
import apis from './apis';
import CONST from '@/utils/constant';
import JD from '@/mobile/utils/jd';


sessionStorage.getItem(CONST.LZ_JD_CUSTOMER_TOKEN);

const axios = Axios.create({
  baseURL: process.env.VUE_APP_BASEURL, // '/decoration/api',
  // baseURL: 'http://116.196.106.97:30008/decoration/api',
  // baseURL: 'http://127.0.0.1:51002/decoration/api',
  timeout: 1 * 60 * 1000, // Timeout
  headers: {
    Prod: 'crm',
  },
});

// request拦截器，主要用来解析数据
axios.interceptors.request.use((config) => {
  config.headers['x-token-header'] = sessionStorage.getItem(CONST.LZ_DECO_CUSTOMER_TOKEN) || localStorage.getItem(CONST.LZ_CRM_BIZ_TOKEN);
  config.headers.Authorization = localStorage.getItem(CONST.LZ_SSO_TOKEN);
  config.headers.Prod = process.env.VUE_APP_SSO_PROD;
  return config;
}, error => Promise.reject(error));

// response拦截器，主要用来解析数据
axios.interceptors.response.use(
  ({ data, ...response }) => {
    if (response.headers['content-type'].indexOf('excel') > -1) {
    // 下载excel
      return {
        data: {
          file: data,
          suffix: '.xlsx',
        },
        ...response,
      };
    }
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


export const getToken = async () => {
  const params = await JD.getToken();
  const { data } = await axios.post('/c/getUserToken', params);
  sessionStorage.setItem(CONST.LZ_DECO_CUSTOMER_TOKEN, data.token);
};

/**
 * service 工厂
 * @param {Object} apis 接口集
 */
const factory = (apis, request = axios) => {
  const service = {};
  for (const api in apis) {
    service[api] = (data = {}) => new Promise((resolve, reject) => {
      // 获取请求的相关设置，默认是post请求，路径中无参数，非下载方法
      const {
        url, method = 'POST', isDownload = false, headers = {},
      } = apis[api];
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
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          ...headers,
        },
      };
      if (req.method === 'GET') {
        req.params = data;
      } else if (req.method === 'POST') {
        req.data = data;
      }
      request(req).then(resolve).catch(reject);
    });
  }
  return service;
};


// 独立导出
export const PageService = factory(apis);

// 整体导出
export default PageService;

