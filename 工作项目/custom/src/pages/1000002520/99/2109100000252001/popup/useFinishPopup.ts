/*
 * @Author: 一尾流莺
 * @Description:已完成操作弹窗
 * @Date: 2021-09-01 16:29:57
 * @LastEditTime: 2021-09-28 09:59:43
 * @FilePath: \custom\src\pages\1000002520\99\2109100000252001\popup\useFinishPopup.ts
 */
import { ref } from 'vue';

const useFinishPopup = () => {
  // 是否展示已完成操作弹窗
  const isShowFinishPopup = ref(false);

  // 打开已完成操作弹窗
  const openFinishPopup = () => {
    isShowFinishPopup.value = true;
  };

  // 关闭已完成操作弹窗
  const closeFinishPopup = () => {
    isShowFinishPopup.value = false;
  };
  return {
    isShowFinishPopup,
    openFinishPopup,
    closeFinishPopup,
  };
};

export default useFinishPopup;
