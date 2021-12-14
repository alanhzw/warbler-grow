/*
 * @Author: 一尾流莺
 * @Description:编辑HR状态
 * @Date: 2021-11-01 10:25:46
 * @LastEditTime: 2021-11-19 15:58:02
 * @FilePath: \ired_resource\src\pages\business\hrManage\apis\editCompanyHrStatus.ts
 */
import { ref } from 'vue';
// @ts-ignore 因为引入的是js  所以找不到类型声明文件
import { AdminService } from '@/service';

const useEditCompanyHrStatus = () => {
  const disabledResult = ref();
  const editCompanyHrStatus = async (params:any) => {
    const res = await AdminService.editCompanyHrStatus({
      ...params,
    });
    disabledResult.value = res;
    return res;
  };

  return {
    disabledResult,
    editCompanyHrStatus,
  };
};

export default useEditCompanyHrStatus;
