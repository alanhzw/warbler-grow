const settingsMap = {
  501: {
    name: '消费满额有礼',
    apis: {
      create: 'createQuotaPrizeActivity',
      get: 'getQuotaPrizeActivityInfo',
      update: 'updateQuotaPrizeActivity',
    },
    forms: [
      {
        name: 'baseInfoForm',
        settings: {
          disableStatus: [],
          items: ['activityName', 'grade'],
        },
      },
      {
        name: 'orderForm',
        settings: {
          disableStatus: [1, 2, 3],
          items: [
            'orderPriceType',
            'orderRange',
            'priceCalculateType',
            // 'orderScopeType'
          ],
        },
      },
      {
        name: 'applicationForm',
        settings: {
          disableStatus: [1, 2, 3, 4],
        },
      },
      {
        name: 'prizeSettingsForm',
        settings: {
          maxCount: 3,
          disableStatus: [2, 3, 4],
        },
      },
      {
        name: 'prizeDistributionForm',
        settings: {
          disableStatus: [2, 3, 4],
          items: ['awardRange', 'awardType'],
        },
      },
      {
        name: 'ruleForm',
        settings: {
          disableStatus: [4],
        },
      },
      {
        name: 'shareForm',
        settings: {
          disableStatus: [4],
        },
      },
    ],
  },

  502: {
    name: '消费满额抽奖',
    apis: {
      create: 'createQuotaDrawActivity',
      get: 'getQuotaDrawActivityInfo',
      update: 'updateQuotaDrawActivity',
    },
    forms: [
      {
        name: 'baseInfoForm',
        settings: {
          disableStatus: [4],
          items: ['activityName', 'grade'],
        },
      },
      {
        name: 'orderForm',
        settings: {
          disableStatus: [4],
          items: [
            'orderPriceType',
            'orderRange',
            'orderStatus',
            'priceCalculateType',
          ],
        },
      },
      {
        name: 'drawForm',
        settings: {
          disableStatus: [4],
          items: ['drawRange', 'drawTimesInfoList', 'maxDraw', 'maxAward'],
        },
      },
      {
        name: 'drawPrizeForm',
        settings: {
          disableStatus: [4],
          items: ['drawPrizeInfoList', 'totalChance'],
          prizeCount: 8,
        },
      },
      {
        name: 'ruleForm',
        settings: {
          disableStatus: [4],
        },
      },
      {
        name: 'shareForm',
        settings: {
          disableStatus: [4],
        },
      },
    ],
  },

  503: {
    name: '消费满额有礼(主动领奖)',
    apis: {
      create: 'createCostFulfilReceive',
      get: 'getOneFulfilReceiveActivity',
      update: 'updateCostFulfilReceiveActivity',
    },
    forms: [
      {
        name: 'baseInfoForm',
        settings: {
          disableStatus: [4],
          items: ['activityName', 'grade'],
        },
      },
      {
        name: 'orderForm',
        settings: {
          disableStatus: [2, 3, 4],
          items: [
            'orderPriceType',
            'orderRange',
            'priceCalculateType',
            'orderTip',
          ],
        },
      },
      {
        name: 'prizeSettingsForm',
        settings: {
          maxCount: 3,
          disableStatus: [2, 3, 4],
        },
      },
      {
        name: 'prizeDistributionForm',
        settings: {
          disableStatus: [3, 4],
          items: ['awardRange', 'awardLimit'],
        },
      },
      {
        name: 'ruleForm',
        settings: {
          disableStatus: [4],
        },
      },
      {
        name: 'shareForm',
        settings: {
          disableStatus: [4],
        },
      },
    ],
  },
  504: {
    name: '会员集卡',
    apis: {
      create: 'createCollectCard',
      get: 'getOneCollectCardActivity',
      update: 'updateCollectCard',
    },
    forms: [
      {
        name: 'baseInfoForm',
        settings: {
          disableStatus: [1, 2, 3, 4],
          items: ['activityName', 'grade', 'activityTime'],
        },
      },
      {
        name: 'cardForm',
        settings: {
          disableStatus: [1, 2, 3, 4],
          items: ['dailyDrawTimes', 'shareDrawTimes', 'collectCardInfoList'],
        },
      },
      {
        name: 'dailyDrawForm',
        settings: {
          disableStatus: [1, 2, 3, 4],
          items: ['maxAward', 'dailyPrizeTimes'],
        },
      },
      {
        name: 'drawPrizeForm',
        settings: {
          items: ['drawPrizeInfoList', 'totalChance'],
          disableStatus: [1, 2, 3, 4],
          prizeCount: 10,
        },
      },
      {
        name: 'ruleForm',
        settings: {
          disableStatus: [1, 2, 3, 4],
        },
      },
      {
        name: 'shareForm',
        settings: {
          disableStatus: [1, 2, 3, 4],
        },
      },
    ],
  },
  505: {
    name: '消费满额抽奖(全量订单)',
    apis: {
      create: 'createCostAllTotalDraw',
      get: 'getOneAllTotalDrawActivity',
      update: 'updateCostAllTotalDrawActivity',
    },
    forms: [
      {
        name: 'baseInfoForm',
        settings: {
          disableStatus: [3, 4],
          items: ['activityName', 'grade', 'activityTime'],
        },
      },
      {
        name: 'orderForm',
        settings: {
          disableStatus: [3, 4],
          isShowOrderPrice: true,
          items: ['orderPrice', 'orderStatus'],
        },
      },
      {
        name: 'drawForm',
        settings: {
          disableStatus: [3, 4],
          items: ['drawTimesInfoList', 'maxDraw', 'maxAward'],
        },
      },
      {
        name: 'drawPrizeForm',
        settings: {
          disableStatus: [3, 4],
          items: ['drawPrizeInfoList', 'totalChance'],
          prizeCount: 8,
        },
      },
      {
        name: 'ruleForm',
        settings: {
          disableStatus: [4],
        },
      },
      {
        name: 'shareForm',
        settings: {
          disableStatus: [4],
        },
      },
    ],
  },

  506: {
    name: '消费排名有礼(按消费金额)',
    apis: {
      create: 'createMemberConsumpitonAmount',
      get: 'getOnePriceRankActivity',
      update: 'updateCostPriceRankActivity',
    },
    forms: [
      {
        name: 'baseInfoForm',
        settings: {
          disableStatus: [4],
          items: ['activityName', 'grade'],
        },
      },
      {
        name: 'orderForm',
        settings: {
          disableStatus: [2, 3, 4],
          isShowOrderPrice: true,
          items: [
            'orderPriceType',
            'priceCalculateType',
            'orderStatus',
            'orderRange',
            'orderPriceType',
            'priceLimit',
            'orderTip',
          ],
        },
      },
      {
        name: 'prizeSettingsForm',
        settings: {
          maxCount: 3,
          disableStatus: [4],
        },
      },
      {
        name: 'prizeDistributionForm',
        settings: {
          disableStatus: [3, 4],
          items: ['awardRange', 'awardType'],
        },
      },
      {
        name: 'ruleForm',
        settings: {
          disableStatus: [3, 4],
        },
      },
      {
        name: 'shareForm',
        settings: {
          disableStatus: [3, 4],
        },
      },
    ],
  },

  507: {
    name: '消费排名有礼(按下单时间)',
    apis: {
      create: 'createMemberOrderTime',
      get: 'getOneTimeRankActivity',
      update: 'updateCostTimeRankActivity',
    },
    forms: [
      {
        name: 'baseInfoForm',
        settings: {
          disableStatus: [4],
          items: ['activityName', 'grade'],
        },
      },
      {
        name: 'orderForm',
        settings: {
          disableStatus: [2, 3, 4],
          isShowOrderPrice: true,
          items: [
            'orderStatus',
            'orderRange',
            'orderPrice',
            'priceLimit',
            'orderTip',
          ],
        },
      },
      {
        name: 'prizeSettingsForm',
        settings: {
          maxCount: 3,
          disableStatus: [4],
        },
      },
      {
        name: 'applicationForm',
        settings: {
          disableStatus: [1, 2, 3, 4],
        },
      },
      {
        name: 'prizeDistributionForm',
        settings: {
          disableStatus: [3, 4],
          items: ['awardRange', 'awardType'],
        },
      },
      {
        name: 'ruleForm',
        settings: {
          disableStatus: [3, 4],
        },
      },
      {
        name: 'shareForm',
        settings: {
          disableStatus: [3, 4],
        },
      },
    ],
  },

  508: {
    name: '会员试用',
    apis: {
      create: 'createFreeSampling',
      get: 'getOneFreeSamplingActivity',
      update: 'updateFreeSampling',
    },
    forms: [
      {
        name: 'baseInfoForm',
        settings: {
          disableStatus: [1, 2, 3, 4],
          items: ['activityName', 'activityTime', 'baseCondition'],
        },
      },
      {
        name: 'trialForm',
        settings: {
          disableStatus: [1, 2, 3, 4],
          items: ['freeSamplingPrizeReqDTO'],
        },
      },
      {
        name: 'applyForm',
        settings: {
          disableStatus: [1, 2, 3, 4],
          items: ['autoStop', 'memberApplyForlimit'],
        },
      },
      {
        name: 'ruleForm',
        settings: {
          disableStatus: [1, 2, 3, 4],
        },
      },
    ],
  },
};

export default {
  async getActivitySettings(type) {
    if (type in settingsMap) {
      return settingsMap[type];
    }
    // eslint-disable-next-line no-console
    console.warn();
    return {};
  },
};
