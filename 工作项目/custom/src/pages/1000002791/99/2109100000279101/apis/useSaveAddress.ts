/*
 * @Author: 一尾流莺
 * @Description:保存奖品地址
 * @Date: 2021-09-18 09:55:10
 * @LastEditTime: 2021-09-24 14:40:23
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\apis\useSaveAddress.ts
 */
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import type { BaseInfo } from '@/types/BaseInfo';
import { apisOptions } from '../config/index';

const useSaveAddress = (baseInfo: BaseInfo): any => {
  // 保存奖品地址
  const saveAddress = async (info:any, id:any) => {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });
    const res = await cjwxRequest.post(apisOptions.saveAddress, {
      activityId: baseInfo.activityId,
      pin: baseInfo.pin,
      id,
      receiver: info.receiver,
      phone: info.phone,
      province: info.province || '',
      city: info.city || '',
      district: info.district || '',
      address: info.address || '',
    });
    if (!res.result) {
      Toast.fail(res.errorMessage);
    }
    Toast.clear();
    return res;
  };
  return {
    saveAddress,
  };
};

export default useSaveAddress;
