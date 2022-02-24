/*
 * @Author: YC
 * @Date: 2021-06-21 17:30:02
 * @LastEditors: YC
 * @LastEditTime: 2021-07-12 17:11:29
 * @Description: 地址信息解析
 */

interface PathParams {
  [propName: string]: string;
}

export default {
  install(app: any, format = '/:vendorId/:activityId') {
    const pathParams: PathParams = {};
    const valueArr = window.location.pathname.split('/');
    format.split('/').forEach((key, index) => {
      if (key.startsWith(':')) {
        pathParams[key.slice(1)] = valueArr[index + 1];
      }
    });
    console.log('🚀 ~ install ~ pathParams', pathParams);
    app.provide('pathParams', pathParams);
  },
};
