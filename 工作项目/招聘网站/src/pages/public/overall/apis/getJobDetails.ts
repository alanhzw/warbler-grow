/*
 * @Author: 一尾流莺
 * @Description:查看全部-通过id获取职位详情
 * @Date: 2021-11-01 10:25:46
 * @LastEditTime: 2021-11-14 15:53:55
 * @FilePath: \ired_resource\src\pages\public\overall\apis\getJobDetails.ts
 */
import { ref } from 'vue';
// @ts-ignore 因为引入的是js  所以找不到类型声明文件
import { CommonService } from '@/service';

const useGetJobDetails = () => {
  const jobDetails = ref<any>({});
  const getJobDetails = async (recruitmentInfoId:any) => {
    const res = await CommonService.getJobDetails({
      recruitmentInfoId,
    });
    jobDetails.value = res;
    return res;
  };

  return {
    jobDetails,
    getJobDetails,
  };
};

export default useGetJobDetails;
