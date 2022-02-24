/*
 * @Description:个人中心接口
 * @Autor: hanzhiwei
 * @Date: 2020-12-29 11:57:20
 * @LastEditTime: 2021-01-07 19:05:34
 * @FilePath: \SNActivity\src\axios\apis\personalCenter\apis.js
 */
export default {
  // 获取个人信息
  getCustomerInfo: {
    url: '/api/member/getMemInfo',
    method: 'get',
  },
  // 获取积分流水
  getPointRecord: {
    url: '/api/c/pointRecord/getPointRecord',
    method: 'post',
  },
  // 获取积分规则
  getGradeAndPointRule: {
    url: '/api/member/queryMemLevelRule',
    method: 'get',
  },
  // 获取积分兑换记录
  getPointExchangeRecord: {
    url: '/api/c/pointExchangeRecord/getRecord',
    method: 'post',
  },
  // 获取礼包发放记录
  getGiftGetRecord: {
    url: '/api/c/giftGetRecord/getRecord',
    method: 'post',
  },
  // 获取会员权益领取记录
  getUsercEnjoyCouponRecord: {
    url: '/api/c/usercEnjoyCouponRecord/getRecord',
    method: 'post',
  },
  // 获取活动获奖记录
  getUsercPrizeRecordController: {
    url: '/api/c/usercPrizeRecordController/getCustomerPrizeRecordById',
    method: 'post',
  },
  // 获取实物发货详情
  getDetails: {
    url: '/api/c/physicalDeliveryDetails/getDetails',
    method: 'post',
  },
};
