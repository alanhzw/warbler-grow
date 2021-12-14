/*
 * @Descripttion: 投递简历接口
 * @Author: yang chenglin
 * @Date: 2021-11-04 23:01:50
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-10 18:49:28
 */

import { reactive } from 'vue';
import { UserService } from '@/service';

const useDoCvDelivery = () => {
  const collectRecruitmentList = reactive({
    list: [],
    page: {
      total: 0,
      size: 10,
      current: 1,
    },
  });
  const setDoCvDelivery = async (obj: Object) => {
    const res = await UserService.doCvDelivery(obj);
  };

  return {
    setDoCvDelivery,
  };
};

export default useDoCvDelivery;
