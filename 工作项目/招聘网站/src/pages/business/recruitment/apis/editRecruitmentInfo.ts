/*
 * @Author: 一尾流莺
 * @Description:编辑企业招聘信息
 * @Date: 2021-11-01 10:25:46
 * @LastEditTime: 2021-11-20 16:11:51
 * @FilePath: \ired_resource\src\pages\business\recruitment\apis\editRecruitmentInfo.ts
 */
import { ref } from 'vue';
// @ts-ignore 因为引入的是js  所以找不到类型声明文件
import { AdminService } from '@/service';

const useEditRecruitmentInfo = () => {
  const editRecruitmentInfoResult = ref();
  const editRecruitmentInfo = async (params: any) => {
    if (params.isLongValid) {
      delete params.endTime;
    }
    const res = await AdminService.editRecruitmentInfo({
      ...params,
      isLongValid: params.isLongValid ? '1' : '2',
    });
    editRecruitmentInfoResult.value = res;
  };

  return {
    editRecruitmentInfoResult,
    editRecruitmentInfo,
  };
};

export default useEditRecruitmentInfo;
