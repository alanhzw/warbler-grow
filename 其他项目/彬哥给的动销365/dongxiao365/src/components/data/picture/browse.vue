<template>
  <div>
    <breadcrumb/>
    <search-bar type="pic_browse" @onSearch="handleFilter" placeholder="请输入上报人、客户名称"/>
    <!--表格-->
    <div>
      <el-table
        :data="tableData"
        class="table-compact"
        v-loading="loading"
        ref="multipleTable"
        stripe
        border
        style="width: 100%">
        <el-table-column sortable prop="customerName" width="150" label="客户名称"></el-table-column>
        <el-table-column sortable prop="salesmanName" width="100" label="上报人"></el-table-column>
        <el-table-column sortable prop="deptName" label="部门" width="100"></el-table-column>
        <el-table-column sortable prop="updateTime" label="上报时间" width="100">
          <template slot-scope="scope">
            {{scope.row.updateTime|date}}
          </template>
        </el-table-column>
        <el-table-column sortable prop="typeName" label="拍照类型" width="100"></el-table-column>
        <el-table-column label="照片数" prop="pictures" width="115">
          <template slot-scope="scope">
            <xc-gallery :data="scope.row.pictures" :title="scope.row.customerName"/>
          </template>
        </el-table-column>
        <el-table-column sortable prop="address" label="位置" min-width="120">
          <template slot-scope="scope">
            <i v-if="scope.row.address" class="fa fa-map-marker"></i>
            {{scope.row.address}}
          </template>
        </el-table-column>
        <el-table-column sortable prop="deviation" label="偏差（米）" align="right" width="115"></el-table-column>
        <el-table-column fixed="right" label="操作" header-align="center" width="100">
          <template slot-scope="scope">
            <el-button size="small" v-auth="'data.picture.browse.delete'" type="button" class="text-danger" @click="deleteOne(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column sortable prop="remark" label="备注"></el-table-column>
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
    <!---弹窗部分-->

  </div>
</template>

<script>
  import SearchBar from '../search-bar'
  import XcGallery from '../../lib/gallery'

  export default {
    components: {
      SearchBar, XcGallery
    },
    data() {
      return {
        tableData: [],
        page: {
          pageNum: 1,
          pageSize: 20,
          sortName: '',
          sortOrder: '',
          total: 0,
          keyword: ''
        },
        searchBoxVisible: true,
        messageQuestion1: "这里放的员工所拍摄的照片,你可已进行简单的管理",
        loading: true
      }
    },
    mounted() {
      this.loadTableData();
    },
    methods: {
      // 加载表格数据
      loadTableData(val) {
        this.loading = true;
        this.$http.get('/psi/pic/list', this.page, r => {
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
        this.loadTableData(val);
      },
      // 筛选
      handleFilter(val) {
        this.page = this.$util.extend(this.page, val);
        this.loadTableData();
      },
      // 删除
      deleteOne(id) {
        this.$confirm('确定要删除吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$http.post('/psi/pic/delete', {id: id}, r => {
            this.loadTableData();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
        });
      }
    },
    filters: {
      status: function (val) {
        if (val === 1) {
          return "已审批"
        }
        if (val === 0) {
          return "未审批"
        }
        if (val === 3) {
          return "已发货"
        }
      }
    }
  }
</script>

<style>

</style>
