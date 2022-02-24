/*
 * @Descripttion: 在线简历-项目经历
 * @Author: yang chenglin
 * @Date: 2021-11-06 13:44:06
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-09 20:22:49
 */
import { ref } from 'vue';
import { UserService } from '@/service';

const useProjectExperience = () => {
  const projectExperience = ref([{
    projectExperienceId: '',
    projectName: '',
    projectRole: '',
    projectUrl: '',
    projectTimeStart: '',
    projectTimeEnd: '',
    projectPerformance: '',
    projectDescribe: '',
  }]);

  // 获取项目经历
  const getProjectExperience = async () => {
    const res = await UserService.getProjectExperience();
    projectExperience.value = res.length ? res : [...projectExperience.value];
  };
  // 添加项目经历
  const addProjectExperience = async (obj: Object) => {
    await UserService.addProjectExperience(obj);
  };
  // 编辑项目经历
  const editProjectExperience = async (obj: Object) => {
    await UserService.editProjectExperience(obj);
  };
  // 删除项目经历
  const delProjectExperienceById = async (obj: Object) => {
    await UserService.delProjectExperienceById(obj);
  };

  return {
    projectExperience,
    getProjectExperience,
    addProjectExperience,
    editProjectExperience,
    delProjectExperienceById,
  };
};

export default useProjectExperience;
