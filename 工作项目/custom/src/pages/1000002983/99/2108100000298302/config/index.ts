/*
 * @Author: 一尾流莺
 * @Description:配置文件
 * @Date: 2021-08-27 15:34:41
 * @LastEditTime: 2021-11-26 11:20:48
 * @FilePath: \custom\src\pages\1000002983\99\2108100000298302\config\index.ts
 */

import first from '../assets/first.png';
import second from '../assets/second.png';
import third from '../assets/third.png';
import fourth from '../assets/fourth.png';
import repeat from '../assets/repeat.png';
import shoppingCart from '../assets/float-icon.png';
import goToShopBtn from '../assets/btn.png';

// 整个页面的配置对象
const homePageOptions = {
  backgroundImage: `url(${repeat})`,
};
// 规则页面配置对象
const stepFirstOptons = {
  height: '14rem',
  backgroundImage: `url(${first})`,
};
// 领取成功页面配置对象
const stepSecondOptons = {
  height: '14rem',
  backgroundImage: `url(${second})`,
};
// 已领取页面配置对象
const stepThirdOptons = {
  height: '14rem',
  backgroundImage: `url(${third})`,
};
// 不符合规则页面配置对象
const stepFourthOptons = {
  height: '14rem',
  backgroundImage: `url(${fourth})`,
};
// 立即领取按钮配置对象
const drawNowBtnOptions = {
  width: '2.5rem',
  height: '0.7rem',
  left: '2.3rem',
  bottom: '0.6rem',
  backgroundImage: 'url()',
};
// 查看规则按钮配置对象
const checkRuleBtnOptions = {
  width: '2rem',
  height: '0.5rem',
  right: '0rem',
  top: '1.8rem',
  backgroundImage: 'url()',
};
// 查看更多权益按钮配置对象
const drawMoreBtnOptions = {
  width: '3rem',
  height: '0.5rem',
  left: '2rem',
  bottom: '0.5rem',
  backgroundImage: 'url()',

};
// 曝光商品配置对象
const exposureGoodsOptions = {
  // 曝光商品DIV
  skusOptins: {
    top: '6.5rem',
    left: '0.15rem',
    width: '7.2rem',
    background: 'transparent',
    height: '5.1rem',
    overflow: 'auto',

  },
  skuItemOptions: {
    height: '5.1rem',
    width: '3.35rem',
    background: 'transparent',

  },
  // 进店逛逛按钮
  goToshopOptions: {
    width: '2rem',
    height: '0.5rem',
    backgroundImage: `url(${goToShopBtn}`,
    position: 'fixed',
    top: '12.6rem',
    left: '2.75rem',
  },
};
// 是否使用规则区域
const isUseRule = true;
// 活动规则区域配置对象
const ruleOptions = {
  top: '4.2rem',
  left: '0.3rem',
  width: '6.9rem',
  height: '7.2rem',
  fontSize: '0.2rem',
};
// 购物车配置对象
const shoppingCartOptions = {
  width: '1rem',
  height: '1rem',
  left: '0.1rem',
  top: '5.7rem',
  backgroundImage: `url(${shoppingCart}`,
};
// APIS
const apisOptions = {
  main: '/wx/common/purchase/activityContent',
  getToken: '/wx/common/purchase/getToken',
  findSkus: '/act/common/findSkus',
  getRule: '/common/brand/getFullActInfoVo',
};
// 链接
const linksOptions = {
  goToShop: 'https://shop.m.jd.com/?shopId=1000002983',
  drawMore: 'https://shop.m.jd.com/?shopId=1000002983',
  goToCar: 'https://p.m.jd.com/cart/cart.action?fromnav=1',
  goToOpenCard: 'https://shopmember.m.jd.com/shopcard?venderId=1000002983&channel=401',
};
// 设置body的背景图 基本上是用来repeat的
document.body.style.background = `url(${repeat})`;

export {
  homePageOptions,
  stepFirstOptons,
  stepSecondOptons,
  stepThirdOptons,
  stepFourthOptons,
  checkRuleBtnOptions,
  drawMoreBtnOptions,
  drawNowBtnOptions,
  exposureGoodsOptions,
  ruleOptions,
  shoppingCartOptions,
  apisOptions,
  linksOptions,
  isUseRule,
};
