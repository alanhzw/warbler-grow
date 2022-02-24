/*
 * @Author: 一尾流莺
 * @Description:埋点接口
 * @Date: 2021-09-18 09:55:10
 * @LastEditTime: 2021-11-12 17:24:02
 * @FilePath: \custom\src\pages\1000002520\99\2109100000252001\apis\useClick.ts
 */
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import type { BaseInfo } from '@/types/BaseInfo';
import { apisOptions } from './index';

const useClick = (baseInfo: BaseInfo): any => {
  // 埋点接口
  const hanlderClick = async (elementId:any) => {
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
