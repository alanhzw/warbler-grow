// import axios from 'axios';
import Qs from 'qs';
import { Toast } from 'vant';
import JD from '@/utils/jd';
import CONST from '@/utils/constant';
import store from '../store';
import pointApis from './request/points_apis';

const CONFIG = {
  baseURL: process.env.VUE_APP_BASEURL,
  timeout: 10 * 60 * 1000, // Timeout
};

const loginXhr = axios.create({
  ...CONFIG,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

function XhrError(message = '网络故障，请求失败', code = -999) {
  this.message = message;
  this.code = code;
}

//  login接口
const login = async () => {
  const { data } = await loginXhr.post('/login', Qs.stringify(await JD.getToken()));
  if (data.success) {
    sessionStorage.setItem(CONST.LZ_CRM_CUSTOMER_TOKEN, data.data.token);
    sessionStorage.setItem(CONST.LZ_CRM_CUSTOMER_USER, JSON.stringify(data.data));
  } else {
    throw new XhrError(data.resp_msg, data.resp_code);
  }
};

/**
 * 检查token是否存在
 */
const checkToken = async () => {
  const token = sessionStorage.getItem(CONST.LZ_CRM_CUSTOMER_TOKEN);
  // eslint-disable-next-line no-return-await
  return (typeof token === 'string' && token !== '') || await login();
};
// checkToken().catch((e) => Toast(e.message));

const xhr = axios.create(CONFIG);
// 请求拦截 如果是登录接口
xhr.interceptors.request.use((request) => {
  request.headers['x-token-header'] = sessionStorage.getItem(CONST.LZ_CRM_CUSTOMER_TOKEN);
  request.headers['Content-Type'] = 'application/json';
  return request;
});
// 返回拦截
xhr.interceptors.response.use(({
  data: {
    data, resp_code, resp_msg, success,
  }, ...response
}) => {
  const message = resp_msg;
  if (resp_code === 0 && success) {
    // 存储groupId  shopId
    if (data && data.groupId) {
      sessionStorage.setItem('LZ_CRM_CUSTOMER_GroupId', data.groupId);
    }
    if (data && data.shopId) {
      sessionStorage.setItem('LZ_CRM_CUSTOMER_ShopId', data.shopId);
    }
    return {
      data,
      ...response,
    };
  }
  return Promise.reject(new XhrError(resp_msg, resp_code));
});

// api处理
const PointsService = {};

Object.keys(pointApis).forEach((fun) => {
  const api = pointApis[fun];
  PointsService[fun] = async (data, options = {}) => {
    const info = Qs.parse(window.location.href.split('?')[1] || '');
    data = {
      ...data,
      shopId: sessionStorage.getItem('LZ_CRM_CUSTOMER_ShopId') || info.shopId || data.shopId || null,
      groupId: sessionStorage.getItem('LZ_CRM_CUSTOMER_GroupId') || info.groupId || data.groupId || null,
    };
    const opt = {
      needLoading: true,
      toastError: true,
      needVisable: true,
      ...options,
    };
    const config = {
      ...api,
      [api.method === 'post' ? 'data' : 'params']: data,
    };
    try {
      if (opt.needVisable) {
        store.commit('setShowDetail', false);
      }
      store.commit('setLoading', opt.needLoading);
      await checkToken();
      const result = await xhr.request(config);
      store.commit('setShowDetail', true);
      if (result) {
        Window.MD_LOADING = false;
      }
      return result;
    } catch (e) {
      if (e.code === 2000 || (e.response && e.response.data.resp_code === 2000)) {
        sessionStorage.removeItem(CONST.LZ_CRM_CUSTOMER_TOKEN);
        sessionStorage.removeItem(CONST.LZ_CRM_CUSTOMER_USER);
        try {
          await login();
          const result = await xhr.request(config);
          Window.MD_LOADING = false;
          return result;
        } catch (err) {
          if (opt.toastError) {
            const message = e.message ? e.message : e.response.data.resp_msg;
            Toast(message);
          }
          throw err;
        } finally {
          if (opt.needLoading) store.commit('setLoading', false);
        }
      } else {
        if (opt.toastError) {
          const message = e.message ? e.message : (e.response ? e.response.data.resp_msg : '系统错误');
          Toast(message);
        }
        throw e;
      }
    } finally {
      if (opt.needLoading) store.commit('setLoading', false);
    }
  };
});

export default PointsService;
export {
  PointsService,
};
