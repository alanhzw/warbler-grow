/*
 * @Author: 一尾流莺
 * @Description:首页-获取正在招聘
 * @Date: 2021-11-01 10:25:46
 * @LastEditTime: 2021-11-21 21:28:18
 * @FilePath: \ired_resource\src\pages\public\home\apis\getRecruitmentPlazaList.ts
 */
import { ref } from 'vue';
// @ts-ignore 因为引入的是js  所以找不到类型声明文件
import { CommonService } from '@/service';

const useGetRecruitmentPlazaList = () => {
  const recruitmentPlazaList = ref<any>([]);
  const getRecruitmentPlazaList = async (pageNo:number) => {
    const res = await CommonService.getRecruitmentPlazaList({
      pageNo,
      pageSize:12
    });
    res.records.forEach((item:any) => {
      recruitmentPlazaList.value.push(item)
    });
    return res;
  };

  return {
    recruitmentPlazaList,
    getRecruitmentPlazaList,
  };
};

export default useGetRecruitmentPlazaList;
