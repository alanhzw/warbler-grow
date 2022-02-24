/*
 * @Author: 一尾流莺
 * @Description:编辑企业招聘状态
 * @Date: 2021-11-18 15:11:57
 * @LastEditTime: 2021-11-20 15:58:09
 * @FilePath: \ired_resource\src\pages\business\recruitment\apis\editRecruitmentStatus.ts
 */
import { ref } from 'vue';
import { AdminService } from '@/service';

export default function () {
  const editRecruitmentStatusResult = ref();

  const editRecruitmentStatus = async (params:any) => {
    const res = await AdminService.editRecruitmentStatus({
      ...params,
    });
    editRecruitmentStatusResult.value = res;
  };

  return {
    editRecruitmentStatusResult,
    editRecruitmentStatus,
  };
}
