// import Vue from 'vue'
// import Router from 'vue-router'
// inc
import whitelist from './whitelist'

const footer = resolve => {
  require(['@/components/inc/footer.vue'], resolve)
}

const loginFooter = resolve => {
  require(['@/components/inc/login-footer.vue'], resolve)
}

const sidebar = resolve => {
  require(['@/components/inc/sidebar.vue'], resolve)
}
const loginHeader = resolve => {
  require(['@/components/inc/login-header.vue'], resolve)
}
const header = resolve => {
  require(['@/components/inc/header.vue'], resolve)
}
// 登录
const login = resolve => {
  require(['@/components/login.vue'], resolve)
}

const loginAdm = resolve => {
  require(['@/components/login/adm.vue'], resolve)
}
const auth = resolve => {
  require(['@/components/auth.vue'], resolve)
}
const scan_auth = resolve => {
  require(['@/components/scan_auth.vue'], resolve)
}
const dashboard = resolve => {
  require(['@/components/index/dashboard.vue'], resolve)
}

// 客户管理

// 客户 - 客户详情
const CustomeInformatio = resolve => {
  require(['@/components/customer/management/list.vue'], resolve)
}
// 客户 - 客户详情 - 新增
const CustomerAdd = resolve => {
  require(['@/components/customer/management/add.vue'], resolve)
}
// 客户 - 客户详情 - 新增
const CustomerEdit = resolve => {
  require(['@/components/customer/management/edit.vue'], resolve)
}
// 客户 - 共享客户
const CustomeShare = resolve => {
  require(['@/components/customer/management/share.vue'], resolve)
}
// 客户 - 已删除客户
const CustomeDelete = resolve => {
  require(['@/components/customer/management/deleted.vue'], resolve)
}
// 客户 - 智能查重
const CustomeChecHeav = resolve => {
  require(['@/components/customer/management/check_heavy.vue'], resolve)
}
// 客户 - 区域管理
const customerRegioManage = resolve => {
  require(['@/components/customer/region/manage.vue'], resolve)
}
// 客户 - 销售区域分配
const customerRegionDistribution = resolve => {
  require(['@/components/customer/region/distribution.vue'], resolve)
}
// 客户 - 标签管理
const CustomerTag = resolve => {
  require(['@/components/customer/tag.vue'], resolve)
}
// 客户 - 分布地图
const CustomeDistribute = resolve => {
  require(['@/components/customer/map.vue'], resolve)
}

// 客户拜访

// 步骤管理 - 步骤设置
const VisitStepSettingList = resolve => {
  require(['@/components/visit/step/setting/list.vue'], resolve)
}
// 步骤管理 - 步骤设置 -新增
const VisitStepSettingListAdd = resolve => {
  require(['@/components/visit/step/setting/add.vue'], resolve)
}
// 步骤管理 - 步骤设置 -编辑
const VisitStepSettingListEdit = resolve => {
  require(['@/components/visit/step/setting/edit.vue'], resolve)
}
// 步骤管理 - 任务定义
const VisitFormList = resolve => {
  require(['@/components/visit/step/form/list.vue'], resolve)
}
// 步骤管理 - 任务定义 - 新增
const VisitFormListAdd = resolve => {
  require(['@/components/visit/step/form/design.vue'], resolve)
}
// 步骤管理 - 任务定义 - 详细
const VisitFormListInfo = resolve => {
  require(['@/components/visit/step/form/info.vue'], resolve)
}
// 步骤管理 - 拜访计划
const VisitPlan = resolve => {
  require(['@/components/visit/plan/list.vue'], resolve)
}
// 步骤管理 - 计划管理 - 新增
const VisitPlanAdd = resolve => {
  require(['@/components/visit/plan/add.vue'], resolve)
}
// 步骤管理 - 拜访记录 - 当前客户拜访记录
const VisitRecordForCustomer = resolve => {
  require(['@/components/visit/record/customer_visit_record_list.vue'], resolve)
}
// 步骤管理 - 拜访记录 -拜访记录
const VisitRecordList = resolve => {
  require(['@/components/visit/record/list.vue'], resolve)
}

// 步骤管理 - 拜访记录 - 拜访轨迹
const VisitRecordTrajectory = resolve => {
  require(['@/components/visit/record/trajectory.vue'], resolve)
}
// 步骤管理 - 拜访记录 - 拜访轨迹
const VisitRecordTrajectoryShow = resolve => {
  require(['@/components/visit/record/trajectory_show.vue'], resolve)
}
// 步骤管理 - 拜访报表 - 执行情况
const VisitReportAction = resolve => {
  require(['@/components/visit/report/action.vue'], resolve)
}
// 步骤管理 - 拜访报表 - 综合报表
const VisitReportSummary = resolve => {
  require(['@/components/visit/report/summary.vue'], resolve)
}
// 步骤管理 - 拜访报表 - 覆盖率报表
const VisitReportCoverage = resolve => {
  require(['@/components/visit/report/coverage.vue'], resolve)
}

// 订单管理

// 订单管理 - 基础资料 - 商品管理
// const OrderBaseCommodity = resolve => {
//   require(['@/components/psi/base/commodity/index.vue'], resolve)
// }
// 订单管理 - 基础资料 - 商品详情
// const OrderBaseCommodityEdit = resolve => {
//   require(['@/components/psi/base/commodity/edit.vue'], resolve)
// }
// 订单管理 - 基础资料 - 新增商品
// const addCommodity = resolve => {
//   require(['@/components/psi/base/commodity/add.vue'], resolve)
// }
// 订单管理 - 基础资料 - 商品单位设置
// const unitSetting = resolve => {
//   require(['@/components/psi/base/unit_setting.vue'], resolve)
// }
// 订单管理 - 基础资料 - 品牌设置
// const brandSetting = resolve => {
//   require(['@/components/psi/base/brand_setting.vue'], resolve)
// }
// 订单管理 - 基础资料 - 商品类型管理
// const commodityTypeManage = resolve => {
//   require(['@/components/psi/base/category.vue'], resolve)
// }
// 订单管理 - 基础资料 - 仓库管理
// const OrderBaseWarehouse = resolve => {
//   require(['@/components/psi/base/warehouse.vue'], resolve)
// }

// 订单管理 - 销售订单 - 订单审批
const OrderSalesApproved = resolve => {
  require(['@/components/psi/sales/approved.vue'], resolve)
}
// 订单管理 - 销售订单 - 订单明细
const OrderSalesDetails = resolve => {
  require(['@/components/psi/sales/details.vue'], resolve)
}
// 订单管理 - 销售订单 - 订单详情(审批)
const OrderDetailsExecute = resolve => {
  require(['@/components/psi/sales/order_details_execute.vue'], resolve)
}
// 订单管理 - 销售订单 - 订单详情(预览)
const OrderDetailsPreview = resolve => {
  require(['@/components/psi/sales/order_details.vue'], resolve)
}
// 订单管理 - 销售订单 - 修改订单
const EditOrder = resolve => {
  require(['@/components/psi/sales/edit_order.vue'], resolve)
}
// 订单管理 - 销售订单 - 新建订单
const BuildOrder = resolve => {
  require(['@/components/psi/sales/add.vue'], resolve)
}
// 订单管理 - 销售订单 - 发货单
const OrderSalesInvoice = resolve => {
  require(['@/components/psi/sales/invoice/index.vue'], resolve)
}
// 订单管理 - 销售订单 - 发货单明细
const OrderSalesInvoiceDetail = resolve => {
  require(['@/components/psi/sales/invoice/details.vue'], resolve)
}
// 订单管理 - 销售订单 - 销售报表
const OrderSalesReport = resolve => {
  require(['@/components/psi/sales/report.vue'], resolve)
}
// ----------------------退换货-----------------------------
// 订单管理 - 退换货 - 退换货审批
const OrderReturnsApproved = resolve => {
  require(['@/components/psi/returns/approved.vue'], resolve)
}
// 订单管理 - 退换货 - 新建退换货单
const BuildOrderReturnsApproved = resolve => {
  require(['@/components/psi/returns/add.vue'], resolve)
}
// 订单管理 - 退换货 - 退换货明细
const OrderReturnsDetails = resolve => {
  require(['@/components/psi/returns/details.vue'], resolve)
}
// 订单管理 - 退换货 - 退换货详情
const OrderReturnsDetailsExecute = resolve => {
  require(['@/components/psi/returns/return_details_execute.vue'], resolve)
}
// 订单管理 - 退换货 - 退换货单修改
const OrderReturnsDetailsEdit = resolve => {
  require(['@/components/psi/returns/edit.vue'], resolve)
}
// 订单管理 - 库存管理 - 入库单
const OrderInventoryList = resolve => {
  require(['@/components/psi/inventory/list.vue'], resolve)
}
// 订单管理 - 库存管理 - 新建入库单
const OrderInventoryBuild = resolve => {
  require(['@/components/psi/inventory/add.vue'], resolve)
}
// 订单管理 - 库存管理 - 库存查询
const OrderInventoryQuery = resolve => {
  require(['@/components/psi/inventory/query.vue'], resolve)
}
// 订单管理 - 库存管理 - 库存盘点
const OrderInventoryCheck = resolve => {
  require(['@/components/psi/inventory/check/index.vue'], resolve)
}
// 订单管理 - 库存管理 - 新建盘点单
const OrderBuildCheck =
  resolve => {
    require(['@/components/psi/inventory/check/add.vue'], resolve)
  }
// 订单管理 - 库存管理 - 编辑盘点单
const OrderBuildEdit =
  resolve => {
    require(['@/components/psi/inventory/check/edit.vue'], resolve)
  }

// 数据上报

// 基础资料

// 数据管理 - 基础资料 - 商品管理
const OrderBaseCommodity = resolve => {
  require(['@/components/data/base/commodity/index.vue'], resolve)
}
// 数据管理 - 基础资料 - 新增商品
const addCommodity = resolve => {
  require(['@/components/data/base/commodity/add.vue'], resolve)
}
const OrderBaseCommodityEdit = resolve => {
  require(['@/components/data/base/commodity/edit.vue'], resolve)
}
// 数据管理 - 基础资料 - 仓库管理
const OrderBaseWarehouse = resolve => {
  require(['@/components/data/base/warehouse.vue'], resolve)
}
// 数据管理 - 基础资料 - 品牌管理
const brandSetting = resolve => {
  require(['@/components/data/base/brand_setting.vue'], resolve)
}
// 数据管理 - 基础资料 - 类型管理
const commodityTypeManage = resolve => {
  require(['@/components/data/base/category.vue'], resolve)
}
// 数据管理 - 基础资料 - 单位管理
const unitSetting = resolve => {
  require(['@/components/data/base/unit_setting.vue'], resolve)
}
// 数据上报 - 拍照上传 - 照片浏览
const DataPictureBrowse = resolve => {
  require(['@/components/data/picture/browse.vue'], resolve)
}
// 数据上报 - 拍照上传 - 拍照统计
const DataPictureStatistics = resolve => {
  require(['@/components/data/picture/statistics.vue'], resolve)
}
// 数据上报 - 拍照上传 - 拍照类型设置
const DataPictureSetting = resolve => {
  require(['@/components/data/picture/setting.vue'], resolve)
}

// 数据上报 - 销量上报 - 销量上报记录
const DataSalesReportRecord = resolve => {
  require(['@/components/data/sales_report/record.vue'], resolve)
}
// 数据上报 - 销量上报 - 销量上报明细
const DataSalesReportDetails = resolve => {
  require(['@/components/data/sales_report/details.vue'], resolve)
}
// 数据上报 - 销量上报 - 销量报表
const DataSalesReportReport = resolve => {
  require(['@/components/data/sales_report/report.vue'], resolve)
}

// 数据上报 - 库存上报 - 库存上报记录
const DataStockReportList = resolve => {
  require(['@/components/data/stock_report/list.vue'], resolve)
}

// 数据上报 - 库存上报 - 库存上报明细
const DataStockReportDetails = resolve => {
  require(['@/components/data/stock_report/details.vue'], resolve)
}

// 数据上报 - 铺货上报 - 铺货上报记录
const DataInStockReportRecord = resolve => {
  require(['@/components/data/in_stock_report/record.vue'], resolve)
}
// 数据上报 - 铺货上报 - 铺货上报明细
const DataInStockReportDetails = resolve => {
  require(['@/components/data/in_stock_report/details.vue'], resolve)
}
// 数据上报 - 铺货上报 - 铺货率统计
const DataInStockReportReport = resolve => {
  require(['@/components/data/in_stock_report/report.vue'], resolve)
}

// 数据上报 - 自定义上报 - 表单管理
const DataCustomizeReportForm = resolve => {
  require(['@/components/data/customize_report/form.vue'], resolve)
}
// 数据上报 - 自定义上报 - 表单1
const DataCustomizeReportForm1 = resolve => {
  require(['@/components/data/customize_report/form1.vue'], resolve)
}
// 数据上报 - 自定义上报 - 表单2
const DataCustomizeReportForm2 = resolve => {
  require(['@/components/data/customize_report/form2.vue'], resolve)
}
// 数据上报 - 自定义上报 - 表单3
const DataCustomizeReportForm3 = resolve => {
  require(['@/components/data/customize_report/form3.vue'], resolve)
}

// 帮助中心
const HelpCenter = resolve => {
  require(['@/components/help/guide.vue'], resolve)
}

const HelpConnect = resolve => {
  require(['@/components/help/connect.vue'], resolve)
}

// 系统管理
const SysteOrganizatio = resolve => {
  require(['@/components/system/organization.vue'], resolve)
}

const SysAuthority = resolve => {
  require(['@/components/system/authority.vue'], resolve)
}

const SysAuth = resolve => {
  require(['@/components/system/auth.vue'], resolve)
}

// 企业信息
const BusinessInfo = resolve => {
  require(['@/components/system/corp.vue'], resolve)
}

const NotFound = resolve => {
  require(['@/components/404.vue'], resolve)
}

const routes = [
  {
    path: '/',
    components: {
      header: header,
      default: dashboard,
      footer: footer
    }
  },
  {
    path: '/auth',
    name: '钉钉授权',
    component: auth
  },
  {
    path: '/auth/scan',
    name: '扫码登陆',
    components: {
      header: loginHeader,
      default: scan_auth,
      footer: loginFooter
    }
  },
  {
    path: '/login',
    name: '登录',
    components: {
      header: loginHeader,
      default: login,
      footer: loginFooter
    }
  },
  {
    path: '/login/adm',
    name: '模拟登录',
    component: loginAdm
  },
  // 客户管理
  {
    path: '/customer/management/list',
    name: '客户-客户详情',
    components: {
      header: header,
      sidebar: sidebar,
      default: CustomeInformatio,
      footer: footer
    }
  },
  {
    path: '/customer/management/list/add',
    name: '客户-新增',
    components: {
      header: header,
      sidebar: sidebar,
      default: CustomerAdd,
      footer: footer
    }
  }, {
    path: '/customer/management/list/edit',
    name: '客户-编辑',
    components: {
      header: header,
      sidebar: sidebar,
      default: CustomerEdit,
      footer: footer
    }
  },
  {
    path: '/customer/management/share',
    name: '客户-客户详情-共享客户',
    components: {
      header: header,
      sidebar: sidebar,
      default: CustomeShare,
      footer: footer
    }
  },
  {
    path: '/customer/management/deleted',
    name: '客户-客户详情-已删除客户',
    components: {
      header: header,
      sidebar: sidebar,
      default: CustomeDelete,
      footer: footer
    }
  },
  {
    path: '/customer/region/manage',
    name: '客户-销售区域管理',
    components: {
      header: header,
      sidebar: sidebar,
      default: customerRegioManage,
      footer: footer
    }
  },

  {
    path: '/customer/region/distribution',
    name: '客户-区域管理-客户区域分配',
    components: {
      header: header,
      sidebar: sidebar,
      default: customerRegionDistribution,
      footer: footer
    }
  },
  {
    path: '/customer/map',
    name: '客户-客户分布',
    components: {
      header: header,
      sidebar: sidebar,
      default: CustomeDistribute,
      footer: footer
    }
  },
  {
    path: '/customer/filter',
    name: '客户-智能查重',
    components: {
      header: header,
      sidebar: sidebar,
      default: CustomeChecHeav,
      footer: footer
    }
  },
  {
    path: '/customer/tag',
    name: '客户-标签管理',
    components: {
      header: header,
      sidebar: sidebar,
      default: CustomerTag,
      footer: footer
    }
  },
  /** ***********拜访*******************/
  // step
  {
    path: '/visit/step/setting',
    name: '客户拜访-步骤管理-步骤设置',
    components: {
      header: header,
      sidebar: sidebar,
      default: VisitStepSettingList,
      footer: footer
    }
  },
  {
    path: '/visit/step/setting/add',
    name: '客户拜访-步骤管理-步骤设置-添加拜访步骤',
    components: {
      header: header,
      sidebar: sidebar,
      default: VisitStepSettingListAdd,
      footer: footer
    }
  },
  {
    path: '/visit/step/setting/edit',
    name: '客户拜访-步骤管理-步骤设置-编辑拜访步骤',
    components: {
      header: header,
      sidebar: sidebar,
      default: VisitStepSettingListEdit,
      footer: footer
    }
  },
  {
    path: '/visit/step/form',
    name: '客户拜访-步骤管理-任务定义',
    components: {
      header: header,
      sidebar: sidebar,
      default: VisitFormList,
      footer: footer
    }
  },
  {
    path: '/visit/step/form/add',
    name: '客户拜访-步骤管理-任务定义-新增',
    components: {
      header: header,
      default: VisitFormListAdd,
      footer: footer
    }
  },
  {
    path: '/visit/step/form/info',
    name: '客户拜访-步骤管理-任务定义-详情',
    components: {
      header: header,
      sidebar: sidebar,
      default: VisitFormListInfo,
      footer: footer
    }
  },
  // plan
  {
    path: '/visit/management/plan',
    name: '客户拜访-计划管理-计划制定',
    components: {
      header: header,
      sidebar: sidebar,
      default: VisitPlan,
      footer: footer
    }
  },
  {
    path: '/visit/plan/make/add',
    name: '客户拜访-计划管理-计划制定-新增计划',
    components: {
      header: header,
      sidebar: sidebar,
      default: VisitPlanAdd,
      footer: footer
    }
  },
  // record
  {
    path: '/visit/management/record',
    name: '客户拜访-拜访记录-拜访记录',
    components: {
      header: header,
      sidebar: sidebar,
      default: VisitRecordList,
      footer: footer
    }
  },
  {
    path: '/visit/record/customerRecord',
    name: '客户拜访-拜访记录-客户拜访记录',
    components: {
      header: header,
      sidebar: sidebar,
      default: VisitRecordForCustomer,
      footer: footer
    }
  },
  {
    path: '/visit/management/trajectory',
    name: '客户拜访-拜访记录-拜访轨迹',
    components: {
      header: header,
      sidebar: sidebar,
      default: VisitRecordTrajectory,
      footer: footer
    }
  },
  {
    path: '/visit/management/trajectory/show',
    name: '客户拜访-拜访记录-拜访轨迹-轨迹展示',
    components: {
      header: header,
      sidebar: sidebar,
      default: VisitRecordTrajectoryShow,
      footer: footer
    }
  },
  // report
  {
    path: '/visit/report/action',
    name: '客户拜访-拜访报表-执行情况',
    components: {
      header: header,
      sidebar: sidebar,
      default: VisitReportAction,
      footer: footer
    }
  },
  {
    path: '/visit/report/summary',
    name: '客户拜访-拜访报表-综合报表',
    components: {
      header: header,
      sidebar: sidebar,
      default: VisitReportSummary,
      footer: footer
    }
  },
  {
    path: '/visit/report/coverage',
    name: '客户拜访-拜访报表-覆盖率报表',
    components: {
      header: header,
      sidebar: sidebar,
      default: VisitReportCoverage,
      footer: footer
    }
  },
  // 订单管理
  // {
  //   path: '/psi/base/commodity',
  //   name: '订单管理-基础资料-商品管理',
  //   components: {
  //     header: header,
  //     sidebar: sidebar,
  //     default: OrderBaseCommodity,
  //     footer: footer
  //   }
  // },
  // {
  //   path: '/psi/base/commodity/edit',
  //   name: '订单管理-基础资料-商品编辑',
  //   components: {
  //     header: header,
  //     sidebar: sidebar,
  //     default: OrderBaseCommodityEdit,
  //     footer: footer
  //   }
  // },
  // {
  //   path: '/psi/base/commodity/add',
  //   name: '订单管理-基础资料-新增商品',
  //   components: {
  //     header: header,
  //     sidebar: sidebar,
  //     default: addCommodity,
  //     footer: footer
  //   }
  // },
  // {
  //   path: '/psi/base/unit_setting',
  //   name: '订单管理-基础资料-商品单位设置',
  //   components: {
  //     header: header,
  //     sidebar: sidebar,
  //     default: unitSetting,
  //     footer: footer
  //   }
  // },
  // {
  //   path: '/psi/base/category',
  //   name: '订单管理-基础资料-商品类型管理',
  //   components: {
  //     header: header,
  //     sidebar: sidebar,
  //     default: commodityTypeManage,
  //     footer: footer
  //   }
  // },
  // {
  //   path: '/psi/base/brandSetting',
  //   name: '订单管理-基础资料-品牌设置',
  //   components: {
  //     header: header,
  //     sidebar: sidebar,
  //     default: brandSetting,
  //     footer: footer
  //   }
  // },
  // {
  //   path: '/psi/base/warehouse',
  //   name: '订单管理-基础资料-仓库管理',
  //   components: {
  //     header: header,
  //     sidebar: sidebar,
  //     default: OrderBaseWarehouse,
  //     footer: footer
  //   }
  // },
  {
    path: '/psi/sales/approved',
    name: '订单管理-销售订单-订单审批',
    components: {
      header: header,
      sidebar: sidebar,
      default: OrderSalesApproved,
      footer: footer
    }
  },
  {
    path: '/psi/sales/order/details',
    name: '订单管理-销售订单-订单明细',
    components: {
      header: header,
      sidebar: sidebar,
      default: OrderSalesDetails,
      footer: footer
    }
  },
  {
    path: '/psi/sales/approved/execute',
    name: '订单管理-销售订单-审批',
    components: {
      header: header,
      sidebar: sidebar,
      default: OrderDetailsExecute,
      footer: footer
    }
  },
  {
    path: '/psi/sales/approved/details',
    name: '订单管理-销售订单-订单详情(预览)',
    components: {
      header: header,
      sidebar: sidebar,
      default: OrderDetailsPreview,
      footer: footer
    }
  },
  {
    path: '/psi/sales/editOrder',
    name: '订单管理-销售订单-修改订单',
    components: {
      header: header,
      sidebar: sidebar,
      default: EditOrder,
      footer: footer
    }
  },
  {
    path: '/psi/sales/approved/add',
    name: '订单管理-销售订单-新建订单',
    components: {
      header: header,
      sidebar: sidebar,
      default: BuildOrder,
      footer: footer
    }
  },
  {
    path: '/psi/sales/invoice/paper',
    name: '订单管理-销售订单-发货单',
    components: {
      header: header,
      sidebar: sidebar,
      default: OrderSalesInvoice,
      footer: footer
    }
  },
  {
    path: '/psi/sales/invoice/details',
    name: '订单管理-销售订单-发货单明细',
    components: {
      header: header,
      sidebar: sidebar,
      default: OrderSalesInvoiceDetail,
      footer: footer
    }
  },
  {
    path: '/psi/sales/report',
    name: '订单管理-销售订单-销售报表',
    components: {
      header: header,
      sidebar: sidebar,
      default: OrderSalesReport,
      footer: footer
    }
  },
  {
    path: '/psi/returns/approved',
    name: '订单管理-退换货-退换货审批',
    components: {
      header: header,
      sidebar: sidebar,
      default: OrderReturnsApproved,
      footer: footer
    }
  },
  {
    path: '/psi/returns/approved/add',
    name: '订单管理-退换货-新建退换货单',
    components: {
      header: header,
      sidebar: sidebar,
      default: BuildOrderReturnsApproved,
      footer: footer
    }
  },
  {
    path: '/psi/returns/approved/edit',
    name: '订单管理-退换货-退换货单修改',
    components: {
      header: header,
      sidebar: sidebar,
      default: OrderReturnsDetailsEdit,
      footer: footer
    }
  },
  {
    path: '/psi/returns/detail',
    name: '订单管理-退换货-退换货明细',
    components: {
      header: header,
      sidebar: sidebar,
      default: OrderReturnsDetails,
      footer: footer
    }
  },
  {
    path: '/psi/returns/approved/execute',
    name: '订单管理-退换货-退换货详情',
    components: {
      header: header,
      sidebar: sidebar,
      default: OrderReturnsDetailsExecute,
      footer: footer
    }
  },

  {
    path: '/psi/inventory/list',
    name: '订单管理-库存管理-入库单',
    components: {
      header: header,
      sidebar: sidebar,
      default: OrderInventoryList,
      footer: footer
    }
  },
  {
    path: '/psi/inventory/list/add',
    name: '订单管理-库存管理-新建入库单',
    components: {
      header: header,
      sidebar: sidebar,
      default: OrderInventoryBuild,
      footer: footer
    }
  },
  {
    path: '/psi/inventory/query',
    name: '订单管理-库存管理-库存查询',
    components: {
      header: header,
      sidebar: sidebar,
      default: OrderInventoryQuery,
      footer: footer
    }
  },
  {
    path: '/psi/inventory/check/add',
    name: '订单管理-库存管理-新建盘点单',
    components: {
      header: header,
      sidebar: sidebar,
      default: OrderBuildCheck,
      footer: footer
    }
  },
  {
    path: '/psi/inventory/check/edit',
    name: '订单管理-库存管理-编辑盘点单',
    components: {
      header: header,
      sidebar: sidebar,
      default: OrderBuildEdit,
      footer: footer
    }
  },
  {
    path: '/psi/inventory/check',
    name: '订单管理-库存管理-库存盘点',
    components: {
      header: header,
      sidebar: sidebar,
      default: OrderInventoryCheck,
      footer: footer
    }
  },

  // 数据上报

  // 基础资料
  {
    path: '/data/base/commodity',
    name: '数据管理-基础资料-商品管理',
    components: {
      header: header,
      sidebar: sidebar,
      default: OrderBaseCommodity,
      footer: footer
    }
  },
  {
    path: '/data/base/commodity/add',
    name: '数据管理-基础资料-新增商品',
    components: {
      header: header,
      sidebar: sidebar,
      default: addCommodity,
      footer: footer
    }
  },
  {
    path: '/data/base/commodity/edit',
    name: '订单管理-基础资料-商品编辑',
    components: {
      header: header,
      sidebar: sidebar,
      default: OrderBaseCommodityEdit,
      footer: footer
    }
  },
  {
    path: '/data/base/warehouse',
    name: '数据管理-基础资料-仓库管理',
    components: {
      header: header,
      sidebar: sidebar,
      default: OrderBaseWarehouse,
      footer: footer
    }
  },
  {
    path: '/data/base/brandSetting',
    name: '数据管理-基础资料-品牌管理',
    components: {
      header: header,
      sidebar: sidebar,
      default: brandSetting,
      footer: footer
    }
  },
  {
    path: '/data/base/category',
    name: '数据管理-基础资料-类型管理',
    components: {
      header: header,
      sidebar: sidebar,
      default: commodityTypeManage,
      footer: footer
    }
  },
  {
    path: '/data/base/unit_setting',
    name: '数据管理-基础资料-单位设置',
    components: {
      header: header,
      sidebar: sidebar,
      default: unitSetting,
      footer: footer
    }
  },



  {
    path: '/data/picture/browse',
    name: '订单管理-拍照上传-照片浏览',
    components: {
      header: header,
      sidebar: sidebar,
      default: DataPictureBrowse,
      footer: footer
    }
  },
  {
    path: '/data/picture/statistics',
    name: '订单管理-拍照上传-拍照统计',
    components: {
      header: header,
      sidebar: sidebar,
      default: DataPictureStatistics,
      footer: footer
    }
  },
  {
    path: '/data/picture/setting',
    name: '订单管理-拍照上传-拍照类型设置',
    components: {
      header: header,
      sidebar: sidebar,
      default: DataPictureSetting,
      footer: footer
    }
  },
  {
    path: '/data/sales_report/record',
    name: '订单管理-销量上报-销量上报记录',
    components: {
      header: header,
      sidebar: sidebar,
      default: DataSalesReportRecord,
      footer: footer
    }
  },
  {
    path: '/data/sales_report/details',
    name: '订单管理-销量上报-销量上报明细',
    components: {
      header: header,
      sidebar: sidebar,
      default: DataSalesReportDetails,
      footer: footer
    }
  },
  {
    path: '/data/sales_report/report',
    name: '订单管理-销量上报-销量报表',
    components: {
      header: header,
      sidebar: sidebar,
      default: DataSalesReportReport,
      footer: footer
    }
  },
  {
    path: '/data/stock_report/list',
    name: '订单管理-库存上报-库存上报记录',
    components: {
      header: header,
      sidebar: sidebar,
      default: DataStockReportList,
      footer: footer
    }
  },
  {
    path: '/data/stock_report/details',
    name: '订单管理-库存上报-库存上报明细',
    components: {
      header: header,
      sidebar: sidebar,
      default: DataStockReportDetails,
      footer: footer
    }
  },
  {
    path: '/data/in_stock_report/record',
    name: '订单管理-铺货上报-铺货上报记录',
    components: {
      header: header,
      sidebar: sidebar,
      default: DataInStockReportRecord,
      footer: footer
    }
  },
  {
    path: '/data/in_stock_report/details',
    name: '订单管理-铺货上报-铺货上报明细',
    components: {
      header: header,
      sidebar: sidebar,
      default: DataInStockReportDetails,
      footer: footer
    }
  },
  {
    path: '/data/in_stock_report/report',
    name: '订单管理-铺货上报-铺货率统计',
    components: {
      header: header,
      sidebar: sidebar,
      default: DataInStockReportReport,
      footer: footer
    }
  },
  {
    path: '/data/customize_report/form',
    name: '订单管理-自定义上报-表单管理',
    components: {
      header: header,
      sidebar: sidebar,
      default: DataCustomizeReportForm,
      footer: footer
    }
  },
  {
    path: '/data/customize_report/form1',
    name: '订单管理-自定义上报-表单1',
    components: {
      header: header,
      sidebar: sidebar,
      default: DataCustomizeReportForm1,
      footer: footer
    }
  },
  {
    path: '/data/customize_report/form2',
    name: '订单管理-自定义上报-表单2',
    components: {
      header: header,
      sidebar: sidebar,
      default: DataCustomizeReportForm2,
      footer: footer
    }
  },
  {
    path: '/data/customize_report/form3',
    name: '订单管理-自定义上报-表单3',
    components: {
      header: header,
      sidebar: sidebar,
      default: DataCustomizeReportForm3,
      footer: footer
    }
  },
   // 帮助中心
   {
    path: '/help/guide',
    name: '帮助中心-使用说明',
    components: {
      header: header,
      sidebar: sidebar,
      default: HelpCenter,
      footer: footer
    }
  },
   {
    path: '/help/connect',
    name: '帮助中心-加入交流群',
    components: {
      header: header,
      sidebar: sidebar,
      default: HelpConnect,
      footer: footer
    }
  },
  
  // 系统管理
  {
    path: '/system/organization',
    name: '系统管理-组织架构',
    components: {
      header: header,
      sidebar: sidebar,
      default: SysteOrganizatio,
      footer: footer
    }
  },
  {
    path: '/system/authority',
    name: '系统管理-权限管理',
    components: {
      header: header,
      sidebar: sidebar,
      default: SysAuth,
      footer: footer
    }
  },
  {
    path: '/system/corp',
    name: '系统管理-企业信息',
    components: {
      header: header,
      sidebar: sidebar,
      default: BusinessInfo,
      footer: footer
    }
  },
  {
    path: '*',
    components: {
      header: header,
      default: NotFound,
      footer: footer
    }
  }// 全不匹配的情况下，返回404，路由按顺序从上到下，依次匹配。最后一个*能匹配全部，
]

// 路由
const router = new VueRouter({
  // mode: 'history',
  routes: routes
})

// 路由拦截器
router.beforeEach((to, from, next) => {
  // 在白名单
  if (whitelist.contains(to.path)) {
    next()
  } else {
    // 不在白名单
    // 有令牌
    if (localStorage.hasOwnProperty('access_token') && localStorage.hasOwnProperty('expireTime')) {
      const expireTime = window.localStorage.getItem('expireTime')
      const currentTime = new Date().getTime()
      const et = new Date(expireTime.replace(/-/g, '/')).getTime()// new Date(Date.parse(expireTime)).getTime();

      // token有效
      if (et - currentTime > 0) {
        next()
      } else {
        console.log('令牌超时')
        // 登录超时令牌
        next({
          path: '/login',
          query: {
            redirect: to.fullPath,
            code: 802
          }
        })
      }
    } else {
      console.log('没有令牌')
      // 没有令牌
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,
          code: 801
        }
      })
    }
  }
})

export default router
