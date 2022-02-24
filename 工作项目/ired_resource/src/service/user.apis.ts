/*
 * @Author: YC
 * @Description:用户接口
 * @Date: 2021-11-01 10:15:43
 * @LastEditTime: 2021-11-18 23:36:52
 * @FilePath: \ired_resource\src\service\user.apis.ts
 */
const userAjax: any = {
  // 获取首页统计数据的接口
  getUserInfo: {
    url: '/',
    method: 'GET',
  },
  // 人才测评-查看上次测评结果
  getViewLast: {
    url: '/viewLast',
    method: 'GET',
  },
  // 人才测评-答题测试列表
  getAnswerList: {
    url: '/allList',
    method: 'GET',
  },
  // 人才测评-答题测试保存
  saveAnswer: {
    url: '/add',
    method: 'POST',
  },
  // 人才测评-自测列表查询
  getSelfTestList: {
    url: '/list',
    method: 'GET',
  },
  // 人才测评-自测题目保存
  saveSelfTestAdd: {
    url: '/selfTestAdd',
    method: 'POST',
  },
  // 人才测评-自我评价-选择一个最符合你的结果
  getSelectResult: {
    url: '/selectResult',
    method: 'POST',
  },
  // 设置是否允许企业查看我的测评结果
  viewable: {
    url: '/viewable',
    method: 'PUT',
  },
  // 设置是否允许企业查看我的测评结果
  evaluationDisplay: {
    url: '/evaluationDisplay',
    method: 'GET',
  },
  // 应聘记录
  getApplyForList: {
    url: '/getMineApplyForList',
    method: 'GET',
  },
  // 获取相似职位
  getSimilarPositions: {
    url: '/getSimilarPositions',
    method: 'GET',
  },
  // 收藏记录
  getCollectRecruitmentList: {
    url: '/getCollectRecruitmentList',
    method: 'GET',
  },
  // 收藏职位
  collectRecruitment: {
    url: '/collectRecruitment',
    method: 'POST',
  },
  // 取消收藏职位
  unCollectRecruitment: {
    url: '/unCollectRecruitment',
    method: 'POST',
  },
  // 投递简历
  doCvDelivery: {
    url: '/doCvDelivery',
    method: 'POST',
  },
  
  // 拒绝邀请
  declineInvitation: {
    url: '/declineInvitation',
    method: 'POST',
  },
  // 接受邀请
  agreeInvitation: {
    url: '/agreeInvitation',
    method: 'POST',
  },
  

  /**
   * 在线填写简历
   */
  // 获取个人信息
  getMpUserInfo: {
    url: '/getMpUserInfo',
    method: 'GET',
  },
  // 保存个人信息
  saveMpUserInfo: {
    url: '/saveMpUserInfo',
    method: 'POST',
  },
  // 保存个人优势
  saveCvAdvantage: {
    url: '/saveCvAdvantage',
    method: 'POST',
  },
  // 获取可用标签列表
  getResumeLabel: {
    url: '/getResumeLabel',
    method: 'GET',
  },
  // 获取我的标签
  getMyTags: {
    url: '/getMyTags',
    method: 'GET',
  },
  // 保存我的标签
  addMyTag: {
    url: '/addMyTag',
    method: 'POST',
  },
  // 获取求职期望
  getJobExpectations: {
    url: '/getJobExpectations',
    method: 'GET',
  },
  // 添加求职期望
  addJobExpectations: {
    url: '/addJobExpectations',
    method: 'POST',
  },
  // 编辑求职期望
  editJobExpectations: {
    url: '/editJobExpectations',
    method: 'POST',
  },
  // 删除求职期望
  delJobExpectationsById: {
    url: '/delJobExpectationsById',
    method: 'DELETE',
  },
  // 获取工作经历
  getWorkExperiences: {
    url: '/getWorkExperiences',
    method: 'GET',
  },
  // 添加工作经历
  addWorkExperiences: {
    url: '/addWorkExperience',
    method: 'POST',
  },
  // 编辑工作经历
  editWorkExperiences: {
    url: '/editWorkExperience',
    method: 'POST',
  },
  // 删除工作经历
  delWorkExperiencesById: {
    url: '/delWorkExperienceById',
    method: 'DELETE',
  },
  // 获取项目经历
  getProjectExperience: {
    url: '/getProjectExperience',
    method: 'GET',
  },
  // 添加项目经历
  addProjectExperience: {
    url: '/addProjectExperience',
    method: 'POST',
  },
  // 编辑项目经历
  editProjectExperience: {
    url: '/editProjectExperience',
    method: 'POST',
  },
  // 删除项目经历
  delProjectExperienceById: {
    url: '/delProjectExperienceById',
    method: 'DELETE',
  },
  // 获取教育经历
  getEduExperience: {
    url: '/getEduExperience',
    method: 'GET',
  },
  // 添加教育经历
  addEduExperience: {
    url: '/addEduExperience',
    method: 'POST',
  },
  // 编辑教育经历
  editEduExperience: {
    url: '/editEduExperience',
    method: 'POST',
  },
  // 删除教育经历
  delEduExperienceById: {
    url: '/delEduExperienceById',
    method: 'DELETE',
  },
  // 在线简历预览
  cvDataShowBack: {
    url: '/cvDataShowBack',
    method: 'GET',
  },
  // 获取附件简历列表
  getMyResumeList: {
    url: '/getMyResumeList',
    method: 'GET',
  },
  // 删除附件简历
  delResume: {
    url: '/delResume',
    method: 'DELETE',
  },
};

const exportObj: any = {};
Object.keys(userAjax).forEach((key: any) => {
  exportObj[key] = {
    ...userAjax[key],
    url: `/irededu/iredtalents/pc${userAjax[key].url}`,
  };
});

export default exportObj;
