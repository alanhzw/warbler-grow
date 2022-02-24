/*
 * @Description:会员集卡
 * @Autor: hanzhiwei
 * @Date: 2021-01-28 09:02:50
 * @LastEditTime: 2021-01-28 09:14:03
 * @FilePath: \yunluhuodong\src\tpls\collectCard\index.js
 */

import Common from './common';
import Editor from './common/Editor';

export default {
  install(Vue) {
    Vue.component('LzTplCardCollection', Common);
    Vue.component('LzTplCardCollectionEditor', Editor);
  },
};
