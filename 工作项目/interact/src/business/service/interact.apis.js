export default {
  getTemplates: {
    url: '/bTemplate/getBTemplateInstances',
    method: 'POST',
  },
  getRootTemplates: {
    url: '/bTemplate/getBRootTemplateInstances',
    method: 'POST',
  },
  getTemplateDetail: {
    url: '/bTemplate/getBTemplateInstanceDetails',
    method: 'GET',
  },
  createTemplate: {
    url: '/bTemplate/customizedTemplateInstance',
    method: 'post',
  },
  getMemberPointsList: {
    url: '/supperMeber/getActivityTypeNameByVenderId',
    method: 'GET',
  },
  getActivityPageList: {
    url: '/costFulfilQuota/getFulfilQuotaActivityPageList',
    method: 'POST',
  },
  getJDImagesTypes: {
    url: '/rightActivityPoint/getCategoryList',
    method: 'POST',
  },

  getJDImages: {
    url: '/rightActivityPoint/queryPicture',
    // url: '/pagesDecoration/queryPicture',
    method: 'POST',
  },
  getShopLevels: {
    url: '/exclusiveForMembersCoupon/getVenderLevelRule',
    method: 'POST',
  },
  getLevels: {
    url: '/rightActivityPoint/getVenderLevelRule',
    method: 'POST',
  },
  getUpgradeActivities: {
    url: '/memberupgradegift/getUpGradeList',
    method: 'POST',
  },

  // 获取优惠券列表
  getCoupons: {
    url: '/costFulfilQuota/getStoreDiscountVolumeList',
    method: 'POST',
  },
  // 获取京豆计划列表
  getBeanPlans: {
    url: '/costFulfilQuota/getResPrizeBeanListByPage',
    method: 'POST',
  },
  // 获取实物商品列表
  getProduct: {
    url: '/costFulfilQuota/selectCommodityMessage',
    method: 'POST',
  },

  // 获取单个京豆计划信息
  getNewBeanPlans: {
    url: '/assetBean/getResPrizeBean',
    method: 'POST',
  },
  // 获取单个优惠券信息
  getNewCoupon: {
    url: '/assetCoupon/getResPrizeCouponCommodity',
    method: 'POST',
  },
  // 获取京豆余额
  getBeanAccount: {
    url: '/assetBean/getBeanAccount',
    method: 'POST',
  },
  createQuotaPrizeActivity: {
    url: '/costFulfilQuota/createActivity',
    method: 'POST',
  },
  updateQuotaPrizeActivity: {
    url: '/costFulfilQuota/updateCostFulfilQuotaActivity',
    method: 'POST',
  },
  getQuotaPrizeActivityInfo: {
    url: '/costFulfilQuota/getOneFulfilQuotaActivity',
    method: 'POST',
  },

  createQuotaDrawActivity: {
    url: '/costTotalDraw/createActivity',
    method: 'POST',
  },
  updateQuotaDrawActivity: {
    url: '/costTotalDraw/updateCostTotalDrawActivity',
    method: 'POST',
  },
  getQuotaDrawActivityInfo: {
    url: '/costTotalDraw/getOneTotalDrawActivity',
    method: 'POST',
  },
  // 创建503消费满额有礼,手动领取
  createCostFulfilReceive: {
    url: '/costFulfilReceive/createActivity',
    method: 'POST',
  },
  // 创建505消费满额抽奖,全量订单
  createCostAllTotalDraw: {
    url: '/costAllTotalDraw/createActivity',
    method: 'POST',
  },
  // 创建506消费金额排名有礼
  createMemberConsumpitonAmount: {
    url: '/memberConsumpitonAmount/createActivity',
    method: 'POST',
  },
  // 创建507消费时间排名有礼
  createMemberOrderTime: {
    url: '/memberOrderTime/createActivity',
    method: 'POST',
  },
  // 查询单个活动信息 503
  getOneFulfilReceiveActivity: {
    url: '/costFulfilReceive/getOneFulfilReceiveActivity',
    method: 'POST',
  },
  // 查询单个活动信息 505
  getOneAllTotalDrawActivity: {
    url: '/costAllTotalDraw/getOneAllTotalDrawActivity',
    method: 'POST',
  },
  // 查询单个活动信息 506
  getOnePriceRankActivity: {
    url: '/memberConsumpitonAmount/getOnePriceRankActivity',
    method: 'POST',
  },
  // 查询单个活动信息 507
  getOneTimeRankActivity: {
    url: '/memberOrderTime/getOneTimeRankActivity',
    method: 'POST',
  },
  // 修改单个活动 503
  updateCostFulfilReceiveActivity: {
    url: '/costFulfilReceive/updateCostFulfilReceiveActivity',
    method: 'POST',
  },
  // 修改单个活动 505
  updateCostAllTotalDrawActivity: {
    url: '/costAllTotalDraw/updateCostAllTotalDrawActivity',
    method: 'POST',
  },
  // 修改单个活动 506
  updateCostPriceRankActivity: {
    url: '/memberConsumpitonAmount/updateCostPriceRankActivity',
    method: 'POST',
  },
  // 修改单个活动 507
  updateCostTimeRankActivity: {
    url: '/memberOrderTime/updateCostTimeRankActivity',
    method: 'POST',
  },
  // 创建单个活动 504
  createCollectCard: {
    url: '/collectCardCreate/createCollectCard',
    method: 'POST',
  }, // 查询单个活动 504
  getOneCollectCardActivity: {
    url: '/collectCard/getOneCollectCardActivity',
    method: 'POST',
  }, // 修改单个活动 504
  updateCollectCard: {
    url: '/collectCardCreate/updateCollectCard',
    method: 'POST',
  },
  // 创建单个活动 508
  createFreeSampling: {
    url: '/freeSampling/createFreeSampling',
    method: 'POST',
  }, // 查询单个活动 508
  getOneFreeSamplingActivity: {
    url: '/freeSampling/getOneFreeSamplingActivity',
    method: 'POST',
  }, // 修改单个活动 508
  updateFreeSampling: {
    url: '/freeSampling/updateFreeSampling',
    method: 'POST',
  },
  // 终止
  stopActivity: {
    url: '/collectCardCreate/batchStopActivity',
    method: 'POST',
  },
  // 删除
  deleteActivity: {
    url: '/collectCardCreate/batchDeleteActivity',
    method: 'POST',
  },
  cacheJSON: {
    url: '/memberCenter/updatePageConfig',
    method: 'POST',
  },
};
