<template>
  <div>
    <breadcrumb/>
    <!--头部-->
    <div class="tool-box">
      <el-row>
        <el-col :span="12">
          <el-button v-auth="'psi.inventory.list.add'" type="success" @click="$router.push({path:'/psi/inventory/list/add'})" icon="el-icon-circle-plus-outline">新建入库单</el-button>
        </el-col>
        <el-col :span="12" align="right">
          <el-form :inline="true" class="form-compact" @submit.native.prevent>
              <el-form-item>
                <el-search v-model="page.keyword" @click="loadTableData" @keyup.enter.native="loadTableData" placeholder="请输入单号查询"></el-search>
              </el-form-item>
              <el-form-item>
                <el-button type="info" icon="fa fa-filter" @click="searchBoxVisible = !searchBoxVisible">筛选</el-button>
              </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <div class="tool-box" v-if="searchBoxVisible">
      <div class="search-panel border">
        <ComSearch @onSearch="handleFilter"/>
      </div>
    </div>
    <!--表格-->
    <div>
      <el-table
        v-loading="loading"
        :data="tableData"
        class="table-compact"
        ref="multipleTable"
        stripe
        border
        @row-dblclick="handleShowDetail"
        style="width: 100%">
        <el-table-column sortable prop="code" label="单号">
          <template slot-scope="scope">
            <a href="javascript:;" @click="handleShowDetail(scope.row)">{{scope.row.code}}</a>
          </template>
        </el-table-column>
        <el-table-column sortable prop="invoiceType" label="单据类型">
          <template slot-scope="scope">
            {{scope.row.invoiceType | orderType}}
          </template>
        </el-table-column>
        <el-table-column sortable prop="warehouseName" label="仓库"></el-table-column>

        <el-table-column sortable prop="operatorName" label="经办人"></el-table-column>
        <el-table-column sortable prop="creatorName" label="录入人"></el-table-column>
        <el-table-column sortable prop="invoiceDate" label="入库日期">
          <template slot-scope="scope">
            {{scope.row.invoiceDate | date}}
          </template>
        </el-table-column>
        <el-table-column sortable prop="createTime" label="创建时间">
          <template slot-scope="scope">
            {{scope.row.createTime | datetime}}
          </template>
        </el-table-column>
        <el-table-column sortable prop="totalAmount" label="金额合计" align="right">
          <template slot-scope="scope">
            {{scope.row.totalAmount | price}}元
          </template>
        </el-table-column>
        <el-table-column sortable prop="remark" label="备注"></el-table-column>
      </el-table>
      <el-pagination
        background
        :current-page="page.pageNum"
        :page-size="page.pageSize"
        :total="page.total"
        layout="total, sizes,prev, pager, next, jumper"
        @current-change="handlePaginationChange"
        @size-change="handleSizeChange">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="showDetail" width="800px">
      <div slot="title">{{detail.invoiceType | orderType}}：<span>【{{detail.code}}】</span></div>
      <el-row>
        <el-form :inline="true" :model="detail">
          <el-form-item label="入库日期："><span class="form_content">{{detail.invoiceDate | date}}</span></el-form-item>
          <el-form-item label="经办人："><span class="form_content">{{detail.operatorName}}</span></el-form-item>
          <el-form-item label="仓库："><span class="form_content">{{detail.warehouseName}}</span></el-form-item>
          <el-form-item label="备注："><span class="form_content">{{detail.remark}}</span></el-form-item>
        </el-form>
      </el-row>
      <h4>商品列表</h4>
      <el-table v-loading="loadingDetail"
                :data="detail.receiptDetailsList"
                class="table-compact"
                ref="multipleTable"
                border
                :height="400"
                style="width: 100%">
        <el-table-column sortable prop="itemCode" label="商品编码"></el-table-column>
        <el-table-column sortable prop="itemName" label="商品名称"></el-table-column>
        <el-table-column sortable prop="specification" label="规格属性"></el-table-column>
        <el-table-column sortable prop="count" label="数量" align="right">
          <template slot-scope="scope">
            {{scope.row,scope.row.count | unit}}
          </template>
        </el-table-column>
        <el-table-column sortable prop="itemPrice" label="单价" align="right">
          <template slot-scope="scope">
            {{scope.row.itemPrice | price}}元
          </template>
        </el-table-column>
        <el-table-column sortable prop="totalAmount" label="金额" align="right">
          <template slot-scope="scope">
            {{scope.row.totalAmount | price}}元
          </template>
        </el-table-column>
        <!--<el-table-column sortable prop="remark" label="备注"></el-table-column>-->
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  import ComSearch from '../inc/search'
  import ItemUtil from '../../../util/itemUtil'

  export default {
    components: {
      ComSearch
    },
    data() {
      return {
        tableData: [],
        page: {
          pageNum: 1,
          pageSize: 20,
          orerId: 0
        },
        loading: false,
        loadingDetail: false,
        searchBoxVisible: true,
        showDetail: false,
        detail: {
          receiptDetailsList: []
        }
      }
    },
    created() {
      this.page.orerId = this.$route.query.id;
    },
    mounted() {
      this.loadTableData();
    },
    methods: {
      /* 加载表格数据*/
      loadTableData() {
        this.loading = true;
        this.$http.get('psi/receipt/list', this.page, r => {
          this.tableData = r.data.list;
          this.page.total = r.data.total;
          this.loading = false;
        });
      },
      /* 分页*/
      handlePaginationChange(val) {
        this.page.pageNum = val;
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
      handleShowDetail(row) {
        this.showDetail = true;
        this.loadingDetail = true;
        this.$http.get('psi/receipt/info', {receiptId: row.id}, r => {
          this.detail = r.data;
          this.detail.receiptDetailsList = r.data.receiptDetailsList || [];
          this.loadingDetail = false;
        })
      }
    },
    filters: {
      orderType: function (val) {
        if (val === 1) {
          return '采购入库';
        }
        if (val === 0) {
          return '其他入库';
        }
        if (val === 2) {
          return '调拨入库';
        }
        if (val === 3) {
          return '补差入库';
        }
        if (val === 4) {
          return '退换货入库';
        }
      },
      unit(item, val) {
        return ItemUtil.format(item, val);
      }
    }
  }
</script>
