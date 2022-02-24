/*
 * @Author: 一尾流莺
 * @Description:类型声明
 * @Date: 2021-11-29 12:02:42
 * @LastEditTime: 2021-11-29 15:47:30
 * @FilePath: \custom\src\pages\1000396688\99\2111100039668801\config\type.ts
 */

export interface StyleOption{
  imgUrl?:any,
  backgroundImage?: string,
  width?: string,
  height?: string,
  margin?: string,
  padding?:string
  top?: string,
  bottom?: string,
  right?:string,
  left?: string,
  transform?:string
}

export interface HomePageOptions {
  mainPicOptions: StyleOption,
  mainBtnOptions: StyleOption,
  ruleBtnOptions: StyleOption,
  mainColor: string,
  rulePopupOptions?: any,
  openCardPopupOptions?:any
}
