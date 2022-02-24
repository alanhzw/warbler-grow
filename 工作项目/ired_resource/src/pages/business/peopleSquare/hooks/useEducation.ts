/*
 * @Descripttion: 在线简历-学历列表
 * @Author: yang chenglin
 * @Date: 2021-11-06 11:14:46
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-09 19:55:34
 */
import { ref } from 'vue';
import { CommonService } from '@/service';

const useEducation = () => {
  const education = ref();

  // 学历列表
  const getEducation = async () => {
    const res = await CommonService.getEducation();
    education.value = res;
  };

  return {
    education,
    getEducation,
  };
};

export default useEducation;
