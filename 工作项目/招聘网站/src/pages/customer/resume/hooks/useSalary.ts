/*
 * @Descripttion: 工作经历薪资
 * @Author: yang chenglin
 * @Date: 2021-11-24 18:50:50
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-24 18:50:51
 */
import { ref } from 'vue';
import { CommonService } from '@/service';

const useSalary = () => {
  const salary = ref();

  // 薪资
  const getSalary = async () => {
    const res = await CommonService.getSalary();
    salary.value = res;
  };

  return {
    salary,
    getSalary,
  };
};

export default useSalary;
