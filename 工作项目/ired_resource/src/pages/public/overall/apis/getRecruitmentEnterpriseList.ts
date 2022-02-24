/*
 * @Author: 一尾流莺
 * @Description:查看全部-招聘企业
 * @Date: 2021-11-01 10:25:46
 * @LastEditTime: 2021-11-15 15:02:08
 * @FilePath: \ired_resource\src\pages\public\overall\apis\getRecruitmentEnterpriseList.ts
 */
import { ref } from 'vue';
// @ts-ignore 因为引入的是js  所以找不到类型声明文件
import { CommonService } from '@/service';

const useGetRecruitmentEnterpriseList = () => {
  const recruitmentEnterprise = ref<any>([]);
  const getRecruitmentEnterpriseList = async (classificationValue:any,classifyCode:any) => {
    const res = await CommonService.getRecruitmentEnterpriseList({
      classificationValue,
      classifyCode,
    });
    recruitmentEnterprise.value = res;
    return res;
  };

  return {
    recruitmentEnterprise,
    getRecruitmentEnterpriseList,
  };
};

export default useGetRecruitmentEnterpriseList;
