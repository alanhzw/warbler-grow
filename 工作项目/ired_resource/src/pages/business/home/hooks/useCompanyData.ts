/*
 * @Descripttion: 企业首页获取招聘数据
 * @Author: yang chenglin
 * @Date: 2021-11-12 18:56:13
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-12 19:32:53
 */
import { ref } from 'vue';
import { AdminService } from '@/service';

const useCompanyData = () => {
  const companyData = ref({
    recruitmentStartNumber: 0,
    resumeQuantity: 0,
    recruitmentCompletionNumber: 0,
    firstInvitesNumber: 0,
    repeatedInvitationsNumber: 0,
    employmentNumber: 0,
  });
  const getCompanyData = async () => {
    const res = await AdminService.getCompanyData();
    // Object.keys(companyData).forEach((it: String) => {
    //   companyData[it] = res[it];
    // });
    // console.log(companyData);
    companyData.value = res;
  };

  return {
    companyData,
    getCompanyData,
  };
};

export default useCompanyData;
