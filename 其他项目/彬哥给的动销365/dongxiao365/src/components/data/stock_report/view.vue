<template>
  <el-dialog title="库存上报单" :visible.sync="dialogTableVisible" width="800px" @close="handelClose">
    <div>
        <div style="height:430px;overflow:auto;">
          <el-form :inline="true" :model="form">
            <el-form-item label="上报日期："><span class="form_content">{{form.updateTime|date}}</span>
            </el-form-item>
            <el-form-item label="客户名称："><span class="form_content">{{form.customerName}}</span></el-form-item>
            <el-form-item label="上报人："><span class="form_content">{{form.salesmanName}}</span></el-form-item>
          </el-form>
          <el-table
            :data="form.psiStoreDetailsList"
            class="table-compact"
            ref="multipleTable"
            border
            style="width: 100%">
            <el-table-column sortable prop="itemCode" label="商品编码"></el-table-column>
            <el-table-column sortable prop="itemName" label="商品名称"></el-table-column>
            <el-table-column sortable prop="specification" label="规格属性"></el-table-column>
            <el-table-column sortable prop="wholeSalePrice" label="批发价" align="right">
              <template slot-scope="scope">
                {{scope.row.wholeSalePrice |price}}元/{{scope.row.unitName}}
              </template>
            </el-table-column>
            <el-table-column sortable prop="itemCount" label="库存数量" align="right">
              <template slot-scope="scope">
                {{scope.row.itemCount}} {{scope.row.unitName}}
              </template>
            </el-table-column>
            <el-table-column sortable prop="remark" label="备注"></el-table-column>
          </el-table>
          <br>
          <el-form :inline="true" :model="form">
            <el-row>
              <el-col :span="20">
                <el-form-item label="备注：">
                  <span class="form_content">{{form.remark}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="4" align="end">
                <el-form-item label="合计：">
                  <span style="color: #38adff">{{form.totalAmount |price}}元</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <!--页面中部-->
          <div>
            <span class="title">图片：</span>
            <br/>
            <br/>
            <div v-if="form.pictures && form.pictures.length>0">
              <gallery-inline :data="form.pictures"/>
            </div>
          </div>
        </div>
        <div slot="footer" v-if="form.status===0">
          <div class="text-right">
            <el-row>
              <el-button v-auth="'data.stock_report.list.confirm'" type="success" @click="handleConfirm">确认</el-button>
              <el-button v-auth="'data.stock_report.list.reject'" type="danger" @click="handleReject">驳回</el-button>
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
      stockId: {
        type: [Number, String],
        default: 0
      }
    },
    data() {
      return {
        form: {
          psiStoreDetailsList: []
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
        if (this.stockId && this.stockId > 0) {
          this.$http.get('/psi/store/info', {id: this.stockId}, r => {
            this.form = r.data;

          });
        }
      },
      handelClose() {
        this.$emit('update:visible', false);
      },
      handleConfirm() {
        this.$http.post('/psi/store/confirm', {id: this.stockId}, r => {
          this.$message({
            message: '库存上报单[' + this.form.code + ']确认成功',
            type: 'success'
          });
          this.$emit('change', 1);
          this.$emit('update:visible', false);
        });
      },
      handleReject() {
        this.$http.post('/psi/store/reject', {id: this.stockId}, r => {
          this.$message({
            message: '已经驳回库存上报单[' + this.form.code + ']上报信息',
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
