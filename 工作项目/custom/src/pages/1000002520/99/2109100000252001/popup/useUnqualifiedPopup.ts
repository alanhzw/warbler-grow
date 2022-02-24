/*
 * @Author: 一尾流莺
 * @Description:不符合条件弹窗
 * @Date: 2021-09-01 16:29:57
 * @LastEditTime: 2021-09-28 10:01:20
 * @FilePath: \custom\src\pages\1000002520\99\2109100000252001\popup\useUnqualifiedPopup.ts
 */
import { ref } from 'vue';

const useUnqualifiedPopup = () => {
  // 是否展示不符合条件弹窗
  const isShowUnqualifiedPopup = ref(false);

  // 打开不符合条件弹窗
  const openUnqualifiedPopup = () => {
    isShowUnqualifiedPopup.value = true;
  };

  // 关闭不符合条件弹窗
  const closeUnqualifiedPopup = () => {
    isShowUnqualifiedPopup.value = false;
  };
  return {
    isShowUnqualifiedPopup,
    openUnqualifiedPopup,
    closeUnqualifiedPopup,
  };
};

export default useUnqualifiedPopup;
