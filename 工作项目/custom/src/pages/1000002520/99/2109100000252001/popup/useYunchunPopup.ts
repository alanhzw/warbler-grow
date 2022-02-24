/*
 * @Author: 一尾流莺
 * @Description:已购蕴醇ESKU弹窗
 * @Date: 2021-09-01 16:29:57
 * @LastEditTime: 2021-09-27 18:25:31
 * @FilePath: \custom\src\pages\1000002520\99\2109100000252001\popup\useYunchunPopup.ts
 */
import { ref } from 'vue';

const useYunchunPopup = () => {
  // 是否展示已购蕴醇ESKU弹窗
  const isShowYunchunPopup = ref(false);

  // 打开已购蕴醇ESKU弹窗
  const openYunchunPopup = () => {
    isShowYunchunPopup.value = true;
  };

  // 关闭已购蕴醇ESKU弹窗
  const closeYunchunPopup = () => {
    isShowYunchunPopup.value = false;
  };
  return {
    isShowYunchunPopup,
    openYunchunPopup,
    closeYunchunPopup,
  };
};

export default useYunchunPopup;
