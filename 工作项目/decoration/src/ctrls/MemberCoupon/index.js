/*
 * @Description:
 * @Date: 2021-03-15 11:31:55
 * @LastEditTime: 2021-06-16 17:58:18
 * @FilePath: \decoration\src\ctrls\MemberCoupon\index.js
 */
/**
 * 文字组件
 */
import V from '@/utils/valid';

export default {
  info: {
    name: 'ctrl_member_coupon',
    label: '会员专享券',
    icon: 'icon-icon7ge3-11',
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
    showTitle: true,
    showExpire: true,
    mb15: true,
    cShopId: '',
    title: '会员专享券',
  },
  validators: {
    coupons: coupons =>
      new Promise((resolve, reject) => {
        if (coupons.length > 0) {
          resolve();
        } else {
          reject(new Error('请选择会员专享券'));
        }
      }),
  },
};
