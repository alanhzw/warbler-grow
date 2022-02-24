/*
 * @Author: 一尾流莺
 * @Description:参加活动接口
 * @Date: 2021-09-18 09:55:10
 * @LastEditTime: 2021-12-29 10:59:48
 * @FilePath: \custom\src\pages\1000396688\99\2111100039668801\apis\useJoinActivity.ts
 */

import { ref } from 'vue';
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import type { BaseInfo } from '@/types/BaseInfo';
import { apisOptions } from './index';

export default function (baseInfo:BaseInfo) {
  // 参加结果
  const joinResult = ref();
  const join = async (id:string) => {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });
    const res = await cjwxRequest.post(apisOptions.join, {
      activityId: id,
      pin: baseInfo.pin,
    });
    joinResult.value = res.result;
    if (!res.result) {
      Toast.fail(res.errorMessage);
    } else {
      Toast.success('关注成功');
    }
    Toast.clear();
    return res;
  };

  return {
    joinResult,
    join,
  };
}
