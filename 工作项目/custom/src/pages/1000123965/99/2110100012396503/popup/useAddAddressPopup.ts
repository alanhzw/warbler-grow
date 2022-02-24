/*
 * @Author: 一尾流莺
 * @Description:跟添加地址弹窗相关的操作
 * @Date: 2021-09-01 16:29:57
 * @LastEditTime: 2021-10-12 15:33:38
 * @FilePath: \custom\src\pages\1000123965\99\2110100012396501\popup\useAddAddressPopup.ts
 */
import { ref } from 'vue';

const useAddAddressPopup = () => {
  // 是否展示添加地址弹窗
  const isShowAddAddressPopup = ref(false);

  // 打开添加地址弹窗
  const openAddAddressPopup = () => {
    isShowAddAddressPopup.value = true;
  };

  // 关闭添加地址弹窗
  const closeAddAddressPopup = () => {
    isShowAddAddressPopup.value = false;
  };
  return {
    isShowAddAddressPopup,
    openAddAddressPopup,
    closeAddAddressPopup,
  };
};

export default useAddAddressPopup;
