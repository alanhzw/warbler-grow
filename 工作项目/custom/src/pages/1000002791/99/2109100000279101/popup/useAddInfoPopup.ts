/*
 * @Author: 一尾流莺
 * @Description:跟添加红包信息弹窗相关的操作
 * @Date: 2021-09-01 16:29:57
 * @LastEditTime: 2021-09-24 10:31:42
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\popup\useAddInfoPopup.ts
 */
import { ref } from 'vue';

const useAddInfoPopup = () => {
  // 是否展示添加红包信息弹窗
  const isShowAddInfoPopup = ref(false);

  // 打开添加红包信息弹窗
  const openAddInfoPopup = () => {
    isShowAddInfoPopup.value = true;
  };

  // 关闭添加红包信息弹窗
  const closeAddInfoPopup = () => {
    isShowAddInfoPopup.value = false;
  };
  return {
    isShowAddInfoPopup,
    openAddInfoPopup,
    closeAddInfoPopup,
  };
};

export default useAddInfoPopup;
