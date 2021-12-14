/*
 * @Author: 一尾流莺
 * @Description:获取企业招聘信息列表
 * @Date: 2021-11-01 10:25:46
 * @LastEditTime: 2021-11-20 16:04:36
 * @FilePath: \ired_resource\src\pages\business\recruitment\apis\getRecruitmentInfoList.ts
 */

import { ref } from 'vue';
// @ts-ignore 因为引入的是js  所以找不到类型声明文件
import dayjs from 'dayjs';
import { AdminService } from '@/service';

const useGetRecruitmentInfoList = () => {
  const recruitmentInfoList = ref();
  const getRecruitmentInfoList = async (params: any) => {
    const [releaseDate, endTime] = params.timeMap || ['', ''];
    delete params.timeMap;
    params.releaseDate = releaseDate ? dayjs(releaseDate).format('YYYY-MM-DD HH:mm:ss') : '';
    params.endTime = endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : '';
    Object.keys(params).forEach((key) => {
      if (!params[key]) {
        delete params[key];
      }
    });

    const res = await AdminService.getRecruitmentInfoList({
      ...params,

    });
    recruitmentInfoList.value = res.records;
    return res;
  };

  return {
    recruitmentInfoList,
    getRecruitmentInfoList,
  };
};

export default useGetRecruitmentInfoList;
