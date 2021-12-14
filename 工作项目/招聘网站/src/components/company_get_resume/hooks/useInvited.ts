/*
 * @Descripttion: 邀请面试
 * @Author: yang chenglin
 * @Date: 2021-11-15 19:37:58
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-15 19:40:41
 */
import { ref } from 'vue';
import { AdminService } from '@/service';

const useInvited = () => {
  const setInvited = async (obj: Object) => {
    await AdminService.invited(obj);
  };

  return {
    setInvited,
  };
};

export default useInvited;
