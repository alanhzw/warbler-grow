/*
 * @Author: 一尾流莺
 * @Description:【惠氏】0元试用 基本配置项
 * @Date: 2021-09-16 14:39:03
 * @LastEditTime: 2021-10-28 15:12:16
 * @FilePath: \custom\src\pages\1000002520\99\2109100000252001\config\index.ts
 */
export { bozhenOptions } from './bozhen';
export { lanzuanOptions } from './lanzuan';
export { youjiOptions } from './youji';
export { yunchunOptions } from './yunchun';
export { homePageOptions } from './homePage';

export interface PartOptions {
  width?: string,
  height?: string,
  margin?: string,
  [prop: string]: string | undefined
}

export interface ApiOptions {
  main: string,
  luckyDraw: string,
  getRecord: string,
  redeem: string,
  getAddress: string,
  saveAddress: string,
  click: string,
  firstEnter:string
}
