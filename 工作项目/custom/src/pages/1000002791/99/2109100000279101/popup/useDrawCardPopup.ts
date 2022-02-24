/*
 * @Author: 一尾流莺
 * @Description:跟立即抽卡弹窗相关的操作
 * @Date: 2021-09-01 16:29:57
 * @LastEditTime: 2021-09-17 14:40:24
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\popup\useDrawCardPopup.ts
 */
import { ref } from 'vue';

const useDrawCardPopup = () => {
  // 是否展示立即抽卡弹窗
  const isShowDrawCardPopup = ref(false);

  // 打开立即抽卡弹窗
  const openDrawCardPopup = () => {
    isShowDrawCardPopup.value = true;
  };

  // 关闭立即抽卡弹窗
  const closeDrawCardPopup = () => {
    isShowDrawCardPopup.value = false;
  };
  return {
    isShowDrawCardPopup,
    openDrawCardPopup,
    closeDrawCardPopup,
  };
};

export default useDrawCardPopup;
