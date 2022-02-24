/*
 * @Author: 一尾流莺
 * @Description:获取查询是否允许企业查看我的测评结果
 * @Date: 2021-11-13 20:11:00
 * @LastEditTime: 2021-11-13 20:45:14
 * @FilePath: \ired_resource\src\pages\evaluation\apis\viewable.ts
 */

import { ref } from 'vue';
// @ts-ignore 因为引入的是js  所以找不到类型声明文件
import { UserService } from '@/service';

const useViewable = () => {
  const viewableResult = ref('');
  const viewable = async (e:any) => {
    const res = await UserService.viewable({
      e,
    });
    viewableResult.value = res;
    return res;
  };
  return {
    viewableResult,
    viewable,
  };
};

export default useViewable;
