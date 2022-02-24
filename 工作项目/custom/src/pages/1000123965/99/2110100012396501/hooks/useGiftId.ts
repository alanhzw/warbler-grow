/*
 * @Author: 一尾流莺
 * @Description:保存giftId的变量
 * @Date: 2021-09-24 11:51:48
 * @LastEditTime: 2021-10-12 17:47:16
 * @FilePath: \custom\src\pages\1000123965\99\2110100012396501\hooks\useGiftId.ts
 */

import { ref } from 'vue';

const useGiftId = () => {
  // 保存useGiftId的变量
  const giftId = ref('');
  const changeGiftId = async (id: any) => {
    giftId.value = id;
  };
  return {
    giftId,
    changeGiftId,
  };
};

export default useGiftId;
