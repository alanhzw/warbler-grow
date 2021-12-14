/*
 * @Description:个人中心的各种记录 1 礼包发放  2会员权益领取  3积分兑换  4活动获奖
 * @Autor: hanzhiwei
 * @Date: 2020-12-29 11:15:10
 * @LastEditTime: 2021-01-07 18:46:38
 * @FilePath: \SNActivity\src\data\personalCenter\recordsSettings.js
 */

const settingsMap = {
  1: {
    apis: {
      // 获取礼包发放记录
      getRecords: 'getGiftGetRecord',
    },
    modules: [
      {
        name: 'Header',
        options: {
          isShow: false, // 是否展示选择类型的按钮
        },
      },
      {
        name: 'GiftRecords',
        options: {},
      },
      {
        name: 'NoData',
        options: {},
      },
    ],
  },
  2: {
    apis: {
      // 获取会员权益领取记录
      getRecords: 'getUsercEnjoyCouponRecord',
    },
    modules: [
      {
        name: 'Header',
        options: {
          isShow: false, // 是否展示选择类型的按钮
        },
      },
      {
        name: 'MemberRecords',
        options: {},
      },
      {
        name: 'NoData',
        options: {},
      },
    ],
  },
  3: {
    apis: {
      // 获取积分兑换记录
      getRecords: 'getPointExchangeRecord',
    },
    modules: [
      {
        name: 'Header',
        options: {
          isShow: true, // 是否展示选择类型的按钮
        },
      },
      {
        name: 'ExchangeRecords',
        options: {},
      },
      {
        name: 'NoData',
        options: {},
      },
    ],
  },
  4: {
    apis: {
      // 获取活动获奖记录
      getRecords: 'getUsercPrizeRecordController',
    },
    modules: [
      {
        name: 'Header',
        options: {
          isShow: false, // 是否展示选择类型的按钮
        },
      },
      {
        name: 'ActivityRecords',
        options: {},
      },
      {
        name: 'NoData',
        options: {},
      },
    ],
  },
};
export default {
  async getRecordsSettings(type) {
    return type in settingsMap ? settingsMap[type] : {};
  },
};
