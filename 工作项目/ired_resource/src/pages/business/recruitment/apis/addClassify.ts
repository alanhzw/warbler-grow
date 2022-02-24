/*
 * @Author: 一尾流莺
 * @Description:申请岗位名称
 * @Date: 2021-11-18 15:11:57
 * @LastEditTime: 2021-11-18 18:59:12
 * @FilePath: \ired_resource\src\pages\business\recruitment\apis\addClassify.ts
 */
import { ref } from 'vue';
import { AdminService } from '@/service';

const useAddClassify = () => {
  const addClassifyResult = ref();

  const addClassify = async (params:any) => {
    const res = await AdminService.addClassify({
      ...params,
      postId: params?.recruitmentPostName,
      postClassifyId: params?.classificationValue,
      isLongValid: params.isLongValid ? 1 : 2,
    });
    addClassifyResult.value = res;
  };

  return {
    addClassifyResult,
    addClassify,
  };
};

export default useAddClassify;
