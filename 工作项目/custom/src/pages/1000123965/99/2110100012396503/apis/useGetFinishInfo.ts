/*
 * @Author: 一尾流莺
 * @Description:获取完善信息情况
 * @Date: 2021-09-18 09:55:10
 * @LastEditTime: 2021-10-11 10:22:25
 * @FilePath: \custom\src\pages\1000123965\99\2110100012396501\apis\useGetFinishInfo.ts
 */

import { ref } from 'vue';
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import type { BaseInfo } from '@/types/BaseInfo';
import { apisOptions } from '../config/index';

const useGetFinishInfo = (baseInfo:BaseInfo) => {
  // 活动信息
  const isFinishInfo = ref(false);
  // 获取完善信息情况
  const getFinishInfo = async () => {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });
    const res = await cjwxRequest.post(apisOptions.getActivityInfo, {
      activityId: baseInfo.activityId,
      pin: baseInfo.pin,
    });
    isFinishInfo.value = res.data;
    if (!res.result) {
      Toast.fail(res.errorMessage);
    }
    Toast.clear();
  };

  return {
    isFinishInfo,
    getFinishInfo,
  };
};

export default useGetFinishInfo;
