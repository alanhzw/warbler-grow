/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-08-30 10:40:13
 * @LastEditTime: 2021-09-29 10:57:15
 * @FilePath: \custom\src\pages\1000002983\99\2108100000298302\hooks\useGetActivityInfo.ts
 */
import { ref } from 'vue';
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
import { apisOptions } from '../config/index';

const getActivityInfo = (baseInfo:BaseInfo):any => {
  // 活动规则
  const rule = ref('');

  // 是否可以领取令牌 "0":不可领取 "1":可领取 "2":已领取过 "3":库存不足
  const status = ref(0);
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
      // 是否可以获取令牌
      status.value = data.status;
      // 测试代码
      // status.value = 3;
      if (!res.result && res.errorMessage === '活动已结束') {
        window.location.href = `/m/common/finished?shopId=${baseInfo.shopId}`;
        throw Error('活动已经结束');
      }
    } catch (error) {
      if (error && error.message) {
        console.log('🚀🚀~ error:', error.message);
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
          pin: baseInfo.pin,
        },
      });
      const { data } = res;
      if (data.rule) {
        rule.value = data.rule.split('\n').join('<br/>');
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
    rule,
    status,
    main,
    getRule,
  };
};

export default getActivityInfo;
