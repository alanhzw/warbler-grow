/*
 * @Description:YC
 * @Date: 2021-03-15 11:31:54
 * @LastEditTime: 2021-08-09 17:46:02
 * @FilePath: \decoration\src\ctrls\Countdown\index.js
 */
/**
 * 文字组件
 */
import V from '@/utils/valid';

export default {
  info: {
    name: 'ctrl_countdown',
    label: '倒计时组件',
    icon: 'icon-icon7ge3-20',
    assets: {},
    enableBI: true,
  },
  components: {
    preview: () => import('./Preview'),
    editor: () => import('./Editor'),
    result: () => import('./Result'),
  },
  initData: {
    range: [],
    pic: '',
    link: '',
    mb15: true,
  },
  validators: {
    pic: pic =>
      new Promise((resolve, reject) => {
        if (typeof pic !== 'string' || pic === '') {
          reject(new Error('请上传活动图片'));
        } else {
          resolve();
        }
      }),
    range: range =>
      new Promise((resolve, reject) => {
        if (!range || !range.toString()) {
          reject(new Error('请设置生效时间段'));
        } else {
          resolve();
        }
      }),
    link: link =>
      new Promise((resolve, reject) => {
        if (typeof link !== 'string' || link === '') {
          // 可以不添加链接，只显示文字
          // reject(new Error('请添加链接'));
          resolve();
        } else if (!V.isValidLink(link)) {
          reject(new Error(`链接不符合规范，请使用以http/https开头，${V.getValidDomains().join('、')}域名下的链接`));
        } else {
          resolve();
        }
      }),
  },
};
