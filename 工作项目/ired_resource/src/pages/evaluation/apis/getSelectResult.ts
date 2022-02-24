/*
 * @Author: 一尾流莺
 * @Description:人才测评-自我评价-选择一个最符合你的结果
 * @Date: 2021-11-01 10:25:46
 * @LastEditTime: 2021-11-13 18:17:22
 * @FilePath: \ired_resource\src\pages\evaluation\apis\getSelectResult.ts
 */
import { ref } from 'vue';
// @ts-ignore 因为引入的是js  所以找不到类型声明文件
import { UserService } from '@/service';

const useGetSelectResult = () => {
  const selectResult = ref({});
  const getSelectResult = async (talentsSubjectTraineeId:any) => {
    const res = await UserService.getSelectResult({
      talentsSubjectTraineeId,
    });
    selectResult.value = res;
    return res;
  };

  return {
    getSelectResult,
    selectResult,
  };
};

export default useGetSelectResult;
