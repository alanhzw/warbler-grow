/*
 * @Author: 一尾流莺
 * @Description:跟立即兑换30相关的操作
 * @Date: 2021-09-01 16:29:57
 * @LastEditTime: 2021-09-30 15:22:23
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\popup\useExchange30.ts
 */
import { ref } from 'vue';
import type { BaseInfo } from '@/types/BaseInfo';
import useClick from '../apis/useClick';

const useExchange30Popup = (baseInfo:BaseInfo) => {
  // 是否展示立即兑换30弹窗
  const isShow30Popup = ref(false);
  const { hanlderClick } = useClick(baseInfo);

  // 打开立即兑换30弹窗
  const open30Popup = () => {
    hanlderClick(3);
    isShow30Popup.value = true;
  };

  // 关闭立即兑换30弹窗
  const close30Popup = () => {
    isShow30Popup.value = false;
  };
  return {
    isShow30Popup,
    open30Popup,
    close30Popup,
  };
};

export default useExchange30Popup;
