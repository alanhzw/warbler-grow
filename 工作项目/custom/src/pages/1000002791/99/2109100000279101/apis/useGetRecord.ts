/*
 * @Author: 一尾流莺
 * @Description:获取各种记录接口
 * @Date: 2021-09-18 09:55:10
 * @LastEditTime: 2021-09-23 10:17:50
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\apis\useGetRecord.ts
 */
import { reactive, toRefs } from 'vue';
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import type { BaseInfo } from '@/types/BaseInfo';
import { apisOptions } from '../config/index';

const useGetRecord = (baseInfo: BaseInfo): any => {
  // 获取记录结果
  const state = reactive({
    recordList: [],
  });
  // 获取记录接口
  const getRecord = async (recordType:number) => {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });
    const res = await cjwxRequest.post(apisOptions.getRecord, {
      activityId: baseInfo.activityId,
      pin: baseInfo.pin,
      recordType,
    });
    state.recordList = res.data;
    if (!res.result) {
      Toast.fail(res.errorMessage);
    }
    Toast.clear();
    return res.data;
  };
  return {
    ...toRefs(state),
    getRecord,
  };
};

export default useGetRecord;
