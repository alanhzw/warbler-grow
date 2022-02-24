/*
 * @Author: YC
 * @Date: 2020-12-14 10:45:09
 * @LastEditors: YC
 * @LastEditTime: 2021-08-11 10:45:31
 * @Description:装修相关接口
 */

export default {
  /**
   * 获取店铺会员中心链接
   */
  getShopUrl: {
    url: '/getShopUrl',
    method: 'GET',
  },
  getPointMallUrl: {
    url: '/getPointMarketShopUrl',
    method: 'GET',
  },
  /**
   * 获取会员等级设置
   */
  getShopLevels: {
    url: '/getVenderLevelByShopId',
    method: 'GET',
  },
  /**
   * 创建页面
   */
  createPage: {
    url: '/createPage',
    method: 'POST',
  },
  /**
   * 复制页面
   */
  copyPage: {
    url: '/copyPage',
    method: 'POST',
  },
  /**
   * 重命名页面
   */
  renamePage: {
    url: '/updateInstanceName',
    method: 'POST',
  },
  /**
   * 获取页面列表
   */
  getPages: {
    url: '/getPageInstances',
    method: 'POST',
  },
  /**
   * 发布页面
   */
  publishPage: {
    url: '/publishPage',
    method: 'POST',
  },
  /**
   * 删除页面
   */
  removePage: {
    url: '/removePage',
    method: 'POST',
  },
  /**
   * 获取主题列表
   */
  getThemes: {
    url: '/getPageTheme',
    method: 'POST',
  },
  /**
   * 获取定时任务列表
   */
  getTasks: {
    url: '/getTimingPublishPage',
    method: 'POST',
  },
  /**
   * 取消定时任务
   */
  cancelPublishTask: {
    url: '/cancelPublish',
    method: 'POST',
  },
  /**
   * 设置页面访问限制
   */
  setPageLimit: {
    url: 'setPageLimit',
    method: 'POST',
  },
  /**
   * 获取页面详情
   */
  getInstanceInfo: {
    url: '/instanceDetail',
    method: 'GET',
  },
  /**
   * 获取线上页面内容
   */
  getOnlineInstanceInfo: {
    url: '/getOnlinePageDetail',
    method: 'POST',
  },
  /**
   * 获取页面详情
   */
  getSubPages: {
    url: '/getPagePages',
    method: 'POST',
  },
  /**
   * 获取可用的组件列表
   */
  getCtrls: {
    url: '/getPageComponents',
    method: 'POST',
  },
  updatePage: {
    url: '/subUpdatePageInstance',
    method: 'POST',
  },
  saveFloor: {
    url: '/updatePageInstanceFloor',
    method: 'POST',
  },

  queryPictures: {
    url: '/queryPicture',
    method: 'POST',
  },

  // 获取积分活动列表
  getPointActivities: {
    url: '/getPointActivityList',
    method: 'POST',
  },
  // 获取积分加钱购活动列表
  getPointMoneyBuyActivities: {
    url: '/getPointsPlusMoneyByPage',
    method: 'POST',
  },

  // 会员专享券列表
  getMemberCoupons: {
    url: '/exclusiveForMembersList',
    method: 'POST',
  },
  getCrowds: {
    url: '/getCrowds',
    method: 'POST',
  },

  getStrategies: {
    url: '/getCrowdStrategy',
    method: 'POST',
  },
  // 获取等级设置接口
  getLevels: {
    url: '/getVenderLevelByShopId',
    method: 'GET',
  },
  getUpgradeActivities: {
    url: '/getUpGradeList',
    method: 'GET',
  },
  // 查询店铺列表
  getShopsInfo: {
    url: '/getShopsInfo',
    method: 'GET',
  },
  // 查询开卡礼包列表
  getOpenCardPackList: {
    url: '/getOpenCardPackList',
    method: 'GET',
  },
  // 查询图片空间分类列表
  getCategoryListNew: {
    url: '/getCategoryListNew',
    method: 'POST',
  },
  // 创建图片分类目录
  createPicCata: {
    url: '/createPicCata',
    method: 'POST',
  },
  // 查询图片
  queryPictureNew: {
    url: '/queryPictureNew',
    method: 'POST',
  },
  // 上传单张图片到图片空间
  uploadImageNew: {
    url: '/uploadImageNew',
    method: 'POST',
  },
  // 获取关联活动
  getUpGradeOrBirthdayGiftList: {
    url: '/getUpGradeOrBirthdayGiftList',
    method: 'GET',
  },
};
