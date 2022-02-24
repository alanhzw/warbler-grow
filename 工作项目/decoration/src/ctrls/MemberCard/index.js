/*
 * @Description:
 * @Date: 2021-04-09 18:10:40
 * @LastEditTime: 2021-04-21 15:34:08
 * @FilePath: \yunluzhuangxiu\src\ctrls\MemberCard\index.js
 */
/**
 * 文字组件
 */
import Axios from 'axios';
import Service from '@/business/service';

const initData = {
  levels: [],
  lIndex: 0,
  mb15: true,
};
export default {
  info: {
    name: 'ctrl_member_card',
    label: '头部组件',
    assets: {
      icon: require('./assets/ctrl-icon-member-card.png'),
      disableIcon: require('./assets/ctrl-icon-member-card.png'),
    },
    enableBI: false,
  },
  components: {
    preview: () => import('./Preview'),
    editor: () => import('./Editor'),
    result: () => import('./Result'),
  },
  initData,
  validators: {},
};
