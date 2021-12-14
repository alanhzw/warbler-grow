/*
 * @Author: 一尾流莺
 * @Description:人才_职位名称申请-添加
 * @Date: 2021-11-18 15:11:57
 * @LastEditTime: 2021-11-20 14:15:51
 * @FilePath: \ired_resource\src\pages\business\recruitment\apis\addPost.ts
 */
import { ref } from 'vue';
import { AdminService } from '@/service';

const useAddPost = () => {
  const addPostResult = ref();

  const addPost = async (params:any) => {
    const res = await AdminService.addPost({
      ...params,
    });
    addPostResult.value = res;
  };

  return {
    addPostResult,
    addPost,
  };
};

export default useAddPost;
