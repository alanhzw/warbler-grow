/*
 * @Author: 一尾流莺
 * @Description:查看红包兑换码弹窗
 * @Date: 2021-09-01 16:29:57
 * @LastEditTime: 2021-09-24 14:47:30
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\popup\useCdkPopup.ts
 */
import { ref } from 'vue';

const useCdkPopup = () => {
  // 是否展示查看红包兑换码弹窗
  const isShowCdkPopup = ref(false);

  // 打开查看红包兑换码弹窗
  const openCdkPopup = () => {
    isShowCdkPopup.value = true;
  };

  // 关闭查看红包兑换码弹窗
  const closeCdkPopup = () => {
    isShowCdkPopup.value = false;
  };
  return {
    isShowCdkPopup,
    openCdkPopup,
    closeCdkPopup,
  };
};

export default useCdkPopup;
