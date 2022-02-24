/*
 * @Description:
 * @Date: 2021-03-23 16:08:04
 * @LastEditTime: 2021-04-14 11:42:03
 * @FilePath: \yunluzhuangxiu\src\ctrls\Tags\index.js
 */
/**
 * 文字组件
 */
import V from '@/utils/valid';

export default {
  info: {
    name: 'ctrl_tags',
    label: '文字标签',
    icon: 'icon-yemianzhuangxiuicon_huaban1-05',
    assets: {},
    enableBI: false,
  },
  components: {
    preview: () => import('./Preview'),
    editor: () => import('./Editor'),
    result: () => import('./Result'),
  },
  initData: {
    tags: [
      {
        text: '',
        link: '',
      },
    ],
    mb15: true,
  },
  funs: {
    text: text =>
      new Promise((resolve, reject) => {
        if (typeof text !== 'string' || text === '') {
          reject(new Error('请添加标签文字内容'));
        } else {
          resolve();
        }
      }),
    link: link =>
      new Promise((resolve, reject) => {
        if (typeof link !== 'string' || link === '') {
          // reject(new Error('请添加标签链接'));
          resolve();
        } else if (!V.isValidLink(link)) {
          reject(new Error(`链接不符合规范，请使用以http/https开头，${V.getValidDomains().join('、')}域名下的链接`));
        } else {
          resolve();
        }
      }),
  },
  validators: {
    tags: tags =>
      new Promise((resolve, reject) => {
        if (Array.isArray(tags) && tags.length > 0) {
          if (tags.some(tag => typeof tag.text !== 'string' || tag.text === '')) {
            reject(new Error('请添加标签文字内容'));
            // } else if (tags.some(tag => typeof tag.link !== 'string' || tag.link === '')) {
            //   reject(new Error('请添加标签链接'));
          } else if (tags.some(tag => typeof tag.link === 'string' && tag.link !== '' && !V.isValidLink(tag.link))) {
            reject(new Error(`链接不符合规范，请使用以http/https开头，${V.getValidDomains().join('、')}域名下的链接`));
          } else if (tags.some(tag => typeof tag.link === 'string' && tag.link !== '' && !tag.title)) {
            reject(new Error('请修改链接标题'));
          } else {
            resolve();
          }
        } else {
          reject(new Error('请添加标签'));
        }
      }),
  },
};
