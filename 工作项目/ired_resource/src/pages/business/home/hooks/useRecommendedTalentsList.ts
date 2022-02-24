/*
 * @Descripttion: 推荐人才列表
 * @Author: yang chenglin
 * @Date: 2021-11-12 19:10:20
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-17 18:16:21
 */
import { reactive } from 'vue';
import { AdminService } from '@/service';

const useRecommendedTalentsList = () => {
  const recommendedTalentsList = reactive({
    list: [],
    page: {
      total: 0,
      size: 10,
      current: 1,
    },
  });
  const getRecommendedTalentsList = async () => {
    const res = await AdminService.getRecommendedTalentsList(
      // {
      // ...obj,
      // pageNo: applyForList.page.current,
      // pageSize: applyForList.page.size,
      // }
    );
    recommendedTalentsList.list = res;
    // recommendedTalentsList.page = {
    //   total: res.total,
    //   size: res.size,
    //   current: res.current,
    // };
  };

  return {
    recommendedTalentsList,
    getRecommendedTalentsList,
  };
};

export default useRecommendedTalentsList;
