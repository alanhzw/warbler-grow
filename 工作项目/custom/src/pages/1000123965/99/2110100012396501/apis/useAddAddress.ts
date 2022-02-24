/*
 * @Author: 一尾流莺
 * @Description:添加地址
 * @Date: 2021-09-18 09:55:10
 * @LastEditTime: 2021-12-21 11:49:21
 * @FilePath: \custom\src\pages\1000123965\99\2110100012396501\apis\useAddAddress.ts
 */

import { ref } from 'vue';
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import type { BaseInfo } from '@/types/BaseInfo';
import { apisOptions } from '../config/index';

const useAddAddress = (baseInfo:BaseInfo) => {
  // 添加结果
  const addResult = ref(false);
  // 添加地址
  const addAddress = async (giftId:any, addressInfo:any) => {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });
    const res = await cjwxRequest.post(apisOptions.addAddress, {
      activityId: baseInfo.activityId,
      pin: baseInfo.pin,
      giftId,
      receiver: addressInfo.receiver,
      phone: addressInfo.phone,
      province: addressInfo.province,
      city: addressInfo.city,
      district: addressInfo.district,
      address: addressInfo.address,
    });
    addResult.value = res.result;
    if (!res.result) {
      Toast.fail(res.errorMessage);
    } else {
      Toast.clear();
    }
  };

  return {
    addAddress,
    addResult,
  };
};

export default useAddAddress;
