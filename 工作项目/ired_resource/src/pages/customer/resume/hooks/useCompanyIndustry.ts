/*
 * @Descripttion: 在线简历-期望行业
 * @Author: yang chenglin
 * @Date: 2021-11-06 11:14:46
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-09 18:48:09
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
