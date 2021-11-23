/*
 * @Description:总公司/分公司/车间厂队
 * @Date: 2021-06-02 20:30:00
 * @LastEditTime: 2021-06-02 02:19:25
 * @FilePath: \intelligent-overhaul-app\src\service\company.apis.js
 */

export default {
  // 获取首页统计数据的接口
  getStatData: {
    url: "/mobile/api/groupLeaderData/platform",
    method: "GET",
  },
  // 获取工单列表
  getOrders: {
    url: "/mobile/api/groupLeaderData/list",
    method: "POST",
  },
  // 工单详情
  getOrderDetail: {
    url: "/mobile/api/groupLeaderData/getTrustFormInfoById",
    method: "POST",
  },
  // 获取委托单位树形结构
  getTrustUnitTree: {
    url: "/mobile/api/groupLeaderData/getTrustUnitTree",
    method: "GET",
  },
  // 获取施工单位树形结构
  getConstructionUnit: {
    url: "/mobile/api/orderSendToGroupConfirm/getForemans",
    method: "GET",
  },
  // 根据部门id查orgCode
  getOrgCodeByDepartId: {
    url: "/mobile/api/orderSendToGroupConfirm/getOrgCodeByDepartId",
    method: "GET",
  },
  // 委托单 - 班长已指定人员信息加载
  getConstructionPersonnelList: {
    url: "/mobile/api/orderSendToPersonnelConfirm/getConstructionPersonnelList",
    method: "GET",
  },
  // 获取退单理由
  getWithdrawReasons: {
    url: "/mobile/api/dict/getDictItems/chargeback_reason",
    method: "GET",
  },
  // 工程委托单 - 交底信息加载
  getClarificationList: {
    url: "/mobile/api/detailsInformation/list",
    method: "POST",
  },
  // 获取权限委托申请
  getPermissions: {
    url: "/mobile/api/groupLeaderData/transferList",
    method: "GET",
  },
  // 获取扫一扫用户跳转权限
  queryQRCodeJumpRole: {
    url: "/mobile/api/queryQRCodeJumpRole",
    method: "POST",
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
  // 获取我接受的委托权限列表
  getLeaderTransfer: {
    url: "/mobile/api/teamLeaderTransfer/transferToList",
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
  //获取自检信息
  getQueryPointIsExist: {
    url: "/mobile/api/selfCheckInformation/getQueryPointIsExist",
    method: "GET",
  },
  // 故障诊断
  getDiagnosisInfo: {
    url: "/mobile/api/third/getDiagnosisInfo",
    method: "GET",
  },
  //获取施工情况
  getSummary: {
    url: "/mobile/api/commencementRecord/allWorker",
    method: "GET",
  },
  // 获取工单履历
  getHistory: {
    url: "/mobile/api/ApprovalResume/list",
    method: "GET",
  },
  //挂牌-获取信息
  getAttach: {
    url: "/mobile/api/listingConfirm/list",
    method: "POST",
  },
  // 安全确认信息加载
  getSecurityList: {
    url: "/mobile/api/safeQrInformation/list",
    method: "GET",
  },
  // 获取 安全交底记录
  getSecurityClarificationRecord: {
    url: "/mobile/api/offlineSecurityClarification/getSecurityClarificationRecord",
    method: "POST",
  },
  //摘牌-获取摘牌信息
  getDelisting: {
    url: "/mobile/api/delistingConfirm/list",
    method: "POST",
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
  // 提交验收  有质量要点
  addPoint: {
    url: "/mobile/api/accepting/addPoint",
    method: "POST",
  },
  //上传图片
  upload: {
    url: "/mobile/api/common/upload",
    method: "POST",
  },
  // 提交验收  无质量要点
  addNoQualityPoints: {
    url: "/mobile/api/accepting/addNoQualityPoints",
    method: "POST",
  },
  // 获取线下安全交底信息
  getOfflingInfo: {
    url: "/mobile/api/offlineSecurityClarification/list",
    method: "POST",
  },
  // 检查信息获取
  getCheckInfomation: {
    url: "/mobile/api/getZWToDoList",
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
  // 添加委托权限
  addTeamLeaderTransfer: {
    url: "/mobile/api/teamLeaderTransfer/add",
    method: "POST",
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
  // 用户身份切换
  transferToOther: {
    url: "/mobile/api/teamLeaderTransfer/transferToOther",
    method: "GET",
  },
  // 工程委托单 - [自检]查询组员自检结果列表
  getSelfCheckById: {
    url: "/mobile/api/selfCheckInformation/getSelfCheckById",
    method: "POST",
  },
  // 获取工种
  getWorkCategory: {
    url: "/mobile/api/dict/getDictItems/work_category",
    method: "GET",
  },
  // 提交 线下安全交底
  submitOfflinePic: {
    url: "/mobile/api/offlineSecurityClarification/addOrEdit",
    method: "POST",
  },
  // 提交 安全交底记录
  editRecord: {
    url: "/mobile/api/offlineSecurityClarification/editRecord",
    method: "POST",
  },
  // 获取检查情况
  getCheckInspect: {
    url: "/mobile/api/third/getCheckInspect",
    method: "GET",
  },
}