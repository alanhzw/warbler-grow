/*
 * @Author: 一尾流莺
 * @Description:已购铂臻ESKU弹窗
 * @Date: 2021-09-01 16:29:57
 * @LastEditTime: 2021-09-27 18:25:25
 * @FilePath: \custom\src\pages\1000002520\99\2109100000252001\popup\useBozhenPopup.ts
 */
import { ref } from 'vue';

const useBozhenPopup = () => {
  // 是否展示已购铂臻ESKU弹窗
  const isShowBozhenPopup = ref(false);

  // 打开已购铂臻ESKU弹窗
  const openBozhenPopup = () => {
    isShowBozhenPopup.value = true;
  };

  // 关闭已购铂臻ESKU弹窗
  const closeBozhenPopup = () => {
    isShowBozhenPopup.value = false;
  };
  return {
    isShowBozhenPopup,
    openBozhenPopup,
    closeBozhenPopup,
  };
};

export default useBozhenPopup;
