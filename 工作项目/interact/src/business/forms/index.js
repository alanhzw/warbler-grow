/*
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2021-01-13 09:56:36
 * @LastEditTime: 2021-02-27 14:17:22
 * @FilePath: \yunluhuodong\src\business\forms\index.js
 */
import Vue from 'vue';

// import BaseInfoSettings from './BaseInfo/Settings'
// import OrderSettings from './Order/Settings'
// import ApplicationSettings from './Application/Settings';
// import PrizeSettings from './Prize/Settings';
// import PrizeDistribution from './Prize/Distribution';
// import RuleSettings from './Rule/Settings';
// import ShareSettings from './Share/Settings';

// import DrawSettings from './Draw/Settings';
// import DrawPrizeSettings from './Draw/Prizes';

Vue.component('baseInfoForm', () => import('./BaseInfo/Settings'));
Vue.component('orderForm', () => import('./Order/Settings'));
Vue.component('applicationForm', () => import('./Application/Settings'));
Vue.component('prizeSettingsForm', () => import('./Prize/Settings'));
Vue.component('prizeDistributionForm', () => import('./Prize/Distribution'));
Vue.component('ruleForm', () => import('./Rule/Settings'));
Vue.component('shareForm', () => import('./Share/Settings'));
Vue.component('cardForm', () => import('./Card/Settings'));
Vue.component('TrialForm', () => import('./Trial/Settings'));
Vue.component('ApplyForm', () => import('./Apply/Settings'));

Vue.component('drawForm', () => import('./Draw/Settings'));
Vue.component('drawPrizeForm', () => import('./Draw/Prizes'));
Vue.component('dailyDrawForm', () => import('./Draw/DailySettings'));

export default {
  baseInfoForm: {
    title: '活动基本信息',
    fields: [
      'grade',
      'activityName',
      'orderPriceType',
      'priceCalculateType',
      'orderStartTime',
      'orderEndTime',
      'endTime',
      'startTime',
      'baseCondition',
      'joinTime',
    ],
  },
  orderForm: {
    title: '消费订单设置',
    fields: [
      'orderPriceType',
      'orderStatus',
      'priceCalculateType',
      'orderStartTime',
      'orderEndTime',
      'priceLimit',
    ],
  },
  applicationForm: {
    title: '报名设置',
    fields: ['enrollStartTime', 'enrollEndTime'],
  },
  prizeSettingsForm: {
    title: '奖项设置',
    fields: ['prizeList', 'prizeInfoList', 'drawPrizeInfoList'],
  },
  prizeDistributionForm: {
    title: '发放设置',
    fields: ['awardType', 'awardStartTime', 'awardEndTime'],
  },
  ruleForm: {
    title: '活动规则',
    fields: ['activityRule'],
  },
  shareForm: {
    title: '分享设置',
    fields: ['shareText', 'sharePic'],
  },
  drawForm: {
    title: '抽奖规则设置',
    fields: [
      'drawTimesInfoList',
      'drawStartTime',
      'drawEndTime',
      'drawTimesType',
      'drawTimesInfoList',
      'maxDraw',
      'maxAward',
    ],
  },
  drawPrizeForm: {
    title: '奖品设置',
    fields: ['prizeList', 'prizeInfoList', 'drawPrizeInfoList'],
  },
  dailyDrawForm: {
    title: '抽奖规则设置',
    fields: ['maxDraw', 'dailyPrizeTimes'],
  },
  cardForm: {
    title: '抽卡设置',
    fields: ['dailyDrawTimes', 'shareDrawTimes', 'collectCardInfoList'],
  },
  trialForm: {
    title: '试用商品',
    fields: ['freeSamplingPrizeReqDTO'],
  },
  applyForm: {
    title: '申请设置',
    fields: ['autoStop', 'memberApplyForlimit'],
  },
};
