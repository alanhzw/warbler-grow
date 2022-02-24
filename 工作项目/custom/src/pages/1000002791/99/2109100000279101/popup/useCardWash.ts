/*
 * @Author: 一尾流莺
 * @Description:兑换洗手卡
 * @Date: 2021-09-01 16:29:Wash7
 * @LastEditTime: 2021-09-24 10:33:19
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\popup\useCardWash.ts
 */
import { ref } from 'vue';

const useWashPopup = () => {
  // 是否展示获得洗手卡弹窗
  const isShowWashPopup = ref(false);

  // 打开获得洗手卡弹窗
  const openWashPopup = async () => {
    isShowWashPopup.value = true;
  };

  // 关闭获得洗手卡弹窗
  const closeWashPopup = () => {
    isShowWashPopup.value = false;
  };
  return {
    isShowWashPopup,
    openWashPopup,
    closeWashPopup,
  };
};

export default useWashPopup;
