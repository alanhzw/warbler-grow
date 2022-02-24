/*
 * @Author: YC
 * @Description:
 * @Date: 2021-06-15 18:14:10
 * @LastEditTime: 2021-08-09 17:46:16
 * @FilePath: \decoration\src\ctrls\DoubleRowFigure\index.js
 */
/**
 * 文字组件
 */
import V from '@/utils/valid';

export default {
  info: {
    name: 'ctrl_double_row_figure',
    label: '双列图',
    icon: 'icon-yemianzhuangxiuicon_huaban1-02',
    assets: {},
    enableBI: true,
  },
  components: {
    preview: () => import('./Preview'),
    editor: () => import('./Editor'),
    result: () => import('./Result'),
  },
  initData: {
    pic1: '',
    link1: '',
    pic2: '',
    link2: '',
    mb15: true,
  },
  validators: {
    pic1: pic =>
      new Promise((resolve, reject) => {
        if (typeof pic !== 'string' || pic === '') {
          reject(new Error('请上传左侧图片'));
        } else {
          resolve();
        }
      }),
    link1: link =>
      new Promise((resolve, reject) => {
        if (typeof link !== 'string' || link === '') {
          // 允许不添加链接
          // reject(new Error('请添加链接'));
          resolve();
        } else if (!V.isValidLink(link)) {
          reject(new Error(`链接不符合规范，请使用以http/https开头，${V.getValidDomains().join('、')}域名下的链接`));
        } else {
          resolve();
        }
      }),
    pic2: pic =>
      new Promise((resolve, reject) => {
        if (typeof pic !== 'string' || pic === '') {
          reject(new Error('请上传右图片'));
        } else {
          resolve();
        }
      }),
    link2: link =>
      new Promise((resolve, reject) => {
        if (typeof link !== 'string' || link === '') {
          // 允许不添加链接
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
