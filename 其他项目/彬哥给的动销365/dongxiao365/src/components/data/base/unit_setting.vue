<template>
  <div>
    <breadcrumb/>
    <!--头部-->
    <div>
      <el-row>
        <el-col :span="12">
          <div style="display:flex;">
            <el-button type="success" icon="el-icon-circle-plus-outline" @click="handleAdd">新增单位</el-button>
            <!--多选隐藏按钮-->
            <el-button type="danger" icon="el-icon-delete" @click="multipleDelete" v-show="optBoxVisible">批量删除</el-button>&nbsp;
          </div>
        </el-col>
        <el-col :span="12">
          <div class="text-right">
            <el-form :inline="true" class="form-compact" @submit.native.prevent>
              <el-form-item>
                <el-search v-model="page.keyword" @click="loadTableData" @keyup.enter.native="loadTableData" placeholder="请输入单位名称"></el-search>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
    <br/>
    <div>
      <!--表格-->
      <el-table
        :data="tableData"
        class="table-compact"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
        stripe
        border
        style="width: 100%">
        <el-table-column type="selection"></el-table-column>
        <el-table-column sortable prop="name" label="单位名称"></el-table-column>
        <el-table-column sortable prop="orderId" label="排序号"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="button" size="small" class="text-primary" @click="editOne(scope.row,scope.$index)">修改</el-button>
            <el-button type="button" size="small" class="text-danger" @click="deleteOne(scope.row,scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @current-change="handlePaginationChange"
        @size-change="handleSizeChange"
        :current-page="page.pageNum"
        :page-size="page.pageSize"
        :page-sizes="[20,50, 100, 200, 300]"
        layout="total, sizes,prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </div>
    <!--弹窗-->
    <el-dialog style="height:400px;" :title="dialog.title" :visible.sync="dialog.visible" width="500px">
      <el-form ref="ruleForm" :model="dialog.form" label-width="120px" :rules="rules">
        <el-form-item label="单位名称：" prop="name">
          <el-input v-model="dialog.form.name" placeholder="单位名称" clearable :maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="排序号：" prop="orderId">
          <el-number v-model.number="dialog.form.orderId" placeholder="排序号" clearable :maxlength="4"></el-number>
        </el-form-item>
        <el-form-item>
          <div class="text-right">
            <el-button @click="dialog.visible = false">取消</el-button>
            <el-button type="primary" @click="onSubmit('ruleForm')">保存</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        /* 基础参数*/
        tableData: [], // 表格数据源
        page: {
          pageNum: 1,
          pageSize: 20,
          sortName: '',
          sortOrder: '',
          total: 0,
          keyword: ''
        },
        optBoxVisible: false, // 多选操作隐藏按钮
        multipleSelection: [], // 批量数据
        dialog: {
          title: '新增单位',
          form: {},
          visible: false
        },
        rules: {
          name: [
            {required: true, message: '请输入单位名称', trigger: 'change'},
            {max: 20, message: '长度在1-20个字符间', trigger: 'change'}
          ],
          orderId: [
            {required: true, message: '请输入单位排序', trigger: 'change'}
          ]
        }
      }
    },
    mounted() {
      this.loadTableData();
    },
    methods: {
      /* 加载表格数据*/
      loadTableData() {
        this.data = this.$util.extend(this.page);
        this.loading = true;
        this.$http.get('/psi/item/unit/list', this.data, r => {
          this.tableData = r.data.list;
          this.page.total = r.data.total;
          this.loading = false;
        });
      },
      /* 表格多选*/
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
        this.optBoxVisible = val.length > 0;
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
      /* 新增保存*/
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            return false;
          } else {
            let url = '/psi/item/unit/add';
            if (this.dialog.editIndex > -1) {
              url = '/psi/item/unit/edit';
            }
            this.$http.post(url, this.dialog.form, r => {
              this.$message({
                message: r.msg,
                type: 'success'
              });
              if (this.dialog.editIndex > -1) {
                this.tableData[this.dialog.editIndex].name = this.dialog.form.name;
                this.tableData[this.dialog.editIndex].orderId = this.dialog.form.orderId;
              } else {
                this.dialog.form.id = r.data;
                this.tableData.unshift({
                  id: r.data,
                  name: this.dialog.form.name,
                  orderId: this.dialog.form.orderId
                });
                this.page.total++;
              }
              this.$refs[formName].resetFields();
              this.dialog.visible = false;
            });
          }
        });
      },
      handleAdd() {
        this.dialog.title = '新增单位';
        this.dialog.form = {};
        this.dialog.editIndex = -1;
        this.dialog.visible = true;
      },
      // 修改
      editOne(row, index) {
        this.dialog.title = '编辑单位';
        this.dialog.editIndex = index;
        this.dialog.form = {
          id: row.id,
          name: row.name,
          orderId: row.orderId
        };
        this.dialog.visible = true;
      },
      // 删除
      deleteOne(val, index) {
        this.$confirm('确定要删除该单位么?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/psi/item/unit/delete', {id: val.id}, r => {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.tableData.splice(index, 1);
            this.page.total--;
          })
        });
      },
      // 批量删除
      multipleDelete() {
        this.$confirm('确定要删除选中的单位么?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const ids = [];
          this.multipleSelection.forEach(value => {
            ids.push(value.id)
          });
          this.$http.post('/psi/item/unit/batchDelete', {ids: ids}, r => {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.loadTableData();
          })
        });
      }
    }
  }
</script>

