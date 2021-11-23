import Axios from 'axios';

import leaderApis from './leader.apis';
import monitorApis from './monitor.apis';
import memberApis from './member.apis';
import companyApis from './company.apis';

import { Toast } from 'vant';
import store from '../store';


// 请求之前，可以修改请求对象
const onBeforeRequest = (config) => {
  // config.headers['token'] = 'ozMOsHbklbvsBUg1uhQhpINJNvHQ1fXRm5l1E2vikJ_bQ7J2MYj8AMB2DifNQRUCVH18XLI1iRRok4ZNnivXKEHTw0hzevwF48Ds1eeFO0DTkTqj3__EQKFKrdHgmxb2vEcxmiYLZDEHS0pkdOkXCxBCbtJpHLGO19_tdNSoiRJHqcPC5JvOSD7mG8VupJAs';
  return config;
}

// 请求出错
const onRequestError = (error) => {
  return Promise.reject(error);
}

// 请求成功
const onResponseSuccess = ({ data, ...response }) => {
  // 根据服务端返回的resp_code走进不同的请求处理分支
  const { code, message, success, result } = data;

  if (code === 200) {
    // 请求成功，执行正常逻辑
    return result;
  } else {
    // 服务端返回异常，走入异常逻辑
    return Promise.reject(new Error(message));
  }
}

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
}
// export const baseURL = 'http://82.156.47.75:9091/';
// console.log('import.meta.env:', import.meta.env)
export const baseURL = import.meta.env.VITE_APP_BASEURL;
export const imgPath = `${baseURL}mobile/api/common/static/`;
export const authUrl = import.meta.env.VITE_APP_AUTHURL;
export const sysCode = import.meta.env.VITE_SYS_CODE;

const commonAxios = Axios.create({
  baseURL,
  headers: {}
})

commonAxios.interceptors.request.use(onBeforeRequest, onRequestError)
commonAxios.interceptors.response.use(onResponseSuccess, onResponseError)

const httpRequestMethod = async (methodConfig, data, request) => {
  // 获取请求的相关设置，默认是post请求，路径中无参数，非下载方法
  const { url, method = 'POST', headers = {} } = methodConfig
  // 请求使用的url
  let requestUrl = url;
  // 如果请求中有pathParams则进行替换
  if (data && typeof data !== 'string') {
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
      token: store.state.user.token,
      ...headers
    },
  };
  if (req.method === 'GET') {
    req.params = data;
  } else if (req.method === 'POST') {
    req.data = data;
  }

  Toast.loading({
    duration: 0, // 持续展示 toast
    message: '加载中...',
    forbidClick: true,
  });
  try {
    const resp = await request(req);
    Toast.clear();
    return resp;
  } catch (e) {
    Toast.fail({
      message: '请求失败'
    })
    throw e;
  } finally {
  }
}
const factory = (apis, request = commonAxios) => {
  const service = {};
  // 遍历模块的api列表，为每个api在模块的service中添加一个执行方法
  Object.keys(apis).forEach((name) => {
    const methodConfig = apis[name];
    service[name] = (data = {}) => httpRequestMethod(methodConfig, data, request);
  });
  return service;
}

export const LeaderService = factory(leaderApis);
export const MonitorService = factory(monitorApis);
export const MemberService = factory(memberApis);
export const CompanyService = factory(companyApis);

export const getService = () => {
  // 总公司	F0
  // 分公司	F1
  // 车间厂队长	F2
  // 作业长	1
  // 班组长	2
  // 组员	3
  const serviceType = store.state.user.info.userType == 2 || store.state.user.info.userType == 3 || store.state.user.info.userType == 1 ? store.state.user.info.userType : 4
  return [{}, LeaderService, MonitorService, MemberService, CompanyService][serviceType];
}
