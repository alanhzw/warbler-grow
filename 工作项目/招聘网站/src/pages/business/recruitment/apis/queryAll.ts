/*
 * @Author: 一尾流莺
 * @Description:获取岗位名称
 * @Date: 2021-11-18 15:11:58
 * @LastEditTime: 2021-11-18 18:21:44
 * @FilePath: \ired_resource\src\pages\business\recruitment\apis\queryAll.ts
 */
import { ref } from 'vue';
import { AdminService } from '@/service';

const useQueryAll = () => {
  const queryAllList = ref<any>([
    {
      classifies: [],
    },
  ]);

  const queryAll = async () => {
    const res = await AdminService.queryAll();
    queryAllList.value = res;
  };

  return {
    queryAllList,
    queryAll,
  };
};

export default useQueryAll;
