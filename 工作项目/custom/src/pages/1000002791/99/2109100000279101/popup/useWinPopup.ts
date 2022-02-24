/*
 * @Author: 一尾流莺
 * @Description:跟立即领取弹窗相关的操作
 * @Date: 2021-09-01 16:29:57
 * @LastEditTime: 2021-09-17 14:46:02
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\popup\useWinPopup.ts
 */
import { ref } from 'vue';

const useWinPopup = () => {
  // 是否展示立即领取弹窗
  const isShowWinPopup = ref(false);

  // 打开立即领取弹窗
  const openWinPopup = () => {
    isShowWinPopup.value = true;
  };

  // 关闭立即领取弹窗
  const closeWinPopup = () => {
    isShowWinPopup.value = false;
  };
  return {
    isShowWinPopup,
    openWinPopup,
    closeWinPopup,
  };
};

export default useWinPopup;
