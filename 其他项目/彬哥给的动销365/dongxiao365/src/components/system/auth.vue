<template>
  <div class="page-content">
    <breadcrumb/>
    <div class="fh-container clearfix">
      <div class="fh-side-left">
        <div>
          <el-input placeholder="请输入角色名称" v-model="filterTextRole" suffix-icon="el-icon-search" clearable></el-input>
        </div>
        <br/>
        <!--角色-->
        <el-tree v-loading="loadingRole"
                 :data="roleTree"
                 :empty-text="emptyText"
                 :props="defaultPropsRole"
                 :highlight-current="true"
                 default-expand-all
                 node-key="id"
                 @node-click="handleNodeClickRole"
                 ref="tree2"
                 :filter-node-method="filterNodeRole"></el-tree>
      </div>
      <div class="fh-content">
        <el-card shadow="never">
          <div slot="header" class="clearfix">
            <span>PC端权限</span>  
            <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
          </div>
          <el-checkbox-group v-model="pc" v-loading="pcLoading" @change="handlePcCheckChange">
            <div class="el-table el-table--fit el-table--striped el-table--border el-table--scrollable-x el-table--enable-row-hover el-table--enable-row-transition el-table--small">
              <table width="106.5%" cellpadding="0" cellspacing="0">
                <thead class="el-table__header-wrapper">
                <tr>
                  <th>
                    <div class="cell">一级菜单</div>
                  </th>
                  <th>
                    <div class="cell">二级菜单</div>
                  </th>
                  <th>
                    <div class="cell">三级菜单</div>
                  </th>
                  <!-- <th>
                    <div class="cell">功能</div>
                  </th> -->
                </tr>
                </thead>
                <tbody class="el-table__body">
                <tr>
                  <td>
                    <div class="cell">
                      首页
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                  <!-- <td>
                    <div class="cell">
                      <el-checkbox label="index.visit.analysis">拜访分析</el-checkbox>
                      <el-checkbox label="index.staff.portrait">员工画像</el-checkbox>
                      <el-checkbox label="index.customer.total">客户总数</el-checkbox>
                      <el-checkbox label="customer.management.list.add">新增客户</el-checkbox>
                    </div>
                  </td> -->
                </tr>

                <tr>
                  <td rowspan="7">
                    <div class="cell">
                      <el-checkbox label="customer">客户管理</el-checkbox>
                    </div>
                  </td>
                  <td rowspan="3">
                    <div class="cell">
                      <el-checkbox label="customer.management">客户管理</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                      <el-checkbox label="customer.management.list">客户详情</el-checkbox>
                    </div>
                  </td>
                  <!-- <td>
                    <div class="cell">
                      <el-checkbox label="customer.management.list.add">新增客户</el-checkbox>
                      <el-checkbox label="customer.management.list.edit">编辑</el-checkbox>
                      <el-checkbox label="customer.management.list.delete">删除</el-checkbox>
                      <el-checkbox label="customer.management.list.import">导入客户</el-checkbox>
                      <el-checkbox label="customer.management.list.export">导出客户</el-checkbox>
                      <el-checkbox label="customer.management.list.batch.delete">批量删除</el-checkbox>
                      <el-checkbox label="customer.management.list.transfer">移交客户</el-checkbox>
                      <el-checkbox label="customer.management.list.share">共享客户</el-checkbox>
                    </div>
                  </td> -->
                </tr>

                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="customer.management.deleted">已删除客户</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                      <!-- <el-checkbox label="customer.management.deleted.restore">恢复</el-checkbox>
                      <el-checkbox label="customer.management.deleted.delete.completely">彻底删除</el-checkbox>
                      <el-checkbox label="customer.management.deleted.batch.restore">批量恢复</el-checkbox>
                      <el-checkbox label="customer.management.deleted.batch.delete.completely">彻底删除（批量）</el-checkbox> -->
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="customer.management.share">共享客户</el-checkbox>
                    </div>
                  </td>
                  <!-- <td>
                    <div class="cell">
                      <el-checkbox label="customer.management.share.batch.cancel">批量取消共享</el-checkbox>
                    </div>
                  </td> -->
                </tr>

                <tr>
                  <td rowspan="2">
                    <div class="cell">
                      <el-checkbox label="customer.region">区域管理</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                      <el-checkbox label="customer.region.distribution">客户区域分配</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell"></div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="customer.region.manage">销售区域管理</el-checkbox>
                    </div>
                  </td>
                  <!-- <td>
                    <div class="cell"></div>
                  </td> -->
                </tr>
                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="customer.tag">标签管理</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell"></div>
                  </td>
                  <td>
                    <div class="cell"></div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="customer.map">分布地图</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell"></div>
                  </td>
                  <!-- <td>
                    <div class="cell"></div>
                  </td> -->
                </tr>
                <tr>
                  <td rowspan="7">
                    <div class="cell">
                      <el-checkbox label="visit">客户拜访</el-checkbox>
                    </div>
                  </td>
                  <td rowspan="2">
                    <div class="cell">
                      <el-checkbox label="visit.step">步骤管理</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                      <el-checkbox label="visit.step.setting">步骤设置</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                      <!-- <el-checkbox label="visit.step.setting.add">新增步骤</el-checkbox>
                      <el-checkbox label="visit.step.setting.edit">编辑</el-checkbox>
                      <el-checkbox label="visit.step.setting.delete">删除</el-checkbox>
                      <el-checkbox label="visit.step.setting.batch.delete">批量删除</el-checkbox> -->
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="visit.step.form">任务定义</el-checkbox>
                    </div>
                  </td>
                  <!-- <td>
                    <div class="cell">
                      <el-checkbox label="visit.step.form.add">新增任务</el-checkbox>
                      <el-checkbox label="visit.step.form.edit">编辑</el-checkbox>
                      <el-checkbox label="visit.step.form.delete">删除</el-checkbox>
                      <el-checkbox label="visit.step.form.publish">发布</el-checkbox>
                      <el-checkbox label="visit.step.form.unpublish">取消发布</el-checkbox>
                      <el-checkbox label="visit.step.form.batch.delete">批量删除</el-checkbox>
                      <el-checkbox label="visit.step.form.batch.publish">批量发布</el-checkbox>
                      <el-checkbox label="visit.step.form.batch.unpublish">批量取消发布</el-checkbox>
                    </div>
                  </td> -->
                </tr>
                <tr>
                  <td rowspan="3">
                    <div class="cell">
                      <el-checkbox label="visit.management">拜访管理</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                      <el-checkbox label="visit.management.plan">拜访计划</el-checkbox>
                    </div>
                  </td>
                  <!-- <td>
                    <div class="cell">
                      <el-checkbox label="visit.management.plan.add">新建计划</el-checkbox>
                      <el-checkbox label="visit.management.plan.delete">删除计划</el-checkbox>
                    </div>
                  </td> -->
                </tr>

                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="visit.management.record">拜访记录</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                      <!-- <el-checkbox label="visit.management.record.staff">员工任务记录（Tab页）</el-checkbox> -->
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="visit.management.trajectory">拜访轨迹</el-checkbox>
                    </div>
                  </td>
                  <!-- <td>
                    <div class="cell"></div>
                  </td> -->
                </tr>

                <tr>
                  <td rowspan="2">
                    <div class="cell">
                      <el-checkbox label="visit.report">拜访报表</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                      <el-checkbox label="visit.report.action">执行情况</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <!-- <div class="cell">
                      <el-checkbox label="visit.report.action.export">导出到Excel</el-checkbox>
                    </div> -->
                  </td>
                </tr>

                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="visit.report.summary">综合报表</el-checkbox>
                    </div>
                  </td>
                  <!-- <td>
                    <div class="cell"></div>
                  </td> -->
                </tr>
<!-- 
                <tr>
                  <td rowspan="14">
                    <div class="cell">
                      <el-checkbox label="psi">进销存管理</el-checkbox>
                    </div>
                  </td>

                  <td rowspan="5">
                    <div class="cell">
                      <el-checkbox label="psi.base">基础资料</el-checkbox>
                    </div>
                  </td>

                  <td>
                    <div class="cell">
                      <el-checkbox label="psi.base.commodity">商品管理</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell"></div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="psi.base.warehouse">仓库管理</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell"></div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="psi.base.brandSetting">品牌管理</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell"></div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="psi.base.category">类型管理</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell"></div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="psi.base.unit_setting">单位管理</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell"></div>
                  </td>
                </tr>

                <tr>
                  <td rowspan="4">
                    <div class="cell">
                      <el-checkbox label="psi.sales">销售订单</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                      <el-checkbox label="psi.sales.approved">订单审批</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                      <el-checkbox label="psi.sales.approved.add">新建订单</el-checkbox>
                      <el-checkbox label="psi.sales.approved.edit">修改</el-checkbox>
                      <el-checkbox label="psi.sales.approved.approval">审批</el-checkbox>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="psi.sales.order.details">订单明细</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell"></div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="psi.sales.invoice.paper">发货单</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                      <el-checkbox label="psi.sales.invoice.paper.delivery">发货</el-checkbox>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="psi.sales.invoice.details">发货单明细</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell"></div>
                  </td>
                </tr>

                <tr>
                  <td rowspan="2">
                    <div class="cell">
                      <el-checkbox label="psi.returns">退换货</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                      <el-checkbox label="psi.returns.approved">退换货审批</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                      <el-checkbox label="psi.returns.approved.add">新建退换货单</el-checkbox>
                      <el-checkbox label="psi.returns.approved.edit">修改</el-checkbox>
                      <el-checkbox label="psi.returns.approved.approval">审批</el-checkbox>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="psi.returns.detail">退换货明细</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                    </div>
                  </td>
                </tr>

                <tr>
                  <td rowspan="3">
                    <div class="cell">
                      <el-checkbox label="psi.inventory">库存管理</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                      <el-checkbox label="psi.inventory.list">入库单</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                      <el-checkbox label="psi.inventory.list.add">新建入库单</el-checkbox>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="psi.inventory.query">库存查询</el-checkbox>
                    </div>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="psi.inventory.check">库存盘点</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                      <el-checkbox label="psi.inventory.check.add">新建盘点单</el-checkbox>
                      <el-checkbox label="psi.inventory.check.edit">修改</el-checkbox>
                      <el-checkbox label="psi.inventory.check.delete">删除</el-checkbox>
                    </div>
                  </td>
                </tr> -->

                <tr>
                  <td rowspan="14">
                    <div class="cell">
                      <el-checkbox label="data">数据管理</el-checkbox>
                    </div>
                  </td>
                  <td rowspan="5">
                    <div class="cell">
                      <el-checkbox label="data.base">基础资料</el-checkbox>
                    </div>
                  </td>

                  <td>
                    <div class="cell">
                      <el-checkbox label="data.base.commodity">商品管理</el-checkbox>
                    </div>
                  </td>
                  <!-- <td>
                    <div class="cell"></div>
                  </td> -->
                </tr>

                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="data.base.warehouse">仓库管理</el-checkbox>
                    </div>
                  </td>
                  <!-- <td>
                    <div class="cell"></div>
                  </td> -->
                </tr>

                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="data.base.brandSetting">品牌管理</el-checkbox>
                    </div>
                  </td>
                  <!-- <td>
                    <div class="cell"></div>
                  </td> -->
                </tr>

                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="data.base.category">类型管理</el-checkbox>
                    </div>
                  </td>
                  <!-- <td>
                    <div class="cell"></div>
                  </td> -->
                </tr>

                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="data.base.unit_setting">单位管理</el-checkbox>
                    </div>
                  </td>
                  <!-- <td>
                    <div class="cell"></div>
                  </td> -->
                </tr>
                  <td rowspan="3">
                    <div class="cell">
                      <el-checkbox label="data.picture">拍照上传</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                      <el-checkbox label="data.picture.browse">照片浏览</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                      <!-- <el-checkbox label="data.picture.browse.delete">删除</el-checkbox> -->
                    </div>
                  </td>

                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="data.picture.statistics">拍照统计</el-checkbox>
                    </div>
                  </td>
                  <!-- <td>
                    <div class="cell">
                    </div>
                  </td> -->
                </tr>

                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="data.picture.setting">拍照类型设置</el-checkbox>
                    </div>
                  </td>
                  <!-- <td>
                    <div class="cell">
                    </div>
                  </td> -->
                </tr>

                <tr>
                  <td rowspan="2">
                    <div class="cell">
                      <el-checkbox label="data.sales_report">销量上报</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                      <el-checkbox label="data.sales_report.record">销量上报记录</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                      <!-- <el-checkbox label="data.sales.report.record.delete">删除</el-checkbox>
                      <el-checkbox label="data.sales.report.record.confirm">确认</el-checkbox>
                      <el-checkbox label="data.sales.report.record.reject">驳回</el-checkbox> -->
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="data.sales_report.details">销量上报明细</el-checkbox>
                    </div>
                  </td>
                  <!-- <td>
                    <div class="cell">
                    </div>
                  </td> -->
                </tr>


                <tr>
                  <td rowspan="2">
                    <div class="cell">
                      <el-checkbox label="data.stock_report">库存上报</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                      <el-checkbox label="data.stock_report.list">库存上报记录</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                      <!-- <el-checkbox label="data.stock_report.list.delete">删除</el-checkbox>
                      <el-checkbox label="data.stock_report.list.confirm">确认</el-checkbox>
                      <el-checkbox label="data.stock_report.list.reject">驳回</el-checkbox> -->
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="data.stock_report.details">库存上报明细</el-checkbox>
                    </div>
                  </td>
                  <!-- <td>
                    <div class="cell">
                    </div>
                  </td> -->
                </tr>

                <tr>
                  <td rowspan="2">
                    <div class="cell">
                      <el-checkbox label="data.in_stock_report">铺货上报</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                      <el-checkbox label="data.in_stock_report.record">库存上报记录</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                      <!-- <el-checkbox label="data.in_stock_report.record.delete">删除</el-checkbox> -->
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="data.in_stock_report.details">铺货上报明细</el-checkbox>
                    </div>
                  </td>
                  <!-- <td>
                    <div class="cell">
                    </div>
                  </td> -->
                </tr>
                <!-- 帮助中心 -->
                <tr>
                  <td rowspan="2">
                    <div class="cell">
                      <el-checkbox label="help">帮助中心</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                      <el-checkbox label="help.connect">加入交流群</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="help.guide">使用指南</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                    </div>
                  </td>
                  <!-- <td>
                    <div class="cell">
                    </div>
                  </td> -->
                </tr>
                <!-- 帮助中心 -->
                <tr>
                  <td rowspan="3">
                    <div class="cell">
                      <el-checkbox label="system">系统设置</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                      <el-checkbox label="system.organization">组织架构</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="system.authority">权限管理</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                    </div>
                  </td>
                  <!-- <td>
                    <div class="cell">
                    </div>
                  </td> -->
                </tr>

                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="system.corp">企业信息</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                    </div>
                  </td>
                  <!-- <td>
                    <div class="cell">
                    </div>
                  </td> -->
                </tr>

                </tbody>
              </table>
            </div>
          </el-checkbox-group>
        </el-card>
        <br>
        <!-- <el-card shadow="never">
          <div slot="header" class="clearfix">
            <span>移动端权限</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <el-checkbox-group v-model="isv" v-loading="isvLoading" @change="handleIsvCheckChange">
            <div class="el-table el-table--fit el-table--striped el-table--border el-table--scrollable-x el-table--enable-row-hover el-table--enable-row-transition el-table--small">
              <table width="101%" cellpadding="0" cellspacing="0">
                <thead class="el-table__header-wrapper">
                <tr>
                  <th>
                    <div class="cell">Tab页</div>
                  </th>
                  <th>
                    <div class="cell">模块</div>
                  </th>
                  <th>
                    <div class="cell">模块Tab页</div>
                  </th>
                  <th>
                    <div class="cell">功能</div>
                  </th>
                </tr>
                </thead>
                <tbody class="el-table__body">
                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="isv.customer">客户</el-checkbox>
                    </div>
                  </td>
                  <td></td>

                  <td>
                    <div class="cell">
                      <el-checkbox label="isv.customer.all">全公司的</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell"></div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="isv.visit">拜访</el-checkbox>
                    </div>
                  </td>
                  <td></td>
                  <td>
                    <div class="cell">
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                      <el-checkbox label="isv.visit.temp">临时拜访</el-checkbox>
                      <el-checkbox label="isv.visit.plan.add">添加拜访计划</el-checkbox>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td rowspan="15">
                    <div class="cell">
                      <el-checkbox label="isv.work">工作</el-checkbox>
                    </div>
                  </td>
                  <td>
                    <div class="cell">
                      <el-checkbox label="isv.customer">客户</el-checkbox>
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                </tr>

                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="isv.visit">客户拜访</el-checkbox>
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                </tr>

                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="isv.visit.record">拜访记录</el-checkbox>
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="isv.visit.trajectory">拜访轨迹</el-checkbox>
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="isv.commodity">商品管理</el-checkbox>
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="isv.sales.order">售销订单</el-checkbox>
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="isv.photo.upload">拍照上传</el-checkbox>
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="isv.sales.report">销量上报</el-checkbox>
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="isv.inventory.report">库存上报</el-checkbox>
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                </tr>

                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="isv.distribution.report">铺货上报</el-checkbox>
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                </tr>

                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="isv.visit.analysis">拜访分析</el-checkbox>
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                </tr>


                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="isv.staff.portrait">员工画像</el-checkbox>
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                </tr>

                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="isv.customer.total">客户总数</el-checkbox>
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                </tr>

                <tr>
                  <td>
                    <div class="cell">
                      <el-checkbox label="isv.customer.add">新增客户</el-checkbox>
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                </tbody>
              </table>
            </div>
          </el-checkbox-group>
        </el-card> -->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        /* ----------------加载角色树--------------------*/
        roleTree: [], // 角色数据源
        defaultPropsRole: {// 组织架构基础数据类型
          children: 'children',
          label: 'name',
          value: 'id'
        },
        emptyText: '没有角色数据',
        loadingRole: true,
        loadingConfig: false,
        filterTextRole: '',
        pcLoading: false,
        isvLoading: false,
        pc: [],
        isv: [],
        roleId: 0
      }
    },
    created() {
    },
    mounted() {
      this.loadRole();
    },
    methods: {
      init(val) {
        this.title = val.name;
      },
      loadRole() {
        this.loadingRole = true;
        this.$http.get('/sys/role/tree', {}, r => {
          this.roleTree = r.data;
          this.loadingRole = false;
        });
      },
      handlePcCheckChange() {
        if (this.roleId) {
          const val = JSON.stringify(this.pc);
          this.$http.post('/sys/authority/save', {roleId: this.roleId, halfMenus: 'pc', checkMenus: val}, r => {
            this.$message({
              message: '保存成功',
              type: 'success'
            });
          });
        }
      },
      handleIsvCheckChange() {
        if (this.roleId) {
          const val = JSON.stringify(this.isv);
          this.$http.post('/sys/authority/save', {roleId: this.roleId, halfMenus: 'isv', checkMenus: val}, r => {
            this.$message({
              message: '保存成功',
              type: 'success'
            });
          });
        }
      },
      handleNodeClickRole(node) {
        this.isv = [];
        this.pc = [];
        if (!node.group) {
          this.roleId = node.id;
          if (this.roleId) {
            this.loadPcAuth();
            this.loadIsvAuth();
          }
        }
      },
      loadPcAuth() {
        this.pcLoading = true;
        this.pc = [];
        this.$http.get('/sys/authority', {roleId: this.roleId, scope: 'pc'}, r => {
          if (r.data) {
            this.pc = JSON.parse(r.data);
          }
          this.pcLoading = false;
        });
      },
      loadIsvAuth() {
        this.isvLoading = true;
        this.isv = [];
        this.$http.get('/sys/authority', {roleId: this.roleId, scope: 'isv'}, r => {
          if (r.data) {
            this.isv = JSON.parse(r.data);
          }
          this.isvLoading = false;
        });
      },
      filterNodeRole(value, data) {
        if (!value) { return true; }
        return data.name.indexOf(value) !== -1;
      }
    }
  }
</script>

<style scoped>

</style>
