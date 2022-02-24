/*
 * @Author: 一尾流莺
 * @Description:获取领取状态
 * @Date: 2021-08-30 10:40:13
 * @LastEditTime: 2021-12-29 11:02:01
 * @FilePath: \custom\src\pages\1000396688\99\2111100039668801\apis\useGetId.ts
 */
import { ref } from 'vue';
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
import { apisOptions } from './index';

const getActivityInfo = (baseInfo: BaseInfo) => {
  const id = ref('');
  // 获取活动信息
  const getId = async () => {
    try {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
      });
      const res = await cjwxRequest.get(apisOptions.getId, {
        params: {
          activityId: baseInfo.activityId,
          pin: baseInfo.pin,
        },
      });
      id.value = res.data.shareTitle;
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
    getId,
    id,
  };
};

export default getActivityInfo;
