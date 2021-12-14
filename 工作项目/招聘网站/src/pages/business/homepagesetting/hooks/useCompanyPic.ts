/*
 * @Descripttion: 公司图片
 * @Author: yang chenglin
 * @Date: 2021-11-13 22:59:59
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-16 22:00:39
 */

import { ref } from 'vue';
import { AdminService } from '@/service';

const useCompanyIndustry = () => {
  const companyPic = ref([]);

  // 上传公司图片
  // const getCompanyInfo = async () => {
  //   const res = await AdminService.getCompanyInfo();
  //   companyInfo.value = res;
  // };

  // 添加公司图片
  const addCompanyPic = async (obj: Object) => {
    const res = await AdminService.addCompanyPic(obj);
  };

  return {
    companyPic,
    // getCompanyInfo,
    addCompanyPic,
  };
};

export default useCompanyIndustry;
