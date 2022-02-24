/*
 * @Author: 一尾流莺
 * @Description:红包到账弹窗
 * @Date: 2021-09-01 16:29:57
 * @LastEditTime: 2021-09-28 10:02:29
 * @FilePath: \custom\src\pages\1000002520\99\2109100000252001\popup\useRedPackagePopup.ts
 */
import { ref } from 'vue';

const useRedPackagePopup = () => {
  // 是否展示红包到账弹窗
  const isShowRedPackagePopup = ref(false);

  // 打开红包到账弹窗
  const openRedPackagePopup = () => {
    isShowRedPackagePopup.value = true;
  };

  // 关闭红包到账弹窗
  const closeRedPackagePopup = () => {
    isShowRedPackagePopup.value = false;
  };
  return {
    isShowRedPackagePopup,
    openRedPackagePopup,
    closeRedPackagePopup,
  };
};

export default useRedPackagePopup;
