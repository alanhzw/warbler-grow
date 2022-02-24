/**
 * 所有模版组件的入口文件
 */
// 引入文件
import Demo from './demo';
import QuotaPrize from './QuotaPrize';
import QuotaDraw from './QuotaDraw';
import QuotaAmountRank from './QuotaAmountRank';
import QuotaTimeRank from './QuotaTimeRank';
import CollectCard from './CollectCard';
import trial from './Trial';

const templates = [Demo, QuotaPrize, QuotaDraw, QuotaAmountRank, QuotaTimeRank, CollectCard, trial];

const install = (Vue) => {
  // 如果已经安装了就return
  if (install.installed) {
    return;
  }
  // 遍历templates 将每个模版加入到Vue的组件中
  templates.forEach((template) => {
    if (typeof template.install === 'function') {
      template.install(Vue);
    }
  });
};

// 逐个导出各个组件
export { Demo, QuotaPrize, QuotaDraw, QuotaAmountRank, QuotaTimeRank, CollectCard, trial };

export default {
  // 导出install方法便于全局引入
  install,
};
