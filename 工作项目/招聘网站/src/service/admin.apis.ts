/*
 * @Descripttion:
 * @Author: yang chenglin
 * @Date: 2021-11-11 18:11:18
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-20 17:32:48
 */
// 管理端接口
const adminAjax: any = {
  getData: {
    url: '/',
    method: 'GET',
  },
  // 首页获取招聘数据
  getCompanyData: {
    url: '/getCompanyData',
    method: 'GET',
  },
  // 首页人才列表
  getRecommendedTalentsList: {
    url: '/recommendedTalentsList',
    method: 'GET',
  },
  // 数据统计
  getDataStatistics: {
    url: '/getDataStatistics',
    method: 'GET',
  },
  // 添加公司Hr
  addCompanyHr: {
    url: '/addCompanyHr',
    method: 'POST',
  },
  // 编辑公司Hr
  editCompanyHrInfo: {
    url: '/editCompanyHrInfo',
    method: 'POST',
  },
  // 企业HR列表_通过id删除
  deleteHrInfo: {
    url: '/deleteHrInfo',
    method: 'DELETE',
  },
  // 企业HR列表
  getCompanyHrInfoList: {
    url: '/getCompanyHrInfoList',
    method: 'GET',
  },
  // 人才列表
  getTalentSquareList: {
    url: '/getTalentSquareList',
    method: 'POST',
  },
  // 当前公司职位列表
  companyPostList: {
    url: '/companyPostList',
    method: 'GET',
  },
  // 邀请面试
  invited: {
    url: '/invited',
    method: 'POST',
  },
  // 添加企业招聘信息
  addRecruitmentInfo: {
    url: '/addRecruitmentInfo',
    method: 'POST',
  },
  // 获取企业招聘信息列表
  getRecruitmentInfoList: {
    url: '/getRecruitmentInfoList',
    method: 'GET',
  },
  // 获取应聘管理列表
  getListByCompanyId: {
    url: '/getListByCompanyId',
    method: 'GET',
  },
  // 编辑应聘履历状态
  editApplyForRecordStatus: {
    url: '/editApplyForRecordStatus',
    method: 'POST',
  },
  // 删除应聘履历
  deleteApplyForRecordInfo: {
    url: '/deleteApplyForRecordInfo',
    method: 'DELETE',
  },
  // 获取附件简历详情
  getInfoByEnclosureId: {
    url: '/getInfoByEnclosureId',
    method: 'GET',
  },

  /** 公司主页设置 */
  // 获取公司主页信息
  getCompanyInfo: {
    url: '/getCompanyInfo',
    method: 'GET',
  },
  // 编辑公司主页信息
  editCompanyInfo: {
    url: '/editCompanyInfo',
    method: 'POST',
  },
  // 获取公司福利标签
  getWelfareTag: {
    url: '/getWelfareTag',
    method: 'GET',
  },
  // 编辑公司福利标签
  editCompanyWelfare: {
    url: '/editCompanyWelfare',
    method: 'POST',
  },
  // 添加公司环境图片
  addCompanyPic: {
    url: '/addCompanyPic',
    method: 'POST',
  },
  // 预览人员简历
  getUserResumeInfo: {
    url: '/getUserResumeInfo',
    method: 'GET',
  },
  // 申请岗位名称
  addClassify: {
    url: '/addClassify',
    method: 'POST',
  },
  // 获取岗位名称
  queryAll: {
    url: '/queryAll',
    method: 'GET',
  },
  // 人才_职位名称申请-添加
  addPost: {
    url: '/addPost',
    method: 'POST',
  },
  // 申请岗位名称--岗位分类列表
  getJobStatus: {
    url: '/getJobStatus',
    method: 'GET',
  },
  // 岗位级联职位列表
  queryAllPostList: {
    url: '/queryAllPostList',
    method: 'GET',
  },
  // 查询岗位名称列表
  queryAllClassifyList: {
    url: '/queryAllClassifyList',
    method: 'GET',
  },
  // 编辑HR状态
  editCompanyHrStatus: {
    url: '/editCompanyHrStatus',
    method: 'POST',
  },
  // 编辑企业招聘信息
  editRecruitmentInfo: {
    url: '/editRecruitmentInfo',
    method: 'POST',
  },
  // 编辑企业招聘信息
  editRecruitmentStatus: {
    url: '/editRecruitmentStatus',
    method: 'POST',
  },
  // 删除招聘信息
  deleteRecruitmentInfo: {
    url: '/deleteRecruitmentInfo',
    method: 'DELETE',
  },
};

const exportObj: any = {};
Object.keys(adminAjax).forEach((key: any) => {
  exportObj[key] = {
    ...adminAjax[key],
    url: `/irededu/iredTalents/PcEnterprise${adminAjax[key].url}`,
  };
});

export default exportObj;
