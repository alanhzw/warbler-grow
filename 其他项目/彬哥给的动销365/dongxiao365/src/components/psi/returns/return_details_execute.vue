<template>
  <div>
    <breadcrumb/>
    <br/>
    <!--------------第一部分--------------->
    <!--头部按钮-->
    <el-row>
      <el-col :span="6">
        <span class="title">{{order.returnType | returnType}}：</span><span>【{{order.code}}】</span>
      </el-col>
      <el-col :span="18" class="text-right">
        <el-button type="primary" @click="dialog.approveVisible = true" v-show="order.result === 0 || order.result=== -1 ">审批通过</el-button>
        <el-button type="warning" @click="dialog.rejectVisible = true" v-show="order.result === 0">打回</el-button>
        <el-button type="info" @click="edit" v-show="order.result !== 1">修改</el-button>
        <el-button type="danger" @click="deleteOne" v-show="order.result !== 1">删除</el-button>
        <el-button @click="$router.back()">返回</el-button>
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
    <!-----------表格--------->
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
    <el-row v-if="order.returnType===1">
      <div class="text-right">
        <span>合计： {{this.order.totalAmount | price}} 元</span>
      </div>
    </el-row>
    <!------------页面中部------------->
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
    <!--------------弹窗部分--------------->
    <el-dialog title="审批意见" :visible.sync="dialog.approveVisible" width="500px">
      <el-input
        type="textarea"
        :rows="4"
        placeholder="请输入审批意见,长度在500字以内"
        :maxlength="500"
        v-model=" approve.comments">
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.approveVisible=false">取 消</el-button>
        <el-button type="primary" @click="approveOk">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="驳回意见" :visible.sync="dialog.rejectVisible" width="500px">
      <el-input
        type="textarea"
        :rows="4"
        placeholder="请输入驳回意见,长度在500字以内"
        :maxlangth="500"
        v-model="approve.comments">
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.rejectVisible=false">取 消</el-button>
        <el-button type="primary" @click="reject">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import ItemUtil from '../../../util/itemUtil'

  export default {
    data() {
      return {
        order: {}, // 订单详情
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
    created() {
      this.order.id = this.$route.query.id;
    },
    mounted() {
      this.loadData();
      this.loadItem();
      this.loadApprove();
    },
    methods: {
      // 加载数据
      loadData() {
        this.$http.get('psi/return/info', {id: this.order.id}, r => {
          this.order = r.data;
        });
      },
      loadItem() {
        this.$http.get('psi/return/info/details/list', {id: this.order.id}, r => {
          this.itemList = r.data;
        });
      },
      loadApprove() {
        this.$http.get('psi/return/info/approve/list', {id: this.order.id}, r => {
          this.approveList = r.data;
        });
      },
      // 批准
      approveOk() {
        this.dialog.approveVisible = false;
        this.approve.psiReturnId = this.order.id;
        this.approve.approveResult = true;
        this.loadApprove();
      },
      // 驳回
      reject() {
        this.dialog.rejectVisible = false;
        this.approve.psiReturnId = this.order.id;
        this.approve.approveResult = false;
        this.loadApprove();
      },
      // 删除
      deleteOne() {
        this.$http.post('psi/return/delete', {id: this.order.id}, r => {
          this.$message({
            message: '删除成功！',
            type: 'success'
          });
          this.$router.back();
        })
      },
      // 修改
      edit() {
        this.$router.push({path: '/psi/returns/approved/edit', query: {id: this.order.id}});
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
        }
        if (val === 2) {
          return "换货单"
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
