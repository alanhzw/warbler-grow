/*
 * @Descripttion: 数据统计接口
 * @Author: yang chenglin
 * @Date: 2021-11-09 22:39:49
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-09 22:44:14
 */

import { reactive } from 'vue';
import { AdminService } from '@/service';

const useDataStatistics = () => {
  const dataStatistics = reactive({
    list: [],
    page: {
      total: 0,
      size: 10,
      current: 1,
    },
  });
  const getDataStatistics = async (obj: Object) => {
    const res = await AdminService.getDataStatistics({
      ...obj,
      pageNo: dataStatistics.page.current,
      pageSize: dataStatistics.page.size,
    });
    dataStatistics.list = res.records;
    dataStatistics.page = {
      total: res.total,
      size: res.size,
      current: res.current,
    };
  };

  return {
    dataStatistics,
    getDataStatistics,
  };
};

export default useDataStatistics;
