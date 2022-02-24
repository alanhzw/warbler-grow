/*
 * @Author: 一尾流莺
 * @Description:保存cdk的变量
 * @Date: 2021-09-24 11:51:48
 * @LastEditTime: 2021-09-24 15:04:38
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\hooks\useCdk.ts
 */

import { ref } from 'vue';

const useCdkPopup = () => {
  // 保存cdk的变量
  const cdk = ref('');
  const changeCdk = (id: any) => {
    cdk.value = id;
  };
  return {
    cdk,
    changeCdk,
  };
};

export default useCdkPopup;
