/*
 * @Author: yc
 * @Description:
 * @Date: 2021-06-16 10:00:55
 * @LastEditTime: 2021-08-07 16:02:49
 * @FilePath: \interact\src\tpls\QuotaPrize\index.js
 */
/**
 * 满额有礼组件模版合集
 */


import Common from './common';

import Manual from './common/Manual';
import Editor from './common/Editor';

import QuotaPrizeDettol from './dettolHandle/index.vue';
import QuotaPrizeDettolEditor from './dettolHandle/Editor.vue';

import QuotaPrizeDettolAuto from './dettolAuto/Manual.vue';
import QuotaPrizeDettolAutoEditor from './dettolAuto/Editor.vue';


export default {
  install(Vue) {
    // 通用手动领取
    Vue.component('LzTplQuotaPrize', Common);
    Vue.component('LzTplQuotaPrizeEditor', Editor);
    // 通用自动发放
    Vue.component('LzTplQuotaPrizeAuto', Manual);
    Vue.component('LzTplQuotaPrizeAutoEditor', Editor);
    // 滴露手动领取
    Vue.component('QuotaPrizeAutoDettol', QuotaPrizeDettol);
    Vue.component('QuotaPrizeAutoDettolEditor', QuotaPrizeDettolEditor);
    // 滴露自动发放
    Vue.component('QuotaPrizeDettol', QuotaPrizeDettolAuto);
    Vue.component('QuotaPrizeDettolEditor', QuotaPrizeDettolAutoEditor);
  },
};
