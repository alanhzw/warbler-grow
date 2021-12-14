/*
 * @Author: 一尾流莺
 * @Description:首页-获取热门企业
 * @Date: 2021-11-01 10:25:46
 * @LastEditTime: 2021-11-23 20:13:50
 * @FilePath: \ired_resource\src\pages\public\home\apis\getCompanyList.ts
 */
import { ref } from 'vue';
// @ts-ignore 因为引入的是js  所以找不到类型声明文件
import { CommonService } from '@/service';
const useGetCompanyList = () => {
  const companyList = ref<any>([]);
  const getCompanyList = async (pageNo:any) => {
    const res = await CommonService.getCompanyList({
      pageNo,
      pageSize:8
    });
    res.records.forEach((item:any) => {
      companyList.value.push(item)
    });
    return res;
  };
  return {
    companyList,
    getCompanyList,
  };
};

export default useGetCompanyList;
