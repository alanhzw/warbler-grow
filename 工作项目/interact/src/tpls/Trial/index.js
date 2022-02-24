/*
 * @Description:会员集卡
 * @Autor: hanzhiwei
 * @Date: 2021-01-28 09:02:50
 * @LastEditTime: 2021-10-26 14:47:00
 * @FilePath: \interact\src\tpls\Trial\index.js
 */

import Common from './common';
import Editor from './common/Editor';
import Durex0 from './durex0';
import Durex0Editor from './durex0/Editor';
import Durex1 from './durex1';
import Durex1Editor from './durex1/Editor';

export default {
  install(Vue) {
    Vue.component('LzTplTrial', Common);
    Vue.component('LzTplTrialEditor', Editor);
    Vue.component('TrialDurex', Durex0);
    Vue.component('TrialDurexEditor', Durex0Editor);
    Vue.component('TrialDurex1', Durex1);
    Vue.component('TrialDurex1Editor', Durex1Editor);
  },
};
