/*
 * @Author: 一尾流莺
 * @Description:获取活动信息主接口
 * @Date: 2021-09-18 09:55:10
 * @LastEditTime: 2021-12-21 15:49:13
 * @FilePath: \custom\src\pages\1000123965\99\2110100012396501\apis\useGetActivityInfo.ts
 */

import { ref, computed } from 'vue';
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import type { BaseInfo } from '@/types/BaseInfo';
import { apisOptions } from '../config/index';

interface ActivityInfo {
  [propName:string]:any
}

const useGetActivityInfo = (baseInfo:BaseInfo) => {
  // 活动信息
  const activityInfo = ref<ActivityInfo>({});

  const product1 = computed(() => activityInfo.value.crmGiftInfoList && activityInfo.value.crmGiftInfoList.slice(0, 3));
  const product2 = computed(() => activityInfo.value.crmGiftInfoList && activityInfo.value.crmGiftInfoList.slice(3, 6));
  const product3 = computed(() => activityInfo.value.crmGiftInfoList && activityInfo.value.crmGiftInfoList.slice(6, 9));
  const product4 = computed(() => activityInfo.value.crmGiftInfoList && activityInfo.value.crmGiftInfoList.slice(9, 12));

  const number1 = computed(() => activityInfo.value.can1);
  const number2 = computed(() => activityInfo.value.can2);
  const number3 = computed(() => activityInfo.value.can3);
  const number4 = computed(() => activityInfo.value.can4);

  // 获取活动信息
  const main = async () => {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });
    const res = await cjwxRequest.post(apisOptions.main, {
      activityId: baseInfo.activityId,
      pin: baseInfo.pin,
    });
    activityInfo.value = res.data;
    if (!res.result) {
      Toast.fail(res.errorMessage);
    } else {
      Toast.clear();
    }
  };

  return {
    activityInfo,
    main,
    product1,
    product2,
    product3,
    product4,
    number1,
    number2,
    number3,
    number4,
  };
};

export default useGetActivityInfo;
