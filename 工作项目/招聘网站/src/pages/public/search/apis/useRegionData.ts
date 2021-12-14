/*
 * @Descripttion: 行政地区
 * @Author: 一尾流莺
 * @Date: 2021-11-10 20:38:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-19 11:01:21
 */

import { ref } from 'vue';
// @ts-ignore
import { CommonService } from '@/service';

const useRegionData = () => {
  const regionData = ref<any>([]);

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
