/*
 * @Author: 一尾流莺
 * @Description:跟兑换失败30相关的操作
 * @Date: 2021-09-01 16:29:57
 * @LastEditTime: 2021-09-26 10:13:56
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\popup\useFail30.ts
 */
import { ref } from 'vue';

const useFail30Popup = () => {
  // 是否展示兑换失败30弹窗
  const isShowFail30Popup = ref(false);

  // 打开兑换失败30弹窗
  const openFail30Popup = () => {
    isShowFail30Popup.value = true;
  };

  // 关闭兑换失败30弹窗
  const closeFail30Popup = () => {
    isShowFail30Popup.value = false;
  };
  return {
    isShowFail30Popup,
    openFail30Popup,
    closeFail30Popup,
  };
};

export default useFail30Popup;
