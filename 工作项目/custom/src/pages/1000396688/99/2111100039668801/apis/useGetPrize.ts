/*
 * @Author: 一尾流莺
 * @Description:参加活动接口
 * @Date: 2021-09-18 09:55:10
 * @LastEditTime: 2021-12-29 10:59:42
 * @FilePath: \custom\src\pages\1000396688\99\2111100039668801\apis\useGetPrize.ts
 */

import { ref } from 'vue';
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import type { BaseInfo } from '@/types/BaseInfo';
import { apisOptions } from './index';

export default function (baseInfo:BaseInfo) {
  // 参加结果;
  const getPrizeResult = ref();
  const getPrize = async (id:string) => {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });
    cjwxRequest.post(apisOptions.getPrize, {
      activityId: id,
      pin: baseInfo.pin,
    }).finally(() => {
      Toast.clear();
    }).then((res) => {
      getPrizeResult.value = res.result;
      if (!res.result) {
        if (res.errorMessage === '已超过最大抽奖次数！') {
          Toast.fail('已超过最大获奖次数！');
        } else if (res.errorMessage === '重复请求:improveMember') {
          Toast.fail('您的操作太过频繁，请稍后再试！');
        } else {
          Toast.fail(res.errorMessage);
        }
      } else {
        Toast.success('关注成功！');
      }
      return res;
    });
  };

  return {
    getPrizeResult,
    getPrize,
  };
}
