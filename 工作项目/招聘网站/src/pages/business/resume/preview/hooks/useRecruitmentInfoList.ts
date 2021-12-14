/*
 * @Descripttion: 获取企业招聘信息列表
 * @Author: yang chenglin
 * @Date: 2021-11-13 11:45:14
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-21 18:42:25
 */

import { ref } from 'vue';
// @ts-ignore 因为引入的是js  所以找不到类型声明文件
import { AdminService } from '@/service';

const useRecruitmentInfoList = () => {
  const recruitmentInfoList = ref([]);
  const getRecruitmentInfoList = async () => {
    const res = await AdminService.companyPostList();
    recruitmentInfoList.value = res;
  };

  return {
    recruitmentInfoList,
    getRecruitmentInfoList,
  };
};

export default useRecruitmentInfoList;
