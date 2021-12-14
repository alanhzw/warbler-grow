/*
 * @Descripttion: 收藏记录接口
 * @Author: yang chenglin
 * @Date: 2021-11-03 18:28:47
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-21 11:46:01
 */

import { reactive } from 'vue';
import { UserService } from '@/service';

const useCollectRecruitmentList = () => {
  const collectRecruitmentList = reactive({
    list: [],
    page: {
      total: 0,
      size: 10,
      current: 1,
    },
  });
  // 获取收藏列表
  const setCollectRecruitmentList = async (obj: Object) => {
    const res = await UserService.getCollectRecruitmentList({
      ...obj,
      pageNo: collectRecruitmentList.page.current,
      pageSize: collectRecruitmentList.page.size,
    });
    collectRecruitmentList.list = res.records;
    collectRecruitmentList.page = {
      total: res.total,
      size: res.size,
      current: res.current,
    };
    console.log(collectRecruitmentList);
  };
  // 收藏职位
  const setCollectRecruitment = async (obj: Object) => {
    const res = await UserService.collectRecruitment(obj);
  };
  // 取消收藏职位
  const setUnCollectRecruitment = async (obj: Object) => {
    const res = await UserService.unCollectRecruitment(obj);
  };

  return {
    collectRecruitmentList,
    setCollectRecruitmentList,
    setCollectRecruitment,
    setUnCollectRecruitment,
  };
};

export default useCollectRecruitmentList;
