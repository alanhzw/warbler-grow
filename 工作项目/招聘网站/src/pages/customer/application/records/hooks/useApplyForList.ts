/*
 * @Descripttion: 应聘记录接口
 * @Author: yang chenglin
 * @Date: 2021-11-03 18:28:47
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-05 18:40:29
 */

import { reactive } from 'vue';
import { UserService } from '@/service';

const useApplyForList = () => {
  const applyForList = reactive({
    list: [],
    page: {
      total: 0,
      size: 10,
      current: 1,
    },
  });
  const setApplyForList = async (obj: Object) => {
    const res = await UserService.getApplyForList({
      ...obj,
      pageNo: applyForList.page.current,
      pageSize: applyForList.page.size,
    });
    applyForList.list = res.records;
    applyForList.page = {
      total: res.total,
      size: res.size,
      current: res.current,
    };
  };

  return {
    applyForList,
    setApplyForList,
  };
};

export default useApplyForList;
