// 实例生成器
// author: 梁照彬
// date: 2021-4-16 18:36:04
import axios from 'axios';
import { isInIcestark } from '@ice/stark-app';
import { event } from '@ice/stark-data';
import CONST from '@/utils/constant';

// 取消请求的控制器
const source = axios.CancelToken.source();

// 没有授权到登录页 from参数 告诉登录组件结束登录之后需要后退回页面
const noAuth = () => {
  source.cancel('您还没有登录或者登录已经过期！');
  // if (location.pathname !== LOGIN_PAGE_URL) {
  //   const from = window.location.pathname + window.location.search;
  //   appHistory.replace(`${LOGIN_PAGE_URL}?from=${encodeURIComponent(from)}`);
  // } else {
  //   console.log('已经在登录页面了，不需要再次跳转了');
  // }
  if (isInIcestark()) {
    const from = window.location.pathname + window.location.search;
    event.emit(CONST.LZ_EVENT_SSO_TOKEN_EXPIRE, encodeURIComponent(from));
    console.log(`sub app decoration emit event ${CONST.LZ_EVENT_SSO_TOKEN_EXPIRE}`);
  } else {
    console.log('登录过期');
    window.location.href = '/login';
  }
};

// 请求之前，可以修改请求对象
const onBeforeRequest = (config) => {
  const token = localStorage.getItem(CONST.LZ_CRM_BIZ_TOKEN);
  if (isInIcestark() && !token) {
    noAuth();
  }
  config.headers['x-token-header'] = token;
  config.headers.Authorization = localStorage.getItem(CONST.LZ_SSO_TOKEN);
  config.headers.Prod = process.env.VUE_APP_SSO_PROD;
  config.cancelToken = source.token;
  return config;
};

// 请求出错
const onRequestError = error => Promise.reject(error);

// 下载excel
const downloadExcel = response =>
  // 下载excel
  ({
    data: {
      file: data,
      suffix: '.xlsx',
    },
    ...response,
  });


// 请求成功
const onResponseSuccess = ({ data, ...response }) => {
  if (response.headers['content-type'].indexOf('excel') > -1) {
    return downloadExcel(response);
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
  return Promise.reject(new Error(resp_msg));
};

// 请求失败
const onResponseError = (error) => {
  // 请求异常处理
  if (error && error.response && error.response.data) {
    if (error.response.status === 500 && error.response.data.message === 'invalid token') {
      noAuth();
      return Promise.reject(new Error('请重新登录'));
    }
    // 接收到返回数据
    const err = error.response.data;
    if (err.resp_code === 2000 && err.resp_msg === 'invalid_token') {
      // TODO: 如果是云鹿子系统用的，退到登录页面
      if (isInIcestark()) {
        noAuth();
      }
    } else {
      return Promise.reject(err);
    }
  } else {
    // 网络请求失败走入异常逻辑
    return Promise.reject(error);
  }
};

// 通用请求实例
const commonAxios = axios.create({
  // baseURL: '/decoration/api/',
  baseURL: process.env.VUE_APP_BASEURL,
});

// 装修请求实例
const decorationAxios = axios.create({
  // baseURL: '/decoration/api/b/',
  baseURL: process.env.VUE_APP_DECO_BASEURL,
});

// 云鹿b端请求实例
const crmbAxios = axios.create({
  // baseURL: 'http://116.196.106.97:30003/b/', // 代理接口'
  baseURL: process.env.VUE_APP_CRM_BASEURL,
  // baseURL: '/b/',
});

// // 通用请求实例
// const commonAxios = axios.create({
//   baseURL: 'https://tmall-test-crmweb.dianpusoft.cn/decoration/api/',
// })

// // 装修请求实例
// const decorationAxios = axios.create({
//   baseURL: 'https://tmall-test-crmweb.dianpusoft.cn/decoration/api/b/',
// })

// // 云鹿b端请求实例
// const crmbAxios = axios.create({
//   baseURL: 'https://tmall-test-crmapi.dianpusoft.cn/b/',
// })

// 实例集合
const instances = [commonAxios, decorationAxios, crmbAxios];

// 给全部示例设置拦截器
instances.forEach((instance) => {
  instance.interceptors.request.use(onBeforeRequest, onRequestError);
  instance.interceptors.response.use(onResponseSuccess, onResponseError);
});

// 导出实例
export { decorationAxios, commonAxios, crmbAxios };

// 导出默认实例
export default decorationAxios;
