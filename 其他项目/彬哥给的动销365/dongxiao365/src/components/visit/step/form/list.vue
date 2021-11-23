<template>
  <div>
    <!--头部导航-->
    <breadcrumb/>
    <!--头部按钮-->
    <div class="tool-box">
      <el-row>
        <!--批量操作隐藏按钮-->
        <el-col :span="12">
          <div style="display:flex;">
            <el-button v-auth="'visit.step.form.add'" type="success" icon="el-icon-plus" @click="handleAdd">新增任务</el-button>
            <template v-if="optBoxVisible">
              <el-button v-auth="'visit.step.form.batch.delete'" type="danger" icon="el-icon-delete" @click="handleDeleteList()">批量删除</el-button>&nbsp;
              <el-button v-auth="'visit.step.form.batch.publish'" type="primary" icon="el-icon-view" @click="handlePublishBatch()">批量发布</el-button>&nbsp;
              <el-button v-auth="'visit.step.form.batch.unpublish'" type="warning" icon="el-icon-warning" @click="handleCancelPublishBatch()">批量取消发布</el-button>&nbsp;
            </template>&nbsp;
          </div>
        </el-col>
        <!--关键字搜索-->
        <el-col :span="12" class="text-right">
          <el-form :inline="true" class="form-compact" @submit.native.prevent>
            <el-form-item>
              <el-search v-model="searchCondition.keyword" @click="handleSearch" @keyup.enter.native="handleSearch" placeholder="请输入任务名称"></el-search>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <!--表格table-->
    <div>
      <el-table
        border
        stripe

        v-loading="loading"
        @row-dblclick="handleShowDetails"
        @sort-change="handleSort"
        @selection-change="handleSelectionChange"
        :data="tableData"
        ref="multipleTable">
        <el-table-column type="selection"></el-table-column>
        <el-table-column sortable prop="name" label="任务名称">
          <template slot-scope="scope">
            <el-button type="text" @click="handleClickNameShowDetails(scope.row)">
              {{scope.row.name}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column sortable prop="publish" label="发布状态">
          <template slot-scope="scope">
            <el-tag type="success" size="small" v-if="scope.row.publish">已发布</el-tag>
            <el-tag type="warning" size="small" v-else>未发布</el-tag>
          </template>
        </el-table-column>
        <el-table-column sortable prop="createTime" label="创建时间">
          <template slot-scope="scope">
            {{scope.row.createTime|date}}
          </template>
        </el-table-column>
        <el-table-column sortable prop="remark" label="备注"></el-table-column>
        <el-table-column
          fixed="right"
          label="操作" width="300">
          <template slot-scope="scope">
            <el-button v-auth="'visit.step.form.edit'" type="button" size="small" class="text-primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button style="margin-left: 14%;" v-auth="'visit.step.form.delete'" type="button" size="small" class="text-danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button style="margin-left: 14%;" v-auth="'visit.step.form.publish'" type="button" size="small" class="text-success" @click="handlePublish(scope.row)" v-show="!scope.row.publish">发布</el-button>
            <el-button style="margin-left: 14%;" v-auth="'visit.step.form.unpublish'" type="button" size="small" class="text-warning" @click="handleCancelPublish(scope.row)" v-show="scope.row.publish">取消发布</el-button>
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
    <!--任务设计器-->
    <el-dialog
      :title="dialog.formDesign.title"
      :visible.sync="dialog.formDesign.visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :fullscreen="true">
      <ComFormDesign :defaultValue="dialog.formDesign.defaultValue" @onSubmit="handleFormDesignOK" @onClose="dialog.formDesign.visible=false"/>
    </el-dialog>
    <!--任务预览-->
    <el-dialog
      width="800px"
      :title="dialog.details.title"
      :visible.sync="dialog.details.visible">
      <div style="height:500px;">
        <ComFormPreview :id="dialog.details.id"/>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import ComFormDesign from './design'
  import ComFormPreview from './info'

  export default {
    components: {
      ComFormDesign, ComFormPreview
    },
    data() {
      return {
        loading: true,
        tableData: [], // 客户列表数据源
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
        dialog: {
          formDesign: {
            title: '设计任务',
            visible: false,
            action: 'add',
            defaultValue: null
          },
          details: {
            title: '预览',
            form: null,
            visible: false
          }
        }
      }
    },
    created() {
      this.loadData();
    },
    mounted() {
    },
    methods: {
      loadData(params) {
        this.loading = true;
        const data = this.$util.extend(this.page, params);
        this.$http.get("/crm/visit/form/list", data, r => {
          this.page.total = r.data.total;
          this.tableData = r.data.list;
          this.loading = false;
        }, e => {
          this.$message.error(e.msg);
          console.error(e)
        })
      },
      // 检索
      handleSearch() {
        this.loadData(this.searchCondition);
      },
      // 筛选
      handleFilter(val) {
        this.loadData(val);
      },
      // 排序
      handleSort(sort) {
        this.$util.build_sort(this.page, sort);
        this.loadData();
      },
      // 筛选发布状态
      filterTag(value, row) {
        return row.publish === value;
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
      // 表格行选中事件
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
      // 预览
      handleShowDetails(row) {
        this.dialog.details.id = row.id;
        this.dialog.details.title = '[预览]' + row.name;
        this.dialog.details.visible = true;
      },
      // 点击任务名称预览
      handleClickNameShowDetails(row) {
        this.dialog.details.id = row.id;
        this.dialog.details.title = '[预览]' + row.name;
        this.dialog.details.visible = true;
      },
      handleAdd() {
        this.dialog.formDesign.visible = true;
        this.dialog.formDesign.action = 'add';
        this.dialog.formDesign.defaultValue = {
          components: []
        };
      },
      // 任务编辑
      handleEdit(index, row) {
        this.dialog.formDesign.visible = true;
        this.dialog.formDesign.action = 'edit';
        this.$http.get("/crm/visit/form/info", {id: row.id}, res => {

          this.dialog.formDesign.defaultValue = res.data;
          // this.dialog.formDesign.defaultComponents = JSON.parse(res.data.stepDetail.formDetail);
        });
      },
      handleFormDesignOK(val) {
        if (this.dialog.formDesign.action === 'add') {
          this.$http.post("/crm/visit/form/add", val, res => {
            this.$message({
              message: '新增成功!',
              type: 'success'
            });
            this.dialog.formDesign.visible = false;
            this.loadData();
          });
        } else {

          this.$http.post("/crm/visit/form/edit", val, res => {
            this.$message({
              message: '新增成功!',
              type: 'success'
            });
            this.dialog.formDesign.visible = false;
            this.loadData();
          });
        }
      },
      // 任务删除
      handleDelete(index, row) {
        this.$confirm('此操作将删除该文件, 是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        this.$http.post("/crm/visit/form/delete", {id: row.id}, r => {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.loadData();
        }, e => {
          console.error(e)
        });
      });
      },
      // 任务发布事件
      handlePublish(row) {
        this.$http.post("/crm/visit/form/publish", {id: row.id}, r => {
          this.$message({
            message: '发布成功',
            type: 'success'
          });
          row.publish = true;
        }, e => {
          console.error(e)
        })
      },
      // 任务取消发布
      handleCancelPublish(row) {
        this.$http.post("/crm/visit/form/turn", {id: row.id}, r => {
          this.$message({
            message: '取消发布成功',
            type: 'success'
          });
          row.publish = false;
        }, e => {
          console.error(e)
        })
      },
      // 任务批量删除
      handleDeleteList() {
        this.$http.post('/crm/visit/form/delete', {ids: this.ids}, r => {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.loadData();
        }, e => {
        });
      },
      // 任务批量发布
      handlePublishBatch() {
        this.$http.post('/crm/visit/form/publish', {ids: this.ids}, r => {
          this.$message({
            message: '发布成功',
            type: 'success'
          });
          this.loadData();
        }, e => {
        });
      },
      // 任务批量取消发布
      handleCancelPublishBatch() {
        this.$http.post('/crm/visit/form/turn', {ids: this.ids}, r => {
          this.$message({
            message: '取消发布成功',
            type: 'success'
          });
          this.loadData();
        }, e => {
        });
      }
    }
  }
</script>
