/*
 * @Author: 一尾流莺
 * @Description:类型声明
 * @Date: 2021-09-27 15:48:04
 * @LastEditTime: 2021-09-27 17:39:24
 * @FilePath: \custom\src\pages\1000002520\99\2109100000252001\type\index.ts
 */

export type PageType = 'home' | 'bozhen' | 'youji' | 'yunchun' | 'lanzuan'

export interface StyleOption{
  backgroundImage: string,
  width: string,
  height: string,
  margin: string,
  [propName:string]:string
}
export interface PageOption{
  pageName: PageType,
}

export type PageList = Array<PageOption>

export interface HomePageOptions {
  styleOption: StyleOption,
  pageList: PageList
}
