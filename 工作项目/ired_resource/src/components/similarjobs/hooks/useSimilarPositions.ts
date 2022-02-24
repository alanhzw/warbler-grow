/*
 * @Descripttion: 相似职位接口
 * @Author: yang chenglin
 * @Date: 2021-11-04 19:38:30
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-14 21:22:09
 */

import { reactive } from 'vue';
import { UserService, CommonService } from '@/service';

const useSimilarPositions = () => {
  const similarPositions = reactive({
    list: [],
    page: {
      total: 0,
      size: 4,
      current: 1,
    },
  });
  const setSimilarPositions = async (obj: Object) => {
    const res = await UserService.getSimilarPositions(obj);
    similarPositions.list = res.records;
    similarPositions.page = {
      total: res.total,
      size: res.size,
      current: res.current,
    };
  };
  const setNotThisCompanySimilarJobList = async (obj: Object) => {
    const res = await CommonService.getNotThisCompanySimilarJobList(obj);
    similarPositions.list = res.records;
    similarPositions.page = {
      total: res.total,
      size: res.size,
      current: res.current,
    };
  };

  return {
    similarPositions,
    setSimilarPositions,
    setNotThisCompanySimilarJobList,
  };
};

export default useSimilarPositions;
