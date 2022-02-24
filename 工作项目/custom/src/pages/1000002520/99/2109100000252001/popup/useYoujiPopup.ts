/*
 * @Author: 一尾流莺
 * @Description:已购有机ESKU弹窗
 * @Date: 2021-09-01 16:29:57
 * @LastEditTime: 2021-09-27 18:25:29
 * @FilePath: \custom\src\pages\1000002520\99\2109100000252001\popup\useYoujiPopup.ts
 */
import { ref } from 'vue';

const useYoujiPopup = () => {
  // 是否展示已购有机ESKU弹窗
  const isShowYoujiPopup = ref(false);

  // 打开已购有机ESKU弹窗
  const openYoujiPopup = () => {
    isShowYoujiPopup.value = true;
  };

  // 关闭已购有机ESKU弹窗
  const closeYoujiPopup = () => {
    isShowYoujiPopup.value = false;
  };
  return {
    isShowYoujiPopup,
    openYoujiPopup,
    closeYoujiPopup,
  };
};

export default useYoujiPopup;
