<template>
  <div>
    <breadcrumb/>
    <!--头部-->
    <div>
      <el-row>
        <el-col :span="4">
          <div style="display:flex;">
            <el-button type="success" icon="el-icon-circle-plus-outline" @click="dialog.addBrandVisible = true;">新增品牌</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="multipleDelete" v-show="optBoxVisible">批量删除</el-button>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="text-right">
            <el-form :inline="true" class="form-compact" @submit.native.prevent>
              <el-form-item>
                <el-search v-model="page.keyword" @click="loadTableData" @keyup.enter.native="loadTableData" placeholder="请输入品牌名称"></el-search>
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
        <el-table-column sortable prop="name" label="名称" width="150"></el-table-column>
        <el-table-column sortable prop="orderId" label="排序号" width="100"></el-table-column>
        <el-table-column sortable prop="remark" label="备注"></el-table-column>
        <el-table-column label="操作" width="230">
          <template fixed="right" slot-scope="scope">
            <el-button type="button" size="small" class="text-primary" @click="editOne(scope.row)">修改</el-button>
            <el-button type="button" size="small" class="text-danger" @click="deleteOne(scope.row,scope.$index)">删除</el-button>
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
    <!--弹窗-->
    <div>
      <!--新增弹窗-->
      <el-dialog style="height:490px;" title="新增品牌" :visible.sync="dialog.addBrandVisible" width="500px">
        <el-form ref="addRuleForm" :model="brand" :rules="rules" label-width="120px">
          <el-form-item label="品牌名称：" prop="name">
            <el-input v-model="brand.name" placeholder="品牌名称" clearable :maxlength="15" class="input-larger"></el-input>
          </el-form-item>
          <el-form-item label="排序号：" prop="orderId">
            <el-number v-model.number="brand.orderId" placeholder="排序号" clearable :maxlength="4" class="input-larger"></el-number>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input v-model="brand.remark" placeholder="请输入备注,长度在500字以内" type="textarea" :maxlength="500" class="input-larger"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="text-right">
              <el-button @click="dialog.addBrandVisible = false">取消</el-button>
              <el-button type="primary" @click="onSubmit('addRuleForm')">保存</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!--修改弹窗-->
      <el-dialog style="height:490px;" title="修改品牌" :visible.sync="dialog.editVisible" width="500px">
        <el-form :model="brandEdit" ref="editRuleForm" :rules="rules" label-width="120px">
          <el-form-item label="品牌名称：" prop="name">
            <el-input v-model="brandEdit.name" placeholder="品牌名称" clearable :maxlength="15"></el-input>
          </el-form-item>
          <el-form-item label="排序号：" prop="orderId">
            <el-number v-model.number="brandEdit.orderId" placeholder="排序号" clearable :maxlength="4"></el-number>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input v-model="brandEdit.remark" placeholder="请输入备注,长度在500字以内" type="textarea" :maxlength="500"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="text-right">
              <el-button @click="dialog.editVisible = false">取消</el-button>
              <el-button type="primary" @click="onEdit('editRuleForm')">保存</el-button>
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
          addBrandVisible: false,
          editVisible: false
        },
        /* 弹窗参数-----新增品牌*/
        brand: {}, // 品牌参数
        brandEdit: {}, // 品牌修改中间变量
        lastOrder: 0,
        /* -----------校验参数----------*/
        rules: {
          name: [
            {required: true, message: '请输入品牌名称', trigger: 'change'},
            {max: 15, message: '长度在1-20个字符间', trigger: 'change'}
          ]
        }
      }
    },
    created() {
      this.loadTableData();
    },
    mounted() {
    },
    methods: {
      /* 加载表格数据*/
      loadTableData() {
        this.loading = true;
        this.$http.get('/psi/item/brand/list', this.page, r => {
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
      /* 新增保存*/
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            return false;
          } else {
            this.$http.post('/psi/item/brand/add', this.brand, r => {
              this.$message({
                message: '添加成功！',
                type: 'success'
              });
              this.tableData.unshift({
                id: r.data,
                name: this.brand.name,
                orderId: this.brand.orderId,
                remark: this.brand.remark
              });
              this.page.total++;
              const orderId = ++this.brand.orderId;
              this.$refs[formName].resetFields();
              this.brand.orderId = orderId;
              this.brand.name = '';
              this.brand.remark = '';
            });
          }
        });
      },
      /* 修改提交*/
      onEdit(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            return false;
          } else {
            this.$http.post('/psi/item/brand/edit', this.brandEdit, r => {
              this.$message({
                message: '保存成功！',
                type: 'success'
              });
              this.loadTableData();
            });
            this.dialog.editVisible = false;
          }
        });
      },
      // 修改
      editOne(val) {
        const brand = JSON.stringify(val);
        this.brandEdit = JSON.parse(brand);
        this.dialog.editVisible = true;
      },
      // 删除
      deleteOne(row, $index) {
        this.$confirm('确认要删除分类【' + row.name + '】么?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/psi/item/brand/delete', {id: row.id}, r => {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.tableData.splice($index, 1);
            this.page.total--;
          });
        })
      },
      // 批量删除
      multipleDelete() {
        this.$confirm('确认要删除选中的分类么?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const ids = [];
          this.multipleSelection.forEach(value => {
            ids.push(value.id)
          });
          this.$http.post('/psi/item/brand/batchDelete', {ids: ids}, r => {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.loadTableData();
          })
        });
      }
    },
    computed: {},
    watch: {}
  }
</script>

<style scoped>

</style>
