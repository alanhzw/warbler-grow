/*
 * @Author: 一尾流莺
 * @Description:【滴露】明星集卡抽奖 获取基础信息
 * @Date: 2021-08-30 10:30:12
 * @LastEditTime: 2021-09-16 15:28:43
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\hooks\useBaseInfo.ts
 */

import { inject } from 'vue';
import type { BaseInfo } from '@/types/BaseInfo';

interface UseBaseInfo{
  baseInfo: BaseInfo,
  isOpenCard:boolean
}

const useBaseInfo = ():UseBaseInfo => {
// 基本信息
  const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
  const isOpenCard: boolean = inject('isOpenCard') as boolean;
  return {
    baseInfo, isOpenCard,
  };
};

export default useBaseInfo;
