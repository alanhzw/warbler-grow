<template>
  <div>
    <breadcrumb/>
    <div>
      <!--头部-->
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
          <ComSearch @onSearch="handleFilter" @onClear="handleClearFilter"/>
        </div>
      </div>
      <!--表格-->
      <div>
        <el-table
          :data="tableData.list"
          class="table-compact"
          ref="multipleTable"
          stripe
          border
          style="width: 100%">
          <el-table-column sortable prop="returnCode" label="单号" width="180">
          </el-table-column>
          <el-table-column sortable prop="customerName" label="客户" width="200"></el-table-column>
          <el-table-column sortable prop="salesmanName" label="业务员" width="150"></el-table-column>
          <el-table-column sortable prop="returnType" label="单据类型">
          <template slot-scope="scope">
            {{scope.row.returnType | returnType}}
          </template>
        </el-table-column>
          <el-table-column sortable prop="itemName" label="商品名称" width="200"></el-table-column>
          <el-table-column sortable prop="specification" label="规格属性" width="180"></el-table-column>
          <el-table-column sortable prop="updateTime" label="下单时间" width="130">
          <template slot-scope="scope">
            {{scope.row.updateTime|date}}
          </template>
        </el-table-column>
          <el-table-column sortable prop="itemCount" label="数量" align="right" width="80">
          <template slot-scope="scope">
            {{scope.row, scope.row.itemCount|unit}}
          </template>
        </el-table-column>
          <el-table-column sortable prop="returnPrice" label="退货价" align="right" width="80">
          <template slot-scope="scope">
           {{scope.row.returnPrice | price}}
          </template>
        </el-table-column>
        <el-table-column sortable prop="itemAmount" label="退还金额" align="right" width="90">
          <template slot-scope="scope">
           {{scope.row.itemAmount | price}}
          </template>
        </el-table-column>
         <el-table-column sortable prop="settleAccountsStatus" label="结算状态" width="130">
          <template slot-scope="scope">
            <el-tag
              size="small"
              :type="scope.row.settleAccountsStatus === 0 ? 'danger' : 'success'"
              close-transition>
              {{scope.row.settleAccountsStatus | settleAccountsStatus}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column sortable prop="result" label="单据状态" width="130">
          <template slot-scope="scope">
            <el-tag
              size="small"
              :type="scope.row.result === 1? 'success' : scope.row.result === 0? 'warning':'danger'"
              close-transition>
              {{scope.row.result | approvalStatus}}
            </el-tag>
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
        page: {
          pageNum: 1,
          pageSize: 20,
          total: 0,
          keyword: ''
        },
        searchBoxVisible: true,
        messageQuestion: "这是退换货单详情列表,在列表中可以查看该退换货单相关的商品列表,"
      }
    },
    created() {
      this.init(this.$route.query);
      this.loadTableData();
    },
   mounted() {
      this.loadTableData();
    },
    methods: {
      init(val) {
        if (val && val.id) {
          this.page.orerId = val.id;
        }
      },
      /* 加载表格数据*/
      loadTableData(val) {
        this.data = this.$util.extend(this.page, val);
        this.loading = true;
        this.$http.get('psi/return/list/detail', this.data, r => {
          this.tableData = r.data;
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
    computed: {}
  }
</script>

<style scoped>

</style>
