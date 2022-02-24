/*
 * @Author: 一尾流莺
 * @Description:领奖逻辑处理
 * @Date: 2021-09-02 16:18:19
 * @LastEditTime: 2021-09-06 19:52:58
 * @FilePath: \custom\src\pages\1000001195\99\2109100000119502\hooks\useWin.ts
 */

import { ref } from 'vue';
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
import { apisOptions } from '../config/index';

const useWin = (baseInfo:BaseInfo, wonStatus:any, isShowNoPopup:any, isShowMemberPopup:any, main:any, handlerGetStatus:any):any => {
  // 开卡链接
  const link = encodeURIComponent(window.location.href);
  const openCardLink = `https://shopmember.m.jd.com/shopcard?venderId=1000001195&shopId=1000001195&venderType=5&channel=7025&returnUrl=${link}`;

  // 领奖方法
  const handlerWin = async () => {
    // 测试代码
    // wonStatus.value = 3;
    // 如果不可以领奖
    if (wonStatus.value === 2) {
      Toast.fail('您已领过奖品');
      return;
    }
    if (wonStatus.value === 3) {
      isShowNoPopup.value = true;
      return;
    }
    if (wonStatus.value === 4) {
      window.location.href = openCardLink;
      return;
    }
    try {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
      });
      const res = await cjwxRequest.post(apisOptions.win, {
        activityId: baseInfo.activityId,
        pin: baseInfo.pin,
      });
      const { data } = res;
      // 领取结果
      if (data.sendResult) {
        isShowMemberPopup.value = true;
      }
      main();
      handlerGetStatus();
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
    handlerWin,
  };
};

export default useWin;
