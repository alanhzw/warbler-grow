/**
 * @Description:caoshijie
 * @Date: 2021/12/1
 * @Description: 【swisse】会员下单送E卡-大贸 2档
 * @FilePath:src\pages\1000147201\99\2112100014720101\hook\tool.ts
*/
import { Toast } from 'vant';
import { reactive, ref } from 'vue';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';

const tools = (baseInfo: BaseInfo): any => {
  const testData = reactive({
    a: 1,
  });
  // 活动内容
  const activityInfo = reactive({ data: {} });
  const getActivityInfo = async () => {
    try {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
      });
      const res = await cjwxRequest.post('/wx/swisse/receiveECard/activityContent', {
        activityId: baseInfo.activityId,
      });
      Toast.clear();
      if (!res.result) {
        Toast.fail(res.errorMessage);
      }
      activityInfo.data = res.data;
    } catch (error) {
      if (error && error.message) {
        console.log(error);
        Toast.fail(error.message);
      }
    }
  };
  const receiveGiftInfo = async (id:string): Promise<any> => {
    const info = ref({});
    try {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        overlay: true,
        duration: 0,
      });
      const res = await cjwxRequest
        .post('/wx/swisse/receiveECard/receive', {
          activityId: baseInfo.activityId,
          giftId: id,
        });
      Toast.clear();
      if (res.result) {
        info.value = res;
      } else {
        info.value = {};
        Toast(res.errorMessage);
      }
    } catch (error) {
      if (error && error.message) {
        console.log(error);
        Toast.fail(error.message);
      }
    }
    return info;
  };

  return {
    getActivityInfo, // 获取活动详情
    activityInfo,
    receiveGiftInfo,
  };
};
export default tools;
