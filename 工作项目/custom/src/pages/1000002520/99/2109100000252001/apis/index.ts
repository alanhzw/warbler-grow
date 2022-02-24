/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-09-28 09:13:41
 * @LastEditTime: 2021-11-12 17:17:32
 * @FilePath: \custom\src\pages\1000002520\99\2109100000252001\apis\index.ts
 */
export interface ApisOptions{
  main: string,
  getCoupon: string,
  click: string
}

export const apisOptions:ApisOptions = {
  main: '/wyeth/trial/getUserActProcess',
  getCoupon: '/wyeth/trial/drawGrantTypeCoupon',
  click: '/crm/pageVisit/insertCrmPageVisit',
};
