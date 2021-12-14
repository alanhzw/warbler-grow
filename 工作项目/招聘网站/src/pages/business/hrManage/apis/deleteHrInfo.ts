/*
 * @Author: 一尾流莺
 * @Description:企业HR列表_通过id删除
 * @Date: 2021-11-01 10:25:46
 * @LastEditTime: 2021-11-16 11:16:22
 * @FilePath: \ired_resource\src\pages\business\hrManage\apis\deleteHrInfo.ts
 */
import { ref } from 'vue';
// @ts-ignore 因为引入的是js  所以找不到类型声明文件
import { AdminService } from '@/service';

const useDeleteHrInfo = () => {
  const deleteHrInfoResult = ref({});
  const deleteHrInfo = async (id:any) => {
    const res = await AdminService.deleteHrInfo({
      id,
    });
    deleteHrInfoResult.value = res;
    return res;
  };

  return {
    deleteHrInfoResult,
    deleteHrInfo,
  };
};

export default useDeleteHrInfo;
