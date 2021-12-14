/*
 * @Descripttion: 应聘列表接口
 * @Author: yang chenglin
 * @Date: 2021-11-11 21:41:22
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-11 21:41:38
 */

import { reactive } from 'vue';
import { AdminService } from '@/service';

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
    const res = await AdminService.getListByCompanyId({
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
