/*
 * @Author: 一尾流莺
 * @Description:开卡弹窗
 * @Date: 2021-09-01 16:29:57
 * @LastEditTime: 2021-09-28 10:02:02
 * @FilePath: \custom\src\pages\1000002520\99\2109100000252001\popup\useOpenCardPopup.ts
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
