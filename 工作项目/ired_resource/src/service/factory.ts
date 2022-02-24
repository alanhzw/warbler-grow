/*
 * @Descripttion:
 * @Author: yang chenglin
 * @Date: 2021-11-04 18:28:18
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-07 10:48:47
 */
import Axios, { AxiosInstance } from 'axios';

const request = (api: any, data: any, axios: AxiosInstance) => {
  // 获取请求的相关设置，默认是post请求，路径中无参数，非下载方法
  const { url, method = 'POST', ...config } = api;
  // 请求使用的url
  let requestUrl = url;

  // 如果请求中有pathParams则进行替换
  if (data && typeof data !== 'string') {
    Object.keys(data).forEach((key) => {
      requestUrl = requestUrl.replace(`{${key}}`, data[key]);
    });
  }
  // 组织请求参数
  const req = {
    ...config,
    url: requestUrl,
    method: method.toUpperCase(),
    params: null,
    data: null,
  };
  if (req.method === 'GET' || req.method === 'DELETE') {
    req.params = data;
  } else if (req.method === 'POST') {
    req.data = data;
  }
  return axios(req);
};

type Service<T> = {
  [apiName in keyof T]: (data?: any) => Promise<any>
}

const factory = <T>(apis: T, axios = Axios.create()): Service<T> => {
  const service: any = {};

  Object.entries(apis).forEach(([fnName, config]) => {
    service[fnName as keyof T] = (data = {}) => request(config, data, axios);
  });
  return service;
};

export default factory;
