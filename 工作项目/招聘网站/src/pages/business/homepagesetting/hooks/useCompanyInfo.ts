/*
 * @Descripttion: 公司信息
 * @Author: yang chenglin
 * @Date: 2021-11-13 22:59:59
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-14 21:24:39
 */

import { ref } from 'vue';
import { AdminService } from '@/service';

const useCompanyIndustry = () => {
  const companyInfo = ref({
    // companyAddr: '',
    // companyId: '',
    // companyIntroduce: '',
    // financingStatus: '',
    companyWelfareList: [],
    // fullName: '',
    // industryId: '',
    latitude: 0,
    longitude: 0,
    // logoUrl: '',
    // shortName: '',
    // staffSize: '',
  });

  // 获取公司信息
  const getCompanyInfo = async () => {
    const res = await AdminService.getCompanyInfo();
    companyInfo.value = res;
  };

  // 编辑公司信息
  const editCompanyInfo = async (obj: Object) => {
    await AdminService.editCompanyInfo(obj);
  };

  return {
    companyInfo,
    getCompanyInfo,
    editCompanyInfo,
  };
};

export default useCompanyIndustry;
