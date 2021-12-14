/*
 * @Description:积分兑换接口
 * @Autor: hanzhiwei
 * @Date: 2020-12-29 11:57:20
 * @LastEditTime: 2021-01-12 17:03:28
 * @FilePath: \SNActivity\src\axios\apis\pointsExchange\apis.js
 */
export default {
  // 获取优惠券活动信息
  getActivityInfoCoupon: {
    url: '/api/c/pointExchangeCoupon/getActivityInfo',
    method: 'get',
  },
  // 获取云钻活动信息
  getActivityInfoBrilliant: {
    url: '/api/c/pointExchangeCoupon/getActivityInfo',
    method: 'get',
  },
  // 获取实物活动信息
  getActivityInfoWare: {
    url: '/api/c/pointExchangeWare/getActivityInfo',
    method: 'get',
  },
  // 立即兑换优惠券
  exchangePriceCoupon: {
    url: '/api/c/pointExchangeCoupon/immediatelyChange',
    method: 'post',
  },
  // 立即兑换云钻
  exchangePriceBrilliant: {
    url: '/api/c/pointExchangeBean/immediatelyChange',
    method: 'post',
  },
  // 立即兑换实物
  exchangePriceWare: {
    url: '/api/c/pointExchangeWare/immediatelyChange',
    method: 'post',
  },
};
