/*
 * @Description: axios请求配置文件
 * @Author: hanzhiwei
 * @Date: 2020-10-06 12:24:50
 * @LastEditTime: 2020-12-30 15:56:55
 * @FilePath: \SNActivity\src\axios\index.js
 */
// 引入axios
import axios from 'axios';
import Toast from '@/utils/toast';

// 存放请求根地址
axios.defaults.baseURL = process.env.VUE_APP_BASEURL;
axios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
};
axios.defaults.transformRequest = [
  function (data) {
    let ret = '';
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
    }
    return ret;
  },
];
// axios.interceptors.request.use(
//   //在请求之前做点什么 比如验证pin
//   (config) => {
//     if (!isMiniApp) {
//       store.dispatch("getSunCode");
//     } else if (!store.state.form.pin) {
//       galaxie.user.getUnionId((err, unionld) => {
//         if (unionld) {
//           store.commit("getPin", unionld);
//           //获取活动id
//         } else {
//           console.log(err);
//           Toast("获取pin失败");
//         }
//       }, true);
//     } else if (!store.state.form.isOpencard) {
//       store.dispatch("getShopInfo");
//     } else {
//     }
//   },
//   (err) => {
//     return Promise.reject(err);
//   }
// );

// axios.interceptors.response.use(
//   (data, response) => {
//     // 每次发送请求前都会进入此拦截器处理函数
//     console.log(data, response);
//     if (data.data.success) {
//       return data;
//     } else {
//       // 服务端返回异常，走入异常逻辑
//       return Promise.reject({
//         code: data.status,
//         message: data.data.resp_msg,
//       });
//     }
//   },
//   (error) => {
//     // 请求出错的处理函数
//     if (error.message) {
//       console.log(1231232);
//     }
//   }
// );

export default axios;
