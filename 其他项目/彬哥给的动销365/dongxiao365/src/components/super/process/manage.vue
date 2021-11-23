<template>
  <div class="page-content">
    <breadcrumb/>
    <div class="tool-box">
      <el-button id="addFlowButton" type="primary" @click="handleDialogTableVisible">新增流程</el-button>
    </div>
    <div>
      <el-table
        border
        stripe

        @sort-change="sortTable"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="name"

          label="流程名称">
        </el-table-column>
        <el-table-column
          prop="createTime"

          label="创建时间">
          <template slot-scope="scope">
            {{scope.row.createTime|setTime}}
          </template>
        </el-table-column>
        <el-table-column
          prop="status"

          label="状态">
          <template slot-scope="scope">
            {{scope.row.status|status}}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button  @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button  type="danger" @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
            <span v-if="scope.row.status == 0 ">
            <el-button  type="primary" @click="handleEnable(scope.$index, scope.row)">启用
            </el-button>
          </span>
            <span v-if="scope.row.status != 0 ">
            <el-button  type="danger" @click="handleDisable(scope.$index, scope.row)">禁用
            </el-button>
          </span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @current-change="paginationChange"
        @size-change="handleSizeChange"
        :page-sizes="[20,50,100, 200, 300, 400]"
        :current-page="page.pageNum"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </div>
    <el-dialog title="表单列表" :visible.sync="dialogTableVisible">
      <h2>请选择一个表单：</h2>
      <el-table :data="gridData" highlight-current-row @current-change="handleCurrentChange">
        <el-table-column sortable property="name" label="表单名称" width="200"></el-table-column>
        <el-table-column sortable property="createTime" label="创建日期" width="150"></el-table-column>
        <el-table-column sortable property="description" label="描述"></el-table-column>
      </el-table>
      <div style="height: 50px"></div>
      <el-button id="cancle" type="primary" @click="dialogTableVisible=false">取消</el-button>
      <span v-if="currentRow!= null">
           <el-button id="nextStep" type="primary" @click="nextStep">下一步</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [],
        page: {
          manageOrApply: 'manage',
          pageNum: 1,
          pageSize: 20,
          sortName: '',
          sortOrder: '',
          keyword: '',
          total: 0
        },
        dialogTableVisible: false,
        gridData: [],
        formId: "dasf",
        currentRow: null
      }
    },
    created() {
      this.loadData();
    },
    methods: {
      loadData() {
        this.$http.get('/crm/visit/flow/list', this.page, r => {
          this.page.total = r.data.total;
          this.tableData = r.data.list;
        }, e => {
          console.error(e)
        })
      },
      sortTable(sort) {
        this.$util.build_sort(this.page, sort);
        this.loadData();
      },
      paginationChange(pageNum) {
        this.page.pageNum = pageNum;
        this.loadData();
      },
      handleAdd() {
        this.$router.push('/system/role/add')
      },
      handleEdit(index, row) {

        this.$router.push({path: '/super/process/flowEdit', query: {id: row.id}});
      },
      handleDelete(index, row) {
        this.$http.post('/flow/delete', {id: row.id, name: 'hello'}, r => {
          this.$message.success("删除成功")
        }, e => {
          console.error(e)
          this.$message.error("删除失败")
        })
        this.loadData();
      },
      handleSizeChange(val) {

        this.page.pageSize = val;
        this.loadData();
      },
      handleDisable(index, row) {

        this.$http.post('/flow/disable', {id: row.id, name: 'hello'}, r => {

          this.$message.success("禁用成功")
        }, e => {
          console.error(e)
          this.$message.error("禁用失败")
        })
        this.loadData();
      },
      handleEnable(index, row) {

        this.$http.post('/flow/enable', {id: row.id, name: 'hello'}, r => {

          this.$message.success("启用成功")
        }, e => {
          console.error(e)
          this.$message.error("启用失败")
        })
        this.loadData();
      },
      handleDialogTableVisible(dialogTableVisible) {
        this.dialogTableVisible = true;
        this.$http.get('/form/tpl/list', this.page, r => {
          this.gridData = r.data.list;
        }, e => {
          console.error("表单查询失败");
        })
      },
      nextStep() {

        sessionStorage.setItem("formId", this.currentRow.id);
        this.$router.push('/super/process/manage/add')
      },
      handleCurrentChange(val) {
        this.currentRow = val;

      }
    },
    filters: {
      status(val) {
        switch (val) {
          case  -1:
            return '已删除';
          case  0:
            return '禁用';
          case  1:
            return '正常';
          default:
          // do nothing
        }
      },
    setTime(dateLong) {
        const date = new Date(dateLong);
        const y = date.getFullYear();
        const M = date.getMonth() + 1;
        const d = date.getDate();
        date.getTime();
        const h = date.getHours();
        const m = date.getMinutes();
        const s = date.getSeconds();
        return y + "-" + M + "-" + d + "  " + h + ":" + m + ":" + s;
      }

    }
  }
</script>
<style scoped>

</style>
