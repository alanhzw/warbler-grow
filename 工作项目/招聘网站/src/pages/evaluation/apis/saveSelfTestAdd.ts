/*
 * @Author: 一尾流莺
 * @Description:人才测评-自测题目保存
 * @Date: 2021-11-01 10:25:46
 * @LastEditTime: 2021-11-13 17:43:42
 * @FilePath: \ired_resource\src\pages\evaluation\apis\saveSelfTestAdd.ts
 */
import { ref } from 'vue';
// @ts-ignore 因为引入的是js  所以找不到类型声明文件
import { UserService } from '@/service';

const useSaveSelfTestAdd = () => {
  const saveSelfTestAddResult = ref({});
  const saveSelfTestAdd = async (dto: any) => {
    const res = await UserService.saveSelfTestAdd({
      dto,
    });
    saveSelfTestAddResult.value = res;
    return res;
  };

  return {
    saveSelfTestAddResult,
    saveSelfTestAdd,
  };
};

export default useSaveSelfTestAdd;
