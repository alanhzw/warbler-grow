/*
 * @Author: 一尾流莺
 * @Description:添加地址/查看地址
 * @Date: 2021-09-02 16:29:10
 * @LastEditTime: 2021-09-06 21:16:36
 * @FilePath: \custom\src\pages\1000001195\99\2109100000119502\hooks\useAddAddress.ts
 */
import { ref } from 'vue';
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
import { apisOptions } from '../config/index';

const useAddAddress = () => {
// 查看地址
  const checkAddress = async (baseInfo: any, generateId:any) => {
    let res;
    try {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
      });
      res = await cjwxRequest.post(apisOptions.checkAddress, {
        generateId,
      });
      // 测试代码
      if (!res.result) {
        Toast.fail(res.errorMessage);
      }
    } catch (error) {
      if (error && error.message) {
        Toast.fail(error.message);
      }
    } finally {
      Toast.clear();
    }
    return res;
  };

  // 添加地址
  const addAddress = async (baseInfo: any, content: any, giftId:any, closePopup:any, isCanSubmit:any) => {
    if (!isCanSubmit) {
      Toast.success('地址不可以修改哦~');
      return;
    }
    try {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
      });
      const res = await cjwxRequest.post(apisOptions.addAddress, {
        venderId: baseInfo.venderId,
        pin: baseInfo.pin,
        activityId: baseInfo.activityId,
        actType: baseInfo.activityType,
        prizeName: '',
        receiver: content.name,
        phone: content.tel,
        province: content.province,
        city: content.city,
        address: content.addressDetail,
        generateId: giftId,
        postalCode: content.postalCode,
        personalEmail: '',
        areaCode: content.areaCode,
        county: content.county,
      });
      const { data } = res;
      // 测试代码
      if (!res.result) {
        Toast.fail(res.errorMessage);
      } else {
        Toast.success('保存成功');
        closePopup();
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
    addAddress,
    checkAddress,
  };
};

export default useAddAddress;
