/*
 * @Description:
 * @Date: 2021-03-15 11:31:55
 * @LastEditTime: 2021-08-09 17:47:02
 * @FilePath: \decoration\src\ctrls\SlideFigure\index.js
 */
/**
 * 文字组件
 */
import V from '@/utils/valid';

export default {
  info: {
    name: 'ctrl_slide_figure',
    label: '滑动图',
    icon: 'icon-yemianzhuangxiuicon_huaban1-01',
    assets: {},
    enableBI: true,
  },
  components: {
    preview: () => import('./Preview'),
    editor: () => import('./Editor'),
    result: () => import('./Result'),
  },
  initData: {
    height: 120,
    pics: Array(3)
      .fill(0)
      .map(() => ({
        pic: '',
        link: '',
      })),
    mb15: true,
  },
  funs: {
    pic: pic =>
      new Promise((resolve, reject) => {
        if (typeof pic !== 'string' || pic === '') {
          reject(new Error('请上传滑动图片'));
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
  validators: {
    pics: pics =>
      new Promise((resolve, reject) => {
        if (Array.isArray(pics) && pics.length > 0) {
          if (pics.some(pic => typeof pic.pic !== 'string' || pic.pic === '')) {
            reject(new Error('请上传滑动图片'));
            // } else if (pics.some(pic => typeof pic.link !== 'string' || pic.link === '')) {
            //   reject(new Error('请设置图片链接图片链接'));
          } else if (pics.some(pic => typeof pic.link === 'string' && pic.link !== '' && !V.isValidLink(pic.link))) {
            reject(new Error(`链接不符合规范，请使用以http/https开头，${V.getValidDomains().join('、')}域名下的链接`));
          } else {
            resolve();
          }
        } else {
          reject(new Error('请添加滑动图片'));
        }
      }),
  },
};
