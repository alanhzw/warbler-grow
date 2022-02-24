/*
 * @Author: 一尾流莺
 * @Description:人才测评-自测列表查询
 * @Date: 2021-11-01 10:25:46
 * @LastEditTime: 2021-11-19 19:20:03
 * @FilePath: \ired_resource\src\pages\evaluation\apis\getSelfTestList.ts
 */
import { ref } from 'vue';
// @ts-ignore 因为引入的是js  所以找不到类型声明文件
import { UserService } from '@/service';

const map = ['firstDimension', 'secondDimension', 'thirdDimension', 'fourthDimension'];

const useGetSelfTestList = () => {
  const selfTestList = ref(
    {
      firstDimension: [
        {
          name: '',
          detailList: [],
        },
        {
          name: '',
          detailList: [],
        },
      ],
    },
  );
  const getSelfTestList = async () => {
    const res = await UserService.getSelfTestList({});
    map.forEach((item) => {
      res[item][0].isSelect = '0';
      res[item][1].isSelect = '0';
    });
    selfTestList.value = res;
  };

  return {
    selfTestList,
    getSelfTestList,
  };
};

export default useGetSelfTestList;
