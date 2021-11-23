/*
 * @Description:组员
 * @Date: 2021-05-19 20:30:00
 * @LastEditTime: 2021-05-31 23:50:02
 * @FilePath: \intelligent-overhaul-app\src\service\member.apis.js
 */
export default {
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

  // 获取首页统计数据的接口
  getStatData: {
    url: "/mobile/api/teamMembersPage/platform",
    method: "GET",
  },
  // 获取工单列表
  getOrders: {
    url: "/mobile/api/teamMembersPage/list",
    method: "GET",
  },

  // 工单详情
  getOrderDetail: {
    url: "/mobile/api/teamMembersPage/getTrustFormInfoById",
    method: "POST",
  },
  // 工程委托单 - [施工]获取施工履历
  getConstructionList: {
    url: "/mobile/api/commencementRecord/list",
    method: "POST",
  },
  // 工程委托单 - 开工记录添加
  addStratRecord: {
    url: "/mobile/api/commencementRecord/addStratRecord",
    method: "POST",
  },
  //  通过委托单ID,查询施工者信息
  getCommencementRecord: {
    url: "/mobile/api/commencementRecord/allWorker",
    method: "GET",
  },
  // 获取权限委托申请
  getPermissions: {
    url: "/mobile/api/teamMembersPage/transferList",
    method: "GET",
  },
  // 获取我接受的委托权限列表
  getLeaderTransfer: {
    url: "/mobile/api/teamLeaderTransfer/transferToList",
    method: "GET",
  },
  // 安全确认信息加载
  getSecurityList: {
    url: "/mobile/api/safeQrInformation/list",
    method: "GET",
  },
  // 工程委托单 - 交底信息加载
  getClarificationList: {
    url: "/mobile/api/detailsInformation/list",
    method: "POST",
  },
  // 工程委托单 - [自检]查询组员自检结果列表
  getSelfCheckById: {
    url: "/mobile/api/selfCheckInformation/getSelfCheckById",
    method: "POST",
  },
  // 添加委托权限
  addTeamLeaderTransfer: {
    url: "/mobile/api/teamLeaderTransfer/add",
    method: "POST",
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
  //上传图片
  upload: {
    url: "/mobile/api/common/upload",
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
  //挂牌-获取信息
  getAttach: {
    url: "/mobile/api/listingConfirm/list",
    method: "POST",
  },
  //摘牌-获取摘牌信息
  getDelisting: {
    url: "/mobile/api/delistingConfirm/list",
    method: "POST",
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
  // 权限委托 - 获取移交申请消息列表
  getTransferList: {
    url: "/mobile/api/teamLeaderTransfer/list",
    method: "GET",
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
  // 获取工种
  getWorkCategory: {
    url: "/mobile/api/dict/getDictItems/work_category",
    method: "GET",
  },
  // 工程委托单 - 施工情报添加
  addSgInformationg: {
    url: "/mobile/api/commencementRecord/addSgInformationg",
    method: "POST",
  },
  // 委托单 - 班长已指定人员信息加载
  getConstructionPersonnelList: {
    url: "/mobile/api/orderSendToPersonnelConfirm/getConstructionPersonnelList",
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
  // 获取检查情况
  getCheckInspect: {
    url: "/mobile/api/third/getCheckInspect",
    method: "GET",
  },
  // 检查信息获取
  getCheckInfomation: {
    url: "/mobile/api/getZWToDoList",
    method: "GET",
  },
};
