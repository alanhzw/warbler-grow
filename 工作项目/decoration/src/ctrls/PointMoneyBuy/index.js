/*
 * @Description:
 * @Date: 2021-03-15 11:31:55
 * @LastEditTime: 2021-06-16 17:58:29
 * @FilePath: \decoration\src\ctrls\PointMoneyBuy\index.js
 */
/**
 * 文字组件
 */
import V from '@/utils/valid';

export default {
  info: {
    name: 'ctrl_point_money_buy',
    label: '积分加钱购',
    icon: 'icon-yemianzhuangxiuicon-18',
    assets: {},
    enableBI: false,
  },
  components: {
    preview: () => import('./Preview'),
    editor: () => import('./Editor'),
    result: () => import('./Result'),
  },
  initData: {
    activities: [],
    showTitle: true,
    showExpire: true,
    mb15: true,
    cShopId: '',
    title: '积分加钱购',
  },
  validators: {
    activities: activities =>
      new Promise((resolve, reject) => {
        if (activities.length > 0) {
          resolve();
        } else {
          reject(new Error('请选择活动'));
        }
      }),
  },
};
