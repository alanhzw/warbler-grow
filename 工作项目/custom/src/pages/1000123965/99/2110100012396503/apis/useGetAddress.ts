/*
 * @Author: 一尾流莺
 * @Description:回显地址
 * @Date: 2021-09-18 09:55:10
 * @LastEditTime: 2021-10-12 11:17:42
 * @FilePath: \custom\src\pages\1000123965\99\2110100012396501\apis\useGetAddress.ts
 */

import { ref } from 'vue';
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import type { BaseInfo } from '@/types/BaseInfo';
import { apisOptions } from '../config/index';

const useGetAddress = (baseInfo:BaseInfo) => {
  // 地址信息
  const addressInfo = ref({});
  // 回显地址
  const getAddress = async (giftId:any) => {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });
    const res = await cjwxRequest.post(apisOptions.getAddress, {
      activityId: baseInfo.activityId,
      pin: baseInfo.pin,
      giftId,
    });
    addressInfo.value = res.data;
    if (!res.result) {
      Toast.fail(res.errorMessage);
    }
    Toast.clear();
  };

  return {
    getAddress,
    addressInfo,
  };
};

export default useGetAddress;
