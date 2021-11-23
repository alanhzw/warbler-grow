<template>
  <div>
    <breadcrumb/>
    <!--头部-->
    <div class="pull-left">
      <el-button v-auth="'psi.sales.approved.add'" type="success" @click="$router.push({path:'/psi/sales/approved/add'})" icon="el-icon-circle-plus-outline">新建订单</el-button>
    </div>
    <div class="tool-box text-right">
      <el-form :inline="true" class="form-compact" @submit.native.prevent>
          <el-form-item>
            <el-search v-model="page.keyword" @click="loadTableData" @keyup.enter.native="loadTableData" placeholder="请输入客户名称、业务员、订单号"></el-search>
          </el-form-item>
          <el-form-item>
            <el-button type="info" icon="fa fa-filter" @click="searchBoxVisible = !searchBoxVisible">筛选</el-button>
          </el-form-item>
      </el-form>
    </div>
    <!--检索条件-->
    <div class="tool-box" v-show="searchBoxVisible">
      <div class="search-panel border">
        <ComSearch @onSearch="handleFilter"/>
      </div>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="待我审批" name="first">
      </el-tab-pane>
      <el-tab-pane label="全部订单" name="second">
      </el-tab-pane>
    </el-tabs>
    <!--表格-->
    <div>
      <el-table
        v-loading="loading"
        :data="tableData"
        class="table-compact"
        ref="multipleTable"
        stripe
        border
        @row-dblclick="handleShowDetails"
        style="width: 100%">
        <el-table-column sortable prop="code" label="订单号" width="130">
          <template slot-scope="scope">
            <a href="javascript:;" @click="handleShowDetails(scope.row)"> {{scope.row.code}}</a>
          </template>
        </el-table-column>
        <el-table-column sortable prop="customerName" label="客户名称"></el-table-column>
        <el-table-column sortable prop="salesmanName" label="业务员"></el-table-column>
        <el-table-column sortable prop="actualAmount" label="订单金额" align="right">
          <template slot-scope="scope">
            {{scope.row.actualAmount | price }}
          </template>
        </el-table-column>
        <el-table-column sortable prop="deliverDate" label="交货日期">
          <template slot-scope="scope">
            {{scope.row.deliverDate |date}}
          </template>
        </el-table-column>

        <el-table-column sortable prop="orderTime" label="下单时间">
          <template slot-scope="scope">
            {{scope.row.orderTime | date}}
          </template>
        </el-table-column>

        <el-table-column sortable prop="approvalStatus" label="审批状态">
          <template slot-scope="scope">
            <el-tag
              size="small"
              :type="scope.row.approvalStatus === 1? 'success' : scope.row.approvalStatus === 0? 'warning':'danger'"
              close-transition>
              {{scope.row.approvalStatus | status}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column sortable prop="deliverStatus" label="发货状态">
          <template slot-scope="scope">
            <el-tag size="small"
              :type="scope.row.deliverStatus === 1? 'warning' : scope.row.deliverStatus === 0? 'info':'success'"
              close-transition>
              {{scope.row.deliverStatus | deliverStatus}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column sortable prop="remark" label="订单备注"></el-table-column>
        <el-table-column fixed="right" label="操作" width="160">
          <template slot-scope="scope">
            <el-button v-auth="'psi.sales.approved.approval'" type="button" class="text-primary" v-if="activeName==='first'" @click="$router.push({path:'/psi/sales/approved/execute',query:{id:scope.row.id}})" size="small">审批</el-button>
            <el-button v-auth="'psi.sales.approved.edit'" type="button" class="text-warning" @click="edit(scope.row)" v-show="scope.row.approvalStatus===0" size="small">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @current-change="handlePaginationChange"
        @size-change="handleSizeChange"
        :current-page="page.pageNum"
        :page-size="page.pageSize"
        layout="total, sizes,prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
      <approved-detail :visible.sync="dialog.details.visible" :order="dialog.details.order" :orderApproveList.sync="dialog.details.orderApproveList"/>
    </div>
  </div>
</template>

<script>
  import ComSearch from '../inc/search'
  import ApprovedDetail from './order_details'

  export default {
    components: {
      ComSearch,
      ApprovedDetail
    },
    data() {
      return {
        activeName: "first",
        tableData: [],
        loading: false,
        page: {
          pageNum: 1,
          pageSize: 20,
          sortName: '',
          sortOrder: '',
          total: 0,
          keyword: ''
        },
        dialog: {
          details: {
            visible: false,
            order: {},
            orderApproveList: []
          }
        },
        searchBoxVisible: true
      }
    },
    created() {
      this.activeName = sessionStorage.getItem('order_approved_activeName') || 'first';
    },
    mounted() {
      this.loadTableData();
    },
    methods: {
      /*  <!--------------------未审批的订单---------------------------->*/
      // 显示订单详情
      handleShowDetails(row) {
        this.$http.get('/psi/order/info/approve/list', {orderId: row.id}, r => {
          this.dialog.details.orderApproveList = r.data;
        })
        this.dialog.details.order = row;
        this.dialog.details.visible = true;
      },
      /* 加载表格数据*/
      loadTableData() {
        const url = this.activeName === 'first' ? 'psi/order/approve/list' : 'psi/order/list/all';
        this.loading = true;
        this.$http.get(url, this.page, r => {
          this.tableData = r.data.list;
          console.log(r.data.list)
          this.page.total = r.data.total;
          this.loading = false;
        });
      },
      /* 分页*/
      handlePaginationChange(pageNum) {
        this.page.pageNum = pageNum;
        this.loadTableData();
      },
      // 分页改变事件
      handleSizeChange(val) {
        this.page.pageSize = val;
        this.loadTableData();
      },
      // 筛选
      handleFilter(val) {
        this.page = this.$util.extend(this.page, val);
        this.loadTableData();
      },
      // 修改
      edit(val) {
        this.$router.push({path: '/psi/sales/editOrder', query: {id: val.id}});
      }
    },
    watch: {
      activeName(val) {
        sessionStorage.setItem('order_approved_activeName', val);
        this.page.pageNum = 1;
        this.page.pageSize = 20;
        this.page.total = 0;
        this.tableData = [];
        this.loadTableData();
      }
    },
    filters: {
      status: function (val) {
        if (val === 1) {
          return "已审批"
        }
        if (val === 0) {
          return "未审批"
        }
        if (val === 2) {
          return "已驳回"
        }
      },
      deliverStatus(val) {
        if (val === 1) {
          return "已发货"
        }
        if (val === 0) {
          return "未发货"
        }
        if (val === 2) {
          return "发货完成"
        }
      }
    },
    computed: {}
  }
</script>

<style>

</style>
