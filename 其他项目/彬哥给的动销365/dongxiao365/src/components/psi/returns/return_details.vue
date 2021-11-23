<template>
  <div>
    <com-info :id="infoId"></com-info>
    <breadcrumb/>
    <br/>
    <!--第一部分-->
    <!--头部按钮-->
    <el-row>
      <el-col :span="12">
        <span class="title">{{order.returnType | returnType}}：</span><span>【{{order.code}}】</span>
      </el-col>
      <el-col :span="12" align="end">
        <el-button @click="back" class="text-primary">返回</el-button>
      </el-col>
    </el-row>
    <!--表单-->
    <el-row>
      <br/>
      <el-form :inline="true" :model="order">
        <el-form-item label="客户名称："><span class="form_content">{{order.customerName}}</span></el-form-item>
        <el-form-item label="客户编码："><span class="form_content">{{order.customerCode}}</span></el-form-item>
        <el-form-item label="业务员："><span class="form_content">{{order.salesmanName}}</span></el-form-item>
        <el-form-item label="收货仓库："><span class="form_content">{{order.receiptWarehouseName}}</span></el-form-item>
        <el-form-item label="退换货日期："><span class="form_content">{{order.returnDate |date}}</span></el-form-item>
        <el-form-item label="退货人："><span class="form_content">{{order.returnUser}}</span></el-form-item>
        <el-form-item label="联系方式："><span class="form_content">{{order.returnUserPhone}}</span></el-form-item>
        <el-form-item label="结算状态："><span class="form_content">{{order.settleAccountsStatus | settleAccountsStatus}}</span></el-form-item>
      </el-form>
    </el-row>
    <!--印章-->
    <el-row>
      <span class="title">商品清单：</span>
    </el-row>
    <br/>
    <!---表格-->
    <el-row>
      <div class="stamp">
        <div class="stamp_yes animated bounceIn" v-show="order.result === 1">已批准</div>
        <div class="stamp_no animated bounceIn" v-show="order.result === -1">驳回</div>
        <div class="stamp_not_excute animated bounceIn" v-show="order.result === 0">未审批</div>
      </div>
      <el-table
        :data="itemList"
        class="table-compact"
        ref="multipleTable"
        border
        style="width: 100%">
        <el-table-column sortable prop="itemCode" label="商品编码"></el-table-column>
        <el-table-column sortable prop="itemName" label="商品名称"></el-table-column>
        <el-table-column sortable prop="specification" label="规格属性"></el-table-column>
        <el-table-column sortable prop="itemCount" label="退换数量">
          <template slot-scope="scope">
            {{scope.row,scope.row.itemCount|unit}}
          </template>
        </el-table-column>
        <el-table-column sortable prop="returnPrice" label="退货价" v-if="order.returnType===1">
          <template slot-scope="scope">
            {{scope.row.returnPrice | price}}元
          </template>
        </el-table-column>
        <el-table-column sortable prop="itemAmount" label="金额" v-if="order.returnType===1">
          <template slot-scope="scope">
            {{scope.row.itemAmount | price}}元
          </template>
        </el-table-column>
        <el-table-column sortable prop="remark" label="备注"></el-table-column>
        <el-table-column sortable prop="gift" label="赠品">
          <template slot-scope="scope">
            {{scope.row.isGift?'是':'否'}}
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <br/>
    <!--页面中部-->
    <div class="box-card" v-if="order.returnType===1">
      <el-form :inline="true" :model="order">
        <el-row>
          <el-col :span="18">
            <el-form-item label="备注："><span class="form_content">{{order.remark}}</span></el-form-item>
          </el-col>
          <el-col :span="6" align="end">
            <el-form-item label="订单金额："><span class="form_content">{{order.totalAmount | price}}元</span></el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <br/>
    <!--页面中部-->
    <br/>
    <el-row>
      <span class="title">审批历程：</span>
    </el-row>
    <br/>
    <el-row>
      <el-table
        :data="approveList"
        class="table-compact"
        ref="multipleTable"
        border
        style="width: 100%">
        <el-table-column prop="approveUser.name" label="处理人"></el-table-column>
        <el-table-column prop="approveResult" label="操作">
          <template slot-scope="scope">
            {{scope.row.approveResult | approveResult}}
          </template>
        </el-table-column>
        <el-table-column prop="comments" label="处理意见"></el-table-column>
        <el-table-column prop="approveTime" label="处理时间">
          <template slot-scope="scope">
            {{scope.row.approveTime | date}}
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!--弹窗部分-->
  </div>
</template>

<script>
  import ItemUtil from '../../../util/itemUtil'
  import ComInfo from '../returns/return_details'

export default {
    props: {
      infoId: {
        type: String,
        default: ''
      }
    },
    components: {
      ComInfo
    },
    data() {
      return {
        title: '',
        order: {
        }, // 订单详情
        itemList: [], // 订单详情
        approveList: [], // 订单详情
        approve: {}, // 审批
        dialog: {
          approveVisible: false,
          rejectVisible: false
        },
        approveOpinion: '',
        rejectOpinion: ''
      }
    },
    mounted() {
      this.loadData();
    },
    methods: {
      // 返回按钮
      back() {
         this.$emit('closeDia')
      },
      // 加载数据
      loadData() {
        this.$http.get('psi/return/info', {id: this.infoId}, r => {
          this.order = r.data;
        });
        this.$http.get('psi/return/info/details/list', {id: this.infoId}, r => {
          this.itemList = r.data;
        });
        this.$http.get('psi/return/info/approve/list', {id: this.infoId}, r => {
          this.approveList = r.data;
        });
      }
    },
    filters: {
      unit(item, val) {
        return ItemUtil.format(item, val);
      },
      // 单据类型
      returnType: function (val) {
        if (val === 1) {
          return "退货单"
        } else if (val === 2) {
          return "换货单"
        } else {
          return '退/换货单';
        }
      },
      // 结算状态
      settleAccountsStatus: function (val) {
        if (val === 1) {
          return "已结算"
        }
        if (val === 0) {
          return "未结算"
        }
      },
      // 审批状态
      approveResult: function (val) {

        if (val === 1) {
          return "审批通过"
        }
        if (val === -1) {
          return "驳回"
        }
        if (val === 2) {
          return "录入"
        }
        if (val === 3) {
          return "编辑"
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
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
</style>
