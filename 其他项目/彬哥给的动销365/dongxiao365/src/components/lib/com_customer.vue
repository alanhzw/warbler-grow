<template>
<div>
  <div style="margin-top: -30px;height:360px;overflow:auto;">
    <el-tabs v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane :label="tab.title" :key="tab.name" :name="tab.name" v-for="tab in tabs">
      </el-tab-pane>
    </el-tabs>
    <div class="text-right">

      <el-form :inline="true" class="form-compact" @submit.native.prevent>
        <el-form-item>
          <el-search v-model="page.keyword"
                     @click="loadData"
                     @keyup.enter.native="loadData"
                     placeholder="请输入客户名称"></el-search>
        </el-form-item>
      </el-form>
    </div>
    <br/>
    <el-table
      border
      stripe
      class="table-compact"
      ref="singleTable"
      @selection-change="handleSelectionChange"
      :row-key="handleRowKey"
      @cell-dblclick="handleShowDetails"
      v-loading="loading"
      :data="dataTable">
      <el-table-column type="selection" :reserve-selection="true"></el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column sortable prop="name" label="客户名称"></el-table-column>
      <el-table-column sortable prop="addressDetail" label="地址">
        <template slot-scope="scope">
          {{scope.row.address}} {{scope.row.addressDetail}}
        </template>
      </el-table-column>
      <!--<el-table-column sortable prop="saleAreaName" label="所属销售区域"></el-table-column>-->
    </el-table>
    <el-pagination
      background
      @current-change="handlePaginationChange"
      :page-sizes="[15,20,50,100, 200, 300, 400]"
      :current-page="page.pageNum"
      :page-size="page.pageSize"
      layout="total, prev, pager, next"
      :total="page.total">
    </el-pagination>
  </div>
  <div class="dialog-footer">
      <br>
      <el-row>
        <el-col :span="12">
          已选择 {{values.length}} 项
        </el-col>
        <el-col :span="12" class="text-right">
          <el-button type="primary" @click="handleOK">确 定</el-button>
        </el-col>
      </el-row>
  </div>
</div>
</template>

<script>

  export default {
    props: ['multiple'],
    components: {},
    data() {
      return {
        activeName: 'mine',
        popoverVisible: false,
        customer: null,
        values: [],
        loading: false,
        dataTable: [],
        page: {
          pageNum: 1,
          pageSize: 15,
          sortName: '',
          sortOrder: '',
          total: 0
        },
        tabs: [
          {
            title: '我负责的',
            name: 'mine'
          },
          {
            title: '我下属的',
            name: 'sub'
          }
        ]
      }
    },
    created() {
    },
    mounted() {
      this.loadData(this.tabs[0]);
    },
    methods: {
      loadData() {
        this.loading = true;
        const that = this;
        this.$http.get('/crm/customer/list/' + this.activeName, this.page,
          r => {
            this.dataTable = r.data.list;
            this.page.total = r.data.total;
            this.loading = false;
          }, e => {
            this.dataTable = [];
            this.loading = false;
            this.$message.error(e.msg);
          });
      },
      reset() {
        this.values = [];
        this.page = {
          pageNum: 1,
          pageSize: 15,
          sortName: '',
          sortOrder: '',
          total: 0
        };
        this.$refs.singleTable.clearSelection(this.values);
        this.loadData();
      },
      handleRowKey(row) {
        return row.id;
      },
      handleTabClick() {
        this.reset();
      },
      handleShowDetails(item) {
        this.customer = item;
        this.popoverVisible = true;
      },
      handleSelectionChange(rows) {
        this.values = rows;
      },
      handlePaginationChange(pageNum) {
        this.page.pageNum = pageNum;
        this.loadData();
      },
      handleOK() {
        const ids = [];
        this.values.forEach(item => {
          ids.push(item.id);
        });
        this.$emit('onOk', this.values, ids);
      }
    },
    watch: {}
  }
</script>

<style scoped>

</style>
