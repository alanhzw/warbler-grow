/*
 * @Author: 一尾流莺
 * @Description:获取活动规则情况
 * @Date: 2021-09-18 09:55:10
 * @LastEditTime: 2021-12-22 10:55:04
 * @FilePath: \custom\src\pages\1000015502\99\2112100001550202\apis\useGetList.ts
 */

import { ref } from 'vue';
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import type { BaseInfo } from '@/types/BaseInfo';
import { apisOptions } from '../config/index';

const useGetList = (baseInfo:BaseInfo) => {
  // 活动规则
  const rule = ref('');
  // 获取活动规则情况
  const getList = async () => {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });
    const res = await cjwxRequest.post(apisOptions.getList, {
      activityId: baseInfo.activityId,
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
    getList,
  };
};

export default useGetList;
