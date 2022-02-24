/*
 * @Author: 一尾流莺
 * @Description:领取实物奖品
 * @Date: 2021-09-18 09:55:10
 * @LastEditTime: 2021-10-12 11:50:50
 * @FilePath: \custom\src\pages\1000123965\99\2110100012396501\apis\useGetPrize.ts
 */

import { ref } from 'vue';
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import type { BaseInfo } from '@/types/BaseInfo';
import { apisOptions } from '../config/index';

const useGetPrize = (baseInfo:BaseInfo) => {
  // 领取结果
  const prizeResult = ref(false);
  // 领取实物奖品
  const getPrize = async (giftId:any) => {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });
    const res = await cjwxRequest.post(apisOptions.getPrize, {
      activityId: baseInfo.activityId,
      pin: baseInfo.pin,
      giftId,
    });
    prizeResult.value = res.result;
    if (!res.result) {
      Toast.fail(res.errorMessage);
    }
    Toast.clear();
  };

  return {
    getPrize,
    prizeResult,
  };
};

export default useGetPrize;
