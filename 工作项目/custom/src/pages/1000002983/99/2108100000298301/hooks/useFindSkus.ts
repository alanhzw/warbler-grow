/*
 * @Author: 一尾流莺
 * @Description: 曝光商品相关
 * @Date: 2021-08-27 14:37:01
 * @LastEditTime: 2021-08-30 15:12:17
 * @FilePath: \custom\src\pages\1000002983\99\2108100000298301\hooks\useFindSkus.ts
 */
import { Toast } from 'vant';
import { ref } from 'vue';
import { BaseInfo } from '@/types/BaseInfo';

import { cjwxRequest } from '@/utils/service';
import { apisOptions } from '../config/index';

// 查询skus
const useFindSkus = (baseInfo: BaseInfo): any => {
  // sku列表
  const skusList = ref([]);
  // 获取回来图片的url要拼接上baseurl才可以使用
  const baseUrl = 'https://img10.360buyimg.com/n1';
  // 获取曝光商品
  const findSkus = async () => {
    try {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
      });
      const res = await cjwxRequest.post(apisOptions.findSkus, {
        actId: 2108100000298302,
        userId: baseInfo.venderId,
        type: 16,
      });
      skusList.value = res.skus;
      if (!res.isOk) {
        Toast.fail(res.msg);
      }
    } catch (error) {
      if (error && error.message) {
        Toast.fail(error.message);
      }
    } finally {
      Toast.clear();
    }
  };

  return {
    skusList,
    baseUrl,
    findSkus,
  };
};
export default useFindSkus;
