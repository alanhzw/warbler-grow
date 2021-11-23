<template>
  <div>
    <breadcrumb/>
    <!--头部-->
    <search-bar type="sales_report" @onSearch="handleFilter"/>
    <!--表格-->
    <div>
      <el-table
        :data="tableData"
        v-loading="loading"
        class="table-compact"
        ref="multipleTable"
        stripe
        border
        @row-dblclick="handleShowDetail"
        style="width: 100%">
        <el-table-column sortable prop="code" label="销售单号" width="180">
          <template slot-scope="scope">
            <a href="javascript:;" @click="handleShowDetail(scope.row)">{{scope.row.code}}</a>
          </template>
        </el-table-column>

        <el-table-column sortable prop="customerName" label="客户名称" width="250"></el-table-column>
        <el-table-column sortable prop="salesmanName" label="上报人" width="150"></el-table-column>
        <el-table-column sortable prop="updateTime" label="销售日期" width="150">
          <template slot-scope="scope">
            {{scope.row.updateTime|date}}
          </template>
        </el-table-column>
        <el-table-column sortable prop="updateTime" label="上报日期" width="150">
          <template slot-scope="scope">
            {{scope.row.updateTime|date}}
          </template>
        </el-table-column>
        <el-table-column sortable prop="typeCount" label="品种数" align="right" width="100">
        </el-table-column>
        <el-table-column sortable prop="amount" label="销售金额" align="right" width="100">
          <template slot-scope="scope">
            {{scope.row.amount|price}}
          </template>
        </el-table-column>
        <!--<el-table-column sortable prop="position" label="位置"></el-table-column>-->


        <el-table-column sortable prop="status" label="状态" align="center" width="100">
          <template slot-scope="scope">
            <el-tag type="info" size="small" v-if="scope.row.status===0">未确认</el-tag>
            <el-tag type="success" size="small" v-if="scope.row.status===1">已确认</el-tag>
            <el-tag type="warning" size="small" v-if="scope.row.status===2">已驳回</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="90">
          <template slot-scope="scope">
            <el-button size="small" v-auth="'data.sales.report.record.delete'" type="button" @click="deleteOne(scope.row.id)" class="text-danger">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column sortable prop="remark" label="备注">
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
    <view-dialog :sales-id="saleId" v-model="order.status" :visible.sync="dialogTableVisible"></view-dialog>
  </div>
</template>

<script>
  import SearchBar from '../search-bar'
  import ViewDialog from './view'

  export default {
    components: {
      SearchBar, ViewDialog
    },
    data() {
      return {
        activeName: "first",
        tableData: [],
        page: {
          pageNum: 1,
          pageSize: 10
        },
        order: {},
        saleId: 0,
        dialogTableVisible: false,
        searchBoxVisible: true,
        multipleSelection: [], // 批量删除数据集合
        deleteBoxVisible: false, // 批量删除隐藏按钮
        loading: false
      }
    },
    mounted() {
      this.loadTableData();
    },
    methods: {
      // 加载表格数据
      loadTableData() {
        this.loading = true;
        this.$http.get('psi/sales/list/all', this.page, r => {
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
        this.loadTableData();
      },
      // 多选事件
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.deleteBoxVisible = this.multipleSelection.length > 0;
      },
      // 批量删除
      deleteBatch() {
        this.$confirm('确定要删除吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$http.post('/psi/sales/delete', {ids: this.multipleSelection.convert('id')}, r => {
            this.loadTableData();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
        });
      },
      // 单个删除
      deleteOne(id) {
        this.$confirm('确定要删除吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$http.post('/psi/sales/delete', {id: id}, r => {
            this.loadTableData();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
        });
      },
      handleShowDetail(row) {
        this.saleId = row.id;
        this.order = row;
        this.dialogTableVisible = true;
      }
    }
  }
</script>

<style>

</style>
