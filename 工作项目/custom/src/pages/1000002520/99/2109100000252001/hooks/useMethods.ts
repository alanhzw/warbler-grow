/*
 * @Author: 一尾流莺
 * @Description:通用方法
 * @Date: 2021-09-17 10:19:22
 * @LastEditTime: 2021-11-03 11:47:09
 * @FilePath: \custom\src\pages\1000002520\99\2109100000252001\hooks\useMethods.ts
 */
import { gotoShopPage, gotoSkuPage } from '@/utils/platforms';

// 去开卡
const openCard = () => {
  // 没开卡跳转进行开卡
  const openCardLink = `https://shopmember.m.jd.com/shopcard?venderId=1000002520&shopId=1000002520&venderType=5&channel=7031&returnUrl=${window.location.href}`;
  window.location.href = openCardLink;
};

// 去领券
const getCoupon = () => {
  // 没开卡跳转进行开卡
  const getCouponLink = '//coupon.m.jd.com/coupons/show.action?key=ccmec1s8oba84d0dbc7b99af444a1617&roleId=58350071&to=https://pro.m.jd.com/mall/active/JLt5Pi7iXwyusE1ZPWkunWmbkKd/index.html';
  window.location.href = getCouponLink;
};

// 是否达到指定日期
const isScheduled = (date:any) => true;

export {
  openCard,
  gotoShopPage,
  gotoSkuPage,
  getCoupon,
  isScheduled,
};
