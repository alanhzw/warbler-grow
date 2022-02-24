/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-08-30 10:30:12
 * @LastEditTime: 2021-08-30 11:34:48
 * @FilePath: \custom\src\pages\1000002983\99\2108100000298301\hooks\useBaseInfo.ts
 */

import { inject } from 'vue';
import { BaseInfo } from '@/types/BaseInfo';

const useBaseInfo = ():any => {
// 基本信息
  const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
  const isOpenCard: boolean = inject('isOpenCard') as boolean;
  return {
    baseInfo, isOpenCard,
  };
};

export default useBaseInfo;
