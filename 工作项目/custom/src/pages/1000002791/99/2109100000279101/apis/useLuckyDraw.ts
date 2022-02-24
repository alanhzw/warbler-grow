/*
 * @Author: 一尾流莺
 * @Description:抽奖接口
 * @Date: 2021-09-18 09:55:10
 * @LastEditTime: 2021-09-24 14:52:07
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\apis\useLuckyDraw.ts
 */

import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import type { BaseInfo } from '@/types/BaseInfo';
import { apisOptions } from '../config/index';

const useLuckyDraw = (baseInfo:BaseInfo):any => {
  // 抽奖接口
  const luckyDraw = async (type:number) => {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });
    const res = await cjwxRequest.post(apisOptions.luckyDraw, {
      activityId: baseInfo.activityId,
      pin: baseInfo.pin,
      type,
    });
    if (!res.result) {
      Toast.fail(res.errorMessage);
    }
    Toast.clear();
    return res;
  };
  return {
    luckyDraw,
  };
};

export default useLuckyDraw;
