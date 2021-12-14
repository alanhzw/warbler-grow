/*
 * @Author: 一尾流莺
 * @Description:查看全部-招聘岗位
 * @Date: 2021-11-01 10:25:46
 * @LastEditTime: 2021-11-14 14:45:17
 * @FilePath: \ired_resource\src\pages\public\overall\apis\getPostDataByCompanyId.ts
 */
import { ref } from 'vue';
// @ts-ignore 因为引入的是js  所以找不到类型声明文件
import { CommonService } from '@/service';

const useGetPostDataByCompanyId = () => {
  const postData = ref<any>([]);
  const getPostDataByCompanyId = async (companyId:any) => {
    const res = await CommonService.getPostDataByCompanyId({
      companyId,
    });
    postData.value = res;
    return res;
  };

  return {
    postData,
    getPostDataByCompanyId,
  };
};

export default useGetPostDataByCompanyId;
