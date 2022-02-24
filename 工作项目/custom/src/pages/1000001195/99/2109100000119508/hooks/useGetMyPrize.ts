/*
 * @Author: 一尾流莺
 * @Description:获取我的奖品
 * @Date: 2021-09-02 16:29:10
 * @LastEditTime: 2021-09-06 20:14:24
 * @FilePath: \custom\src\pages\1000001195\99\2109100000119502\hooks\useGetMyPrize.ts
 */
import { ref } from 'vue';
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
import { apisOptions } from '../config/index';

const getMyPrize = (baseInfo:BaseInfo, isShowMyPrizePopup:any) => {
  const myPrizeList = ref([]);
  // 获取我的奖品
  const handlerGetMyPrize = async () => {
    isShowMyPrizePopup.value = true;
    try {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
      });
      const res = await cjwxRequest.post(apisOptions.getMyPrize, {
        activityId: baseInfo.activityId,
        pin: baseInfo.pin,
      });
      const { data } = res;
      if (data.length > 0) {
        myPrizeList.value = data;
      }
      // 测试代码
      if (!res.result) {
        Toast.fail(res.errorMessage);
      }
    } catch (error) {
      if (error && error.message) {
        Toast.fail(error.message);
      }
    } finally {
      Toast.clear();
    }
  };
  return {
    myPrizeList,
    handlerGetMyPrize,
  };
};

export default getMyPrize;
