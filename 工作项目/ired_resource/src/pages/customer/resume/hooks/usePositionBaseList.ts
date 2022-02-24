/*
 * @Descripttion: 在线简历-期望职位
 * @Author: yang chenglin
 * @Date: 2021-11-06 11:21:29
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-09 18:48:05
 */
import { ref } from 'vue';
import { CommonService } from '@/service';

const usePositionBaseList = () => {
  const positionBaseList = ref([]);

  // 期望职位
  const getPositionBaseList = async () => {
    const res = await CommonService.getPositionBaseList();
    positionBaseList.value = res;
  };

  return {
    positionBaseList,
    getPositionBaseList,
  };
};

export default usePositionBaseList;
