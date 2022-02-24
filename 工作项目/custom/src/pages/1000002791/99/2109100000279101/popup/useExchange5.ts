/*
 * @Author: 一尾流莺
 * @Description:跟立即兑换5相关的操作
 * @Date: 2021-09-01 16:29:57
 * @LastEditTime: 2021-09-26 17:12:22
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\popup\useExchange5.ts
 */
import { ref } from 'vue';
import type { BaseInfo } from '@/types/BaseInfo';
import useRedeem from '../apis/useRedeem';
import useClick from '../apis/useClick';

const useExchange5Popup = (baseInfo:BaseInfo, main:any, isOpenCard:boolean, openCard:any) => {
  // 兑换礼品
  const { redeem } = useRedeem(baseInfo);
  // 是否展示立即兑换5弹窗
  const isShow5Popup = ref(false);
  const { hanlderClick } = useClick(baseInfo);

  // 打开立即兑换5弹窗
  const open5Popup = async (open: boolean) => {
    hanlderClick(5);
    if (open) {
      isShow5Popup.value = true;
      return;
    }
    if (!isOpenCard) {
      openCard();
      return;
    }
    const res = await redeem('1cee5da2136a4c169227680561a825bc');
    if (res.result) {
      main();
      isShow5Popup.value = true;
    }
  };

  // 关闭立即兑换5弹窗
  const close5Popup = () => {
    isShow5Popup.value = false;
  };
  return {
    isShow5Popup,
    open5Popup,
    close5Popup,
  };
};

export default useExchange5Popup;
