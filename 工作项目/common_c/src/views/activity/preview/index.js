/*
 * @Author: 一尾流莺
 * @Description:获取配置信息
 * @Date: 2022-01-11 11:42:36
 * @LastEditTime: 2022-01-11 15:54:12
 * @FilePath: \common_c\src\views\activity\preview\index.js
 */

// 完善信息有礼配置
import improveApis from '../improve/utils/apis';
import improveModules from '../improve/utils/modules';
import improveDefaultOption from '../improve/utils/defaultOption';
import improveAllCollects from '../improve/utils/allCollects';

// 其他活动配置
// ... ...

const settings = {
  // 完善信息有礼
  351: {
    apis: improveApis,
    modules: improveModules,
    defaultOption: improveDefaultOption,
    allCollects: improveAllCollects,
  },
  // 其他活动
  352: {
    apis: '',
    modules: '',
    defaultOption: '',
    allCollects: '',
  },
};

// 导出根据活动类型获取配置的方法
const getActivitySettings = (type) => (type in settings ? settings[type] : {});

export default getActivitySettings;
