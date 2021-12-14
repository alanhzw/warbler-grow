/*
 * @Descripttion: 在线简历-个人基础信息
 * @Author: yang chenglin
 * @Date: 2021-11-03 19:21:06
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-16 19:09:44
 */

import { ref } from 'vue';
import { UserService } from '@/service';

const handleUserInfo = () => {
  const userInfo = ref({
    headImageUrl: '',
    realName: '',
    cvJobHuntingStatus: '1',
    sex: 1, // 1 男 2 女
    phoneNumber: '',
    birthday: '',
    mail: '',
    workTime: ['', ''],
    workingYears: '1',
    cvWorkTimeStart: '',
    cvWorkTimeEnd: '',
    cvAdvantage: '',
  });

  // 获取个人基础信息
  const getMpUserInfo = async () => {
    const res = await UserService.getMpUserInfo();
    res.workTime = [res.cvWorkTimeStart, res.cvWorkTimeEnd];
    userInfo.value = res;
  };
  // 保存个人基础信息
  const saveMpUserInfo = async (obj: Object) => {
    await UserService.saveMpUserInfo(obj);
  };
  // 保存个人优势
  const saveCvAdvantage = async (obj: Object) => {
    await UserService.saveCvAdvantage(obj);
  };

  return {
    userInfo,
    getMpUserInfo,
    saveMpUserInfo,
    saveCvAdvantage,
  };
};

export default handleUserInfo;
