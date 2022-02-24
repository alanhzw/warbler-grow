/*
 * @Description:
 * @Date: 2021-03-15 11:31:55
 * @LastEditTime: 2021-09-22 10:47:51
 * @FilePath: \decoration\src\ctrls\PointSeckill\index.js
 */
/**
 * 文字组件
 */
import V from '@/utils/valid';

export default {
  info: {
    name: 'ctrl_point_seckill',
    label: '积分秒杀',
    icon: 'icon-yemianzhuangxiuicon-19',
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
    showTitle: true,
    showExpire: true,
    mb15: true,
    title: '积分秒杀',
    selectType: '1', // 选择方式  1 手动选择  2自动选择
    activityShopId: '', // 是不是pop店
    showNum: 1, // 展示数量
    sortType: '1', // 排序方式  1 创建时间倒序
    type: 311,
  },
  validators: {
    activities: activities =>
      new Promise((resolve, reject) => {
        if (
          activities.beans.length > 0 ||
          activities.coupons.length > 0 ||
          activities.products.length > 0 ||
          activities.selectType == 2
        ) {
          resolve();
        } else {
          reject(new Error('请选择活动'));
        }
      }),
  },
};
