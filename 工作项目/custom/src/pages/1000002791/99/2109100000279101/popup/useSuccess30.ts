/*
 * @Author: 一尾流莺
 * @Description:跟兑换成功30相关的操作
 * @Date: 2021-09-01 16:29:57
 * @LastEditTime: 2021-09-26 10:14:26
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\popup\useSuccess30.ts
 */
import { ref } from 'vue';

const useSuccess30Popup = () => {
  // 是否展示兑换成功30弹窗
  const isShowSuccess30Popup = ref(false);

  // 打开兑换成功30弹窗
  const openSuccess30Popup = () => {
    isShowSuccess30Popup.value = true;
  };

  // 关闭兑换成功30弹窗
  const closeSuccess30Popup = () => {
    isShowSuccess30Popup.value = false;
  };
  return {
    isShowSuccess30Popup,
    openSuccess30Popup,
    closeSuccess30Popup,
  };
};

export default useSuccess30Popup;
