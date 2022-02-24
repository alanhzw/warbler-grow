/*
 * @Author: 一尾流莺
 * @Description:链接跳转相关操作
 * @Date: 2021-08-30 10:18:41
 * @LastEditTime: 2021-09-28 15:35:08
 * @FilePath: \custom\src\pages\1000002983\99\2108100000298301\hooks\useLinks.ts
 */

import { linksOptions } from '../config/index';

const useLinks = (isOpenCard:boolean):any => {
// 进店逛逛
  const goToShop = () => {
    window.location.href = linksOptions.goToShop;
  };

  // 领取更多权益
  const drawMore = () => {
    window.location.href = linksOptions.drawMore;
  };

  // 跳转至购物车
  const goToCar = () => {
    window.location.href = linksOptions.goToCar;
  };

  // 开卡
  const goToOpenCard = () => {
    if (!isOpenCard) {
      // 没开卡跳转进行开卡
      const openCardLink = `https://shopmember.m.jd.com/shopcard?venderId=1000002983&channel=401&returnUrl=${window.location.href}`;
      window.location.href = openCardLink;
    }
  };
  return {
    goToShop,
    drawMore,
    goToCar,
    goToOpenCard,
  };
};

export default useLinks;
