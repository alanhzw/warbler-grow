/*
 * @Descripttion: 行政地区
 * @Author: 一尾流莺
 * @Date: 2021-11-10 20:38:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-14 17:37:37
 */

import { ref } from 'vue';
// @ts-ignore
import { CommonService } from '@/service';

const useQueryRelatedEnterprises = () => {
  const queryEnterprisesResult = ref<any>([]);
  const totalEnterprises = ref(0);

  const queryRelatedEnterprises = async (queryParams:any) => {
    const res = await CommonService.queryRelatedEnterprises({
      cityCode: queryParams?.cityCode || '',
      pageNo:queryParams?.pageNo || 1,
      pageSize:queryParams?.pageSize || 10,
      provinceCode:queryParams?.provinceCode || '',
      searchName:queryParams?.searchName || '',
    });
    queryEnterprisesResult.value = res.records;
    totalEnterprises.value = res.total
  };

  return {
    queryEnterprisesResult,
    queryRelatedEnterprises,
    totalEnterprises
  };
};

export default useQueryRelatedEnterprises;
