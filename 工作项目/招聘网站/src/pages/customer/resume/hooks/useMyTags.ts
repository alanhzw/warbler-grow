/*
 * @Descripttion: 在线简历-个人标签
 * @Author: yang chenglin
 * @Date: 2021-11-03 19:21:06
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-09 19:11:36
 */

import { ref } from 'vue';
import { UserService } from '@/service';

// const useResumeLabel = () => {
//   const resumeLabel = ref([]);

//   // 获取标签列表
//   const getResumeLabel = async () => {
//     const res = await UserService.getResumeLabel();
//     resumeLabel.value = res;
//   };
//   return {
//     resumeLabel,
//     getResumeLabel,
//   };
// };

const useMyTag = () => {
  const resumeLabel = ref([]);
  const myTags = ref([]);

  // 获取标签列表
  const getResumeLabel = async () => {
    const res = await UserService.getResumeLabel();
    console.log(res);
    resumeLabel.value = res;
    console.log(resumeLabel.value, 'qwerwe');
  };

  // 获取我的标签
  const getMyTags = async () => {
    const res = await UserService.getMyTags();
    console.log(res);
    myTags.value = res;
    console.log(myTags.value, '12334');
  };
  // 保存我的标签
  const addMyTag = async (obj: Object) => {
    await UserService.addMyTag(obj);
  };

  return {
    resumeLabel,
    getResumeLabel,
    myTags,
    getMyTags,
    addMyTag,
  };
};

export default useMyTag;
