<template>
  <div>
    <breadcrumb/>
    <br/>
    <!--------------第一部分--------------->
    <!--头部按钮-->
    <el-row>
      <el-col :span="12">
        <span class="title">销售订单：</span><span>【{{order.code}}】</span>
      </el-col>
      <el-col :span="12" class="text-right">
        <el-button type="primary" @click="dialog.approveVisible = true" v-show="order.approvalStatus === 0">审批通过</el-button>
        <el-button type="warning" @click="dialog.rejectVisible = true" v-show="order.approvalStatus === 0">打回</el-button>
        <el-button type="info" @click="edit" v-show="order.approvalStatus !== 1">修改</el-button>
        <el-button type="danger" @click="closeOne" v-show="order.approvalStatus !== 1">关闭订单</el-button>
        <el-button @click="$router.back()">返回</el-button>
      </el-col>
    </el-row>
    <!--表单-->
    <el-row>
      <br/>
      <el-form :inline="true" :model="order">
        <el-form-item label="客户名称："><span class="form_content">{{order.customerName}}</span></el-form-item>
        <!--<el-form-item label="可用额度："><span class="form_content">{{order.limit}}</span></el-form-item>-->
        <el-form-item label="下单时间："><span class="form_content">{{order.orderTime | date}}</span></el-form-item>
        <el-form-item label="业务员："><span class="form_content">{{order.salesmanName}}</span></el-form-item>
        <el-form-item label="发货仓库："><span class="form_content" v-if="order.psiWarehouse">{{order.psiWarehouse.name}}</span></el-form-item>
        <el-form-item label="交货日期："><span class="form_content">{{order.deliverDate | date}}</span></el-form-item>
        <el-form-item label="收货地址："><span class="form_content">{{order.deliverAddress}}</span></el-form-item>
      </el-form>
    </el-row>
    <!-----------表格--------->
    <el-row>
      <!--印章-->
      <div class="stamp">
        <div class="stamp_yes animated bounceIn" v-show="order.approvalStatus === 1">已批准</div>
        <div class="stamp_no animated bounceIn" v-show="order.approvalStatus === 2">驳回</div>
        <div class="stamp_not_excute animated bounceIn" v-show="order.approvalStatus === 0">未审批</div>
      </div>
      <el-table
        :data="psiOrderDetailsList"
        class="table-compact"
        ref="multipleTable"
        border
        style="width: 100%">
        <el-table-column sortable prop="itemCode" label="商品编码" width="130"></el-table-column>
        <el-table-column sortable prop="itemName" label="商品名称" width="130"></el-table-column>
        <el-table-column sortable prop="specification" label="规格属性"></el-table-column>
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
            {{scope.row.orderPrice | price}}/{{scope.row.basicUnitName }}
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
    <!------------页面中部------------->
    <el-card class="box-card">
      <el-form :inline="true" :model="order">
        <el-row>
          <el-col :span="18">
            <el-form-item label="备注："><span class="form_content">{{order.remark}}</span></el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="优惠金额："><span class="form_content">{{order.disAmount |price}}</span></el-form-item>
            <el-form-item label="优惠后金额："><span class="form_content">{{order.actualAmount |price}}</span></el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <br/>
    <el-row>
      <div>
        <span class="title">订单图片：</span>
        <div v-if="order.pictures">
          <gallery-inline :data="order.pictures"/>
        </div>
      </div>
    </el-row>

    <br/>
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
    <!--------------弹窗部分--------------->
    <el-dialog title="审批意见" :visible.sync="dialog.approveVisible" width="800px">
      <el-input
        type="textarea"
        :rows="4"
        placeholder="请输入审批意见,长度在500字以内"
        :maxlength="500"
        v-model="approveOpinion">
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.approveVisible=false">取 消</el-button>
        <el-button type="primary" @click="approveOk">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="驳回意见" :visible.sync="dialog.rejectVisible" width="800px">
      <el-input
        type="textarea"
        :rows="4"
        placeholder="请输入驳回意见,长度在500字以内"
        :maxlength="500"
        v-model="rejectOpinion">
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.rejectVisible=false">取 消</el-button>
        <el-button type="primary" @click="reject">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import GalleryInline from '../../lib/gallery-inline'
  import ItemUtil from '../../../util/itemUtil'

  export default {
    components: {GalleryInline},
    data() {
      return {
        order: {
          id: 0
        },
        orderApproveList: [],
        psiOrderDetailsList: [],
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
    },
    methods: {
      // 加载数据
      // 加载数据
      loadData() {
        this.$http.get('/psi/order/info', {orderId: this.order.id}, r => {
          this.order = r.data;
        });

        this.$http.get('/psi/order/item/detail', {orderId: this.order.id}, r => {
          this.psiOrderDetailsList = r.data;
        });

        this.$http.get('/psi/order/info/approve/list', {orderId: this.order.id}, r => {
          this.orderApproveList = r.data;
        });
      },
      // 批准
      approveOk() {
        this.dialog.approveVisible = false;
        const params = {};
        params.comments = this.approveOpinion;
        params.orderId = this.order.id;

        this.$http.post('psi/order/approve/pass', params, r => {

          this.$message = {
            type: "success",
            message: "审批成功"
          };
          this.loadData(this.order);
        })
      },
      // 驳回
      reject() {
        this.dialog.rejectVisible = false;
        const params = {};
        params.comments = this.rejectOpinion;
        params.orderId = this.order.id;
        this.$http.post('psi/order/approve/reject', params, r => {

          this.$message = {
            type: "success",
            message: "审批成功"
          };
          this.loadData(this.order);
        })
      },
      // 关闭
      closeOne() {
        this.$http.post('psi/order/approve/close', {id: this.order.id}, r => {
          this.$message({
            type: "warning",
            message: "关闭成功"
          });
          setTimeout(() => {
            this.$router.back();
          }, 1000)
        })
      },
      // 修改
      edit() {
        this.$router.push({path: '/psi/sales/editOrder', query: {id: this.order.id}});
      }
    },
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
</style>
