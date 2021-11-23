<template>
  <div>
    <breadcrumb/>
    <!--检索条件-->
    <div class="tool-box text-right">
      <el-form :inline="true" class="form-compact" @submit.native.prevent>
        <el-form-item>
          <el-search v-model="page.keyword" @click="loadTableData" @keyup.enter.native="loadTableData" placeholder="请输入客户名称、业务员、订单号"></el-search>
        </el-form-item>
      </el-form>
    </div>
    <!--检索条件-->
    <div class="tool-box">
      <div class="search-panel border">
        <ComSearch @onSearch="handleFilter" @onClear="handleClearFilter"/>
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
        <el-table-column sortable prop="orderCode" label="订单号" width="130"></el-table-column>
        <el-table-column sortable prop="customerName" label="客户名称" width="130"></el-table-column>
         <el-table-column sortable prop="salesmanName" label="业务员"></el-table-column>
        <el-table-column sortable prop="itemName" label="商品"></el-table-column>
        <el-table-column sortable prop="specification" label="规格属性" min-width="110"></el-table-column>
        <el-table-column sortable prop="orderTime" label="下单时间" min-width="110">
          <template slot-scope="scope">
            {{scope.row.orderTime |date}}
          </template>
        </el-table-column>
        <el-table-column sortable prop="deliverDate" label="交货日期" min-width="110">
          <template slot-scope="scope">
            {{scope.row.deliverDate | date}}
          </template>
        </el-table-column>
        <el-table-column sortable prop="orderPrice" label="订货价" align="right">
          <template slot-scope="scope">
            {{scope.row.orderPrice | price}}元
          </template>
        </el-table-column>
        <el-table-column sortable prop="itemCount" label="数量" align="right">
          <template slot-scope="scope">
            <el-tooltip effect="dark" :content="'1'+scope.row.auxiliaryUnitName+'='+scope.row.unitConvertRatio+''+scope.row.basicUnitName" placement="top-start" v-if="scope.row.enableAuxiliaryUnit">
              <div>{{scope.row,scope.row.itemCount|unit}}</div>
            </el-tooltip>
            <div v-else>
              {{scope.row,scope.row.itemCount|unit}}
            </div>
          </template>
        </el-table-column>
        <el-table-column sortable prop="deliverStatus" label="发货状态">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.deliverStatus === 2? 'success' : scope.row.deliverStatus === 0? 'warning':'info'"
              close-transition size="small">
              {{scope.row.deliverStatus | deliverStatus}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column sortable prop="isGift" label="赠品" width="60">
          <template slot-scope="scope">
            {{scope.row.isGift | gift}}
          </template>
        </el-table-column>
        <el-table-column sortable prop="remark" label="货品备注"></el-table-column>

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

  export default {
    components: {
      ComSearch
    },
    data() {
      return {
        tableData: [],
        loading: false,
        page: {
          pageNum: 1,
          pageSize: 20,
          keyword: ''
        }
      }
    },
    mounted() {
      this.loadTableData();
    },
    methods: {
      /* 加载表格数据*/
      loadTableData() {
        this.loading = true;
        this.$http.get('/psi/order/list/detail', this.page, r => {
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
        this.loadTableData();
      }
    },
    watch: {},
    computed: {},
    filters: {
      gift: function (val) {
        if (val) {
          return '是';
        } else {
          return '否';
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
    }
  }
</script>

<style scoped>

</style>
