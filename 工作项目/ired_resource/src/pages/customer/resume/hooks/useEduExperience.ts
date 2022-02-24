/*
 * @Descripttion: 在线简历-教育经历
 * @Author: yang chenglin
 * @Date: 2021-11-06 13:44:06
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-09 19:58:02
 */
import { ref } from 'vue';
import { UserService } from '@/service';

const useEduExperience = () => {
  const eduExperience = ref([{
    eduExperienceId: '',
    schoolName: '',
    atSchoolTimeStart: '',
    atSchoolTimeEnd: '',
    specialtyName: '',
    education: '4', // (0:初中及以下 1:中专 2:高中 3:大专 4:本科 5:硕士 6:博士 )
  }]);

  // 获取教育经历
  const getEduExperience = async () => {
    const res = await UserService.getEduExperience();
    eduExperience.value = res.length ? res : [...eduExperience.value];
  };
  // 添加教育经历
  const addEduExperience = async (obj: Object) => {
    await UserService.addEduExperience(obj);
  };
  // 编辑教育经历
  const editEduExperience = async (obj: Object) => {
    await UserService.editEduExperience(obj);
  };
  // 删除教育经历
  const delEduExperienceById = async (obj: Object) => {
    await UserService.delEduExperienceById(obj);
  };

  return {
    eduExperience,
    getEduExperience,
    addEduExperience,
    editEduExperience,
    delEduExperienceById,
  };
};

export default useEduExperience;
