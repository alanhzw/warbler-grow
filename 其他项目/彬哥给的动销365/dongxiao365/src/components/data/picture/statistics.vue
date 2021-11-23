<template>
  <div>
    <breadcrumb/>
    <!--头部-->
    <search-bar type="pic_statistics" @onSearch="handleFilter" placeholder="请输入上报人"/>
    <!--表格-->
    <div v-loading="isLoading">
        <el-table
          :data="tableData"
          border
          :span-method="objectSpanMethod"
          style="width: 100%"
          :max-height="tableHeight">
          <el-table-column
            prop="departName"
            label="部门"
            width="150"
            align="left">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="用户"
            width="150"
            align="left">
          </el-table-column>
          <el-table-column label="合计" header-align="center">
            <el-table-column
              prop="values[0].count"
              label="次数"
              align="center">
            </el-table-column>
            <el-table-column
              prop="values[0].times"
              label="张数"
              align="center">
            </el-table-column>
          </el-table-column>
            <el-table-column  v-for="(item, index) in typeList"
                              key="item.name"
                              :label="item.name"
                              header-align="center">
              <el-table-column
                label="次数"
                align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.values[index+1].count}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="张数"
                align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.values[index+1].count}}</span>
                </template>
              </el-table-column>
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
  </div>
</template>

<script>
  import SearchBar from '../search-bar'

  export default {
    components: {
      SearchBar
    },
    data() {
      return {
        tableHeight: window.innerHeight,
        tableData: [],
        isLoading: false,
        page: {
          pageNum: 1,
          pageSize: 20
        },
        typeList: []
      }
    },
    created() {
    },
    mounted() {
      this.loadTableData();
      this.loadTypeList();
    },
    methods: {
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          return {
            rowspan: row.rowspan,
            colspan: 1
          }
        } else {
          return {
            rowspan: 1,
            colspan: 1
          }
        }
      },
      loadTypeList() {
        this.$http.get('/psi/pic/type/list/all', {}, r => {
          this.typeList = r.data;
        });
      },
      /* 加载表格数据*/
      loadTableData() {
        this.isLoading = true;
        this.$http.get('/psi/pic/statistics', this.page, r => {
          this.tableData = r.data.list;
          this.page.total = r.data.total;
          this.isLoading = false;
        });
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
      // 筛选
      handleFilter(val) {
        console.log(val);
        this.page = this.$util.extend(this.page, val);
        this.loadTableData();
      },
      handleClearFilter() {
        this.loadTableData();
      }
    },
    watch: {},
    filters: {},
    computed: {}
  }
</script>

<style lang="scss" scoped>
</style>
