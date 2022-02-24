/*
 * @Author: 一尾流莺
 * @Description:添加企业招聘信息
 * @Date: 2021-11-01 10:25:46
 * @LastEditTime: 2021-11-20 14:23:56
 * @FilePath: \ired_resource\src\pages\business\recruitment\apis\addRecruitmentInfo.ts
 */
import { ref } from 'vue';
// @ts-ignore 因为引入的是js  所以找不到类型声明文件
import { AdminService } from '@/service';

const useAddRecruitmentInfo = () => {
  const addRecruitmentInfoResult = ref();
  const addRecruitmentInfo = async (params: any) => {
    if (params.isLongValid) {
      delete params.endTime;
    }
    const res = await AdminService.addRecruitmentInfo({
      ...params,
      isLongValid: params.isLongValid ? '1' : '2',
    });
    addRecruitmentInfoResult.value = res;
  };

  return {
    addRecruitmentInfoResult,
    addRecruitmentInfo,
  };
};

export default useAddRecruitmentInfo;
