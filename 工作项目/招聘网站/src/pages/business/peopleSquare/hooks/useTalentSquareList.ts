/*
 * @Descripttion: 人才广场接口
 * @Author: yang chenglin
 * @Date: 2021-11-10 18:31:31
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-17 23:37:49
 */
import { reactive } from 'vue';
import { AdminService } from '@/service';

const useJobStatus = () => {
  const talentSquareList = reactive({
    list: [],
    page: {
      total: 0,
      size: 10,
      current: 1,
    },
  });

  const getTalentSquareList = async (obj: Object) => {
    Object.keys(obj).forEach((it) => {
      if (!obj[it]) {
        obj[it] = null;
      }
    });
    const res = await AdminService.getTalentSquareList({
      ...obj,
      pageNo: talentSquareList.page.current,
      pageSize: talentSquareList.page.size,
      // recruitmentInfoId: '171993a144f04657bcbfda21a3c35203',
    });
    talentSquareList.list = res.records;
    talentSquareList.page = {
      total: res.total,
      size: res.size,
      current: res.current,
    };
  };

  return {
    talentSquareList,
    getTalentSquareList,
  };
};

export default useJobStatus;
