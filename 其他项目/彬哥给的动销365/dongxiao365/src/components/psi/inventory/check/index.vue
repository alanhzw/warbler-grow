<template>
  <div>
    <breadcrumb/>
    <!--头部-->
    <div class="tool-box">
      <el-button v-auth="'psi.inventory.check.add'" type="success" @click="$router.push({path:'/psi/inventory/check/add'})" icon="el-icon-circle-plus-outline">新建盘点单</el-button>
    </div>
    <div class="tool-box">
      <div class="search-panel border">
        <!--检索条件-->
        <ComSearch @onSearch="handleFilter"/>
      </div>
    </div>
    <!--表格-->
    <div>
      <el-table
        :data="tableData"
        class="table-compact"
        ref="multipleTable"
        stripe
        border
        @row-dblclick="handleShowDetail"
        style="width: 100%">
        <el-table-column sortable prop="code" label="单号">
          <template slot-scope="scope">
            <a href="javascript:;" @click="handleShowDetail(scope.row)">{{scope.row.code}}</a>
          </template>
        </el-table-column>
        <el-table-column sortable prop="warehouseName" label="仓库"></el-table-column>
        <el-table-column sortable prop="type" label="类型">
          <template slot-scope="scope">
            {{scope.row.type | type}}
          </template>
        </el-table-column>
        <el-table-column sortable prop="operatorName" label="盘点人"></el-table-column>
        <el-table-column sortable prop="checkDate" label="盘点日期">
          <template slot-scope="scope">
            {{scope.row.checkDate | date}}
          </template>
        </el-table-column>
        <el-table-column sortable prop="result" label="盘点结果">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.result === -1" size="small" type="danger">
              盘点异常
            </el-tag>
            <el-tag v-if="scope.row.result === 1" size="small" type="success">
              盘点正常
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column sortable prop="remark" label="备注"></el-table-column>
        <el-table-column fixed="right" label="操作" width="160">
          <template slot-scope="scope">
            <el-button v-auth="'psi.inventory.check.edit'" type="button" class="text-primary" size="small" @click="$router.push({path:'/psi/inventory/check/edit',query:{id:scope.row.id}})">修改</el-button>
            <el-button v-auth="'psi.inventory.check.delete'" type="button" class="text-danger" size="small" @click="deleteOne(scope.row.id,scope.$index)">删除</el-button>
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
    <el-dialog :visible.sync="showDetail" width="800px">
      <div slot="title">{{detail.type | type}}：<span>【{{detail.code}}】</span></div>
      <el-row>
        <el-form :inline="true" :model="detail">
          <el-form-item label="盘点日期："><span class="form_content">{{detail.checkDate | date}}</span></el-form-item>
          <el-form-item label="盘点人："><span class="form_content">{{detail.operatorName}}</span></el-form-item>
          <el-form-item label="仓库："><span class="form_content">{{detail.warehouseName}}</span></el-form-item>
          <el-form-item label="备注："><span class="form_content">{{detail.remark}}</span></el-form-item>
        </el-form>
        <div class="stamp">
          <div class="stamp_yes animated bounceIn" v-show="detail.result === 1">盘点正常</div>
          <div class="stamp_no animated bounceIn" v-show="detail.result === -1">盘点异常</div>
        </div>
      </el-row>
      <h4>商品列表</h4>
      <el-table v-loading="loadingDetail"
                :data="detail.list"
                class="table-compact"
                border
                :height="400"
                style="width: 100%">
        <el-table-column sortable label="#" width="60px" align="center">
          <template slot-scope="scope">
            <div class="cell" v-text="scope.$index+1"></div>
          </template>
        </el-table-column>
        <el-table-column sortable prop="itemNme" label="商品名称"></el-table-column>
        <el-table-column sortable prop="specification" label="规格属性"></el-table-column>
        <el-table-column sortable prop="receiptCount" label="库存数量" align="right">
          <template slot-scope="scope">
            {{scope.row,scope.row.receiptCount|unit}}
          </template>
        </el-table-column>
        <el-table-column sortable prop="checkCount" label="盘点数量" align="right">
          <template slot-scope="scope">
            {{scope.row,scope.row.checkCount|unit}}
          </template>
        </el-table-column>
        <el-table-column sortable prop="diffCount" label="差异数量" align="right">
          <template slot-scope="scope">
            {{scope.row,scope.row.diffCount|unit}}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  import ComSearch from '../../inc/search'
  import ItemUtil from '../../../../util/itemUtil'

  export default {
    components: {
      ComSearch
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
          keyword: '',
          orderId: ''
        },
        loading: false,
        loadingDetail: false,
        showDetail: false,
        detail: {
          list: []
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
        this.$http.get('psi/item/stock/check/list', this.page, r => {
          this.tableData = r.data.list;
          this.page.total = r.data.total;
          this.loading = false;
        });
      },
      /* 分页*/
      handlePaginationChange(pageNum) {
        this.page.pageNum = pageNum;
        this.loadData();
      },
      // 分页改变事件
      handleSizeChange(val) {
        this.page.pageSize = val;
        this.loadData();
      },
      // 筛选
      handleFilter(val) {
        this.page = this.$util.extend(this.page, val);
        this.loadTableData();
      },
      // 删除
      deleteOne(id) {
        this.$confirm('是要删除该盘点记录么?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('psi/item/stock/check/delete', {id: id}, r => {
            this.loadTableData();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
        });
      },
      handleShowDetail(row) {

        this.showDetail = true;
        this.loadingDetail = true;
        this.$http.get('psi/item/stock/check/details', {checkId: row.id}, r => {
          this.detail = row;
          this.detail.list = r.data || [];
          this.loadingDetail = false;
        })
      }
    },
    watch: {},
    computed: {},
    filters: {
      type: function (val) {
        if (val === 0) {
          return "部分盘点";
        }
        if (val === 1) {
          return "整仓盘点";
        }
        if (val === 2) {
          return "抽样盘点";
        }
        if (val === 3) {
          return "其他";
        }
      },
      unit(item, val) {

        return ItemUtil.format(item, val);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .stamp {
    font-size: 18px;
    position: absolute;
    right: 10px;
    top: -20px;
    z-index: 100;
    transform: rotate(-15deg);
  }

  .stamp_yes {
    padding: 6px 12px;
    color: green;
    border: double 4px;
  }

  .stamp_no {
    padding: 6px 12px;
    color: red;
    border: double 4px;
  }

  .stamp_not_excute {
    padding: 6px 12px;
    color: #F39C12;
    border: double 3px;
  }

</style>
