<template>
  <el-dialog class="dialog" title="" :visible.sync="visible" width="40%">
      <!--头部按钮-->
      <el-row>
        <el-col :span="14">
          <span class="title">销售订单：【{{order.code}}】</span>
        </el-col>
      </el-row>
      <!--表单-->
      <el-row>
        <br/>
        <el-form :inline="true" :model="order">
          <el-form-item label="客户名称："><span class="form_content">{{order.customerName}}</span></el-form-item>
          <el-form-item label="下单时间："><span class="form_content">{{order.orderTime | datetime}}</span></el-form-item>
          <el-form-item label="业务员："><span class="form_content">{{order.salesmanName}}</span></el-form-item>
          <el-form-item label="发货仓库："><span class="form_content" v-if="order.psiWarehouse">{{order.psiWarehouse.name}}</span></el-form-item>
          <el-form-item label="交货日期："><span class="form_content">{{order.deliverDate | date}}</span></el-form-item>
          <el-form-item label="收货地址："><span class="form_content">{{order.deliverAddress}}</span></el-form-item>
        </el-form>
      </el-row>
      <!--表格-->
      <el-row>
        <div class="stamp">
          <div class="stamp_yes animated bounceIn" v-show="order.approvalStatus === 1">已批准</div>
          <div class="stamp_no animated bounceIn" v-show="order.approvalStatus === 2">驳回</div>
          <div class="stamp_not_excute animated bounceIn" v-show="order.approvalStatus === 0">未审批</div>
        </div>
        <el-table
          :data="order.psiOrderDetailsList"
          class="table-compact"
          ref="multipleTable"
          border
          style="width: 100%">
          <el-table-column sortable prop="psiItemResponse.code" label="商品编码"></el-table-column>
          <el-table-column sortable prop="psiItemResponse.name" label="商品名称"></el-table-column>
          <el-table-column sortable prop="psiItemResponse.specification" label="规格属性"></el-table-column>
          <el-table-column sortable prop="itemCount" label="数量">
            <template slot-scope="scope">
              <el-tooltip effect="dark" :content="'1'+scope.row.auxiliaryUnitName+'='+scope.row.unitConvertRatio+''+scope.row.basicUnitName" placement="top-start" v-if="scope.row.enableAuxiliaryUnit">
                <div>{{scope.row,scope.row.itemCount|unit}}</div>
              </el-tooltip>
              <div v-else>
                {{scope.row,scope.row.itemCount|unit}}
              </div>
            </template>
          </el-table-column>
          <el-table-column sortable prop="orderPrice" label="订货价">
            <template slot-scope="scope">
              {{scope.row.orderPrice | price}}/{{scope.row.psiItemResponse.baseUnitName }}
            </template>
          </el-table-column>
          <el-table-column sortable prop="itemAmount" label="金额">
            <template slot-scope="scope">
              {{scope.row.itemAmount | price}}
            </template>
          </el-table-column>
          <el-table-column sortable prop="remark" label="备注"></el-table-column>
          <el-table-column sortable prop="isGift" label="赠品">
            <template slot-scope="scope">
              {{scope.row.isGift?'是':'否'}}
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <br/>
    <!--页面中部-->
      <el-card class="box-card">
        <el-form :inline="true" :model="order">
          <el-row>
            <el-col :span="18">
              <el-form-item label="备注："><span class="form_content">{{order.remark}}</span></el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="优惠金额："><span class="form_content">{{order.disAmount | price}}</span></el-form-item>
              <el-form-item label="优惠后金额："><span class="form_content">{{order.actualAmount| price}}</span></el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <br/>
      <el-row>
        <div>
          <span class="title">订单图片：</span>
          <div>
            <gallery-inline :data="order.pictures"/>
          </div>
        </div>
      </el-row>
      <br/>
      <el-row>
        <span class="title">审批历程：</span>
      </el-row>
      <br/>
      <el-row>
        <el-table
          :data="orderApproveList"
          class="table-compact"
          ref="multipleTable"
          border
          style="width: 100%">
          <el-table-column sortable prop="userName" label="处理人"></el-table-column>
          <el-table-column sortable prop="result" label="操作"></el-table-column>
          <el-table-column sortable prop="comments" label="处理意见"></el-table-column>
          <el-table-column sortable prop="updateTime" label="处理时间">
            <template slot-scope="scope">
              {{scope.row.updateTime | date}}
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-dialog>
</template>

<script>
  import GalleryInline from '../../lib/gallery-inline'
  import ItemUtil from '../../../util/itemUtil'

  export default {
    components: {GalleryInline},
    props: {
      visible: Boolean,
      order: {},
      orderApproveList: []
    },
    data() {
      return {
      }
    },
    created() {
    },
    mounted() {
      // this.loadData();
       // console.log('prosp', this.data)
    },
    methods: {
      // 加载数据

      loadData() {
        // this.$http.get('/psi/order/info', {orderId: this.order.id}, r => {
        //   this.order = r.data;
        // });

        // this.$http.get('/psi/order/item/detail', {orderId: this.order.id}, r => {
        //   this.psiOrderDetailsList = r.data;
        // });
        this.$http.get('/psi/order/info/approve/list', {orderId: this.order.id}, r => {
          this.orderApproveList = r.data;
        });
      }
    },
    watch: {},
    computed: {},
    filters: {
      unit(item, val) {
        return ItemUtil.format(item, val);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .form_content {
    color: #17c295;
  }

  .form_content {
    color: #17c295;
  }

  .stamp {
    font-size: 18px;
    position: absolute;
    right: 10px;
    top: -20px;
    z-index: 100;
    transform: rotate(-30deg);
  }

  .stamp_yes {
    padding: 6px 12px;
    color: green;
    border: double 3px;
  }

  .stamp_no {
    padding: 6px 12px;
    color: red;
    border: double 3px;
  }

  .stamp_not_excute {
    padding: 6px 12px;
    color: #F39C12;
    border: double 3px;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
  }
  .dialog{
    height:600px !important;
  }
</style>
