/*
 * @Descripttion: 相似职位接口
 * @Author: yang chenglin
 * @Date: 2021-11-04 19:38:30
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-05 18:43:51
 */

import { reactive } from 'vue';
import { UserService } from '@/service';

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
      total: res.result.total,
      size: res.result.size,
      current: res.result.current,
    };
  };

  return {
    similarPositions,
    setSimilarPositions,
  };
};

export default useSimilarPositions;
