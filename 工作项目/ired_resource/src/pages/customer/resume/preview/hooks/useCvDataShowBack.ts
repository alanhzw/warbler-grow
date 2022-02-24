/*
 * @Descripttion: 在线简历预览
 * @Author: yang chenglin
 * @Date: 2021-11-07 15:15:42
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-21 20:02:56
 */
import { ref } from 'vue';
import { UserService } from '@/service';

const useCvDataShowBack = () => {
  const cvDataShowBack = ref({
    userInfo: {
      headImageUrl: '',
    },
  });

  // 获取标签列表
  const getCvDataShowBack = async () => {
    const res = await UserService.cvDataShowBack();
    cvDataShowBack.value = res;
  };
  return {
    cvDataShowBack,
    getCvDataShowBack,
  };
};

export default useCvDataShowBack;
