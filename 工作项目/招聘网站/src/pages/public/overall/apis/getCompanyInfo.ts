/*
 * @Author: 一尾流莺
 * @Description:查看全部-获取公司详情
 * @Date: 2021-11-01 10:25:46
 * @LastEditTime: 2021-11-14 15:53:49
 * @FilePath: \ired_resource\src\pages\public\overall\apis\getCompanyInfo.ts
 */
import { ref } from 'vue';
// @ts-ignore 因为引入的是js  所以找不到类型声明文件
import { CommonService } from '@/service';

const useGetCompanyInfo = () => {
  const companyInfo = ref<any>({});
  const getCompanyInfo = async (companyId:any) => {
    const res = await CommonService.getCompanyInfo({
      companyId,
    });
    companyInfo.value = res;
    return res;
  };

  return {
    companyInfo,
    getCompanyInfo,
  };
};

export default useGetCompanyInfo;
