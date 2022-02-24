/*
 * @Author: YC
 * @Description:
 * @Date: 2021-06-16 10:00:55
 * @LastEditTime: 2021-08-09 16:53:46
 * @FilePath: \interact\src\tpls\QuotaAmountRank\index.js
 */
/**
 * 消费金额排名模版合集
 */
import Common from './common';

import Editor from './common/Editor';

import Dettol0 from './dettol0';

import Dettol0Editor from './dettol0/Editor';

export default {
  install(Vue) {
    Vue.component('LzTplQuotaAmountRank', Common);
    Vue.component('LzTplQuotaAmountRankEditor', Editor);
    Vue.component('QuotaAmountRankDetto', Dettol0);
    Vue.component('QuotaAmountRankDettoEditor', Dettol0Editor);
  },
};
