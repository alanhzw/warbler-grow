/*
 * @Descripttion: 在线简历-求职状态
 * @Author: yang chenglin
 * @Date: 2021-11-09 20:06:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-18 15:34:33
 */
import { ref } from 'vue';
import { AdminService } from '@/service';

const useJobStatus = () => {
  const jobStatus = ref();

  const getJobStatus = async () => {
    const res = await AdminService.getJobStatus();
    jobStatus.value = res;
  };

  return {
    jobStatus,
    getJobStatus,
  };
};

export default useJobStatus;
