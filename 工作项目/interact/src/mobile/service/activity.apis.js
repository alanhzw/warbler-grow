/*
 * @Description:
 * @Autor: YC
 * @Date: 2021-01-25 10:24:46
 * @LastEditTime: 2021-09-16 10:08:16
 * @FilePath: \interact\src\mobile\service\activity.apis.js
 */
export default {
  getActivityRule: {
    url: '/interactActivity/getWxActivityRule',
    method: 'post',
  },
  // 501
  getQuotaPrizeActivityInfo: {
    url: '/wxCostFulfilQuota/getActivityInformationForC',
    method: 'post',
  },
  addQuotaPrizeActivityAddr: {
    url: '/wxCostFulfilQuota/addUserAddress',
    method: 'post',
  },
  getQuotaPrizeWinners: {
    url: '/wxCostFulfilQuota/getAwardsList',
    method: 'post',
  },
  getQuotaPrizeMyPrizes: {
    url: '/wxCostFulfilQuota/getUserAwards',
    method: 'post',
  },
  // 502
  getQuotaDrawActivityInfo: {
    url: '/wxCostTotalDraw/getWxCostTotalDrawActivityInformationForC',
    method: 'post',
  },
  drawQuotaDrawActivity: {
    url: '/wxCostTotalDraw/drawStart',
    method: 'post',
  },
  addQuotaDrawActivityAddr: {
    url: '/wxCostTotalDraw/addUserCostTotalAddress',
    method: 'post',
  },
  getQuotaDrawRecords: {
    url: '/wxCostTotalDraw/getOnePrizeRecord',
    method: 'post',
  },
  getQuotaDrawWinners: {
    url: '/wxCostTotalDraw/getAwardsList',
    method: 'post',
  },
  // 503

  getManualQuotaPrizeActivityInfo: {
    url: '/wxCostFulfilReceive/getActivityInformationForC',
    method: 'post',
  },
  addManualQuotaPrizeActivityAddr: {
    url: '/wxCostFulfilReceive/addUserReceiveAddress',
    method: 'post',
  },
  getManualQuotaPrizeWinners: {
    url: '/wxCostFulfilReceive/getAwardsList',
    method: 'post',
  },
  getManualQuotaPrizeMyPrizes: {
    url: '/wxCostFulfilReceive/getOneRecord',
    method: 'post',
  },
  getManualQuotaPrizePrize: {
    url: '/wxCostFulfilReceive/getPrizeReceiveActivity',
    method: 'post',
  },

  // 505
  getAllQuotaDrawActivityInfo: {
    url:
      '/wxCostTotalDrawFullOrder/getWxCostTotalDrawActivityInformationFullOrderForC',
    method: 'post',
  },
  drawAllQuotaDrawActivity: {
    url: '/wxCostTotalDrawFullOrder/allDrawStart',
    method: 'post',
  },
  addAllQuotaDrawActivityAddr: {
    url: '/wxCostTotalDrawFullOrder/addUserCostAllTotalAddress',
    method: 'post',
  },
  getAllQuotaDrawRecords: {
    url: '/wxCostTotalDrawFullOrder/getOnePrizeRecordAllDrawActivity',
    method: 'post',
  },
  getAllQuotaDrawWinners: {
    url: '/wxCostTotalDrawFullOrder/getAllAwardsList',
    method: 'post',
  },

  // 506 消费排名 会员订单
  getQuotaAmountRankActivityInfo: {
    url: '/wxMemberConsumptionAmount/getWxMemberConsumptionAmountRankingC',
    method: 'post',
  },
  getQuotaAmountRankWinners: {
    url: '/wxMemberConsumptionAmount/getAllAwardsList',
    method: 'post',
  },
  getQuotaAmountRankMyPrize: {
    url: '/wxMemberConsumptionAmount/getOnePrizeRecord',
    method: 'post',
  },
  addQuotaAmountRankAddr: {
    url: '/wxMemberConsumptionAmount/addUserMemberConsumptionAddress',
    method: 'post',
  },
  getQuotaAmountRankPrize: {
    url: '/wxMemberConsumptionAmount/getPrizeReceiveActivity',
    method: 'post',
  },

  // 507 消费排名
  enrollQuotaTimeRank: {
    url: 'wxMemberOrderTime/addWxMemberOrderTimeActivitySignUpForC',
    method: 'post',
  },
  getQuotaTimeRankActivityInfo: {
    url: '/wxMemberOrderTime/getWxMemberOrderTimeActivityInformationForC',
    method: 'post',
  },
  getQuotaTimeRankWinners: {
    url: '/wxMemberOrderTime/getWxMemberOrderTimeActivityAllRecords',
    method: 'post',
  },
  getQuotaTimeRankMyPrize: {
    url: '/wxMemberOrderTime/getWxMemberOrderTimeActivitySingleAwardRecord',
    method: 'post',
  },
  addQuotaTimeRankAddr: {
    url: '/wxMemberOrderTime/addWxMemberOrderTimeActivityShippingAddress',
    method: 'post',
  },
  getQuotaTimeRankPrize: {
    url: '/wxMemberOrderTime/wXMemberOrderTimeActivityReceiveAward',
    method: 'post',
  },

  // 508 活动详情
  getTrialActivityDetails: {
    url: '/freesampling/getActivityDetails',
    method: 'post',
  },
  // 508 个人中奖记录
  getFreeSampLingDrawRecordForC: {
    url: '/freesampling/getFreeSampLingDrawRecordForC',
    method: 'post',
  },
  // 508 添加收货地址
  addUserFreeSampLingAddress: {
    url: '/freesampling/addUserFreeSampLingAddress',
    method: 'post',
  },
  // 508 参与活动
  drawFreeSampLing: {
    url: '/freesampling/drawFreeSampLing',
    method: 'post',
  },
  // 504 活动详情
  getCollectCardActivityDetails: {
    url: '/collectCard/getActivityDetails',
    method: 'post',
  },
  // 504 集卡活动抽卡
  drawcard: {
    url: '/collectCard/drawcard',
    method: 'post',
  },
  // 504 集卡活动判断能否抽奖接口
  collectCardDrawCheck: {
    url: '/collectCard/collectCardDrawCheck',
    method: 'post',
  },
  // 504 集卡活动抽奖
  collectCardDrawStart: {
    url: '/collectCard/collectCardDrawStart',
    method: 'post',
  },
  // 504 集卡活动添加收货地址
  addUserCostAllTotalAddress: {
    url: '/collectCard/addUserCollectCardAddress',
    method: 'post',
  },
  // 504 集卡活动个人中奖记录
  getCollectCardDrawRecordForC: {
    url: '/collectCard/getCollectCardDrawRecordForC',
    method: 'post',
  },
  // 504 集卡活动分享接口
  saveCardShareRecord: {
    url: '/collectCard/saveCardShareRecord',
    method: 'post',
  },
  // 查询模板
  getCTemplateInstanceDetail: {
    url: '/cTemplate/getCTemplateInstanceDetail',
    method: 'get',
  },
  getCacheJSON: {
    url: '/memberGift/getPageConfig',
    method: 'get',
  },
  // 通用 获取您的订单
  getMyOrders: {
    url: '/wxMemberConsumptionAmount/getOrderInfo',
    method: 'post',
  },
};
