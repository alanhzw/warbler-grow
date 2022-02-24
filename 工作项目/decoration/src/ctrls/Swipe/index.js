/*
 * @Description:
 * @Date: 2021-03-18 16:36:05
 * @LastEditTime: 2021-08-09 17:46:52
 * @FilePath: \decoration\src\ctrls\Swipe\index.js
 */
/**
 * 文字组件
 */
import V from '@/utils/valid';

export default {
  info: {
    name: 'ctrl_swipe',
    label: '轮播图',
    icon: 'icon-yemianzhuangxiuicon_huaban1-03',
    assets: {},
    enableBI: true,
  },
  components: {
    preview: () => import('./Preview'),
    editor: () => import('./Editor'),
    result: () => import('./Result'),
  },
  initData: {
    height: 240,
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
          reject(new Error('请上传轮播图片'));
        } else {
          resolve();
        }
      }),
    link: link =>
      new Promise((resolve, reject) => {
        if (typeof link !== 'string' || link === '') {
          // 可以填写链接
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
    height: height =>
      new Promise((resolve, reject) => {
        if (height == '') {
          reject(new Error('请设置图片高度'));
        } else if (!(height > 0)) {
          reject(new Error('图片高度设置有误'));
        } else if (height < 120) {
          reject(new Error('图片高度不低于120'));
        } else if (height > 500) {
          reject(new Error('图片高度不高于500'));
        } else {
          resolve();
        }
      }),
    pics: pics =>
      new Promise((resolve, reject) => {
        if (Array.isArray(pics) && pics.length > 0) {
          if (pics.some(pic => typeof pic.pic !== 'string' || pic.pic === '')) {
            reject(new Error('请上传轮播图片'));
            // } else if (pics.some(pic => typeof pic.link !== 'string' || pic.link === '')) {
            //   reject(new Error('请添加图片链接'));
          } else if (pics.some(pic => typeof pic.link === 'string' && pic.link !== '' && !V.isValidLink(pic.link))) {
            reject(new Error(`链接不符合规范，请使用以http/https开头，${V.getValidDomains().join('、')}域名下的链接`));
          } else {
            resolve();
          }
        } else {
          reject(new Error('请添加轮播图片'));
        }
      }),
  },
};
