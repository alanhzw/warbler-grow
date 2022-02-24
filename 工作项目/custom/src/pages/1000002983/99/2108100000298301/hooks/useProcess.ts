/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-08-30 10:45:08
 * @LastEditTime: 2021-09-29 09:21:24
 * @FilePath: \custom\src\pages\1000002983\99\2108100000298301\hooks\useProcess.ts
 */

import { Ref, ref } from 'vue';
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
import { apisOptions } from '../config/index';

const useProcess = (baseInfo:BaseInfo, status:Ref<number>, main:any):any => {
// 显示哪个页面 1:规则页面 2:领取成功页面 3:已领取页面  4:不符合规则页面
  const step = ref(1);

  // 跳转至规则页面
  const goToRule = () => {
    step.value = 1;
  };
  // 获取令牌
  const getToken = async () => {
    try {
      if (status.value === 2) {
        step.value = 3;
        return;
      }
      if (status.value === 0) {
        step.value = 4;
        return;
      }
      if (status.value === 3) {
        Toast.fail('活动已结束');
        return;
      }
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
      });

      const res = await cjwxRequest.post(apisOptions.getToken, {
        activityId: baseInfo.activityId,
        pin: baseInfo.pin,
      });

      if (res.result) {
        step.value = 2;
        main();
      }
      if (!res.result) {
        Toast.fail(res.errorMessage);
      }
    } catch (error) {
      if (error && error.message) {
        Toast.fail(error.message);
      }
    } finally {
      Toast.clear();
    }
  };
  return {
    step, goToRule, getToken,
  };
};

export default useProcess;
