/*
 * @Author: 一尾流莺
 * @Description:获取公司详情
 * @Date: 2021-11-01 10:25:46
 * @LastEditTime: 2021-11-19 15:29:55
 * @FilePath: \ired_resource\src\pages\business\hrManage\apis\getCompanyInfo.ts
 */
import { ref } from 'vue';
// @ts-ignore 因为引入的是js  所以找不到类型声明文件
import { AdminService } from '@/service';

const useGetCompanyInfo = () => {
  const companyInfo = ref<any>({
    companyId: '',
  });
  const getCompanyInfo = async () => {
    const res = await AdminService.getCompanyInfo();
    companyInfo.value = res;
    return res;
  };

  return {
    companyInfo,
    getCompanyInfo,
  };
};

export default useGetCompanyInfo;
