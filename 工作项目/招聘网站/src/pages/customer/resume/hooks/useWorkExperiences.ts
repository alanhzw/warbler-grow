/*
 * @Descripttion: 在线简历-工作经历
 * @Author: yang chenglin
 * @Date: 2021-11-06 13:44:06
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-23 19:56:32
 */
import { ref } from 'vue';
import { UserService } from '@/service';

const useWorkExperiences = () => {
  const workExperiences = ref([{
    workExperienceId: '',
    companyName: '',
    industryCode: '', // 所属行业
    industryName: '',
    onJobTimeStart: '',
    onJobTimeEnd: '',
    jobTitle: '',
    salary: '',
    workContent: '',
  }]);

  // 获取工作经历
  const getWorkExperiences = async () => {
    const res = await UserService.getWorkExperiences();
    workExperiences.value = res.length ? res : [...workExperiences.value];
  };
  // 添加工作经历
  const addWorkExperiences = async (obj: Object) => {
    await UserService.addWorkExperiences(obj);
  };
  // 编辑工作经历
  const editWorkExperiences = async (obj: Object) => {
    await UserService.editWorkExperiences(obj);
  };
  // 删除工作经历
  const delWorkExperiencesById = async (obj: Object) => {
    await UserService.delWorkExperiencesById(obj);
  };

  return {
    workExperiences,
    getWorkExperiences,
    addWorkExperiences,
    editWorkExperiences,
    delWorkExperiencesById,
  };
};

export default useWorkExperiences;
