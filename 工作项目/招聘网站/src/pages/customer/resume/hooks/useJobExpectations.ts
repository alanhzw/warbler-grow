/*
 * @Descripttion: 在线简历-求职期望
 * @Author: yang chenglin
 * @Date: 2021-11-03 23:01:23
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-09 19:28:45
 */
import { ref } from 'vue';
import { UserService } from '@/service';

const useJobExpectations = () => {
  const jobExpectations = ref([{
    jobExpectId: '',
    expectType: '1', // 期望类型 1-全职 2-兼职
    expectAddress: '',
    expectIndustryCode: '', // 期望行业
    expectIndustryName: '',
    expectMoneyFrom: '',
    expectMoneyTo: '',
    expectClassificationFatherId: '', // 期望职位的三级分类
    expectPostClassifyId: '',
    expectPostId: '',
    expectPostName: '',
  }]);

  // 获取期望职位
  const getJobExpectations = async () => {
    const res = await UserService.getJobExpectations();
    jobExpectations.value = res.length ? res : [...jobExpectations.value];
  };
  // 添加期望职位
  const addJobExpectations = async (obj: Object) => {
    await UserService.addJobExpectations(obj);
  };
  // 编辑期望职位
  const editJobExpectations = async (obj: Object) => {
    await UserService.editJobExpectations(obj);
  };
  // 删除期望职位
  const delJobExpectationsById = async (obj: Object) => {
    await UserService.delJobExpectationsById(obj);
  };

  return {
    jobExpectations,
    getJobExpectations,
    addJobExpectations,
    editJobExpectations,
    delJobExpectationsById,
  };
};

export default useJobExpectations;
