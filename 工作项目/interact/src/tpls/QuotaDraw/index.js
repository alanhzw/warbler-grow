/*
 * @Description:
 * @Date: 2021-06-16 10:00:55
 * @LastEditTime: 2021-12-02 10:10:32
 * @FilePath: \interact\src\tpls\QuotaDraw\index.js
 */
/**
 * 开卡礼包组件模版合集
 */
import Common from './common';
import Editor from './common/Editor';
import Dettol from './dettol';
import DettolEditor from './dettol/Editor';
import Durex from './durex/index.vue';
import DurexEditor from './durex/Editor.vue';

export default {
  install(Vue) {
    Vue.component('LzTplQuotaDraw', Common);
    Vue.component('LzTplQuotaDrawEditor', Editor);
    Vue.component('LzTplQuotaDrawDettol', Dettol);
    Vue.component('LzTplQuotaDrawDettolEditor', DettolEditor);

    Vue.component('LzTplQuotaDrawAll', Common);
    Vue.component('LzTplQuotaDrawAllEditor', Editor);

    Vue.component('LzTplQuotaDrawAllDet', Dettol);
    Vue.component('LzTplQuotaDrawAllDetEditor', DettolEditor);

    Vue.component('DurexQuotaDrawAll', Durex);
    Vue.component('DurexQuotaDrawAllEditor', DurexEditor);
  },
};
