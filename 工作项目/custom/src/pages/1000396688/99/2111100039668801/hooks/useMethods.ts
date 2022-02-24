/*
 * @Author: 一尾流莺
 * @Description:通用方法
 * @Date: 2021-09-17 10:19:22
 * @LastEditTime: 2021-12-07 14:57:20
 * @FilePath: \custom\src\pages\1000396688\99\2111100039668801\hooks\useMethods.ts
 */
import { gotoShopPage, gotoSkuPage } from '@/utils/platforms';

// 去开卡
const openCard = () => {
  // 没开卡跳转进行开卡
  const openCardLink = `https://shopmember.m.jd.com/shopcard?venderId=1000396688&channel=401&returnUrl=${window.location.href}`;
  window.location.href = openCardLink;
};

// 验证是否达到指定时间
const isScheduled = (date: any) => {
  // 兼容苹果
  const _date = date.replace(/-/g, '/');
  const date1 = new Date();
  const date2 = new Date(Date.parse(_date));
  return date1 > date2;
};

// 修改背景颜色
const initColor = (color:string) => {
  (document.querySelector('#app')! as HTMLElement).style.backgroundColor = color;
};

export {
  openCard,
  gotoShopPage,
  gotoSkuPage,
  isScheduled,
  initColor,
};
