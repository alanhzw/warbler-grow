/*
 * @Author: YC
 * @Date: 2020-12-31 17:27:49
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-07-27 11:06:50
 * @Description:
 */
export default {
  getPageInstanceInfo: {
    url: '/instanceDetail',
    method: 'GET',
  },
  getPreviewPageInfo: {
    url: '/manageInstanceDetail',
    method: 'GET',
  },
  getPageTimerInfo: {
    url: '/instanceTimerDetail',
    method: 'GET',
  },
  getShopCenterInfo: {
    url: '/instanceDetailByshopId',
    method: 'GET',
  },
  getShopInfo: {
    url: '/shopDetail',
    method: 'GET',
  },
  getUserInfo: {
    url: '/c/getMemberInfo',
    method: 'GET',
  },
  getGiftList: {
    url: '/c/getGiftList',
    method: 'GET',
  },
  getMemberGift: {
    url: '/c/getMemberGift',
    method: 'GET',
  },
  // 获取积分活动列表
  getPointActivities: {
    url: '/getPointActivityList',
    method: 'POST',
  },
  /**
   * 获取会员等级设置
   */
  getShopLevels: {
    url: '/getVenderLevelByShopId',
    method: 'GET',
  },
  // 获取会员专享券列表
  getMemberCoupons: {
    url: '/exclusiveForMembersList',
    method: 'POST',
  },
  // 获取积分加钱购活动列表
  getPointMoneyBuyActivities: {
    url: '/getPointsPlusMoneyByPage',
    method: 'POST',
  },
  // 会员权益组件 C端会员是否可领取生日礼包接口
  getBirthDayGiftList: {
    url: '/c/getBirthDayGiftList',
    method: 'GET',
  },
  // 会员权益组件 C端生日礼包领取结果接口
  getBirthDayGiftResult: {
    url: '/c/getBirthDayGiftResult',
    method: 'GET',
  },
  // 会员权益组件 C端根据等级获取等级礼包领取状态
  getGradeGiftList: {
    url: '/c/getGradeGiftList',
    method: 'GET',
  },
  // 会员权益组件 C端根据等级获取会员等级礼包领取结果
  getGradeGiftResult: {
    url: '/c/getGradeGiftResult',
    method: 'GET',
  },
  // 会员权益组件 C端生日信息保存接口
  saveBirthDay: {
    url: '/c/saveBirthDay',
    method: 'GET',
  },
  // 会员权益组件 获取商家等级规则
  getVenderLevelRule: {
    url: '/getVenderLevelRule',
    method: 'GET',
  },
  // 会员权益组件 C端会员是否可领取首购礼包接口
  getFirstBuyGiftList: {
    url: '/c/getFirstBuyGiftList',
    method: 'GET',
  },
  // 会员权益组件 C端首购礼包领取结果接口
  getFirstBuyPackResult: {
    url: '/c/getFirstBuyPackResult',
    method: 'GET',
  },
  // 会员权益组件 C端会员是否可领取入会礼包接口
  getJoinMemberGiftList: {
    url: '/c/getJoinMemberGiftList',
    method: 'GET',
  },
  // 会员权益组件 C端入会礼包领取结果接口
  getJoinMemberGiftResult: {
    url: '/c/getJoinMemberGiftResult',
    method: 'GET',
  },

};
