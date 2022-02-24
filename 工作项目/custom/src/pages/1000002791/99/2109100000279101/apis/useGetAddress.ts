/*
 * @Author: 一尾流莺
 * @Description:获取奖品地址
 * @Date: 2021-09-18 09:55:10
 * @LastEditTime: 2021-09-24 17:03:03
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\apis\useGetAddress.ts
 */
import { reactive, toRefs } from 'vue';
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import type { BaseInfo } from '@/types/BaseInfo';
import { apisOptions } from '../config/index';

const useGetAddress = (baseInfo: BaseInfo): any => {
  // 奖品地址结果
  const state = reactive({
    addressList: {},
  });
  // 获取奖品地址
  const getAddress = async (addressId:string) => {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });
    const res = await cjwxRequest.post(apisOptions.getAddress, {
      activityId: baseInfo.activityId,
      pin: baseInfo.pin,
      addressId,
    });
    state.addressList = res.data;
    if (!res.result) {
      Toast.fail(res.errorMessage);
    }
    Toast.clear();
    return res;
  };
  return {
    ...toRefs(state),
    getAddress,
  };
};

export default useGetAddress;
