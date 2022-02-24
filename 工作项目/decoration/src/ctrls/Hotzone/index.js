/*
 * @Description:
 * @Date: 2021-03-15 11:31:55
 * @LastEditTime: 2021-04-14 11:41:07
 * @FilePath: \yunluzhuangxiu\src\ctrls\Hotzone\index.js
 */
/**
 * 热区组件
 */
import Utils from '@/utils';
import V from '@/utils/valid';

export default {
  info: {
    name: 'ctrl_hotzone',
    label: '图片热区',
    icon: 'icon-icon-21',
    assets: {},
    enableBI: false,
  },
  components: {
    preview: () => import('./Preview'),
    editor: () => import('./Editor'),
    result: () => import('./Result'),
  },
  initData: {
    pic: '',
    hotzones: [],
    mb15: true,
  },
  validators: {
    pic: pic =>
      new Promise((resolve, reject) => {
        if (typeof pic !== 'string' || pic === '') {
          reject(new Error('请上传热区图片'));
        } else {
          resolve();
        }
      }),
    hotzones: hotzones =>
      new Promise((resolve, reject) => {
        // if (hotzones.length === 0) {
        //   reject(new Error('请设置图片热区'));
        // } else
        if (hotzones.some(hz => hz.link === '' || !hz.link)) {
          reject(new Error('请设置图片热区的链接地址'));
        } else if (hotzones.some(hz => !V.isValidLink(hz.link))) {
          reject(new Error(`链接不符合规范，请使用以http/https开头，${V.getValidDomains().join('、')}域名下的链接`));
        } else if (Utils.checkOverlap(hotzones)) {
          reject(new Error('热区中有重叠区域'));
        } else {
          resolve();
        }
      }),
  },
};
