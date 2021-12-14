/*
 * @Author: 一尾流莺
 * @Description:pageSize
 * @Date: 2021-11-13 15:36:37
 * @LastEditTime: 2021-11-21 21:32:22
 * @FilePath: \ired_resource\src\pages\public\home\hooks\usePageSize.ts
 */

import { ref } from 'vue'

const usePageSize = () => {
  const pageSize = ref(1)
  const changePageSize = () => {
    pageSize.value += 1
  }

  return {
    pageSize,
    changePageSize,
  };
};

export default usePageSize;