/*
 * @Author: 一尾流莺
 * @Description:查询是否允许企业查看我的测评结果
 * @Date: 2021-11-13 20:11:00
 * @LastEditTime: 2021-11-13 20:52:05
 * @FilePath: \ired_resource\src\pages\evaluation\apis\evaluationDisplay.ts
 */

import { ref } from 'vue';
// @ts-ignore 因为引入的是js  所以找不到类型声明文件
import { UserService } from '@/service';

const useEvaluationDisplay = () => {
  const evaluationDisplayResult = ref(false);
  const evaluationDisplay = async () => {
    const res = await UserService.evaluationDisplay({

    });
    if (res === '1') {
      evaluationDisplayResult.value = true;
    } else {
      evaluationDisplayResult.value = false;
    }
  };
  return {
    evaluationDisplayResult,
    evaluationDisplay,
  };
};

export default useEvaluationDisplay;
