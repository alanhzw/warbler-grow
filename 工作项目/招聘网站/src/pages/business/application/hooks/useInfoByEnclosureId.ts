/*
 * @Descripttion: 获取在线简历详情
 * @Author: yang chenglin
 * @Date: 2021-11-18 23:14:54
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-18 23:18:39
 */
import { ref } from 'vue';
import { AdminService } from '@/service';

const useInfoByEnclosureId = () => {
  const enclosureIdInfo = ref('');
  // 求职状态
  const getInfoByEnclosureId = async (obj: Object) => {
    const res = await AdminService.getInfoByEnclosureId(obj);
    enclosureIdInfo.value = res;
  };

  return {
    enclosureIdInfo,
    getInfoByEnclosureId,
  };
};

export default useInfoByEnclosureId;
