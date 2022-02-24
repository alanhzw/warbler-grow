/*
 * @Author: 一尾流莺
 * @Description:保存回显地址的变量
 * @Date: 2021-09-24 11:51:48
 * @LastEditTime: 2021-10-12 17:17:10
 * @FilePath: \custom\src\pages\1000123965\99\2110100012396501\hooks\useInitAddress.ts
 */

import { ref } from 'vue';

const useInitAddress = () => {
  // 保存回显地址的变量
  const initAddress = ref({});
  const changeInitAddress = (id: any) => {
    initAddress.value = id;
  };
  return {
    initAddress,
    changeInitAddress,
  };
};

export default useInitAddress;
