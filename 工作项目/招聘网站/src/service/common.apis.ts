/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-11-01 10:15:43
 * @LastEditTime: 2021-11-24 18:50:19
 * @FilePath: \ired_resource\src\service\common.apis.ts
 */
// 通用接口 不需要登录就能使用的接口
const commonAjax = {
  // 登录
  login: {
    url: '/doLogin',
    method: 'POST',
  },
  loginWithCode: {
    url: '/noAuth/phoneLogin',
    method: 'POST',
  },
  // 首页-获取banner
  getWebBannerList: {
    url: '/noAuth/webBannerList',
    method: 'GET',
  },
  // 首页-获取岗位列表
  getTalentsClassifyListNew: {
    url: '/noAuth/talentsClassifyListNew',
    method: 'GET',
  },
  // 首页-获取正在招聘
  getRecruitmentPlazaList: {
    url: '/noAuth/getRecruitmentPlazaList',
    method: 'GET',
  },
  // 首页-获取热门企业
  getCompanyList: {
    url: '/noAuth/getCompanyList',
    method: 'GET',
  },
  // 查看全部-招聘岗位
  getPostDataByCompanyId: {
    url: '/noAuth/getPostDataByCompanyId',
    method: 'GET',
  },
  // 查看全部-招聘企业
  getRecruitmentEnterpriseList: {
    url: '/noAuth/getRecruitmentEnterpriseList',
    method: 'GET',
  },
  // 查看全部-通过id获取职位详情
  getJobDetails: {
    url: '/noAuth/getJobDetails',
    method: 'GET',
  },
  // 查看全部-获取公司详情
  getCompanyInfo: {
    url: '/noAuth/getCompanyInfo',
    method: 'GET',
  },
  // 期望职位三级联动
  getPositionBaseList: {
    url: '/noAuth/getPositionBaseList',
    method: 'GET',
  },
  // 行业列表
  getCompanyIndustry: {
    url: '/noAuth/getCompanyIndustry',
    method: 'GET',
  },
  // 期望薪资
  getExpectMoney: {
    url: '/noAuth/getExpectMoney',
    method: 'GET',
  },
  // 工作薪资
  getSalary: {
    url: '/noAuth/getSalary',
    method: 'GET',
  },
  // 行政地区
  getRegionData: {
    url: '/noAuth/getRegionData',
    method: 'GET',
  },
  // 学历列表
  getEducation: {
    url: '/noAuth/getEducation',
    method: 'GET',
  },
  // 求职状态
  getJobStatus: {
    url: '/noAuth/getJobStatus',
    method: 'GET',
  },
  // 工作年限
  getWorkExperience: {
    url: '/noAuth/getWorkExperience',
    method: 'GET',
  },
  getCompanyDetail: {
    url: '/noAuth/getCompanyInfo',
    method: 'GET',
  },
  getPositionsOfCompany: {
    url: '/noAuth/getCompanyValidRecruitmentInfoList',
    method: 'GET',
  },
  getPositionDetail: {
    url: '/noAuth/getJobDetails',
    method: 'GET',
  },
  // 职位详情页获取相似职位
  getNotThisCompanySimilarJobList: {
    url: '/noAuth/getNotThisCompanySimilarJobList',
    method: 'GET',
  },
  // 搜索相关职位
  queryRelatedPositions: {
    url: '/noAuth/queryRelatedPositions',
    method: 'GET',
  },
  // 搜索相关企业
  queryRelatedEnterprises: {
    url: '/noAuth/queryRelatedEnterprises',
    method: 'GET',
  },

  sendSMS: {
    url: '/noAuth/sms',
    method: 'POST',
  },
};

const exportObj: typeof commonAjax = { ...commonAjax };
Object.entries(exportObj).forEach(([key, option]) => {
  exportObj[key as keyof typeof exportObj] = {
    ...option,
    url: `/irededu/iredtalents/pc${option.url}`,
  };
});
export default exportObj;
