/*
 * @Author: 一尾流莺
 * @Description:跟查看地址弹窗相关的操作
 * @Date: 2021-09-01 16:29:57
 * @LastEditTime: 2021-10-12 15:33:50
 * @FilePath: \custom\src\pages\1000123965\99\2110100012396501\popup\useSeeAddressPopup.ts
 */
import { ref } from 'vue';

const useSeeAddressPopup = () => {
  // 是否展示查看地址弹窗
  const isShowSeeAddressPopup = ref(false);

  // 打开查看地址弹窗
  const openSeeAddressPopup = () => {
    isShowSeeAddressPopup.value = true;
  };

  // 关闭查看地址弹窗
  const closeSeeAddressPopup = () => {
    isShowSeeAddressPopup.value = false;
  };
  return {
    isShowSeeAddressPopup,
    openSeeAddressPopup,
    closeSeeAddressPopup,
  };
};

export default useSeeAddressPopup;
