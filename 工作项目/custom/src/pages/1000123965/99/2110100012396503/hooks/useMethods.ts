/*
 * @Author: 一尾流莺
 * @Description:通用方法
 * @Date: 2021-09-17 10:19:22
 * @LastEditTime: 2021-10-12 09:22:59
 * @FilePath: \custom\src\pages\1000123965\99\2110100012396501\hooks\useMethods.ts
 */
import { gotoShopPage, gotoSkuPage } from '@/utils/platforms';

// 去开卡
const openCard = async (isOpenCard = true) => {
  // 已经开过卡了什么都不做
  if (isOpenCard) {
    return;
  }
  // 没开卡跳转进行开卡
  const openCardLink = `https://shopmember.m.jd.com/shopcard?venderId=1000123965&shopId=1000123965&venderType=1&channel=7003&returnUrl=${window.location.href}`;
  window.location.href = openCardLink;
};
// 跳转到完善信息通用页面
const gotoFinishInfo = () => {
  window.location.href = `https://${window.location.host}/sanyuan/common/saveUserInfo?activityId=2110100012396501`;
};

export {
  openCard,
  gotoShopPage,
  gotoSkuPage,
  gotoFinishInfo,
};
