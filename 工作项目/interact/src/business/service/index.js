/*
 * @Author: YC
 * @Date: 2020-12-14 10:44:40
 * @LastEditors: Joshua
 * @LastEditTime: 2021-4-19 09:01:40
 * @Description:后端接口的封装
 */
import crmbApis from './crmb.apis';
import interactApis from './interact.apis';
import factory from './factory';
import { baseURL, crmbAxios } from './axiosInstance';

// 独立导出
export const CrmbService = factory(crmbApis, crmbAxios);

export const requestConfig = {
  baseURL,
};

// 整体导出
export default factory(interactApis, crmbAxios);
