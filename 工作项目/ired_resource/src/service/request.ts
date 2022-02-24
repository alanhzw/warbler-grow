import Axios, { AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';
// import { useRouter } from 'vue-router';

Axios.defaults.baseURL = import.meta.env.VITE_APP_API_BASEURL as string;

// 处理一下返回的数据解析
const responseInterceptor = ({ data }: AxiosResponse) => {
  // 根据服务端返回的resp_code走进不同的请求处理分支
  const {
    code, message, result,
  } = data;

  if (code === 200 || code === 0) {
    // 请求成功，执行正常逻辑
    return result;
  }
  ElMessage.error(message);
  // 服务端返回异常，走入异常逻辑
  return Promise.reject(new Error(message));
};

const onReject = (e): void => {
  if (e.response.data.message === 'Token失效，请重新登录') {
    window.location.href = '/login?returnUrl=';
  } else {
    ElMessage.error('请求失败');
  }
};
export const unauthAxios = Axios.create();
unauthAxios.interceptors.request.use((config) => ({
  ...config,
  headers: {
    'X-Access-Token': sessionStorage.getItem('IRED_TOKEN'),
  },
}));
unauthAxios.interceptors.response.use(responseInterceptor, onReject);

export const authAxios = Axios.create();
authAxios.interceptors.request.use((config) => ({
  ...config,
  headers: {
    'X-Access-Token': sessionStorage.getItem('IRED_TOKEN'),
  },
}));
authAxios.interceptors.response.use(responseInterceptor, onReject);
