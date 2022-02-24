/*
 * @Description:积分兑换 301实物商品  302优惠券  303 云钻
 * @Autor: hanzhiwei
 * @Date: 2020-12-29 11:15:10
 * @LastEditTime: 2021-01-08 14:36:33
 * @FilePath: \SNActivity\src\data\pointsExchange\activitySettings.js
 */
import couponBg from '@/assets/img/bg-coupon.png';
import brilliantBg from '@/assets/img/bg-brilliant.png';

const settingsMap = {
  301: {
    apis: {
      getInfo: 'getActivityInfoWare',
      exChangePrice: 'exchangePriceWare',
    },
    // 配置
    config: {
      // 组件
      modules: [
        {
          name: 'pSwiper', // 轮播组件
          // 配置信息
          options: {
            // 奖品类型
            type: 1, // 云钻3  优惠券2   实物1
          },
        },
        {
          name: 'pDetails', // 详情组件
          // 配置信息
          options: {
            // 奖品类型
            type: 1, // 云钻3  优惠券2   实物1
          },
        },
        {
          name: 'pCondition', // 条件组件
          // 配置信息
          options: {
            // 奖品类型
            type: 1, // 云钻3  优惠券2   实物1
          },
        },
        {
          name: 'pSelect', // 选择组件
          // 配置信息
          options: {
            // 奖品类型
            type: 1, // 云钻3  优惠券2   实物1
          },
        },
        {
          name: 'pRule', // 规则组件
          // 配置信息
          options: {
            // 奖品类型
            type: 1, // 云钻3  优惠券2   实物1
          },
        },
        {
          name: 'pButton', // 按钮组件
          // 配置信息
          options: {
            // 奖品类型
            type: 1, // 云钻3  优惠券2   实物1
          },
        },
      ],
    },
  },
  302: {
    apis: {
      getInfo: 'getActivityInfoCoupon',
      exChangePrice: 'exchangePriceCoupon',
    },
    // 配置
    config: {
      // 组件
      modules: [
        {
          name: 'pBanner', // 海报组件
          // 配置信息
          options: {
            // 样式
            style: {
              backgroundImage: `url(${couponBg})`, // 背景图片
            },
            // 奖品类型
            type: 2, // 云钻3  优惠券2   实物1
          },
        },
        {
          name: 'pDetails', // 详情组件
          // 配置信息
          options: {
            // 奖品类型
            type: 2, // 云钻3  优惠券2   实物1
          },
        },
        {
          name: 'pCondition', // 条件组件
          // 配置信息
          options: {
            // 奖品类型
            type: 2, // 云钻3  优惠券2   实物1
          },
        },
        {
          name: 'pRule', // 规则组件
          // 配置信息
          options: {
            // 奖品类型
            type: 2, // 云钻3  优惠券2   实物1
          },
        },
        {
          name: 'pButton', // 按钮组件
          // 配置信息
          options: {
            // 奖品类型
            type: 1, // 云钻3  优惠券2   实物1
          },
        },
      ],
    },
  },
  303: {
    apis: {
      getInfo: 'getActivityInfoBrilliant',
      exChangePrice: 'exchangePriceBrilliant',
    },
    // 配置
    config: {
      // 组件
      modules: [
        {
          name: 'pBanner', // 海报组件
          // 配置信息
          options: {
            // 样式
            style: {
              backgroundImage: `url(${brilliantBg})`, // 背景图片
            },
            // 奖品类型
            type: 3, // 云钻3  优惠券2   实物1
          },
        },
        {
          name: 'pDetails', // 详情组件
          // 配置信息
          options: {
            // 奖品类型
            type: 3, // 云钻3  优惠券2   实物1
          },
        },
        {
          name: 'pCondition', // 条件组件
          // 配置信息
          options: {
            // 奖品类型
            type: 3, // 云钻3  优惠券2   实物1
          },
        },
        {
          name: 'pRule', // 规则组件
          // 配置信息
          options: {
            // 奖品类型
            type: 3, // 云钻3  优惠券2   实物1
          },
        },
        {
          name: 'pButton', // 按钮组件
          // 配置信息
          options: {
            // 奖品类型
            type: 1, // 云钻3  优惠券2   实物1
          },
        },
      ],
    },
  },
};
export default {
  async getActivitySettings(type) {
    return type in settingsMap ? settingsMap[type] : {};
  },
};
