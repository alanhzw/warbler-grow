/*
 * @Descripttion: 在线简历-求职状态
 * @Author: yang chenglin
 * @Date: 2021-11-09 20:06:54
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-09 22:53:47
 */
import { ref } from 'vue';
import { CommonService } from '@/service';

const useJobStatus = () => {
  const jobStatus = ref([]);

  // 求职状态
  const getJobStatus = async () => {
    const res = await CommonService.getJobStatus();
    jobStatus.value = res;
  };

  return {
    jobStatus,
    getJobStatus,
  };
};

export default useJobStatus;
