/*
 * @Author: 一尾流莺
 * @Description:企业HR列表
 * @Date: 2021-11-01 10:25:46
 * @LastEditTime: 2021-11-16 10:13:23
 * @FilePath: \ired_resource\src\pages\business\hrManage\apis\getCompanyHrInfoList.ts
 */
import { ref } from 'vue';
// @ts-ignore 因为引入的是js  所以找不到类型声明文件
import { AdminService } from '@/service';

const useGetCompanyHrInfoList = () => {
  const companyHrInfoList = ref([]);
  const getCompanyHrInfoList = async (params:any) => {
    const res = await AdminService.getCompanyHrInfoList({
      companyId: params?.companyId,
      name: params?.name,
      pageNo: 1,
      pageSize: 9999,
      position: params?.position,
    });
    companyHrInfoList.value = res.records;
    return res;
  };

  return {
    companyHrInfoList,
    getCompanyHrInfoList,
  };
};

export default useGetCompanyHrInfoList;
