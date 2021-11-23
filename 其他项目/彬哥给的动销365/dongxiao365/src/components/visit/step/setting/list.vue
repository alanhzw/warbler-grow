<template>
  <div>
    <!--头部导航-->
    <breadcrumb/>
      <el-dialog
        width="800px"
        :lock-scroll='true'
        :title="dialog.title"
        :visible.sync="showDialog">
        <dialog-info :infoId="infoId"  @closeDia="closeDia"/>
      </el-dialog>
    <!--流程列表-->
    <!-- 头部按钮 -->
    <div class="tool-box">
      <el-row>
        <!--批量操作隐藏按钮-->
        <el-col :span="12">
          <div style="display:flex;">
            <el-button v-auth="'visit.step.setting.add'" type="success" icon="el-icon-plus" @click="addStep">新增步骤</el-button>
            <template v-if="optBoxVisible">
              <el-button v-auth="'visit.step.setting.batch.delete'" type="danger" icon="el-icon-delete" @click="handleDeleteList()">批量删除</el-button>&nbsp;
            </template>&nbsp;
          </div>
        </el-col>
        <!--关键字搜索-->
        <el-col :span="12" class="text-right">
          <el-form :inline="true" class="form-compact" @submit.native.prevent>
            <el-form-item>
              <el-search v-model="searchCondition.keyword" @click="handleSearch" @keyup.enter.native="handleSearch" placeholder="请输入步骤名称"></el-search>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <!-- 表格table-->
    <div>
      <el-table
        border
        stripe
        v-loading="loading"
        @sort-change="handleSort"
        @selection-change="handleSelectionChange"
        :data="tableData"
        ref="multipleTable"
        style="width: 100%">
        <el-table-column type="selection"></el-table-column>
        <el-table-column sortable prop="name" label="步骤名称">
          <template slot-scope="scope">
            <el-button type="text" sizie="mini" @click="info(scope.row)">{{scope.row.name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column sortable prop="isNotLimitCustomer" label="客户范围">
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.isNotLimitCustomer===true">无限制</el-tag>
            <el-tag type="success" v-if="scope.row.isNotLimitCustomer===false">有限制</el-tag>
          </template>
        </el-table-column>
        <el-table-column sortable prop="useScope" label="使用人员">
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.useScope===0">无限制</el-tag>
            <el-tag type="success" v-if="scope.row.useScope===1">有限制</el-tag>
            <el-tag type="success" v-if="scope.row.useScope===2">有限制</el-tag>
          </template>
        </el-table-column>
        <el-table-column sortable prop="validityEnd" label="流程有效期">
          <template slot-scope="scope">
            <span v-if="scope.row.validityEnd">
            {{scope.row.validityEnd|date}}
            </span>
            <span v-else>
              无限制
            </span>
          </template>
        </el-table-column>
        <el-table-column sortable prop="lastEditorName" label="修改人"></el-table-column>
        <el-table-column sortable prop="lastUpdateTime" label="最后修改时间">
          <template slot-scope="scope">
            {{scope.row.lastUpdateTime|date}}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作" width="180">
          <template slot-scope="scope">
            <el-button v-auth="'visit.step.setting.edit'" type="button" size="small" class="text-primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button style="margin-left: 42px;" v-auth="'visit.step.setting.delete'" type="button" size="small" class="text-danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
  </div>
</template>

<script>
  import ComSearch from './inc/search'
  import ComInfo from './inc/info'
  import DialogInfo from './info'


  export default {
    components: {
      ComSearch, ComInfo, DialogInfo
    },
    data() {
      return {
        // 弹窗
        showDialog: false,

        showName: 'stepList',
        /* --------------------步骤列表------------------*/
        loading: true,
        tableData: [], // 列表数据源
        ids: [], // 选中行的id集合
        optBoxVisible: false,
        searchBoxVisible: true,
        searchCondition: {
          keyword: ''
        },
        page: {
          pageNum: 1,
          pageSize: 20,
          sortName: '',
          sortOrder: '',
          total: 0
        },
        // 弹窗
        dialog: {
          tilte: ''
        },
        infoId: ''// 目标id,详情
      }
    },
    created() {
      this.loadData();
    },
    mounted() {
    },
    methods: {
      /* ---------------------步骤列表--------------------------*/
      // 加载步骤列表
      loadData(params) {
        this.loading = true;
        const data = this.$util.extend(this.page, params);
        this.$http.get("/crm/visit/flow/list", data, r => {
          this.page.total = r.data.total;
          this.tableData = r.data.list;
          this.loading = false;
        }, e => {
          this.$message.error(e.msg);
          console.error(e);
        })
      },
      closeDia() {
        this.showDialog = false
      },
      // 检索
      handleSearch() {
        this.loadData(this.searchCondition);
      },
      // 筛选
      handleFilter(val) {
        this.loadData(val);
      },
      handleClearFilter() {
        // this.condition = {};
        this.loadData();
      },
      // 列表排序
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
      // 表格多选事件
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
      // 编辑
      handleEdit(index, row) {
        this.$router.push({path: 'setting/edit', query: {id: row.id}});
      },
      // 删除
      handleDelete(index, row) {
        this.$confirm('此操作将删除该文件, 是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post("/crm/visit/flow/delete", {id: row.id}, r => {

            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }, e => {
            console.error(e)
          })
          this.loadData();
        });
      },
      // 批量删除
      handleDeleteList() {
        this.$confirm('此操作将删除该文件, 是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/crm/visit/flow/delete', {ids: this.ids}, r => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }, e => {

          });

          setTimeout(() => {
            this.loadData();
          }, 500);

        });
      },
      // 跳转到新增步骤页面
      addStep() {
        this.$router.push({path: 'setting/add'})
      },
      // 步骤详情弹窗
      info(row) {
        this.infoId = row.id;
        this.showDialog = true
        this.dialog.title = row.name;
      }
    },
    watch: {},
    filters: {}
  }
</script>

<style scoped>

</style>
