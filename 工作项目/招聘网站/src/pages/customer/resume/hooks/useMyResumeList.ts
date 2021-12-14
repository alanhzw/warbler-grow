/*
 * @Descripttion:
 * @Author: yang chenglin
 * @Date: 2021-11-18 23:34:54
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-18 23:39:07
 */
import { ref } from 'vue';
import { UserService } from '@/service';

const useMyResumeList = () => {
  const resumeList = ref([]);

  const getResumeList = async () => {
    const res = await UserService.getMyResumeList();
    resumeList.value = res;
  };
  const delResumeList = async (obj: Object) => {
    const res = await UserService.delResume(obj);
    resumeList.value = res;
  };

  return {
    resumeList,
    getResumeList,
    delResumeList,
  };
};

export default useMyResumeList;
