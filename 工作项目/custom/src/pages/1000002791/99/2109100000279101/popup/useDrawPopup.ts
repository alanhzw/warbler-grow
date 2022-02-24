/*
 * @Author: 一尾流莺
 * @Description:跟立即抽奖弹窗相关的操作
 * @Date: 2021-09-01 16:29:57
 * @LastEditTime: 2021-09-30 15:21:23
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\popup\useDrawPopup.ts
 */
import { ref } from 'vue';
import type { BaseInfo } from '@/types/BaseInfo';
import useClick from '../apis/useClick';

const useDrawPopup = (baseInfo:BaseInfo) => {
  const { hanlderClick } = useClick(baseInfo);

  // 是否展示立即抽奖弹窗
  const isShowDrawPopup = ref(false);

  // 打开立即抽奖弹窗
  const openDrawPopup = () => {
    hanlderClick(2);
    isShowDrawPopup.value = true;
  };

  // 关闭立即抽奖弹窗
  const closeDrawPopup = () => {
    isShowDrawPopup.value = false;
  };
  return {
    isShowDrawPopup,
    openDrawPopup,
    closeDrawPopup,
  };
};

export default useDrawPopup;
