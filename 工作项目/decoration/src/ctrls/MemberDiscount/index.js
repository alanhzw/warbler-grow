/*
 * @Description:
 * @Date: 2021-03-15 11:31:55
 * @LastEditTime: 2021-09-07 14:50:43
 * @FilePath: \decoration\src\ctrls\MemberDiscount\index.js
 */
/**
 * 文字组件
 */
import V from '@/utils/valid';

export default {
  info: {
    name: 'ctrl_member_discount',
    label: '会员专享折扣',
    icon: 'icon-icon7ge3-13',
    assets: {},
    enableBI: false,
  },
  components: {
    preview: () => import('./Preview'),
    editor: () => import('./Editor'),
    result: () => import('./Result'),
  },
  initData: {
    discounts: [],
    showTitle: true,
    showExpire: true,
    mb15: true,
    cShopId: '',
    title: '会员专享折扣',
  },
  validators: {
    coupons: discounts =>
      new Promise((resolve, reject) => {
        if (discounts.length > 0) {
          resolve();
        } else {
          reject(new Error('请选择会员专享折扣'));
        }
      }),
  },
};
