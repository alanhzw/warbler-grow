/*
 * @Descripttion: 在线简历-工作年限
 * @Author: yang chenglin
 * @Date: 2021-11-09 20:06:54
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-09 22:45:24
 */
import { ref } from 'vue';
import { CommonService } from '@/service';

const useWorkTime = () => {
  const workTime = ref([]);

  // 学历列表
  const getWorkTime = async () => {
    const res = await CommonService.getWorkExperience();
    workTime.value = res;
  };

  return {
    workTime,
    getWorkTime,
  };
};

export default useWorkTime;
