/*
 * @Descripttion: 行政地区
 * @Author: 一尾流莺
 * @Date: 2021-11-10 20:38:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-15 14:49:45
 */

import { ref } from 'vue';
// @ts-ignore
import { CommonService } from '@/service';

const useQueryRelatedPositions = () => {
  const queryPositionsResult = ref<any>([]);
  const totalPositions = ref(0);

  const queryRelatedPositions = async (queryParams:any) => {
    const res = await CommonService.queryRelatedPositions({
      cityCode: queryParams?.cityCode || '',
      pageNo:queryParams?.pageNo || 1,
      pageSize:queryParams?.pageSize || 10,
      provinceCode:queryParams?.provinceCode || '',
      searchName:queryParams?.searchName || '',
    });
    queryPositionsResult.value = res.records;
    totalPositions.value = res.total
  };

  return {
    queryPositionsResult,
    queryRelatedPositions,
    totalPositions
  };
};

export default useQueryRelatedPositions;
