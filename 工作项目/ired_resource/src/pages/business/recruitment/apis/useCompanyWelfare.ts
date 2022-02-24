/*
 * @Descripttion: 公司福利标签
 * @Author: yang chenglin
 * @Date: 2021-11-13 22:59:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-19 14:45:41
 */

import { ref } from 'vue';
import { AdminService } from '@/service';

const useCompanyWelfare = () => {
  const companyWelfare = ref<any>([]);

  // 获取公司福利标签
  const getWelfareTag = async () => {
    const res = await AdminService.getWelfareTag();
    companyWelfare.value = res;
  };

  return {
    companyWelfare,
    getWelfareTag,
  };
};

export default useCompanyWelfare;
