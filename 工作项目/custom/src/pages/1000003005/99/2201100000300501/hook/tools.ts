/**
 * @Description:caoshijie
 * @Date: 2021/12/30
 * @Description: 方法
 * @FilePath:src\pages\1000003005\99\2201100000300501\hook\tools.ts
*/
import { Toast } from 'vant';
import { ref } from 'vue';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';

const tools = (baseInfo: BaseInfo): any => {
  // 活动内容
  const activityInfo = ref({});
  // 活动规则
  const activityRules = ref('');
  // 展示sku数据
  const skuList = ref([]);
  const getActivityInfo = async () => {
    try {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
      });
      const res = await cjwxRequest.post('/crm/oralb/purchase/activityContent', {
        activityId: baseInfo.activityId,
      });
      Toast.clear();
      if (!res.result) {
        Toast.fail(res.errorMessage);
      }
      activityInfo.value = res.data;
    } catch (error) {
      if (error && error.message) {
        console.log(error);
        Toast.fail(error.message);
      }
    }
  };
  const getActivityRules = async () => {
    try {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
      });
      const res = await cjwxRequest.get(`common/brand/getFullActInfoVo?activityId=${baseInfo.activityId}`);
      Toast.clear();
      if (!res.result) {
        Toast.fail(res.errorMessage);
      }
      activityRules.value = res?.data?.rule.split('\n').join('<br/>');
    } catch (error) {
      if (error && error.message) {
        console.log(error);
        Toast.fail(error.message);
      }
    }
  };
  const finSkuList = async () => {
    try {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
      });
      const res = await cjwxRequest.post('/act/common/findSkus', {
        actId: baseInfo.activityId,
        userId: baseInfo.venderId,
        type: baseInfo.activityType,
      });
      Toast.clear();
      if (!res.isOk) {
        Toast.fail(res.msg);
      }
      skuList.value = res.skus;
    } catch (error) {
      if (error && error.message) {
        Toast.fail(error.message);
      }
    }
  };
  const addCar = async (id: string) => {
    try {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        overlay: true,
        duration: 0,
      });
      const res = await cjwxRequest
        .post('/common/pointRedeem/addCart', {
          type: baseInfo.activityType,
          activityId: baseInfo.activityId,
          skuId: id,
        });
      Toast.clear();

      if (res.result) {
        Toast('加购成功。');
      } else {
        Toast(res.errorMessage);
      }
    } catch (error) {
      if (error && error.message) {
        console.log(error);
        Toast.fail(error.message);
      }
    }
  };
  const joinActive = async (): Promise<boolean> => {
    const isJoin = ref(false);
    try {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        overlay: true,
        duration: 0,
      });
      const res = await cjwxRequest
        .post('/crm/oralb/purchase/join', {
          activityId: baseInfo.activityId,
        });
      Toast.clear();
      if (res.result) {
        isJoin.value = true;
      } else {
        isJoin.value = false;
        Toast(res.errorMessage);
      }
    } catch (error) {
      if (error && error.message) {
        console.log(error);
        Toast.fail(error.message);
      }
    }
    return isJoin.value;
  };

  return {
    getActivityInfo, // 获取活动详情
    getActivityRules, // 获取活动规则
    finSkuList, // 查询sku
    addCar, // 加入购物车
    joinActive, // 计入活动，领取令牌
    activityInfo,
    activityRules,
    skuList,
  };
};
export default tools;
