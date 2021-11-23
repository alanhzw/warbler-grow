/*
 * @Description:班长
 * @Date: 2021-05-19 20:30:00
 * @LastEditTime: 2021-05-28 13:49:40
 * @FilePath: \intelligent-overhaul-app\src\service\monitor.apis.js
 */
export default {
  // 班长首页接口

  // 获取首页统计数据的接口
  getStatData: {
    url: "/mobile/api/teamLeaderHomePage/platform",
    method: "GET",
  },
  // 获取工单列表
  getOrders: {
    url: "/mobile/api/teamLeaderHomePage/list",
    method: "GET",
  },

  // 工单详情
  getOrderDetail: {
    url: "/mobile/api/teamLeaderHomePage/getTrustFormInfoById",
    method: "POST",
  },

  // 根据委托单id-挂牌提交接口
  submitAttach: {
    url: "/mobile/api/listingConfirm/addOrEdit",
    method: "POST",
  },
  // 委托单 -挂牌信息批量删除接口,通过挂牌信息ids,批量删除接口
  deleteBatch: {
    url: "/mobile/api/listingConfirm/deleteBatch",
    method: "POST",
  },
  //挂牌-获取信息
  getAttach: {
    url: "/mobile/api/listingConfirm/list",
    method: "POST",
  },
  // 根据委托单id-交底信息提交接口
  submitClarification: {
    url: "mobile/api/detailsInformation/addOrEdit",
    method: "POST",
  },
  // 根据委托单id-交底信息提交接口   没有交底的情况用这个
  submitNoClarification: {
    url: "/api/detailsInformation/skipDetailsInformation",
    method: "POST",
  },
  // 委托单 -交底信息批量删除接口,通过交底信息ids,批量删除接口
  deleteClarification: {
    url: "/mobile/api/detailsInformation/deleteBatch",
    method: "GET",
  },
  // 工程委托单 - 交底信息加载
  getClarificationList: {
    url: "/mobile/api/detailsInformation/list",
    method: "POST",
  },
  // 安全确认事项-保存
  submitSecurity: {
    url: "/mobile/api/safeQrInformation/addOrEdit",
    method: "POST",
  },
  // 委托单 -安全确认信息批量删除接口,通过安全确认信息ids,批量删除接口
  deleteSecurity: {
    url: "/mobile/api/safeQrInformation/deleteBatch",
    method: "POST",
  },
  // 安全确认信息加载
  getSecurityList: {
    url: "/mobile/api/safeQrInformation/list",
    method: "GET",
  },
  // 高危作业方案 - 获取高危作业方案
  getHighRiskWork: {
    url: "/mobile/api/highRiskWorkSafeTechnologyProgram/getHighRiskWork",
    method: "POST",
  },
  // 维修作业标准 - 获取维修作业标准
  getRepairWorkCriterion: {
    url: "/mobile/api/repairWorkBz/getRepairWorkCriterion",
    method: "POST",
  },
  // 工程委托单 - [自检]查询组员自检结果列表
  getSelfCheckById: {
    url: "/mobile/api/selfCheckInformation/getSelfCheckById",
    method: "POST",
  },
  // 委托单 - 添加自检
  addSelfCheckById: {
    url: "/mobile/api/selfCheckInformation/changeSelfCheckById",
    method: "POST",
  },
  // 权限委托 - 获取移交申请消息列表
  getTransferList: {
    url: "/mobile/api/teamLeaderTransfer/list",
    method: "GET",
  },
  // 权限委托 - 权限委托申请添加
  addTeamLeaderTransfer: {
    url: "/mobile/api/teamLeaderTransfer/add",
    method: "POST",
  },
  // 权限委托 - 获取机构和人员的树状图
  getWorkRegionDetailList: {
    url: "/mobile/api/teamLeaderTransfer/getTree",
    method: "GET",
  },
  // 权限委托 - 获取机构和人员的树状图
  getReasonList: {
    url: "/mobile/api/dict/getDictItems/transfer_reason",
    method: "GET",
  },
  // 权限委托 - 获取移交申请详情
  getTransferDetail: {
    url: "/mobile/api/teamLeaderTransfer/queryById",
    method: "GET",
  },
  // 权限委托 - 修改申请的状态[同意/拒绝][撤销移交/收回移交]
  updateTransferType: {
    url: "/mobile/api/teamLeaderTransfer/edit",
    method: "POST",
  },
  // 获取权限委托申请
  getPermissions: {
    url: "/mobile/api/teamLeaderHomePage/transferList",
    method: "GET",
  },
  // 获取我接受的委托权限列表
  getLeaderTransfer: {
    url: "/mobile/api/teamLeaderTransfer/transferToList",
    method: "GET",
  },
  //提交验收结果   有质量要点
  submitSelfCheck: {
    url: "/mobile/api/selfCheckInformation/teamLeaderSelfCheck",
    method: "POST",
  },
  //提交验收结果   无质量要点
  submitSelfCheckNopoints: {
    url: "/mobile/api/selfCheckInformation/addNoQualityPoints",
    method: "POST",
  },
  //通过工种查询班组该工种的员工
  getTeamLeaderConfirmList: {
    url: "/mobile/api/teamLeaderConfirm/list",
    method: "GET",
  },
  //通过工种查询其他班组
  getTeamLeaderConfirmQuerySysUserlist: {
    url: "/mobile/api/teamLeaderConfirm/querySysUserlist",
    method: "GET",
  },
  // 用户身份切换
  transferToOther: {
    url: "/mobile/api/teamLeaderTransfer/transferToOther",
    method: "GET",
  },
  //  获取审批消息
  getReadMessage: {
    url: "/mobile/api/sysAnnouncement/getReadMessage",
    method: "GET",
  },
  //  获取系统消息
  getSystemMessage: {
    url: "/mobile/api/sysAnnouncement/getSystemMessage",
    method: "GET",
  },
  //消息标记已读
  readMessage: {
    url: "/mobile/api/sysAnnouncement/readOne",
    method: "POST",
  },
  //摘牌-提交
  addTrustFormDelisting: {
    url: "/mobile/api/delistingConfirm/addTrustFormDelisting",
    method: "POST",
  },
  //摘牌-获取摘牌信息
  getDelisting: {
    url: "/mobile/api/delistingConfirm/list",
    method: "POST",
  },
  //上传图片
  upload: {
    url: "/mobile/api/common/upload",
    method: "POST",
  },
  //指派组员-添加
  addTeamWorker: {
    url: "/mobile/api/orderSendToPersonnelConfirm/add",
    method: "POST",
  },

  // 获取工单履历
  getHistory: {
    url: "/mobile/api/ApprovalResume/list",
    method: "GET",
  },
  //获取施工情况
  getSummary: {
    url: "/mobile/api/commencementRecord/allWorker",
    method: "GET",
  },
  //获取自检信息
  getQueryPointIsExist: {
    url: "/mobile/api/selfCheckInformation/getQueryPointIsExist",
    method: "GET",
  },
  // 获取退单理由
  getWithdrawReasons: {
    url: "/mobile/api/dict/getDictItems/chargeback_reason",
    method: "GET",
  },

  // 退单
  withdraw: {
    url: "/mobile/api/returnOrder/getFormBack",
    method: "POST",
  },
  // 委托单 - 班长已指定人员信息加载
  getConstructionPersonnelList: {
    url: "/mobile/api/orderSendToPersonnelConfirm/getConstructionPersonnelList",
    method: "GET",
  },
  // 指派组员-增派
  addAgainOrderSendToPersonnelConfirm: {
    url: "/mobile/api/orderSendToPersonnelConfirm/addAgain",
    method: "POST",
  },
  // 获取工种
  getWorkCategory: {
    url: "/mobile/api/dict/getDictItems/work_category",
    method: "GET",
  },
  // 工程委托单 - [施工]获取施工履历
  getConstructionList: {
    url: "/mobile/api/commencementRecord/list",
    method: "POST",
  },
  // 获取施工单位树形结构
  getConstructionUnit: {
    url: "/mobile/api/orderSendToGroupConfirm/getForemans",
    method: "GET",
  },
  // 获取施工班组
  getForemanList: {
    url: "/mobile/api/orderSendToGroupConfirm/getForemanList",
    method: "GET",
  },
  // 委托单 - 获取二维码
  getClientPageQrcode: {
    url: "/mobile/api/ApprovalResume/getClientPageQrcode",
    method: "GET",
  },
  // 获取线下安全交底信息
  getOfflingInfo: {
    url: "/mobile/api/offlineSecurityClarification/list",
    method: "POST",
  },
  // 提交 线下安全交底
  submitOfflinePic: {
    url: "/mobile/api/offlineSecurityClarification/addOrEdit",
    method: "POST",
  },
  // 获取 安全交底记录
  getSecurityClarificationRecord: {
    url: "/mobile/api/offlineSecurityClarification/getSecurityClarificationRecord",
    method: "POST",
  },
  // 提交 安全交底记录
  editRecord: {
    url: "/mobile/api/offlineSecurityClarification/editRecord",
    method: "POST",
  },
  // 故障诊断
  getDiagnosisInfo: {
    url: "/mobile/api/third/getDiagnosisInfo",
    method: "GET",
  },
  // 获取扫一扫用户跳转权限
  queryQRCodeJumpRole: {
    url: "/mobile/api/queryQRCodeJumpRole",
    method: "POST",
  },
  // 工程委托单 - 开工记录添加
  addStratRecord: {
    url: "/mobile/api/commencementRecord/addStratRecord",
    method: "POST",
  },
  // 获取检查情况
  getCheckInspect: {
    url: "/mobile/api/third/getCheckInspect",
    method: "GET",
  },
  // 工程委托单 - 施工情报添加
  addSgInformationg: {
    url: "/mobile/api/commencementRecord/addSgInformationg",
    method: "POST",
  },
  // 检查信息获取
  getCheckInfomation: {
    url: "/mobile/api/getZWToDoList",
    method: "GET",
  },
};
