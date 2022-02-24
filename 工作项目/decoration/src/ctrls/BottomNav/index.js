/**
 * 文字组件
 */
import V from '@/utils/valid';

export default {
  info: {
    name: 'ctrl_bottom_bar',
    label: '底部导航',
    icon: 'icon-yemianzhuangxiuicon-20',
    assets: {},
    enableBI: false,
    wrapperStyle: {
      // position: 'absolute',
      // top: '627px',
      // width: '100%',
      // left: 0,
      // zIndex: 11,
    },
  },
  components: {
    preview: () => import('./Preview'),
    editor: () => import('./Editor'),
    result: () => import('./Result'),
  },
  initData: {
    navs: [
      {
        label: '首页', // label文字
        icon: 'https://img.alicdn.com/imgextra/i3/3314305802/O1CN01KLyeaq1sjMfoirroD_!!3314305802.png', // icon 图标地址
        targetType: 2, // 目标页面类型 1 - 自定义web链接， 2-会员中心，3-积分商城，4-个人中心
        url: '', // 只在targetType=1 自定义web链接时有效
      }, {
        label: '积分商城',
        icon: 'https://img.alicdn.com/imgextra/i1/3314305802/O1CN01rAEtPZ1sjMfYxYH6S_!!3314305802.png',
        targetType: 3,
        url: '',
      }, {
        label: '自定义',
        icon: 'https://img.alicdn.com/imgextra/i1/3314305802/O1CN01hGqUVK1sjMfff7JaH_!!3314305802.png',
        targetType: 1,
        url: 'https://m.baidu.com',
      }, {
        label: '个人中心',
        icon: 'https://img.alicdn.com/imgextra/i2/3314305802/O1CN01sLV9bO1sjMfYxYg4n_!!3314305802.png',
        targetType: 4,
        url: '',
      },
    ],
  },
  funs: {
    icon: icon =>
      new Promise((resolve, reject) => {
        if (typeof icon !== 'string' || icon === '') {
          reject(new Error('请上传滑动图片'));
        } else {
          resolve();
        }
      }),
    label: label =>
      new Promise((resolve, reject) => {
        if (typeof label === 'string' && label !== '') {
          resolve();
        } else {
          reject(new Error('请填写菜单文字'));
        }
      }),
  },
  validators: {
  },
};
