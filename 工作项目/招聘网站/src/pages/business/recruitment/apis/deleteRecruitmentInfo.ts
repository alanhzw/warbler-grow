/*
 * @Author: 一尾流莺
 * @Description:编辑企业招聘状态
 * @Date: 2021-11-18 15:11:57
 * @LastEditTime: 2021-11-20 16:07:22
 * @FilePath: \ired_resource\src\pages\business\recruitment\apis\deleteRecruitmentInfo.ts
 */
import { ref } from 'vue';
import { AdminService } from '@/service';

export default function () {
  const deleteRecruitmentInfoResult = ref();

  const deleteRecruitmentInfo = async (params:any) => {
    const res = await AdminService.deleteRecruitmentInfo({
      ...params,
    });
    deleteRecruitmentInfoResult.value = res;
  };

  return {
    deleteRecruitmentInfoResult,
    deleteRecruitmentInfo,
  };
}
