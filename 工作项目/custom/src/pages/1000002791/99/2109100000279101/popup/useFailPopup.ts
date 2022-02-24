/*
 * @Author: 一尾流莺
 * @Description:跟未中奖弹窗相关的操作
 * @Date: 2021-09-01 16:29:57
 * @LastEditTime: 2021-09-24 14:22:33
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\popup\useFail.ts
 */
import { ref } from 'vue';

const useFailPopup = () => {
  // 是否展示未中奖弹窗
  const isShowFailPopup = ref(false);

  // 打开未中奖弹窗
  const openFailPopup = () => {
    isShowFailPopup.value = true;
  };

  // 关闭未中奖弹窗
  const closeFailPopup = () => {
    isShowFailPopup.value = false;
  };
  return {
    isShowFailPopup,
    openFailPopup,
    closeFailPopup,
  };
};

export default useFailPopup;
