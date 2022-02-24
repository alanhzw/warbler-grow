/*
 * @Author: 一尾流莺
 * @Description:跟开卡弹窗相关的操作
 * @Date: 2021-09-01 16:29:57
 * @LastEditTime: 2021-09-26 16:55:29
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\popup\useOpenCard.ts
 */
import { ref } from 'vue';

const useOpenCardPopup = () => {
  // 是否展示规则弹窗
  const isShowOpenCardPopup = ref(false);

  // 打开开卡弹窗
  const openOpenCardPopup = () => {
    isShowOpenCardPopup.value = true;
  };

  // 关闭开卡弹窗
  const closeOpenCardPopup = () => {
    isShowOpenCardPopup.value = false;
  };
  return {
    isShowOpenCardPopup,
    openOpenCardPopup,
    closeOpenCardPopup,
  };
};

export default useOpenCardPopup;
