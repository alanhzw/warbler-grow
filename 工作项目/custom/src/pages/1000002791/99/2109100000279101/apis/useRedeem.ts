/*
 * @Author: 一尾流莺
 * @Description:兑换礼品接口
 * @Date: 2021-09-18 09:55:10
 * @LastEditTime: 2021-09-26 10:48:55
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\apis\useRedeem.ts
 */
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import type { BaseInfo } from '@/types/BaseInfo';
import { apisOptions } from '../config/index';

const useRedeem = (baseInfo: BaseInfo): any => {
  // 兑换礼品方法
  const redeem = async (giftId:string) => {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });
    const res = await cjwxRequest.post(apisOptions.redeem, {
      activityId: baseInfo.activityId,
      pin: baseInfo.pin,
      giftId,
    });
    if (!res.result && giftId === '1cee5da2136a4c169227680561a825bc') {
      Toast.fail(res.errorMessage);
    }
    Toast.clear();
    return res;
  };
  return {
    redeem,
  };
};

export default useRedeem;
