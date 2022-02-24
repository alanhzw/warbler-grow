/*
 * @Author: 一尾流莺
 * @Description:保存addressId的变量
 * @Date: 2021-09-24 11:51:48
 * @LastEditTime: 2021-09-24 12:01:05
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\hooks\useAddressId.ts
 */

import { ref } from 'vue';

const useAddressIdPopup = () => {
  // 保存addressId的变量
  const addressId = ref('');
  const changeAddressId = (id: any) => {
    addressId.value = id;
  };
  return {
    addressId,
    changeAddressId,
  };
};

export default useAddressIdPopup;
