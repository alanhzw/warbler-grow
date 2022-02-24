/**
 * 文字组件
 */
import V from '@/utils/valid';

export default {
  info: {
    name: 'ctrl_text',
    label: '文字活动',
    icon: 'icon-icon-20',
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
    link: '',
    mb15: true,
  },
  validators: {
    text: text =>
      new Promise((resolve, reject) => {
        if (typeof text !== 'string' || text === '') {
          reject(new Error('请添加文字内容'));
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
