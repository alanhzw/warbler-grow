/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-11-10 09:19:49
 * @LastEditTime: 2021-11-10 09:58:20
 * @FilePath: \ired_resource\src\service\index.ts
 */
import factory from './factory';
import { authAxios, unauthAxios } from './request';

import commonApis from './common.apis';
import userApis from './user.apis';
import adminApis from './admin.apis';

export const CommonService = factory(commonApis, unauthAxios);
export const UserService = factory(userApis, authAxios);
export const AdminService = factory(adminApis, authAxios);
