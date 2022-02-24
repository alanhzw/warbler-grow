/*
 * @Author: 一尾流莺
 * @Description:获取领取状态
 * @Date: 2021-08-30 10:40:13
 * @LastEditTime: 2021-09-06 14:34:44
 * @FilePath: \custom\src\pages\1000001195\99\2109100000119502\hooks\useGetActivityInfo.ts
 */
import { ref } from 'vue';
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
import { apisOptions } from '../config/index';

const getActivityInfo = (baseInfo:BaseInfo):any => {
  // 活动规则
  const rule = ref('');

  // 用户可以抽奖的次数
  const canDrawTimes = ref(0);
  // 获取活动信息
  const main = async () => {
    try {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
      });
      const res = await cjwxRequest.post(apisOptions.main, {
        activityId: baseInfo.activityId,
        pin: baseInfo.pin,
      });
      const { data } = res;
      // 抽奖次数
      canDrawTimes.value = data.canDrawTimes;
      // 测试代码
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
  // 获取活动信息
  const getRule = async () => {
    try {
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
      const { data } = res;
      // 格式化活动规则
      if (data.rule && data.rule.length > 0) {
        rule.value = data.rule.split('\n').join('<br/>');
      }
      // 测试代码
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
    rule,
    canDrawTimes,
    main,
    getRule,
  };
};

export default getActivityInfo;
