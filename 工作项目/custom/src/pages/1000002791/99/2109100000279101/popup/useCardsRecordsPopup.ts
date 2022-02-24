/*
 * @Author: 一尾流莺
 * @Description:跟卡片获取记录弹窗相关的操作
 * @Date: 2021-09-01 16:29:57
 * @LastEditTime: 2021-09-23 10:40:52
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\popup\useCardsRecordsPopup.ts
 */
import { ref } from 'vue';
import type { BaseInfo } from '@/types/BaseInfo';
import useGetRecord from '../apis/useGetRecord';

const useCardsRecordsPopup = (baseInfo: BaseInfo) => {
  const { recordList, getRecord } = useGetRecord(baseInfo);

  // 是否展示卡片获取记录弹窗
  const isShowCardsRecordsPopup = ref(false);

  // 打开卡片获取记录弹窗
  const openCardsRecordsPopup = async () => {
    await getRecord(1);
    isShowCardsRecordsPopup.value = true;
  };

  // 关闭卡片获取记录弹窗
  const closeCardsRecordsPopup = () => {
    isShowCardsRecordsPopup.value = false;
  };
  return {
    cardsRecordList: recordList,
    isShowCardsRecordsPopup,
    openCardsRecordsPopup,
    closeCardsRecordsPopup,
  };
};

export default useCardsRecordsPopup;
