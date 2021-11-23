<template>
  <div class="page-content">
    <breadcrumb/>
    <!--头部按钮-->
    <div class="tool-box">
      <el-row>
        <el-col :span="12">
          <template v-if="optBoxVisible">
            <div style="display:flex;">
              <el-button v-auth="'customer.management.deleted.batch.restore'" type="success" icon="fa fa-recycle" @click="handleRecoverList">批量恢复</el-button>&nbsp;
              <el-button v-auth="'customer.management.deleted.batch.delete.completely'" type="danger" icon="fa fa-ban" @click="handleThoroughDeleteList">彻底删除</el-button>
            </div>
          </template>&nbsp;
        </el-col>
        <el-col :span="12" class="text-right">
          <el-form :inline="true" class="form-compact" @submit.native.prevent>
            <el-form-item>
              <el-search v-model="page.keyword" @click="loadData" @keyup.enter.native="loadData" placeholder="请输入客户名称"></el-search>
            </el-form-item>
            <el-form-item>
              <el-button type="info" icon="fa fa-filter" @click="searchBoxVisible = !searchBoxVisible">筛选</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <!--检索条件-->
    <div class="tool-box" v-show="searchBoxVisible">
      <div class="search-panel border">
        <ComSearch @onSearch="handleFilter" @onClear="handleClearFilter"/>
      </div>
    </div>
    <!--表格table-->
    <div>
      <el-table
        border
        stripe
        v-loading="loading"
        @sort-change="handleSort"
        @selection-change="handleSelectionChange"
        @cell-dblclick="handleShowDetails"
        :data="tableData"
        ref="multipleTable"
        style="width: 100%">
        <el-table-column type="selection" width="30" align="center"></el-table-column>
        <el-table-column sortable prop="name" label="客户名称" min-width="120">
          <template slot-scope="scope">
            <a class="link" @click="handleShowDetails(scope.row)">{{scope.row.name}}</a>
          </template>
        </el-table-column>
         <el-table-column sortable prop="code" label="客户编码" width="110px"></el-table-column>

        <el-table-column sortable prop="telephone" label="客户电话" width="110px"></el-table-column>
        <el-table-column sortable prop="createTime" label="创建时间" width="110px">
          <template slot-scope="scope">
            {{scope.row.createTime| date}}
          </template>
        </el-table-column>
        <el-table-column sortable prop="saleAreaName" label="所属销售区域"></el-table-column>
         <el-table-column sortable prop="addressDetail" label="客户地址" min-width="120">
          <template slot-scope="scope">
            <i v-if="scope.row.location" class="fa fa-map-marker"></i>
            {{scope.row.address}} {{scope.row.addressDetail}}
            <!-- {{scope.row.addressDetail}} -->
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px" header-align="center">
          <template slot-scope="scope">
            <el-button size="small" v-auth="'customer.management.deleted.restore'" type="button" class="text-success" @click="handleRecover(scope.row.id)">恢复</el-button>
            <el-button style="margin-left: 19px;" size="small" v-auth="'customer.management.deleted.delete.completely'" type="button" class="text-danger" @click="handleThoroughDelete(scope.row.id)">彻底删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @current-change="handlePaginationChange"
        @size-change="handleSizeChange"
        :page-sizes="[20,50,100, 200, 300, 400]"
        :current-page="page.pageNum"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </div>
    <!--客户详情弹窗-->
    <ComInfo :visible.sync="dialog.details.visible" :customerId="dialog.details.customer.id"/>
  </div>
</template>

<script>
  import ComSearch from '../inc/search'
  import ComInfo from '../../lib/customer-info'

  export default {
    components: {
      ComSearch, ComInfo
    },
    data() {
      return {
        loading: false,
        tableData: [],
        optBoxVisible: false,
        page: {
          pageNum: 1,
          pageSize: 20,
          sortName: '',
          sortOrder: '',
          keyword: '',
          total: 0
        },
        dialog: {
          details: {
            customer: {},
            visible: false
          }
        },
        searchBoxVisible: true,
        ids: []
      }
    },
    created() {
      this.loadData();
    },
    methods: {
      // 加载客户列表
      loadData() {
        this.loading = true;
        this.$http.get('/crm/customer/list/del', this.page, r => {
          this.page.total = r.data.total;
          this.tableData = r.data.list;
          this.loading = false;
        }, e => {
          this.$message.error(e.msg);
          console.error(e)
        })
      },
      // 筛选
      handleFilter(val) {
        this.page = this.$util.extend(this.page, val);
        this.loadData();
      },
      handleClearFilter() {
        this.loadData();
      },
      // 客户详情展示页面
      handleShowDetails(row) {
        this.dialog.details.customer = row;
        this.dialog.details.visible = true;
      },
      // 客户列表排序
      handleSort(sort) {
        this.$util.build_sort(this.page, sort);
        this.loadData();
      },
      // 分页
      handlePaginationChange(pageNum) {
        this.page.pageNum = pageNum;
        this.loadData();
      },
      // 分页改变事件
      handleSizeChange(val) {
        this.page.pageSize = val;
        this.loadData();
      },
      handleSelectionChange(val) { // 多选表格的change事件
        this.optBoxVisible = true;// 展示多选的隐藏盒子
        this.ids = [];// 初始化id数组
        val.forEach(value => {
          this.ids.push(value.id);
        });
        if (this.ids.length === 0) {
          this.optBoxVisible = false;
        }
      },
      handleRecover(row) {
        this.doRecover([row]);
      },
      handleRecoverList() {
        this.doRecover(this.ids);
      },
      handleThoroughDelete(row) {
        this.doDelete([row]);
      },
      handleThoroughDeleteList() {
        this.doDelete(this.ids);
      },
      doDelete(list) {
        if (list && list.length > 0) {
          this.$confirm('此操作将永久删除该客户，是否继续？', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'error',
            customClass: 'msg-box-danger',
            confirmButtonClass: 'el-button--danger'
          }).then(() => {
            this.$http.post('/crm/customer/delete/thorough', {ids: list}, r => {
              this.$message({
                message: '彻底删除成功',
                type: 'success'
              });
              this.loadData();
            });
          });
        } else {
          this.$message({
            message: '请选择要彻底删除的数据',
            type: 'warning'
          });
        }
      },
      doRecover(list) {
        if (list && list.length > 0) {
          this.$confirm('确定要恢复选中的客户么?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            confirmButtonClass: 'el-button--success'
          }).then(() => {
            this.$http.post('/crm/customer/batchRecover', {ids: list}, r => {
              this.$message({
                message: '恢复成功',
                type: 'success'
              });
              this.loadData();
            });
          });
        } else {
          this.$message({
            message: '请选择要恢复的数据',
            type: 'warning'
          });
        }
      }
    }
  }
</script>

<style lang="scss">
  .msg-box-danger {
    animation-duration: 500ms;
    animation-fill-mode: both;
    animation-name: tada;
  }
</style>
