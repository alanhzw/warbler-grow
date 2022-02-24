/*
 * @Descripttion: 在线简历预览
 * @Author: yang chenglin
 * @Date: 2021-11-07 15:15:42
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-17 23:50:30
 */
import { ref } from 'vue';
import { AdminService } from '@/service';

const useUserResumeInfo = () => {
  const userResumeInfo = ref({});

  // 获取标签列表
  const setUserResumeInfo = async (obj: Object) => {
    const res = await AdminService.getUserResumeInfo(obj);
    userResumeInfo.value = res;
  };
  return {
    userResumeInfo,
    setUserResumeInfo,
  };
};

export default useUserResumeInfo;
