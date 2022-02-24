/*
 * @Author: 一尾流莺
 * @Description:通用方法
 * @Date: 2021-09-17 10:19:22
 * @LastEditTime: 2021-09-17 10:22:56
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\hooks\useMethods.ts
 */
import { gotoShopPage, gotoSkuPage } from '@/utils/platforms';

// 去开卡
const openCard = (isOpenCard: boolean) => {
  // 已经开过卡了什么都不做
  if (isOpenCard) {
    return;
  }
  // 没开卡跳转进行开卡
  const openCardLink = `  https://shopmember.m.jd.com/shopcard?venderId=1000002791&shopId=1000002791&venderType=5&channel=7004&returnUrl=${window.location.href}`;
  window.location.href = openCardLink;
};

export {
  openCard,
  gotoShopPage,
  gotoSkuPage,
};
