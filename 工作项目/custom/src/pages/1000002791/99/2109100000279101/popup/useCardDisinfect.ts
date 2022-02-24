/*
 * @Author: 一尾流莺
 * @Description:兑换消毒卡
 * @Date: 2021-09-01 16:29:Disinfect7
 * @LastEditTime: 2021-09-24 10:33:10
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\popup\useCardDisinfect.ts
 */
import { ref } from 'vue';

const useDisinfectPopup = () => {
  // 是否展示获得消毒卡弹窗
  const isShowDisinfectPopup = ref(false);

  // 打开获得消毒卡弹窗
  const openDisinfectPopup = async () => {
    isShowDisinfectPopup.value = true;
  };

  // 关闭获得消毒卡弹窗
  const closeDisinfectPopup = () => {
    isShowDisinfectPopup.value = false;
  };
  return {
    isShowDisinfectPopup,
    openDisinfectPopup,
    closeDisinfectPopup,
  };
};

export default useDisinfectPopup;
