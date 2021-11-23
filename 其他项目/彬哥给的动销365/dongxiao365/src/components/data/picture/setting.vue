<template>
  <div>
    <breadcrumb/>
    <!--头部-->
    <div class="tool-box">
      <el-row>
        <el-col :span="8">
          <el-button type="danger" @click="deleteBatch" icon="el-icon-delete" v-show="deleteBoxVisible">批量删除</el-button>
          &nbsp;
        </el-col>
        <el-col :span="16" class="text-right">
          <el-button type="primary" @click="addOne" icon="el-icon-circle-plus-outline">新增类型</el-button>
        </el-col>
      </el-row>
    </div>
    <!--表格-->
    <div>
      <el-table
        :data="tableData"
        key="id"
        :row-key="rowKey"
        class="table-compact"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
        stripe
        border
        v-loading="loading"
        style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="排序号" width="100px" prop="orderId" maxlength="2" align="center"></el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
        <el-table-column fixed="right" label="操作" width="170px">
          <template slot-scope="scope">
            <div style="display:flex;margin-bottom: 5px;">
              <el-button size="small" type="button" @click="editOne(scope.row)" class="text-primary">编辑</el-button>
              <el-button size="small" type="button" @click="deleteOne(scope.row.id)" class="text-danger">删除</el-button>
            </div>
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
    <!--弹窗部分-->
    <el-dialog style="height:580px;" :title="dialog.title" :visible.sync="dialog.visible" width="800px">
      <div>
        <el-form label-position="right" :rules="rules" ref="form" :model="form" label-width="110px">
          <el-form-item label="名称：" prop="name">
            <el-input v-model="form.name" :maxlength="15" class="input-small" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="排序号：" prop="orderId">
            <el-number v-model.number="form.orderId" class="input-mini" placeholder="请输入顺序号" :maxlength="4"></el-number>
          </el-form-item>
          <el-form-item label="备注：" prop="remark">
            <el-input v-model="form.remark" type="textarea" :rows="4" :maxlength="500" placeholder="请输入备注,长度在500字以内"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.visible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        page: {
          pageNum: 1,
          pageSize: 10,
          sortName: '',
          sortOrder: '',
          total: 0,
          keyword: ''
        },
        deleteBoxVisible: false, // 多选操作隐藏按钮
        messageQuestion1: "这里可以设置新增照片的类型种类",
        multipleSelection: [], // 多选元素集合
        dialog: {
          title: '新建类型',
          visible: false
        },
        form: {
          name: '',
          orderId: 0,
          remark: ''
        },
        loading: false,
        rules: {
          orderId: [
            {required: true, message: '请输入排序号', trigger: 'blur'},
            {type: 'number', message: '排序号必须为数字值'}
          ],
          name: [
            {required: true, message: '请输入类型名称', trigger: 'blur'}
          ]
        }
      }
    },
    mounted() {
      this.loadTableData();
    },
    methods: {
      handleKeydown(e) {
        const key = e.key;
        if (key === 'Backspace' || key === 'Tab' || key === 'Delete' || key === 'Enter' || key === 'ArrowLeft' || key === 'ArrowRight' || key === 'Home' || key === 'End') {
          return true;
        }
        if (isNaN(key)) {
          e.preventDefault();
          return false;
        }
      },
      // 加载表格数据
      loadTableData() {
        this.loading = true;
        this.$http.get('psi/pic/type/list', this.page, r => {
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
      // 反选用的自定义key
      rowKey(row) {
        return row.id;
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
      // 浮现框
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.deleteBoxVisible = this.multipleSelection.length > 0;
      },
      // 批量删除
      deleteBatch() {
        const ids = this.multipleSelection.convert('id');
        this.$http.post('/psi/pic/type/delete', {ids: ids}, r => {
          this.loadTableData();
        })
      },
      // 新建或修改拍照类型确认提交事件
      handleSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$http.post('/psi/pic/type/' + (this.form.id >= 0 ? 'edit' : 'add'), this.form, r => {
              this.loadTableData();
              this.$message({
                type: "success",
                message: "保存成功"
              });
              this.$refs.form.resetFields();
              this.dialog.visible = false;
            })
          }
        })
      },
      // 新增
      addOne() {
        this.dialog.title = '新增类型';
        this.dialog.visible = true;
        this.form = {};
      },
      // 编辑
      editOne(data) {
        this.form.id = data.id;
        this.form.name = data.name;
        this.form.remark = data.remark;
        this.form.orderId = data.orderId;
        this.dialog.title = '编辑类型';
        this.dialog.visible = true;
      },
      // 单个删除
      deleteOne(val) {
        this.$http.post('psi/pic/type/delete', {id: val}, r => {
          this.loadTableData();
        })
      }
    }
  }
</script>

<style>

</style>
