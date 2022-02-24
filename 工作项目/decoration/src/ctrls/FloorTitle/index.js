/*
 * @Description:
 * @Date: 2021-03-25 17:58:34
 * @LastEditTime: 2021-04-14 11:40:56
 * @FilePath: \yunluzhuangxiu\src\ctrls\FloorTitle\index.js
 */
/**
 * 楼层标题组件
 */
import V from '@/utils/valid';

export default {
  info: {
    name: 'ctrl_floor_title',
    label: '楼层标题',
    icon: 'icon-yemianzhuangxiuicon_huaban1-04',
    assets: {},
    enableBI: false,
  },
  components: {
    preview: () => import('./Preview'),
    editor: () => import('./Editor'),
    result: () => import('./Result'),
  },
  initData: {
    text: '',
    mb15: true,
  },
  validators: {
    text: text =>
      new Promise((resolve, reject) => {
        if (typeof text !== 'string' || text === '') {
          reject(new Error('请填写楼层标题'));
        } else {
          resolve();
        }
      }),
  },
};
