/*
 * @Author: 一尾流莺
 * @Description:领取优惠券接口
 * @Date: 2021-09-18 09:55:10
 * @LastEditTime: 2021-10-09 15:54:04
 * @FilePath: \custom\src\pages\1000002520\99\2109100000252001\apis\useGetCoupon.ts
 */

import { ref } from 'vue';
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import type { BaseInfo } from '@/types/BaseInfo';
import { apisOptions } from './index';
import { gotoSkuPage } from '../hooks/useMethods';

const useGetCoupon = (baseInfo:BaseInfo) => {
  // 领取优惠券结果
  const result = ref<boolean>(false);
  // 领取优惠券接口
  const getCoupon = async (couponId: any) => {
    if (couponId === '100027029204' || couponId === '100014593273') {
      gotoSkuPage(couponId);
      return false;
    }
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });
    const res = await cjwxRequest.post(apisOptions.getCoupon, {
      activityId: baseInfo.activityId,
      pin: baseInfo.pin,
      couponId,
    });
    result.value = res.result;
    if (!res.result) {
      Toast.fail(res.errorMessage);
    } else {
      Toast.success('领取成功');
    }
    Toast.clear();
    return res;
  };

  return {
    getCoupon,
    result,
  };
};

export default useGetCoupon;
