/*
 * @Author: YC
 * @Description:
 * @Date: 2021-06-15 18:14:10
 * @LastEditTime: 2021-08-09 17:45:54
 * @FilePath: \decoration\src\ctrls\FloatIcon\index.js
 */
/**
 * 文字组件
 */
import V from '@/utils/valid';

export default {
  info: {
    name: 'ctrl_float_icon',
    label: '悬浮图标',
    icon: 'icon-yemianzhuangxiuicon_huaban1-06',
    wrapperStyle: {
      position: 'absolute',
      top: '300px',
      right: 0,
      zIndex: 11,
    },
    assets: {},
    enableBI: true,
  },
  components: {
    preview: () => import('./Preview'),
    editor: () => import('./Editor'),
    result: () => import('./Result'),
  },
  initData: {
    pic: 'jfs/t1/113502/9/17780/22455/5f60df4eE1017d5c0/5149af491d570758.png',
    link: '',
  },
  validators: {
    pic: pic =>
      new Promise((resolve, reject) => {
        if (typeof pic !== 'string' || pic === '') {
          reject(new Error('请上传悬浮图标图片'));
        } else {
          resolve();
        }
      }),
    link: link =>
      new Promise((resolve, reject) => {
        if (typeof link !== 'string' || link === '') {
          // 可以不填写链接
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
