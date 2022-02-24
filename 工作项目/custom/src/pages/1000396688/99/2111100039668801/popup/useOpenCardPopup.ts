/*
 * @Author: 一尾流莺
 * @Description:开卡弹窗
 * @Date: 2021-09-01 16:29:57
 * @LastEditTime: 2021-11-29 15:42:41
 * @FilePath: \custom\src\pages\1000396688\99\2111100039668801\popup\useOpenCardPopup.ts
 */
import { ref } from 'vue';

const useOpenCardPopup = () => {
  // 是否展示开卡弹窗
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
