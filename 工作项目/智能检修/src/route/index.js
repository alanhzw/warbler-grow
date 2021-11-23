import { createRouter, createWebHistory } from "vue-router";

// 路由信息
const routes = [
  // changed by sxw 20210619 todolist No.29-1
  {
    path: "/h5/login",
    name: "Login",
    component: () => import("../view/Index/BeforeLogin.vue")
  },
  {
    path: "/test",
    component: () => import("../view/WorkOrder/Record.vue"),
  },
  {
    path: "/h5",
    name: "Home",
    component: () => import("../view/Home/Index.vue"),
  },
  {
    path: "/h5/auth",
    name: "Auth",
    component: () => import("../view/User/Auth.vue"),
  },
  {
    path: "/h5/mine",
    name: "Mine",
    component: () => import("../view/User/Mine.vue"),
  },
  {
    path: "/h5/message",
    name: "Message",
    component: () => import("../view/User/Message.vue"),
  },
  {
    path: "/h5/systemDetail/:id",
    name: "SystemDetail",
    component: () => import("../view/User/SystemDetail.vue"),
  },
  {
    path: "/refundApproval",
    name: "RefundApproval",
    component: () => import("../view/User/RefundApproval.vue"),
  },
  {
    path: "/h5/refundApprovalResult/:id",
    name: "RefundApprovalResult",
    component: () => import("../view/User/RefundApprovalResult.vue"),
  },
  {
    path: "/h5/order/:id",
    name: "WorkOrder",
    component: () => import("../view/WorkOrder/Index.vue"),
    children: [
      {
        path: "detail",
        name: "WorkOrderDetail",
        component: () => import("../view/WorkOrder/Detail.vue"),
      },
      {
        path: "attach",
        name: "WorkOrderAttach",
        component: () => import("../view/WorkOrder/Attach.vue"),
      },
      {
        path: "security",
        name: "WorkOrderSecurity",
        component: () => import("../view/WorkOrder/Security.vue"),
      },
      {
        path: "clarification",
        name: "WorkOrderClarification",
        component: () => import("../view/WorkOrder/Clarification.vue"),
      },
      {
        path: "securityClarification",
        name: "WorkOrderSecurityClarification",
        component: () => import("../view/WorkOrder/SecurityClarification.vue"),
      },
      {
        path: "record",
        name: "WorkOrderRecord",
        component: () => import("../view/WorkOrder/Record.vue"),
      },
      {
        path: "appointment",
        name: "WorkOrderAppointment",
        component: () => import("../view/WorkOrder/Appointment.vue"),
      },
      {
        path: "qualityPoints",
        name: "WorkOrderQualityPoints",
        component: () => import("../view/WorkOrder/QualityPoints.vue"),
      },
      {
        path: "execution",
        name: "WorkOrderExecution",
        component: () => import("../view/WorkOrder/Execution.vue"),
      },
      {
        path: "summary",
        name: "WorkOrderSummary",
        component: () => import("../view/WorkOrder/Summary.vue"),
      },
      {
        path: "scheme",
        name: "WorkOrderScheme",
        component: () => import("../view/WorkOrder/Scheme.vue"),
      },
      {
        path: "standard",
        name: "WorkOrderStandard",
        component: () => import("../view/WorkOrder/Standard.vue"),
      },
      {
        path: "inspection",
        name: "WorkOrderInspection",
        component: () => import("../view/WorkOrder/Inspection.vue"),
      },
      {
        path: "acceptance",
        name: "WorkOrderAcceptance",
        component: () => import("../view/WorkOrder/Acceptance.vue"),
      },
      {
        path: "detach",
        name: "WorkOrderDetach",
        component: () => import("../view/WorkOrder/Detach.vue"),
      },
      {
        path: "check",
        name: "WorkOrderCheck",
        component: () => import("../view/WorkOrder/Frame.vue"),
      },
      {
        path: "defects",
        name: "WorkOrderDefects",
        component: () => import("../view/WorkOrder/Frame.vue"),
      },
    ],
  },
  {
    path: "/h5/backDetail/:id/:anId?",
    name: "WorkOrderBackDetail",
    component: () => import("../view/WorkOrder/BackDetail.vue"),
  },
  {
    path: "/h5/premission/delegation",
    name: "PremissionDelegation",
    component: () => import("../view/Premission/Delegation.vue"),
  },
  {
    path: "/h5/premission/detail",
    name: "PremissionDetail",
    component: () => import("../view/Premission/Detail.vue"),
  },
  {
    path: "/h5/entrustDetail/:id",
    name: "PremissionEntrustDetail",
    component: () => import("../view/Premission/EntrustDetail.vue"),
  },
  {
    path: "/h5/demo",
    name: "Demo",
    component: () => import("../view/Test/index.vue"),
  },
  {
    path: "/h5/orderNavs/itemToDo",
    name: "OrderNavsItemToDo",
    component: () => import("../view/OrderNavs/ItemToDo.vue"),
  },
  {
    path: "/h5/orderNavs/waitFileOrders",
    name: "OrderNavsWaitFileOrders",
    component: () => import("../view/OrderNavs/WaitFileOrders.vue"),
  },
  {
    path: "/h5/orderNavs/finishedOrders",
    name: "OrderNavsFinishedOrders",
    component: () => import("../view/OrderNavs/FinishedOrders.vue"),
  },
  {
    path: "/h5/orderNavs/workeringOrders",
    name: "OrderNavsWorkeringOrders",
    component: () => import("../view/OrderNavs/WorkeringOrders.vue"),
  },
  {
    path: "/h5/orderNavs/completedOrders",
    name: "OrderNavsCompletedOrders",
    component: () => import("../view/OrderNavs/CompletedOrders.vue"),
  },
];

// 导出路由
const router = createRouter({
  history: createWebHistory(),
  routes,
  // base: '/h5/', // 'production' === import.meta.env.MODE ? '/h5' : '/'
});

export default router;
