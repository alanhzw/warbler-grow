/* eslint-disable no-undef */
/*
 * @Description:api处理
 * @Autor: hanzhiwei
 * @Date: 2020-12-28 14:13:50
 * @LastEditTime: 2021-01-05 14:21:11
 * @FilePath: \SNActivity\src\axios\apis\index.js
 */
import axios from '@/axios/index';
import Toast from '@/utils/toast';
import pointsExchangeApis from './pointsExchange/apis';
import commonApis from './common/apis';
import pointsInteractApis from './pointsInteract/apis';
import personalCenterApis from './personalCenter/apis';

const factory = (apis) => {
  const service = {};
  Object.keys(apis).forEach((fun) => {
    const api = apis[fun];
    service[fun] = async (data = {}) => {
      const config = {
        ...api,
        [api.method === 'post' ? 'data' : 'params']: data,
      };
      try {
        Toast.loading({
          forbidClick: true,
          duration: 10000,
        });
        const result = await axios.request(config);
        return result;
      } catch (e) {
        Toast.clear();
        // eslint-disable-next-line new-cap
        Toast(e);
      } finally {
        Toast.clear();
      }
    };
  });
  return service;
};
export const pointsExchangeService = factory(pointsExchangeApis);
export const commonService = factory(commonApis);
export const pointsInteractService = factory(pointsInteractApis);
export const personalCenterService = factory(personalCenterApis);

export default {
  pointsExchangeService: pointsExchangeService,
  commonService: commonService,
  pointsInteractService: pointsInteractService,
  personalCenterService: personalCenterService,
};
