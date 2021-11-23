<template>
  <el-dialog title="销售单" :visible.sync="dialogTableVisible" width="800px" @close="handelClose">
    <div>
      <div style="height:430px;overflow:auto;">
      <!--表单-->
      <el-form :inline="true" :model="order">
        <el-form-item label="销售日期：">
            <span class="form_content">
            {{order.updateTime|date}}
            </span>
        </el-form-item>
        <el-form-item label="客户名称："><span class="form_content">{{order.customerName}}</span></el-form-item>
        <el-form-item label="录入人："><span class="form_content">{{order.salesmanName}}</span></el-form-item>
      </el-form>
      <el-table
        :data="order.psiSalesDetailsList"
        class="table-compact"
        ref="multipleTable"
        border
        style="width: 100%">
        <el-table-column sortable prop="itemCode" label="商品编码"></el-table-column>
        <el-table-column sortable prop="itemName" label="商品名称"></el-table-column>
        <el-table-column sortable prop="specification" label="规格属性"></el-table-column>
        <el-table-column sortable prop="itemCount" label="销售数量" align="right">
          <template slot-scope="scope">
            {{scope.row.itemCount}}{{scope.row.itemUnitName}}
          </template>
        </el-table-column>
        <el-table-column sortable prop="salesPrice" label="销售单价" align="right">
          <template slot-scope="scope">
            {{scope.row.salesPrice|price}}元
          </template>
        </el-table-column>
        <el-table-column sortable prop="totalAmount" label="销售金额" align="right">
          <template slot-scope="scope">
            {{scope.row.totalAmount|price}}元
          </template>
        </el-table-column>
        <el-table-column sortable prop="remark" label="备注"></el-table-column>
      </el-table>
      <br>
      <el-row>
        <el-form :model="order">
          <el-col :span="18">
            <el-form-item label="备注："><span class="form_content">{{order.remark}}</span></el-form-item>
          </el-col>
          <el-col :span="6" align="end">
            总金额：{{order.amount|price}} 元
          </el-col>
        </el-form>
      </el-row>
      <div>
        <span class="title">图片：</span>
        <gallery-inline :data="order.pictures"></gallery-inline>
      </div>
    </div>
    <div slot="footer" v-if="order.status===0">
      <div class="text-right">
        <el-row>
          <el-button v-auth="'data.sales.report.record.confirm'" type="success" @click="handleConfirm">确认</el-button>
          <el-button v-auth="'data.sales.report.record.reject'" type="danger" @click="handleReject">驳回</el-button>
        </el-row>
      </div>
    </div>
   </div>
  </el-dialog>
</template>
<script>
  import GalleryInline from '../../lib/gallery-inline'

  export default {
    components: {GalleryInline},
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      value: {
        type: [Number, String],
        default: 0
      },
      visible: Boolean,
      salesId: {
        type: [Number, String],
        default: 0
      }
    },
    data() {
      return {
        order: {
          psiSalesDetailsList: []
        },
        dialogTableVisible: false
      }
    },
    created() {
      this.loadData(this.$route.query);
    },
    methods: {
      // 加载数据
      loadData() {
        if (this.salesId && this.salesId > 0) {
          this.$http.get('/psi/sales/info', {salesId: this.salesId}, r => {
            this.order = r.data;
          });
        }
      },
      handelClose() {
        this.$emit('update:visible', false);
      },
      handleConfirm() {
        this.$http.post('/psi/sales/confirm', {id: this.salesId}, r => {
          this.$message({
            message: '销售单[' + this.order.code + ']确认成功',
            type: 'success'
          });
          this.$emit('change', 1);
          this.$emit('update:visible', false);
        });
      },
      handleReject() {
        this.$http.post('/psi/sales/reject', {id: this.salesId}, r => {
          this.$message({
            message: '已经驳回销售单[' + this.order.code + ']上报信息',
            type: 'warning'
          });
          this.$emit('change', 2);
          this.$emit('update:visible', false);
        });
      }
    },
    watch: {
      visible(val) {
        if (val) {
          this.loadData();
        }
        this.dialogTableVisible = val;
      }
    }
  }
</script>

<style lang="scss" scoped>
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
</style>
