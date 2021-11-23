<template>
  <div>
    <!--库存查询页面-->
    <breadcrumb/>
    <!--头部-->
    <div class="tool-box">
      <el-row>
        <el-col :span="12">
          <br>
        </el-col>
        <el-col :span="12" align="right">
          <el-form :inline="true" class="form-compact" @submit.native.prevent>
            <el-form-item>
              <el-search v-model="page.keyword" @click="loadTableData" @keyup.enter.native="loadTableData" placeholder="请输入商品名称查询"></el-search>
            </el-form-item>
            <!--<el-form-item>-->
            <!--<el-button type="info" icon="fa fa-filter" @click="searchBoxVisible = !searchBoxVisible">筛选</el-button>-->
            <!--</el-form-item>-->
          </el-form>
        </el-col>
      </el-row>
    </div>
    <!--<div class="tool-box" v-if="searchBoxVisible">-->
    <!--<div class="search-panel border">-->
    <!--<ComSearch @onSearch="handleFilter"/>-->
    <!--</div>-->
    <!--</div>-->
    <!--表格-->
    <el-table
      v-loading="loading"
      :data="tableData"
      stripe
      border
      style="width: 100%">
      <el-table-column sortable prop="itemCode" label="商品编码"></el-table-column>
      <el-table-column sortable prop="itemName" label="商品名称"></el-table-column>
      <el-table-column sortable prop="specification" label="规格属性"></el-table-column>
      <el-table-column sortable prop="categoryName" label="类型"></el-table-column>
      <el-table-column sortable prop="itemBrandName" label="品牌"></el-table-column>
      <el-table-column sortable prop="itemStatus" label="状态">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.itemStatus === -1 ? 'danger' : scope.row.itemStatus === 1 ? 'success':'warning'"
            size="small"
            close-transition>
            {{scope.row.itemStatus | salesStatus}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column sortable prop="warehouseName" label="仓库"></el-table-column>
      <el-table-column sortable prop="inventoryCount" label="库存数量" align="right">
        <template slot-scope="scope">
          {{scope.row,scope.row.inventoryCount|unit}}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page="page.pageNum"
      :page-size="page.pageSize"
      :total="page.total"
      layout="total, sizes,prev, pager, next, jumper"
      @current-change="handlePaginationChange"
      @size-change="handleSizeChange">
    </el-pagination>
  </div>
</template>

<script>
  import ComSearch from '../inc/search'
  import ItemUtil from '../../../util/itemUtil'

  export default {
    components: {
      ComSearch
    },
    data() {
      return {
        searchBoxVisible: true,
        loading: false,
        tableData: [],
        page: {pageNum: 1, pageSize: 20, total: 0}
      }
    },
    mounted() {
      this.loadTableData();
    },
    methods: {
      /* 加载表格数据*/
      loadTableData() {
        this.loading = true;
        this.$http.get('psi/stock/list', this.page, r => {
          this.tableData = r.data.list;
          this.page.total = r.data.total;
          this.loading = false;
        });
      },
      // 筛选
      handleFilter(val) {
        this.page = this.$util.extend(this.page, val);
        this.loadTableData();
      },
      /* 分页*/
      handlePaginationChange(val) {
        this.page.pageNum = val;
        this.loadTableData();
      },
      // 分页改变事件
      handleSizeChange(val) {
        this.page.pageSize = val;
        this.loadTableData();
      }
    },
    filters: {
      salesStatus: function (val) {
        if (val === 1) {
          return '在售';
        }
        if (val === 0) {
          return '停售';
        }
        if (val === -1) {
          return '删除';
        }
      },
      unit(item, val) {
        return ItemUtil.format(item, val);
      }
    }
  }
</script>
