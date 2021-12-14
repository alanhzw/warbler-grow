/*
 * @Descripttion: 行业
 * @Author: yang chenglin
 * @Date: 2021-11-10 20:42:50
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-10 20:43:44
 */

import { ref } from 'vue';
import { CommonService } from '@/service';

const useCompanyIndustry = () => {
  const companyIndustry = ref([]);

  // 行业列表
  const getCompanyIndustry = async () => {
    const res = await CommonService.getCompanyIndustry();
    companyIndustry.value = res;
  };

  return {
    companyIndustry,
    getCompanyIndustry,
  };
};

export default useCompanyIndustry;
