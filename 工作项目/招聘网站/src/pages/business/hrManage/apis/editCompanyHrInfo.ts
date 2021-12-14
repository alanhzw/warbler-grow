/*
 * @Author: 一尾流莺
 * @Description:编辑公司Hr
 * @Date: 2021-11-01 10:25:46
 * @LastEditTime: 2021-11-16 11:15:03
 * @FilePath: \ired_resource\src\pages\business\hrManage\apis\editCompanyHrInfo.ts
 */
import { ref } from 'vue';
// @ts-ignore 因为引入的是js  所以找不到类型声明文件
import { AdminService } from '@/service';

const useEditCompanyHrInfo = () => {
  const editCompanyHrInfoResult = ref();
  const editCompanyHrInfo = async (params:any) => {
    const res = await AdminService.editCompanyHrInfo({
      avatarUrl: params.avatarUrl,
      hrInfoId: params.hrInfoId,
      name: params.name,
      phone: params.phone,
      position: params.position,
    });
    editCompanyHrInfoResult.value = res;
    return res;
  };

  return {
    editCompanyHrInfoResult,
    editCompanyHrInfo,
  };
};

export default useEditCompanyHrInfo;
