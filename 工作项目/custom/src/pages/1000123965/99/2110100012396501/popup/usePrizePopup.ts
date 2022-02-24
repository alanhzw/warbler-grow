/*
 * @Author: 一尾流莺
 * @Description:跟我的奖品弹窗相关的操作
 * @Date: 2021-09-01 16:29:57
 * @LastEditTime: 2021-10-12 14:44:47
 * @FilePath: \custom\src\pages\1000123965\99\2110100012396501\popup\usePrizePopup.ts
 */
import { ref } from 'vue';

import useGetMyPrize from '../apis/useGetMyPrize';

const usePrizePopup = (baseInfo:any) => {
  const { getMyPrize, prizeList } = useGetMyPrize(baseInfo);
  // 是否展示我的奖品弹窗
  const isShowPrizePopup = ref(false);

  // 打开我的奖品弹窗
  const openPrizePopup = async () => {
    await getMyPrize();
    isShowPrizePopup.value = true;
  };

  // 关闭我的奖品弹窗
  const closePrizePopup = () => {
    isShowPrizePopup.value = false;
  };
  return {
    isShowPrizePopup,
    openPrizePopup,
    closePrizePopup,
    prizeList,
  };
};

export default usePrizePopup;
