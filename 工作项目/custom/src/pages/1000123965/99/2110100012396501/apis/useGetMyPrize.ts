/*
 * @Author: 一尾流莺
 * @Description:获取我的奖品
 * @Date: 2021-09-18 09:55:10
 * @LastEditTime: 2021-12-21 11:48:57
 * @FilePath: \custom\src\pages\1000123965\99\2110100012396501\apis\useGetMyPrize.ts
 */

import { ref } from 'vue';
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import type { BaseInfo } from '@/types/BaseInfo';
import { apisOptions } from '../config/index';

const useGetMyPrize = (baseInfo:BaseInfo) => {
  // 奖品列表
  const prizeList = ref([]);
  // 获取我的奖品
  const getMyPrize = async () => {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });
    const res = await cjwxRequest.post(apisOptions.getMyPrize, {
      activityId: baseInfo.activityId,
      pin: baseInfo.pin,
    });
    prizeList.value = res.data;
    if (!res.result) {
      Toast.fail(res.errorMessage);
    } else {
      Toast.clear();
    }
  };

  return {
    getMyPrize,
    prizeList,
  };
};

export default useGetMyPrize;
