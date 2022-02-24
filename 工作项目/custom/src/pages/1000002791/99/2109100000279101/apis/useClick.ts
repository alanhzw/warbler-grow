/*
 * @Author: 一尾流莺
 * @Description:埋点接口
 * @Date: 2021-09-18 09:55:10
 * @LastEditTime: 2021-09-30 15:15:49
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\apis\useClick.ts
 */
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import type { BaseInfo } from '@/types/BaseInfo';
import { apisOptions } from '../config/index';

const useClick = (baseInfo: BaseInfo): any => {
  // 埋点接口
  const hanlderClick = async (elementId:number) => {
    const res = await cjwxRequest.post(apisOptions.click, {
      pageId: baseInfo.activityId,
      venderId: baseInfo.venderId,
      pin: baseInfo.pin,
      elementId,
    });
  };
  return {
    hanlderClick,
  };
};

export default useClick;
