import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosPromise } from 'axios';
import { ElMessage } from 'element-plus';

interface AxiosRequestConfig_ extends AxiosRequestConfig {
  isMock: boolean;
}

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';
type ReqFn = (url: string, isMock: boolean, data?: any) => AxiosPromise<any>;
interface ReqExecute {
  get: ReqFn;
  post: ReqFn;
  put: ReqFn;
  patch: ReqFn;
  delete: ReqFn;
}
class AxiosUtil {
  static axiosUtil: AxiosUtil = new AxiosUtil();
  axiosInstance!: AxiosInstance;
  request!: ReqExecute;
  constructor() {
    this.request = {
      get: (): any => {},
      post: (): any => {},
      put: (): any => {},
      patch: (): any => {},
      delete: (): any => {},
    };
    this.createAxiosInstance();
    this.beforeReqIntercpt();
    this.beforeResponseIntercpt();
    this.reqPrepare();
  }
  createAxiosInstance() {
    this.axiosInstance = axios.create({ timeout: 15000 });
  }

  // 请求拦截
  beforeReqIntercpt() {
    this.axiosInstance.interceptors.request.use((request) => {
      return request;
    });
  }
  // 响应拦截
  beforeResponseIntercpt() {
    this.axiosInstance.interceptors.response.use(
      (response) => {
        const { data, msg, code } = response.data;
        if (code === 200) return response.data;
        else if (code === 500) {
          ElMessage.error(`错误:${msg}`);
        } else {
          ElMessage.error(`未知错误`);
        }
        return response;
      },
      (error) => {
        ElMessage.error(`网络错误`);
      },
    );
  }
  // 发送请求
  sendRequest(options: AxiosRequestConfig_) {
    return this.axiosInstance(options);
  }

  // 应用ts完成请求method类型自动提示
  reqPrepare() {
    const methods: Method[] = ['get', 'post', 'put', 'delete', 'patch'];
    return methods.forEach((method) => {
      this.request[method] = (url, isMock, data) => {
        return this.sendRequest({
          url,
          isMock,
          data,
        });
      };
    });
  }
}

export default AxiosUtil.axiosUtil.request;
