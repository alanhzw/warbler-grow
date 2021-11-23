<template>
  <div>
    <breadcrumb/>
    <!--头部-->
    <div class="tool-box text-right">
      <el-form :inline="true" class="form-compact" @submit.native.prevent>
        <el-form-item>
          <el-search v-model="page.keyword" @click="loadTableData" placeholder="请输入客户名称、业务员、订单号" @keyup.enter.native="loadTableData"></el-search>
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
    <!--表格-->
    <div>
      <el-table
        v-loading="loading"
        :data="tableData"
        class="table-compact"
        ref="multipleTable"
        stripe
        border
        style="width: 100%">
        <el-table-column sortable prop="invoiceCode" label="发货单号" width="130"></el-table-column>
        <el-table-column sortable prop="orderCode" label="订单号" width="130"></el-table-column>
        <el-table-column sortable prop="psiOrderRequest.orderTime" label="下单时间" width="110">
          <template slot-scope="scope">
            {{scope.row.orderTime |date}}
          </template>
        </el-table-column>
        <el-table-column sortable prop="deliverDate" label="发货日期" width="110">
          <template slot-scope="scope">
            {{scope.row.deliverDate |date}}
          </template>
        </el-table-column>
        <el-table-column sortable prop="customerName" label="客户名称"></el-table-column>
        <el-table-column sortable prop="salesmanName" label="业务员" width="100"></el-table-column>
        <el-table-column sortable prop="itemName" label="商品名称"></el-table-column>
        <el-table-column sortable prop="specification" label="规格属性"></el-table-column>
        <el-table-column sortable prop="deliverCount" label="发货数量" align="right" width="100">
          <template slot-scope="scope">
            <el-tooltip effect="dark" :content="'1'+scope.row.auxiliaryUnitName+'='+scope.row.unitConvertRatio+''+scope.row.basicUnitName" placement="top-start" v-if="scope.row.enableAuxiliaryUnit">
              <div>{{scope.row,scope.row.deliverCount|unit}}</div>
            </el-tooltip>
            <div v-else>
              {{scope.row,scope.row.deliverCount|unit}}
            </div>
          </template>
        </el-table-column>
        <el-table-column sortable prop="warehouseName" label="发货仓库"></el-table-column>
        <el-table-column sortable prop="deliverAddress" label="收货地址" min-width="120">
          <template slot-scope="scope">
            <i v-if="scope.row.address || scope.row.deliverAddress" class="fa fa-map-marker"></i>
            {{scope.row.address}} {{scope.row.deliverAddress}}
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
    <!--弹出层-->
  </div>
</template>

<script>
  import ComSearch from '../../inc/search'
  import ItemUtil from '../../../../util/itemUtil'

  export default {
    components: {
      ComSearch
    },
    data() {
      return {
        dialog: {
          invoiceDetailsVisible: false
        },
        tableData: [],
        page: {
          pageNum: 1,
          pageSize: 10,
          sortName: '',
          sortOrder: '',
          total: 0,
          keyword: '',
          orderId: ''
        },
        loading: false,
        searchBoxVisible: true
      }
    },
    mounted() {
      this.loadTableData();
    },
    methods: {
      /* 加载表格数据*/
      loadTableData() {
        this.loading = true;
        this.$http.get('psi/invoice/details/List', this.page, r => {
          this.tableData = r.data.list;
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
      handleClearFilter() {
        this.condition = this.page;
        this.loadTableData();
      }
    },
    filters: {
      unit(item, val) {
        return ItemUtil.format(item, val);
      }
    }
  }
</script>

<style scoped>
  .orderFormMess1 {
    color: green;
  }
</style>
