/*
 * @Author: 一尾流莺
 * @Description:跟兑换成功15相关的操作
 * @Date: 2021-09-01 16:29:57
 * @LastEditTime: 2021-09-26 10:14:18
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\popup\useSuccess15.ts
 */
import { ref } from 'vue';

const useSuccess15Popup = () => {
  // 是否展示兑换成功15弹窗
  const isShowSuccess15Popup = ref(false);

  // 打开兑换成功15弹窗
  const openSuccess15Popup = () => {
    isShowSuccess15Popup.value = true;
  };

  // 关闭兑换成功15弹窗
  const closeSuccess15Popup = () => {
    isShowSuccess15Popup.value = false;
  };
  return {
    isShowSuccess15Popup,
    openSuccess15Popup,
    closeSuccess15Popup,
  };
};

export default useSuccess15Popup;
