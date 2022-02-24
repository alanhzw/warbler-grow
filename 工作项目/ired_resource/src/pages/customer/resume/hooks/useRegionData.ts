/*
 * @Descripttion: 在线简历-行政地区
 * @Author: yang chenglin
 * @Date: 2021-11-06 11:14:46
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-10 20:44:20
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
