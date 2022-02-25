export default {
  // 登录
  login: {
    url: '/login',
    method: 'post',
  },
  // 积分商城页
  getShop: {
    url: '/memberPointShop/getCustomerInfo',
    method: 'get',
  },
  // 个人中心
  getPersonDetail: {
    url: '/persionalCenter/getCustomerInfo',
    method: 'get',
  },
  // 积分兑换记录
  getRecord: {
    url: '/pointExchangeRecord/getRecord',
    method: 'post',
  },
  // 收获地址管理-设置是否默认收获地址
  isDefault: {
    url: '/receivingAddressManagement/updateDefault',
    method: 'post',
  },
  // 实物发货详情
  getDeliveryDetail: {
    url: '/physicalDeliveryDetails/getDetails',
    method: 'post',
  },
  // 积分流水页
  getPointRecordList: {
    url: '/pointRecord/getPointRecord',
    method: 'post',
  },
  // 积分秒杀-实物商品-立即秒杀
  exchangeWareSeckill: {
    url: '/pointSeckillWare/immediatelyChange',
    method: 'post',
  },
  // 兑换详情页-实物商品-立即兑换
  exchangeWare: {
    url: '/pointExchangeWare/immediatelyChange',
    method: 'post',
  },
  // 兑换详情页-积分秒杀活动-实物商品
  getSeckillProductDetail: {
    url: '/pointSeckillWare/getActivityInfo',
    method: 'get',
  },
  // 兑换详情页-实物商品-获取信息
  getProductDetail: {
    url: '/pointExchangeWare/getActivityInfo',
    method: 'get',
  },
  // 兑换详情页-京豆-立即兑换
  exchangeBean: {
    url: '/pointExchangeBean/immediatelyChange',
    method: 'post',
  },
  // 兑换详情页-优惠券-立即兑换
  exchangeCoupon: {
    url: '/pointExchangeCoupon/immediatelyChange',
    method: 'post',
  },
  // 地址详情
  addressDetails: {
    url: '/updateAddress/details',
    method: 'get',
  },
  // 编辑地址
  updateAddress: {
    url: '/updateAddress/updateAddress',
    method: 'post',
  },
  // 保存地址
  addAddress: {
    url: '/addAddress/addAddress',
    method: 'post',
  },
  // 删除地址
  deleteAddress: {
    url: '/receivingAddressManagement/deleteAddress',
    method: 'get',
  },
  // 收获地址管理-获取地址信息
  getAddressList: {
    url: '/receivingAddressManagement/getAddress',
    method: 'get',
  },
  // 兑换详情页-京豆-获取信息
  getBeanDetail: {
    url: '/pointExchangeBean/getActivityInfo',
    method: 'get',
  },
  // 兑换详情页-优惠券-获取信息
  getCouponDetail: {
    url: '/pointExchangeCoupon/getActivityInfo',
    method: 'get',
  },
  // 兑换详情页-积分秒杀京豆-获取信息
  getSeckillBeanDetail: {
    url: '/pointSeckillBean/getActivityInfo',
    method: 'get',
  },
  // 兑换详情页-积分秒杀优惠券-获取信息
  getSeckillCouponDetail: {
    url: '/pointSeckillCoupon/getActivityInfo',
    method: 'get',
  },
  // 兑换详情页-积分秒杀京豆-立即秒杀
  immediatelyChangeBean: {
    url: '/pointSeckillBean/immediatelyChange',
    method: 'post',
  },
  // 兑换详情页-积分秒杀优惠券-立即兑换
  immediatelyChangeCoupon: {
    url: '/pointSeckillCoupon/immediatelyChange',
    method: 'post',
  },
  // 修改物流地址
  changeLogistics: {
    url: '/physicalDeliveryDetails/updateDetails',
    method: 'post',
  },
  // 会员专享券领取页面-获取信息
  getMemberCouponDetail: {
    url: '/memberEnjoyCoupon/getActivityInfo',
    method: 'get',
  },
  // 会员专享券领取页面-兑换
  exchangeMemberCoupon: {
    url: '/memberEnjoyCoupon/immediatelyChange',
    method: 'post',
  },
  // 礼包领取记录-获取信息
  getGiftRecord: {
    url: '/giftGetRecord/getRecord',
    method: 'post',
  },
  // 专享优惠券领取券记录-获取信息
  getMemberCouponRecord: {
    url: '/usercEnjoyCouponRecord/getRecord',
    method: 'post',
  },
  // 积分加钱购活动-获取信息
  getPointsMoney: {
    url: '/pointsMoney/activityContent',
    method: 'post',
  },
  // 积分加钱购活动-兑换
  exchangePointsMoney: {
    url: '/pointsMoney/conversion',
    method: 'post',
  },
  // 积分加钱购(new)活动-获取信息
  getPointsMoneyNew: {
    url: '/pointsAddMoney/addMoneyActivityContent',
    method: 'post',
  },
  // 积分加钱购(new)活动-兑换
  exchangePointsMoneyNew: {
    url: '/pointsAddMoney/addMoneyconversion',
    method: 'post',
  },
  // 会员专享折扣活动-获取信息
  getPrizeDetails: {
    url: '/MemberDiscount/getPrizeDetails',
    method: 'post',
  },
  // 会员专享折扣活动-兑换
  updPrizeNum: {
    url: '/MemberDiscount/immediatelyPromotion',
    method: 'post',
  },
  // 获取规则
  getRules: {
    url: '/pointRecord/getGradeAndPointRule',
    method: 'post',
  },
  // 获取开卡
  getOpenCard: {
    url: '/memberGift/getOpenedCard',
    method: 'post',
  },
  // 获奖记录
  getPrizeRecord: {
    url: '/usercPrizeRecordController/getCustomerPrizeRecordById',
    method: 'post',
  },
  // 积分兑换礼品卡--礼品卡信息查询
  getGiftCardInfo: {
    url: '/pointExchangeCard/getActivityInfo',
    method: 'post',
  },
  // 积分兑换礼品卡--兑换奖品
  exchangeGiftCard: {
    url: '/pointExchangeCard/addPointsExchangeCard',
    method: 'post',
  },
  getRecordNew: {
    url: '/awardRecord/getUserCAwardRecord',
    method: 'post',
  },
  getSkuDetails: {
    url: '/pointExchangeWare/getResPrizeSkuC',
    method: 'get',
  },
  getAreaInfo: {
    url: '/getAreaInfo',
    method: 'post',
  },
  getPointsPlusMoneySo: {
    url: '/pointsPlusMoneySo/getPointsPlusMoneySo',
    method: 'post',
  },
  attendPointsPlusMoneySo: {
    url: '/pointsPlusMoneySo/attendPointsPlusMoneySo',
    method: 'post',
  },
  // 查询模板
  getCTemplateInstanceDetail: {
    url: '/cTemplate/getCTemplateInstanceDetail',
    method: 'get',
  },
  // 实时预览
  getPageConfig: {
    url: '/memberGift/getPageConfig',
    method: 'get',
  },
  // oly查询模板
  getCTemplateDetail: {
    url: '/evpiActivity/getCTemplateInstanceDetail',
    method: 'get',
  },
  // 获取活动详情
  getActivityInfo: {
    url: '/evpiActivity/getActivityDetail',
    method: 'get',
  },
  // 完善信息有礼提交
  submitActivity: {
    url: '/evpiActivity/submitActivity',
    method: 'post',
  },
  // 完善信息有礼获取地址列表
  getAreaInfoList: {
    url: 'evpiActivity/getAreaInfo',
    method: 'post',
  },
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++
  // 生日礼包-获取状态
  getBirthDayGiftList: {
    url: '/BirthDayPack/getBirthDayGiftList',
    method: 'post',
  },
  // 生日礼包-领取结果
  getBirthDayGiftResult: {
    url: '/BirthDayPack/getBirthDayGiftResult',
    method: 'post',
  },
  // 生日礼包-保存生日
  saveBirthDay: {
    url: '/BirthDayPack/saveBirthDay',
    method: 'post',
  },
  // 首购-获取状态
  getFirstPurchaseGiftList: {
    url: '/FirstBuyPack/getFirstBuyGiftList',
    method: 'post',
  },
  // 首购-领取结果
  getFirstPurchaseGiftResult: {
    url: '/FirstBuyPack/getFirstBuyGiftResult',
    method: 'post',
  },
  // 升级礼包-获取状态
  getUpgradeGiftList: {
    url: '/UpGradeGift/getGradeGiftList',
    method: 'post',
  },
  // 升级礼包-领取结果
  getUpgradeGiftResult: {
    url: '/UpGradeGift/getGradeGiftResult',
    method: 'post',
  },
  // 入会礼包-获取状态
  getInitiationGiftList: {
    url: '/JoinMemberPack/getJoinMemberGiftList',
    method: 'post',
  },
  // 入会礼包-领取结果
  getInitiationGiftResult: {
    url: '/JoinMemberPack/getJoinMemberGiftResult',
    method: 'post',
  },
  // 获取按钮颜色
  getCActivityBaseStyle: {
    url: '/activityBaseStyle/getCActivityBaseStyle',
    method: 'get',
  },
  // 首复购活动--获取活动信息
  getPurchaseConfig: {
    url: '/purchaseforc/getActivityDetail',
    method: 'get',
  },
  // 首复购活动--领取令牌
  getPurchaseToken: {
    url: '/purchaseforc/sendToken',
    method: 'post',
  },
  // 卡券中心获取用户会员等级
  getLevelNameCouponCenter: {
    url: '/lorealcoupon/getLevelName',
    method: 'post',
  },
  // 卡券中心装修
  getCouponCenterSetting: {
    url: '/lorealcoupon/getCustomizationDetail',
    method: 'post',
  },
  // 卡券列表
  getCouponListCouponCenter: {
    url: '/lorealcoupon/getCouponList',
    method: 'post',
  },
  // 卡券二维码
  getCouponQRCodeCouponCenter: {
    url: '/lorealcoupon/getCouponQRCode',
    method: 'post',
  },
};
