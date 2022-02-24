/*
 * @Author: 一尾流莺
 * @Description:首页-获取banner
 * @Date: 2021-11-01 10:25:46
 * @LastEditTime: 2021-11-17 14:36:38
 * @FilePath: \ired_resource\src\pages\public\home\apis\getWebBannerList.ts
 */
import { ref } from 'vue';
// @ts-ignore 因为引入的是js  所以找不到类型声明文件
import { CommonService } from '@/service';

const useGetWebBannerList = () => {
  const bannerModel = ref(6);
  const webBannerList = ref([
    {
      bannerId: 'a431cf914d284ef19e0fc47f09de0336',
      bannerJumpType: null,
      bannerJumpUrl: '',
      bannerModel: 6,
      bannerSize: '1',
      bannerType: '1',
      createBy: 'e9ca23d68d884d4ebb19d07889727dae',
      createTime: '2021-09-30 17:34:10',
      deleteFlag: '0',
      id: 1443509464935780400,
      imageUrl: '',
      paramsJson: null,
      sort: 0,
      updateBy: null,
      updateTime: null,
    },
    {
      bannerId: 'a431cf914d284ef19e0fc47f09de0336',
      bannerJumpType: null,
      bannerJumpUrl: '',
      bannerModel: 6,
      bannerSize: '1',
      bannerType: '1',
      createBy: 'e9ca23d68d884d4ebb19d07889727dae',
      createTime: '2021-09-30 17:34:10',
      deleteFlag: '0',
      id: 1443509464935780400,
      imageUrl: '',
      paramsJson: null,
      sort: 0,
      updateBy: null,
      updateTime: null,
    },
    {
      bannerId: 'a431cf914d284ef19e0fc47f09de0336',
      bannerJumpType: null,
      bannerJumpUrl: '',
      bannerModel: 6,
      bannerSize: '1',
      bannerType: '1',
      createBy: 'e9ca23d68d884d4ebb19d07889727dae',
      createTime: '2021-09-30 17:34:10',
      deleteFlag: '0',
      id: 1443509464935780400,
      imageUrl: '',
      paramsJson: null,
      sort: 0,
      updateBy: null,
      updateTime: null,
    },
    {
      bannerId: 'a431cf914d284ef19e0fc47f09de0336',
      bannerJumpType: null,
      bannerJumpUrl: '',
      bannerModel: 6,
      bannerSize: '1',
      bannerType: '1',
      createBy: 'e9ca23d68d884d4ebb19d07889727dae',
      createTime: '2021-09-30 17:34:10',
      deleteFlag: '0',
      id: 1443509464935780400,
      imageUrl: '',
      paramsJson: null,
      sort: 0,
      updateBy: null,
      updateTime: null,
    },
    {
      bannerId: 'a431cf914d284ef19e0fc47f09de0336',
      bannerJumpType: null,
      bannerJumpUrl: '',
      bannerModel: 6,
      bannerSize: '1',
      bannerType: '1',
      createBy: 'e9ca23d68d884d4ebb19d07889727dae',
      createTime: '2021-09-30 17:34:10',
      deleteFlag: '0',
      id: 1443509464935780400,
      imageUrl: '',
      paramsJson: null,
      sort: 0,
      updateBy: null,
      updateTime: null,
    },
    {
      bannerId: 'a431cf914d284ef19e0fc47f09de0336',
      bannerJumpType: null,
      bannerJumpUrl: '',
      bannerModel: 6,
      bannerSize: '1',
      bannerType: '1',
      createBy: 'e9ca23d68d884d4ebb19d07889727dae',
      createTime: '2021-09-30 17:34:10',
      deleteFlag: '0',
      id: 1443509464935780400,
      imageUrl: '',
      paramsJson: null,
      sort: 0,
      updateBy: null,
      updateTime: null,
    },
  ]);
  const getWebBannerList = async () => {
    const res = await CommonService.getWebBannerList({});
    webBannerList.value = res.list;
    bannerModel.value = res.model;
    return res;
  };

  return {
    webBannerList,
    bannerModel,
    getWebBannerList,
  };
};

export default useGetWebBannerList;
