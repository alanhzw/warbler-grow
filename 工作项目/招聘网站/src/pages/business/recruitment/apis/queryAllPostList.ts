/*
 * @Author: 一尾流莺
 * @Description:获取岗位名称
 * @Date: 2021-11-18 15:11:58
 * @LastEditTime: 2021-11-19 10:49:43
 * @FilePath: \ired_resource\src\pages\business\recruitment\apis\queryAllPostList.ts
 */
import { ref } from 'vue';
import { AdminService } from '@/service';

export default function () {
  const allPostList = ref<any>([
    {
      classifies: [],
    },
  ]);

  const queryAllPostList = async (params: any) => {
    const res = await AdminService.queryAllPostList({
      ...params,
    });
    allPostList.value = res;
  };

  return {
    allPostList,
    queryAllPostList,
  };
}
