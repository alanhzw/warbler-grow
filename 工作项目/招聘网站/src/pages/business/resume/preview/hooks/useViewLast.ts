/*
 * @Author: 一尾流莺
 * @Description:人才测评-查看上次测评结果
 * @Date: 2021-11-01 10:25:46
 * @LastEditTime: 2021-11-14 16:12:16
 * @FilePath: \ired_resource\src\pages\evaluation\apis\getViewLast.ts
 */
import { ref } from 'vue';
// @ts-ignore 因为引入的是js  所以找不到类型声明文件
import { UserService } from '@/service';

const useViewLast = () => {
  const viewLast = ref({});
  const getViewLast = async () => {
    const res = await UserService.getViewLast({});
    viewLast.value = res;
    return res;
  };

  return {
    viewLast,
    getViewLast,
  };
};

export default useViewLast;
