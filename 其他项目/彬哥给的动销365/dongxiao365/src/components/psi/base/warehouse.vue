<template>
  <div>
    <breadcrumb/>
    <!--头部-->
    <div>
      <el-row>
        <el-col :span="6">
          <div style="display:flex;">
            <!--多选隐藏按钮-->
            <el-button type="success" icon="el-icon-circle-plus-outline" @click="addOne">新增仓库</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="multipleDelete" v-show="optBoxVisible">批量删除</el-button>&nbsp;
          </div>
        </el-col>
        <el-col :span="18">
          <div class="text-right">
            <el-form :inline="true" class="form-compact" @submit.native.prevent>
              <el-form-item>
                <el-search v-model="page.keyword" @click="loadTableData" @keyup.enter.native="loadTableData" placeholder="请输入仓库名称"></el-search>
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
        <el-table-column sortable prop="code" label="仓库编号" width="110"></el-table-column>
        <el-table-column sortable prop="name" label="仓库名称"></el-table-column>
        <el-table-column sortable prop="orderId" label="显示顺序"></el-table-column>
        <el-table-column sortable prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status === 1 ? 'success' : 'danger'"
              size="small"
              close-transition>
              {{scope.row.status | status}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="300">
          <template slot-scope="scope">
            <el-button type="button" size="small" class="text-primary" @click="editOne(scope.row)">修改</el-button>
            <el-button type="button" size="small" class="text-danger" @click="deleteOne(scope.row, scope.$index)">删除</el-button>
            <el-button type="button" size="small" class="text-success" @click="openOne(scope.row)" v-show="scope.row.status === 0">启用</el-button>
            <el-button type="button" size="small" class="text-info" @click="closeOne(scope.row)" v-show="scope.row.status === 1">禁用</el-button>
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
    <!--弹窗-->
    <div>
      <!--新增弹窗-->
      <el-dialog style="height:480px;" :title="dialog.title" :visible.sync="dialog.visible" width="500px">
        <el-form
          ref="form"
          :rules="rules"
          :model="warehouse"
          label-width="110px">
          <el-form-item label="仓库编号：" prop="code">
            <el-input v-model="warehouse.code" placeholder="仓库编号" clearable :maxlength="15" class="input-larger"></el-input>
          </el-form-item>
          <el-form-item label="仓库名称：" prop="name">
            <el-input v-model="warehouse.name" placeholder="仓库名称" clearable :maxlength="15" class="input-larger" @keydown.native.enter="handSubmit"></el-input>
          </el-form-item>
          <el-form-item label="显示顺序：" prop="orderId">
            <el-number v-model.number="warehouse.orderId" placeholder="显示顺序" clearable :maxlength="4" class="input-larger"></el-number>
          </el-form-item>
          <el-form-item>
            <div class="text-right">
              <el-button @click="dialog.visible = false">取消</el-button>
              <el-button type="primary" @click="handSubmit">保存</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        // 基础参数
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
        // 弹窗参数-----仓库
        dialog: {
          title: '新建仓库',
          visible: false
        },
        // 品牌参数
        warehouse: {},
        rules: {
          code: [
            {required: true, message: '请输入仓库编号', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入仓库名称', trigger: 'blur'}
          ],
          orderId: [
            {required: true, message: '请输入仓库序号', trigger: 'blur'},
            {type: 'number', message: '序号必须为数字值'}
          ]
        }
      }
    },
    created() {
      this.loadTableData();
    },
    methods: {
      /* 加载表格数据*/
      loadTableData(val) {
        this.data = this.$util.extend(this.page, val);
        this.$http.get('/psi/warehouse/list', this.data, r => {
          this.tableData = r.data.list;
          this.page.total = r.data.total;
          this.loading = false;
        });
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.optBoxVisible = !!val.length;
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
      // 新增或修改提交
      handSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$http.post('/psi/warehouse/' + (this.warehouse.id >= 0 ? 'edit' : 'add'), this.warehouse, r => {
              this.loadTableData();
              this.$message({
                type: "success",
                message: "保存成功"
              });
              this.dialog.visible = false;
              this.$refs.form.resetFields();
            })
          }
        })
      },
      // 编辑仓库
      editOne(val) {
        this.warehouse.id = val.id;
        this.warehouse.name = val.name;
        this.warehouse.orderId = val.orderId;
        this.warehouse.code = val.code;
        this.dialog.title = '编辑仓库';
        this.dialog.visible = true;
      },
      // 新增仓库
      addOne() {
        this.dialog.title = '新建仓库';
        this.dialog.visible = true;
        this.warehouse = {};
      },
      // 删除
      deleteOne(row, $index) {
        this.$confirm('确定要删除仓库【' + row.name + '】吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/psi/warehouse/delete', {id: row.id}, r => {
            this.$message({
              type: "success",
              message: "删除成功"
            });
            this.tableData.splice($index, 1);
            this.page.total--;
          })
        });
      },
      // 批量删除
      multipleDelete() {
        this.$confirm('确定要删除选中的仓库吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const ids = [];
          if (this.multipleSelection !== null) {
            this.multipleSelection.forEach(value => {
              ids.push(value.id)
            })
          }
          this.$http.post('/psi/warehouse/delete', {ids: ids}, r => {
            this.$message({
              type: "success",
              message: "批量删除成功"
            });
            this.loadTableData();
          })
        });
      },
      // 启用
      openOne(val) {
        this.$http.post('/psi/warehouse/start', {id: val.id}, r => {


          this.$message({
            type: "success",
            message: "启用成功"
          });

          this.loadTableData();
        })
      },
      // 禁用
      closeOne(val) {
        this.$http.post('/psi/warehouse/forbidden', {id: val.id}, r => {


          this.$message({
            type: "success",
            message: "禁用成功"
          });

          this.loadTableData();
        })
      }
    },
    filters: {
      status: function (val) {
        if (val === 0) {
          return '已禁用';
        }
        if (val === 1) {
          return '已启用';
        }
        if (val === -1) {
          return '已删除';
        }
      }
    }
  }
</script>

<style scoped>

</style>
