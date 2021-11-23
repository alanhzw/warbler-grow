<template>
  <div class="page-content">
    <breadcrumb></breadcrumb>
    <el-table
      border
      stripe

      @sort-change="sortTable"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        :="true"
        label="表单名称">
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述">
      </el-table-column>

      <a href="www.baidu.com">
        <el-table-column
          prop="id"
          :="true"
          label="流水号">
        </el-table-column>
      </a>

      <el-table-column
        prop="createTime"
        :="true"
        label="创建时间">
        <template slot-scope="scope">
          {{scope.row.createTime|setTime}}
        </template>
      </el-table-column>

      <el-table-column
        prop="status"
        :="true"
        label="状态">
        <template slot-scope="scope">
          {{scope.row.status|status}}
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button  @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button  type="danger" @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @current-change="loadData"
      @size-change="handleSizeChange"
      :page-sizes="[20,50,100, 200, 300, 400]"
      :current-page="page.pageNumber"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [],
        page: {
          pageNumber: 1,
          pageSize: 20,
          sortName: '',
          sortOrder: '',
          keyword: '',
          total: 0
        }
      }
    },
    created() {
      this.loadData();
    },
    methods: {
      loadData() {
        this.$http.get('/form/tpl/list', this.page, r => {
          this.page.total = r.data.total;
          this.tableData = r.data.list;
        }, e => {
          console.error(e)
        })
      },
      sortTable(column, prop, order) {
        this.page.sortName = column.prop;
        this.page.sortOrder = order === 'ascending' ? 'acs' : 'desc';
        this.loadData();
      },
      handleAdd() {
        this.$router.push('/system/role/add')
      },
      handleEdit(index, row) {
        this.$http.get('/form/tpl/info', {id: row.id}, r => {
          this.$router.push({path: '/super/form/formEdit', query: {id: row.id}})
        });
      },
      handleDelete(index, row) {
        this.$http.post('form/tpl/delete', {id: row.id, name: 'hello'}, r => {
          this.$message({
            message: '保存成功',
            type: 'success'
          });
        }, e => {
          console.error(e)
          this.$message({
            message: '删除失败',
            type: 'error'
          });
        })
        this.loadData();
      },
      handleSizeChange(val) {
        this.page.pageSize = val;
        this.loadData();
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
<style scoped></style>
