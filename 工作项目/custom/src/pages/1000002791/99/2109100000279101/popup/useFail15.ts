/*
 * @Author: 一尾流莺
 * @Description:跟兑换失败15相关的操作
 * @Date: 2021-09-01 16:29:57
 * @LastEditTime: 2021-09-26 10:14:07
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\popup\useFail15.ts
 */
import { ref } from 'vue';

const useFail15Popup = () => {
  // 是否展示兑换失败15弹窗
  const isShowFail15Popup = ref(false);

  // 打开兑换失败15弹窗
  const openFail15Popup = () => {
    isShowFail15Popup.value = true;
  };

  // 关闭兑换失败15弹窗
  const closeFail15Popup = () => {
    isShowFail15Popup.value = false;
  };
  return {
    isShowFail15Popup,
    openFail15Popup,
    closeFail15Popup,
  };
};

export default useFail15Popup;
