/*
 * @Author: 一尾流莺
 * @Description:YSL关注店铺送积分 基本配置项
 * @Date: 2021-09-16 14:39:03
 * @LastEditTime: 2021-12-07 15:29:00
 * @FilePath: \custom\src\pages\1000396688\99\2111100039668801\config\index.ts
 */

import newOptions from './newOptions';
import oldOptions from './oldOptions';

// 获取配置项
export default function (type: string) {
  if (type === 'new') {
    return newOptions;
  }
  if (type === 'old') {
    return oldOptions;
  }
  return oldOptions;
}
