/*
 * @Author: 一尾流莺
 * @Description:兑换灭菌卡
 * @Date: 2021-09-01 16:29:Sterilization7
 * @LastEditTime: 2021-09-24 10:33:23
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\popup\useCardSterilization.ts
 */
import { ref } from 'vue';

const useSterilizationPopup = () => {
  // 是否展示获得灭菌卡弹窗
  const isShowSterilizationPopup = ref(false);

  // 打开获得灭菌卡弹窗
  const openSterilizationPopup = async () => {
    isShowSterilizationPopup.value = true;
  };

  // 关闭获得灭菌卡弹窗
  const closeSterilizationPopup = () => {
    isShowSterilizationPopup.value = false;
  };
  return {
    isShowSterilizationPopup,
    openSterilizationPopup,
    closeSterilizationPopup,
  };
};

export default useSterilizationPopup;
