import Axios from 'axios';
import Qs from 'qs';
import constant from '@/utils/constant';

export const cjwxRequest = Axios.create({
  baseURL: process.env.VUE_APP_CJWX_API_SERVICE,
  timeout: 60 * 1000, // Timeout
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

cjwxRequest.interceptors.request.use((config) => {
  const data = config.data || {};
  const pin = window.sessionStorage.getItem(constant.LZ_JD_USER_PIN);
  if (config.headers['Content-Type'] === 'multipart/form-data') {
    data.append('pin', pin);
  } else {
    data.pin = pin;
    config.data = Qs.stringify(data);
  }
  return config;
});

cjwxRequest.interceptors.response.use((response) => response.data || {});

export default {
  cjwxRequest,
};
