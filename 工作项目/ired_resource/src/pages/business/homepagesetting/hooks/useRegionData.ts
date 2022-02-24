/*
 * @Descripttion: 行政地区
 * @Author: yang chenglin
 * @Date: 2021-11-10 20:38:36
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-10 20:44:12
 */

import { ref } from 'vue';
import { CommonService } from '@/service';

const useRegionData = () => {
  const regionData = ref();

  const getRegionData = async () => {
    const res = await CommonService.getRegionData();
    regionData.value = res;
  };

  return {
    regionData,
    getRegionData,
  };
};

export default useRegionData;
