/*
 * @Author: 一尾流莺
 * @Description:首页-获取岗位列表
 * @Date: 2021-11-01 10:25:46
 * @LastEditTime: 2021-11-13 15:15:04
 * @FilePath: \ired_resource\src\pages\public\home\apis\getTalentsClassifyListNew.ts
 */
import { ref } from 'vue';
// @ts-ignore 因为引入的是js  所以找不到类型声明文件
import { CommonService } from '@/service';

const useGetTalentsClassifyListNew = () => {
  const talentsClassifyList = ref([]);
  const getTalentsClassifyListNew = async () => {
    const res = await CommonService.getTalentsClassifyListNew({});
    talentsClassifyList.value = res;
    return res;
  };

  return {
    talentsClassifyList,
    getTalentsClassifyListNew,
  };
};

export default useGetTalentsClassifyListNew;
