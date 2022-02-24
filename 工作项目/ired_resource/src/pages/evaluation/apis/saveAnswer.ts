/*
 * @Author: 一尾流莺
 * @Description:人才测评-答题测试保存
 * @Date: 2021-11-01 10:25:46
 * @LastEditTime: 2021-11-08 10:42:12
 * @FilePath: \ired_resource\src\pages\evaluation\apis\saveAnswer.ts
 */
import { ref } from 'vue';
// @ts-ignore 因为引入的是js  所以找不到类型声明文件
import { UserService } from '@/service';

const useSaveAnswer = () => {
  const saveAnswerResult = ref({});
  const saveAnswer = async (param:any) => {
    const res = await UserService.saveAnswer({
      list: param,
    });
    saveAnswerResult.value = res;
    return res;
  };

  return {
    saveAnswerResult,
    saveAnswer,
  };
};

export default useSaveAnswer;
