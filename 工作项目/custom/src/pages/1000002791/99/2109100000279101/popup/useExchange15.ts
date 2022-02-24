/*
 * @Author: 一尾流莺
 * @Description:跟立即兑换15相关的操作
 * @Date: 2021-09-01 16:29:57
 * @LastEditTime: 2021-09-23 15:02:24
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\popup\useExchange15.ts
 */
import { ref } from 'vue';
import type { BaseInfo } from '@/types/BaseInfo';
import useClick from '../apis/useClick';

const useExchange15Popup = (baseInfo:BaseInfo) => {
  // 是否展示立即兑换15弹窗
  const isShow15Popup = ref(false);
  const { hanlderClick } = useClick(baseInfo);

  // 打开立即兑换15弹窗
  const open15Popup = () => {
    hanlderClick(4);
    isShow15Popup.value = true;
  };

  // 关闭立即兑换15弹窗
  const close15Popup = () => {
    isShow15Popup.value = false;
  };
  return {
    isShow15Popup,
    open15Popup,
    close15Popup,
  };
};

export default useExchange15Popup;
