<template>
  <div>
    <!-- 弹框 -->
    <el-dialog
        width="800px"
        :lock-scroll='true'
        :title="dialog.title"
        :visible.sync="showDialog">
        <dialog-info :infoId="infoId" @closeDia="closeDia"/>
    </el-dialog>
    <!--头部-->
      <div class="pull-left">
        <el-button v-auth="'psi.returns.approved.add'" type="success" @click="$router.push({path:'/psi/returns/approved/add',query:{id:''}})" icon="el-icon-circle-plus-outline">新建退换货单</el-button>
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
      <!--------------------未审批的退换货单---------------------------->
      <el-tab-pane label="待我审批" name="first">
      </el-tab-pane>
      <!--------------------全部订单---------------------------->
      <el-tab-pane label="全部退换货单" name="second">
      </el-tab-pane>
    </el-tabs>
    <!--表格-->
    <div>
      <el-table
        :data="tableData"
        class="table-compact"
        ref="multipleTable"
        stripe
        border
        @row-dblclick="showDetails"
        style="width: 100%">
        <el-table-column sortable prop="orderNumber" label="单号" width="130">
          <template slot-scope="scope">
            <a href="javascript:;" @click="showDetails(scope.row)">{{scope.row.code}}
            </a>
          </template>
        </el-table-column>

        <el-table-column sortable prop="customerName" label="客户名称"></el-table-column>
         <el-table-column sortable prop="returnType" label="单据类型" width="110">
          <template slot-scope="scope">
            {{scope.row.returnType | returnType}}
          </template>
        </el-table-column>
        <el-table-column sortable prop="returnDate" label="日期">
          <template slot-scope="scope">
            {{scope.row.returnDate | date}}
          </template>
        </el-table-column>
        <el-table-column sortable prop="salesmanName" label="业务员">
        </el-table-column>
        <el-table-column sortable prop="totalAmount" label="退还金额" align="right">
          <template slot-scope="scope">
           {{scope.row.totalAmount | price}}
          </template>
        </el-table-column>
         <el-table-column sortable prop="receiptWarehouseName" label="收货仓库"></el-table-column>

        <el-table-column sortable prop="settleAccountsStatus" label="结算状态">
          <template slot-scope="scope">
            <el-tag
              size="small"
              :type="scope.row.settleAccountsStatus === 0 ? 'danger' : 'success'"
              close-transition>
              {{scope.row.settleAccountsStatus | settleAccountsStatus}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column sortable prop="result" label="单据状态">
          <template slot-scope="scope">
            <el-tag
              size="small"
              :type="scope.row.result === 0? 'warning' : scope.row.result === 1? 'success':'danger' "
              close-transition>
              {{scope.row.result | status}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column sortable prop="remark" label="订单备注"></el-table-column>
        <el-table-column fixed="right" label="操作" width="80" align="center">
          <template slot-scope="scope">
            <el-button v-auth="'psi.returns.approved.edit'" type="button" class="text-warning" size="small" v-if="activeName==='second'&&scope.row.result === 0" @click="$router.push({path: '/psi/returns/approved/edit', query: {id: scope.row.id}})">修改</el-button>
            <el-button v-auth="'psi.returns.approved.approval'" type="button" class="text-primary" size="small" v-if="activeName==='first'" @click="$router.push({path:'/psi/returns/approved/execute',query:{id:scope.row.id}})">审批</el-button>
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
    </div>
  </div>
</template>

<script>
  import ComSearch from '../inc/search'
  import ComInfo from '../returns/return_details'
  import DialogInfo from './return_details'

  export default {
    components: {
      ComSearch, ComInfo, DialogInfo
    },
    data() {
      return {
        activeName: "first",
        // 弹框
        showDialog: false,
        /*  <!--------------------未审批的订单---------------------------->*/
        tableData: [],
        table1Loaded: false,
        page: {
          pageNum: 1,
          pageSize: 20,
          total: 0,
          keyword: ''
        },
        // 弹窗
        dialog: {
          tilte: ''
        },
        infoId: '', // 目标id,详情
        searchBoxVisible: true
      }
    },
    created() {
      this.activeName = sessionStorage.getItem('order_returns_activeName') || 'first';
    },
    mounted() {
      this.loadTableData();
    },
    methods: {
       closeDia() {
        this.showDialog = false
      },
      // 标签页点击事件
      handleClick(tab, event) {
      },
      /*  <!--------------------未审退换货订单---------------------------->*/
      /* 加载表格数据*/
      loadTableData() {
        const ur = this.activeName === 'first' ? 'psi/return/list' : 'psi/return/all';
        this.loading = true;
        this.$http.get(ur, this.page, r => {
          this.tableData = r.data.list;
          this.page.total = r.data.total;
          this.loading = false;
          this.table1Loaded = true;
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
        this.loadTableData(val);
      },
      // 详情
      showDetails(row) {
        this.infoId = row.id;
        this.showDialog = true
        this.dialog.title = row.code;
      }
    },
    watch: {
      activeName(val) {
        sessionStorage.setItem('order_returns_activeName', val);
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
        if (val === -1) {
          return "驳回"
        }
      },
      returnType: function (val) {
        if (val === 1) {
          return "退货单"
        }
        if (val === 2) {
          return "换货单"
        }
      },
      settleAccountsStatus: function (val) {
        if (val === 1) {
          return "已结算"
        }
        if (val === 0) {
          return "未结算"
        }
      }

    },
    computed: {}
  }
</script>

<style>

</style>
