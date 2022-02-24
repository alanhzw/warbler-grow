/*
 * @Author: 一尾流莺
 * @Description:埋点接口
 * @Date: 2021-09-18 09:55:10
 * @LastEditTime: 2021-09-30 15:53:09
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\apis\useFirstEnter.ts
 */
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import type { BaseInfo } from '@/types/BaseInfo';
import { apisOptions } from '../config/index';

const useFirstEnter = (baseInfo: BaseInfo): any => {
  // 埋点接口
  const firstEnter = async () => {
    const res = await cjwxRequest.post(apisOptions.firstEnter, {
      activityId: baseInfo.activityId,
      pin: baseInfo.pin,
    });
  };
  return {
    firstEnter,
  };
};

export default useFirstEnter;
