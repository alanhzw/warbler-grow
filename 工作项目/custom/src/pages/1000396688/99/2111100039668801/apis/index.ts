/*
 * @Author: 一尾流莺
 * @Description:Api
 * @Date: 2021-09-28 09:13:41
 * @LastEditTime: 2021-12-29 10:40:18
 * @FilePath: \custom\src\pages\1000396688\99\2111100039668801\apis\index.ts
 */
export interface ApisOptions{
  main: string,
  join: string,
  getPrize: string,
  getId:string //
}

export const apisOptions:ApisOptions = {
  main: '/wxShopFollowActivity/activityContentOnly',
  join: '/wxShopFollowActivity/follow',
  getPrize: '/wxShopFollowActivity/getPrize',
  getId: '/common/brand/getFullActInfoVo', //
};
