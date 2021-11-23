<template>
  <div>
    <breadcrumb/>
    <!--头部-->
    <search-bar type="sales_report_detail" @onSearch="handleFilter"/>
    <!--表格-->
    <div>
      <el-table
        :data="tableData"
        v-loading="loading"
        class="table-compact"
        ref="multipleTable"
        stripe
        border
        style="width: 100%">
        <el-table-column sortable prop="salesCode" label="销售单号"></el-table-column>
        <el-table-column sortable prop="updateTime" label="销售日期">
          <template slot-scope="scope">
            {{scope.row.updateTime|date}}
          </template>
        </el-table-column>
        <el-table-column sortable prop="salesmanName" label="上报人"></el-table-column>
        <el-table-column sortable prop="customerName" label="客户名称"></el-table-column>
        <el-table-column sortable prop="itemName" label="商品名称"></el-table-column>
        <el-table-column sortable prop="specification" label="规格属性"></el-table-column>
        <el-table-column sortable prop="salesPrice" label="销售单价" align="right">
          <template slot-scope="scope">
            {{scope.row.salesPrice|price}}元
          </template>
        </el-table-column>
        <el-table-column sortable prop="itemCount" label="销售数量" align="right">
          <template slot-scope="scope">
            {{scope.row.itemCount}}{{scope.row.itemUnitName}}
          </template>
        </el-table-column>
        <el-table-column sortable prop="totalAmount" label="销售金额" align="right">
          <template slot-scope="scope">
            {{scope.row.totalAmount|price}}元
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
  import SearchBar from '../search-bars'

  export default {
    components: {
      SearchBar
    },
    data() {
      return {
        tableData: [],
        page: {
          pageNum: 1,
          pageSize: 10,
          total: 0,
          keyword: '',
          orderId: ''
        },
        searchBoxVisible: true,
        messageQuestion: "这是销量订单上报明细,在这里你可以查看订单中商品的销量情况",
        loading: false
      }
    },
    created() {
      // this.init(this.$route.query);
      this.loadTableData();
    },
    mounted() {
    },
    methods: {
      // 加载表格数据
      loadTableData() {
        this.loading = true;
        this.$http.get('psi/sales/detail/list/all', this.page, r => {
          this.tableData = r.data.list;
          this.page.total = r.data.total;
          this.loading = false;
        });
      },
      // 分页
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
      }
    }
  }
</script>

<style scoped>

</style>
