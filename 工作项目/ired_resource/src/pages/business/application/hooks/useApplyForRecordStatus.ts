/*
 * @Descripttion: 操作应聘简历
 * @Author: yang chenglin
 * @Date: 2021-11-13 22:21:46
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-13 22:23:10
 */
import { reactive } from 'vue';
import { AdminService } from '@/service';

const useApplyForRecordStatus = () => {
  const setApplyForRecordStatus = async (obj: Object) => {
    await AdminService.editApplyForRecordStatus(obj);
  };
  const delApplyForRecordStatus = async (obj: Object) => {
    await AdminService.deleteApplyForRecordInfo(obj);
  };

  return {
    setApplyForRecordStatus,
    delApplyForRecordStatus,
  };
};

export default useApplyForRecordStatus;
