/*
 * @Author: 一尾流莺
 * @Description:跟我的奖品弹窗相关的操作
 * @Date: 2021-09-01 16:29:57
 * @LastEditTime: 2021-09-23 17:07:30
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\popup\useMyPrizePopup.ts
 */
import { ref } from 'vue';
import type { BaseInfo } from '@/types/BaseInfo';
import useGetRecord from '../apis/useGetRecord';

const useMyPrizePopup = (baseInfo: BaseInfo) => {
  const { recordList, getRecord } = useGetRecord(baseInfo);

  // 是否展示我的奖品弹窗
  const isShowMyPrizePopup = ref(false);

  // 打开我的奖品弹窗
  const openMyPrizePopup = async () => {
    await getRecord(3);

    isShowMyPrizePopup.value = true;
  };

  // 关闭我的奖品弹窗
  const closeMyPrizePopup = () => {
    isShowMyPrizePopup.value = false;
  };
  return {
    prizeRecordList: recordList,
    isShowMyPrizePopup,
    openMyPrizePopup,
    closeMyPrizePopup,
  };
};

export default useMyPrizePopup;
