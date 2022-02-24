/*
 * @Author: 一尾流莺
 * @Description:跟开卡弹窗相关的操作
 * @Date: 2021-09-01 16:29:57
 * @LastEditTime: 2021-10-11 10:01:31
 * @FilePath: \custom\src\pages\1000123965\99\2110100012396501\popup\useOpenCard.ts
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
