/*
 * @Descripttion: 在线简历-期望薪资
 * @Author: yang chenglin
 * @Date: 2021-11-06 11:14:46
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-09 18:48:17
 */
import { ref } from 'vue';
import { AdminService } from '@/service';

const useExpectMoney = () => {
  const expectMoney = ref();

  // 期望薪资
  const getExpectMoney = async () => {
    const res = await AdminService.getExpectMoney();
    expectMoney.value = res;
  };

  return {
    expectMoney,
    getExpectMoney,
  };
};

export default useExpectMoney;
