/*
 * @Author: YC
 * @Date: 2020-12-14 10:44:40
 * @LastEditors: Joshua
 * @LastEditTime: 2021-4-16 18:00:30
 * @Description:后端接口的封装
 */
import crmbApis from './crmb.apis';
import decorationApis from './decoration.apis';
import commonApis from './common.apis';
import { decorationAxios, crmbAxios, commonAxios } from './axiosInstance';
import factory from './factory';

// 独立导出
export const CrmbService = factory(crmbApis, crmbAxios);
export const CommonService = factory(commonApis, commonAxios);
export const DecorationService = factory(decorationApis, decorationAxios);

// 整体导出
export default factory(decorationApis, decorationAxios);
