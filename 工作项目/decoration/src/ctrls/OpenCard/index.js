/*
 * @Description:
 * @Date: 2021-03-15 11:31:55
 * @LastEditTime: 2021-04-08 11:32:52
 * @FilePath: \yunluzhuangxiu\src\ctrls\OpenCard\index.js
 */
/**
 * 文字组件
 */
export default {
  info: {
    name: 'ctrl_open_card',
    label: '开卡礼包',
    icon: 'icon-icon-22',
    assets: {},
    enableBI: false,
  },
  components: {
    preview: () => import('./Preview'),
    editor: () => import('./Editor'),
    result: () => import('./Result'),
  },
  initData: {
    pic: '/jfs/t1/125998/29/8138/177735/5f1fbd20E4bdcbee7/714c6fe65e8b55af.png',
    mb15: true,
    showExpire: true,
  },
  validators: {
    pic: pic =>
      new Promise((resolve, reject) => {
        if (typeof pic !== 'string' || pic === '') {
          reject(new Error('请上按钮图片'));
        } else {
          resolve();
        }
      }),
  },
};
