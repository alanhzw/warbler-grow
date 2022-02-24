/*
 * @Author: 一尾流莺
 * @Description:获取活动信息
 * @Date: 2021-08-30 10:40:13
 * @LastEditTime: 2021-09-05 15:28:32
 * @FilePath: \custom\src\pages\1000001195\99\2109100000119502\hooks\useGetStatus.ts
 */
import { ref } from 'vue';
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
import { apisOptions } from '../config/index';

const getStatus = (baseInfo:BaseInfo):any => {
  // 领奖状态：1-可领取 2-已领取 3-不符合条件 4-已购未开卡
  const wonStatus = ref(3);

  //  抽奖状态：1-可领取 2-已领取 3-不符合条件 4-已购未开卡
  const drawStatus = ref(3);

  // 获取领取/抽取状态
  const handlerGetStatus = async () => {
    try {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
      });
      const res = await cjwxRequest.post(apisOptions.getStatus, {
        activityId: baseInfo.activityId,
        pin: baseInfo.pin,
      });

      wonStatus.value = res.canGet;
      drawStatus.value = res.canDraw;
      // 测试代码
    } catch (error) {
      if (error && error.message) {
        Toast.fail(error.message);
      }
    } finally {
      Toast.clear();
    }
  };
  return {
    wonStatus,
    drawStatus,
    handlerGetStatus,
  };
};

export default getStatus;
