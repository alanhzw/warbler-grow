/*
 * @Description:
 * @Date: 2021-03-29 16:05:10
 * @LastEditTime: 2021-09-22 10:12:44
 * @FilePath: \decoration\src\ctrls\PointExchange\index.js
 */
/**
 * 文字组件
 */
import V from '@/utils/valid';

export default {
  info: {
    name: 'ctrl_point_exchange',
    label: '积分兑换',
    icon: 'icon-icon7ge3-30',
    assets: {},
    enableBI: false,
  },
  components: {
    preview: () => import('./Preview'),
    editor: () => import('./Editor'),
    result: () => import('./Result'),
  },
  initData: {
    coupons: [],
    beans: [],
    products: [],
    cards: [],
    showTitle: true,
    showExpire: true,
    mb15: true,
    title: '积分兑换',
    selectType: '1', // 选择方式  1 手动选择  2自动选择
    showNum: 1, // 展示数量
    sortType: '1', // 排序方式  1 创建时间倒序
    type: 301,
  },
  validators: {
    activities: activities =>
      new Promise((resolve, reject) => {
        if (
          activities.beans.length > 0 ||
          activities.coupons.length > 0 ||
          activities.products.length > 0 ||
          activities.cards.length > 0 ||
          activities.selectType == 2
        ) {
          resolve();
        } else {
          reject(new Error('请选择活动'));
        }
      }),
  },
};
