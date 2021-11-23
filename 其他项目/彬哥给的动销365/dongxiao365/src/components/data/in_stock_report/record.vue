<template>
  <div>
    <breadcrumb/>
    <!--头部-->
    <search-bar type="stock_report" @onSearch="handleFilter"/>
    <!--表格-->
    <div>
      <el-table
        :data="tableData"
        v-loading="loading"
        class="table-compact"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
        stripe
        border
        style="width: 100%">
        <!-- <el-table-column
          type="selection">
        </el-table-column> -->

        <el-table-column sortable prop="code" label="流水号" width="180">
          <template slot-scope="scope">
            <a href="javascript:;" @click="goodsDetails(scope.row)">{{scope.row.code}}</a>
          </template>
        </el-table-column>
        <el-table-column sortable prop="customerName" label="客户名称" width="250"></el-table-column>
        <el-table-column sortable prop="sku" label="实际SKU数"></el-table-column>
        <!-- <el-table-column sortable prop=" " label="铺货率" align="right"></el-table-column> -->
        <el-table-column sortable prop="pictures" label="现场照片">
          <template slot-scope="scope">
            <xc-gallery :data="scope.row.pictures" :title="scope.row.customerName"/>
          </template>
        </el-table-column>
        <el-table-column sortable prop="typeCount" label="铺货产品种数"></el-table-column>
        <el-table-column sortable prop="salesmanName" label="上报人"></el-table-column>
        <el-table-column sortable prop="departmentName" label="部门"></el-table-column>
        <el-table-column sortable prop="updateTime" label="上报日期">
          <template slot-scope="scope">
            {{scope.row.updateTime|date}}
          </template>
        </el-table-column>

        <el-table-column sortable prop="status" label="状态" width="180">
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.status===0">未确认</el-tag>
            <el-tag type="success" v-if="scope.row.status===1">已确认</el-tag>
            <el-tag type="warning" v-if="scope.row.status===2">已驳回</el-tag>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="90px">
          <template slot-scope="scope">
            <div style="display:flex;">
              <el-button size="small" v-auth="'data.in_stock_report.record.delete'" type="button" @click="deleteRow(scope.row)" class="text-danger">删除</el-button>
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
    <el-dialog title="铺货详情" :visible.sync="dialog.goodsDetailsVisible" width="800px">
      <!--第一部分-->
      <!--表单-->
      <div>
        <div style="height:430px;overflow:auto;">
      <el-row>
        <el-form :inline="true" :model="goodsRecordDetails">
          <el-form-item label="客户名称："><span class="form_content">{{goodsRecordDetails.customerName}}</span></el-form-item>
          <el-form-item label="铺货日期："><span class="form_content">{{goodsRecordDetails.updateTime|date}}</span></el-form-item>
          <el-form-item label="上报人："><span class="form_content">{{goodsRecordDetails.salesmanName}}</span></el-form-item>
          <el-form-item label="SKU数："><span class="form_content">{{goodsRecordDetails.sku}}</span></el-form-item>
          <!-- <el-form-item label="铺货率："><span class="form_content">--</span></el-form-item> -->
        </el-form>                               
      </el-row>
      <!--表格-->
      <el-row>
        <el-table
          :data="goodsRecordDetails.distribDetailsList"
          class="table-compact"
          ref="multipleTable"
          border
          style="width: 100%">
          <el-table-column sortable prop="itemCode" label="商品编码"></el-table-column>
          <el-table-column sortable prop="itemName" label="商品名称"></el-table-column>
          <el-table-column sortable prop="itemCategory" label="商品类型"></el-table-column>
          <el-table-column sortable prop="specification" label="规格属性"></el-table-column>
        </el-table>
      </el-row>
      <br/>

      <el-row>
        <el-form :inline="true" :model="goodsRecordDetails">
          <el-row>
            <el-form-item label="备注："><span class="form_content">{{goodsRecordDetails.remark}}</span></el-form-item>
          </el-row>
        </el-form>
      </el-row>
      <el-row>
        <gallery-inline :data="goodsRecordDetails.pictures"></gallery-inline>
      </el-row>
      </div>
      <div class="text-right" v-if="goodsRecordDetails.status===0">
        <el-row>
          <!-- <el-button v-auth="'data.in_stock_report.record.confirm'" type="success" @click="handleConfirm">确认</el-button>
          <el-button v-auth="'data.in_stock_report.record.reject'" type="danger" @click="handleReject">驳回</el-button> -->
           <el-button v-auth="''" type="success" @click="handleConfirm">确认</el-button>
          <el-button v-auth="''" type="danger" @click="handleReject">驳回</el-button>
        </el-row>
      </div>
    </div>

    </el-dialog>
  </div>
</template>

<script>
  import SearchBar from '../search-bar'
  import XcGallery from '../../lib/gallery'
  import GalleryInline from '../../lib/gallery-inline'

  export default {
    components: {
      SearchBar, XcGallery, GalleryInline
    },
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
        searchBoxVisible: true,
        messageQuestion1: "在这里你可以看到客户的商品库存,以便于决定是否重新铺货",
        multipleSelection: [], // 批量删除数据集合
        deleteBoxVisible: false, // 批量删除隐藏按钮
        /* -------------弹窗部分-------*/
        dialog: {
          goodsDetailsVisible: false
          // skuDetailsVisible: false
        },
        /* 铺货详情*/
        goodsRecordDetails: {},
        loading: true
      }
    },
    created() {
      this.loadTableData();
    },
    methods: {
      handleConfirm(row) {
        this.$http.post('psi/distrib/confirm', {id: this.goodsRecordDetails.id}, r => {
          this.$message({
            message: '铺货上报单[' + this.goodsRecordDetails.code + ']确认成功',
            type: 'success'
          });
          this.dialog.goodsDetailsVisible = false;
        });
      },
       handleReject(row) {
        this.$http.post('psi/distrib/reject', {id: this.goodsRecordDetails.id}, r => {
          this.$message({
            message: '已经驳回铺货上报单[' + this.goodsRecordDetails.code + ']上报信息',
            type: 'warning'
          });
          this.dialog.goodsDetailsVisible = false;
        });
      },
      /* 加载表格数据*/
      loadTableData() {
        this.$http.get('psi/distrib/list', this.page, r => {
          this.tableData = r.data.list;
          console.log(this.tableData)
          this.loading = false;
          this.page.total = r.data.total;
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
        this.page = this.$util.extend(this.page, val);
        this.loadTableData();
      },
      // 商品详情
      goodsDetails(data) {
        this.dialog.goodsDetailsVisible = true;
        this.goodsRecordDetails = data;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        if (this.multipleSelection.length > 0) {
          this.deleteBoxVisible = true;
        } else {
          this.deleteBoxVisible = false;
        }
      },
      deleteBatch() {
        this.$confirm('确定要删除吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$http.post('/psi/distrib/delete', {ids: this.multipleSelection.convert('id')}, r => {
            this.loadTableData();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
        });
      },
      deleteRow(row) {
        this.$confirm('确定要删除吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$http.post('/psi/distrib/delete', {id: row.id}, r => {
            this.loadTableData();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
        });
      }
    }
  }
</script>

<style scoped>

  .form_content {
    color: #17c295;
  }

  .stamp_yes {
    color: green;
    font-size: 30px;
  }

  .stamp_no {
    color: red;
    font-size: 30px;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
  }
</style>
