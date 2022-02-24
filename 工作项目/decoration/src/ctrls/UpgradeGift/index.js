/*
 * @Description:
 * @Date: 2021-03-15 11:31:56
 * @LastEditTime: 2021-04-14 11:42:15
 * @FilePath: \yunluzhuangxiu\src\ctrls\UpgradeGift\index.js
 */
/**
 * 等级礼包组件
 */
export default {
  info: {
    name: 'ctrl_upgrade_gift',
    label: '等级礼包',
    icon: 'icon-icon-23',
    assets: {},
    enableBI: false,
  },
  components: {
    preview: () => import('./Preview'),
    editor: () => import('./Editor'),
    result: () => import('./Result'),
  },

  initData: {
    pics: [
      '/jfs/t1/143200/39/4065/184689/5f21356dE50259268/f2795be442150031.png',
      '/jfs/t1/129649/18/5614/194751/5f213596E3bc2de2d/84f38bbf995773f7.png',
      '/jfs/t1/140409/13/4103/170947/5f2135aeEc25fc66c/8da7214bc10a53ac.png',
      '/jfs/t1/130489/15/5611/174433/5f2135caE98708e49/93c65d313ce9eb2a.png',
      '/jfs/t1/149152/4/4037/193871/5f2135e8Edf19b3bf/d5567905a00b7369.png',
    ],
    mb15: true,
    showExpire: true,
  },

  validators: {
    pics: pics =>
      new Promise((resolve, reject) => {
        resolve();
      }),
  },
};
