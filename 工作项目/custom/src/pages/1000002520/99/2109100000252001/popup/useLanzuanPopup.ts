/*
 * @Author: 一尾流莺
 * @Description:已购蓝钻ESKU弹窗
 * @Date: 2021-09-01 16:29:57
 * @LastEditTime: 2021-09-27 18:25:27
 * @FilePath: \custom\src\pages\1000002520\99\2109100000252001\popup\useLanzuanPopup.ts
 */
import { ref } from 'vue';

const useLanzuanPopup = () => {
  // 是否展示已购蓝钻ESKU弹窗
  const isShowLanzuanPopup = ref(false);

  // 打开已购蓝钻ESKU弹窗
  const openLanzuanPopup = () => {
    isShowLanzuanPopup.value = true;
  };

  // 关闭已购蓝钻ESKU弹窗
  const closeLanzuanPopup = () => {
    isShowLanzuanPopup.value = false;
  };
  return {
    isShowLanzuanPopup,
    openLanzuanPopup,
    closeLanzuanPopup,
  };
};

export default useLanzuanPopup;
