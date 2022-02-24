/*
 * @Author: 一尾流莺
 * @Description:获取活动信息主接口
 * @Date: 2021-09-18 09:55:10
 * @LastEditTime: 2021-12-29 10:59:28
 * @FilePath: \custom\src\pages\1000396688\99\2111100039668801\apis\useGetActivityInfo.ts
 */

import { ref } from 'vue';
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import type { BaseInfo } from '@/types/BaseInfo';
import { apisOptions } from './index';

export default function (baseInfo:BaseInfo) {
  // 活动信息
  const activityInfo = ref();
  // 获取活动信息
  const main = async (id:string) => {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });
    const res = await cjwxRequest.post(apisOptions.main, {
      activityId: id,
      pin: baseInfo.pin,
    });
    activityInfo.value = res.data;
    if (!res.result) {
      Toast.fail(res.errorMessage);
    }
    Toast.clear();
    return res;
  };

  return {
    activityInfo,
    main,
  };
}
