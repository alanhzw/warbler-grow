/*
 * @Author: 一尾流莺
 * @Description:跟抽奖记录弹窗相关的操作
 * @Date: 2021-09-01 16:29:57
 * @LastEditTime: 2021-09-23 17:07:25
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\popup\useDrawRecordsPopup.ts
 */
import { ref } from 'vue';
import type { BaseInfo } from '@/types/BaseInfo';
import useGetRecord from '../apis/useGetRecord';

const useDrawRecordsPopup = (baseInfo: BaseInfo) => {
  const { recordList, getRecord } = useGetRecord(baseInfo);

  // 是否展示抽奖记录弹窗
  const isShowDrawRecordsPopup = ref(false);

  // 打开抽奖记录弹窗
  const openDrawRecordsPopup = async () => {
    await getRecord(2);

    isShowDrawRecordsPopup.value = true;
    console.log('🚀🚀~ recordList:', recordList);
  };

  // 关闭抽奖记录弹窗
  const closeDrawRecordsPopup = () => {
    isShowDrawRecordsPopup.value = false;
  };
  return {
    drawRecordList: recordList,
    isShowDrawRecordsPopup,
    openDrawRecordsPopup,
    closeDrawRecordsPopup,
  };
};

export default useDrawRecordsPopup;
