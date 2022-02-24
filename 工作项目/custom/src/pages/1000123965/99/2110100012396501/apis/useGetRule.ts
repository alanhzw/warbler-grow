/*
 * @Author: 一尾流莺
 * @Description:获取活动规则情况
 * @Date: 2021-09-18 09:55:10
 * @LastEditTime: 2021-12-21 11:48:43
 * @FilePath: \custom\src\pages\1000123965\99\2110100012396501\apis\useGetRule.ts
 */

import { ref } from 'vue';
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import type { BaseInfo } from '@/types/BaseInfo';
import { apisOptions } from '../config/index';

const useGetRule = (baseInfo:BaseInfo) => {
  // 活动规则
  const rule = ref('');
  // 获取活动规则情况
  const getRule = async () => {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });
    const res = await cjwxRequest.get(apisOptions.getRule, {
      params: {
        activityId: baseInfo.activityId,
      },
    });
    rule.value = res.data.rule.split('\n').join('<br/>');
    if (!res.result) {
      Toast.fail(res.errorMessage);
    } else {
      Toast.clear();
    }
  };

  return {
    rule,
    getRule,
  };
};

export default useGetRule;
