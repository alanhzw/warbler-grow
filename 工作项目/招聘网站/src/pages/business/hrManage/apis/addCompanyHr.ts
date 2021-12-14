/*
 * @Author: 一尾流莺
 * @Description:添加公司Hr
 * @Date: 2021-11-01 10:25:46
 * @LastEditTime: 2021-11-17 15:16:07
 * @FilePath: \ired_resource\src\pages\business\hrManage\apis\addCompanyHr.ts
 */
import { ref } from 'vue';
// @ts-ignore 因为引入的是js  所以找不到类型声明文件
import { AdminService } from '@/service';

const useAddCompanyHr = () => {
  const addCompanyHrResult = ref();
  const addCompanyHr = async (params:any) => {
    const res = await AdminService.addCompanyHr({
      avatarUrl: params.avatarUrl,
      companyId: params.companyId,
      name: params.name,
      phone: params.phone,
      position: params.position,
    });
    addCompanyHrResult.value = res;
  };

  return {
    addCompanyHrResult,
    addCompanyHr,
  };
};

export default useAddCompanyHr;
