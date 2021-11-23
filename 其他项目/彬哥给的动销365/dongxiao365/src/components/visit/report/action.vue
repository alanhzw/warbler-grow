<template>
  <div>
    <!--头部导航-->
    <breadcrumb/>
    <el-tabs v-model="activeName">
      <el-tab-pane label="部门统计" name="department"></el-tab-pane>
      <el-tab-pane label="客户统计" name="customer"></el-tab-pane>
      <el-tab-pane label="员工统计" name="user"></el-tab-pane>
      <el-tab-pane label="下属统计" name="under"></el-tab-pane>
    </el-tabs>
    <!--表格table-->
    <!--检索条件-->
    <div  v-show="searchBoxVisible">
      <div class="search-panel border">
        <ComSearch @onSearch="handleFilter" @onClear="onClear"/>
        <el-button class="export" v-auth="'visit.report.action.export'" type="info" @click="exportExcel">导出到Excel</el-button>
         <!-- <el-row>
          <el-col :span="20"> -->
            <!-- <ComSearch @onSearch="handleFilter" @onClear="onClear"/> -->
          <!-- </el-col> -->
          <!-- <el-col :span="4" type="flex" justify="start">
            <div class="export">
                <el-form :inline="true">
                  <el-form-item> -->
                    <!-- <el-button class="export" v-auth="'visit.report.action.export'" type="info" @click="exportExcel">导出到Excel</el-button> -->
                  <!-- </el-form-item>
                </el-form>
            </div>
            </el-col>
        </el-row> -->
      </div>
    </div><br>
    <el-container>
      <el-aside width="200px" v-if="activeName==='user'">
        <depart-tree @node-click="handleDepartClick"></depart-tree>
      </el-aside>
      <el-main style="padding: 0;">
        <el-table
          border
          stripe
          style="width: 100%"
          v-loading="loading"
          :data="tableData"
          ref="datatable"
          class="table-compact">
          <el-table-column type="index" align="center" width="42" min-width="120"></el-table-column>
          <el-table-column sortable prop="userName" label="人员名称" v-if="showUser" min-width="100"></el-table-column>
          <el-table-column sortable prop="departmentName" label="部门" v-if="showDepart" min-width="100"></el-table-column>
          <el-table-column sortable prop="customerName" label="客户名称" v-if="showCustomerName" min-width="100"></el-table-column>
          <el-table-column sortable prop="planCount" label="计划拜访次数" align="right" min-width="120"></el-table-column>
          <el-table-column sortable prop="finishCount" label="计划完成次数" align="right" min-width="120"></el-table-column>
          <el-table-column sortable prop="finishCount" label="计划完成率" align="right" :formatter="formatPercent" min-width="110"></el-table-column>
          <el-table-column sortable prop="missCount" label="失访次数" align="right" min-width="100"></el-table-column>
          <el-table-column sortable prop="tempCount" label="临时拜访次数" align="right" min-width="150"></el-table-column>
          <el-table-column sortable prop="totalCount" label="总拜访次数" align="right" min-width="110"></el-table-column>
          <el-table-column sortable prop="customerCount" label="总拜访客户次数" align="right" v-if="showCustomerCount" min-width="130"></el-table-column>
          <el-table-column sortable prop="positionExceptionCount" align="right" label="位置异常次数" min-width="120"></el-table-column>
        </el-table>
        <el-pagination
          background
          v-if="activeName !== 'under'"
          @current-change="handlePaginationChange"
          @size-change="handleSizeChange"
          :current-page="page.pageNum"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total">
        </el-pagination>
      </el-main>
    </el-container>
    <iframe id="downFrame" width="0" height="0" :frameborder="0"></iframe>
  </div>
</template>

<script>
  import DepartTree from '../../lib/depart-tree'
  import ComSearch from './inc/search'

  export default {
    components: {DepartTree, ComSearch},
    data() {
      return {
        activeName: 'department',
        searchBoxVisible: true,
        page: {
          pageSize: 20,
          pageNum: 1
        },
        loading: false,
        tableData: []
      };
    },
    computed: {
      showUser() {
        return this.activeName === 'user' || this.activeName === 'under';
      },
      showDepart() {
        return this.activeName !== 'customer';
      },
      showCustomerName() {
        return this.activeName === 'customer';
      },
      showCustomerCount() {
        return this.activeName !== 'customer';
      }
    },
    mounted() {
      this.load();
    },
    methods: {
      // 筛选
      handleFilter(val) {
        this.page = this.$util.extend(this.page, val);
        this.load(val);
      },
      load() {
        this.loading = true;
        this.tableData = [];
        this.$refs.datatable.doLayout();
        this.$http.get('/report/visit/' + this.activeName, this.page, r => {
          if (this.activeName === 'under') {
            this.tableData = r.data;
          } else {
            this.tableData = r.data.list;
            this.page.total = r.data.total;
          }
          this.loading = false;
        })
      },
      handlePaginationChange(val) {
        this.page.pageNum = val;
        this.load();
      },
      handleSizeChange(val) {
        this.page.pageSize = val;
        this.load();
      },
      handleDepartClick(data) {

        if (data.userid) {
          this.page.userId = data.userid;
          this.page.departmentId = null;
        } else {
          this.page.userId = null;
          this.page.departmentId = data.id;
        }
        this.load();
      },
      formatPercent(row, column, cellValue) {
        const planCount = row.planCount;
        const finishCount = row.finishCount;
        if (finishCount === 0 || planCount === 0) { return 0; }
        const p = finishCount / planCount;
        return (p * 100).toFixed(1) + '%';
      },
      exportExcel() {
        const param = this.$util.extend({
          type: this.activeName
        }, this.page);

        this.$http.get('/report/visit/export', param, r => {
          document.getElementById('downFrame').src = this.$http.root + '/common/download?id=' + r.data + '&fileName=执行情况.xls';
        })
      }
    },
    watch: {
      activeName(val) {
        this.load();
      }
    },
    filters: {
      percent(val) {
        if (val) {
          const planCount = val.planCount;
          const finishCount = val.finishCount;
          if (finishCount === 0 || planCount === 0) { return 0; }
          const p = finishCount / planCount;
          return (p * 100).toFixed(1);
        }
        return 0;
      }
    }
  }
</script>

<style>
.export{
    position: absolute;
    left: 91%;
    top: 23%;
}
</style>
