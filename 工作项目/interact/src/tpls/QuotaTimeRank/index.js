/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-06-16 10:00:55
 * @LastEditTime: 2021-08-09 16:54:07
 * @FilePath: \interact\src\tpls\QuotaTimeRank\index.js
 */
/**
 * 开卡礼包组件模版合集
 */
import Common from './common';

import Editor from './common/Editor';

import Dettol0 from './dettol0';

import Dettol0Editor from './dettol0/Editor';

export default {
  install(Vue) {
    Vue.component('LzTplQuotaTimeRank', Common);
    Vue.component('LzTplQuotaTimeRankEditor', Editor);
    Vue.component('QuotaTimeRankDettol', Dettol0);
    Vue.component('QuotaTimeRankDettolEditor', Dettol0Editor);
  },
};
