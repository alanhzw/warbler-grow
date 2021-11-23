<template>
  <div>
    <breadcrumb/>
    <!--按钮区-->
    <el-row>
      <div class="text-right">
        <el-button @click="$router.back()">返回</el-button>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </div>
    </el-row>
    <el-row><h3>基本信息：</h3></el-row>
    <!------------第一部分-------------->
    <el-row>
      <el-form :inline="true" :model="order">
        <el-form-item label="客户名称：">
          <el-input placeholder="客户名称" v-model="order.customerName" clearable>
            <!--<el-button slot="append" icon="el-icon-caret-bottom" @click="choseCustomer"></el-button>-->
          </el-input>
        </el-form-item>

        <el-form-item label="客户id:">
          <el-input placeholder="客户id" v-model="order.customerId" clearable>
          </el-input>
        </el-form-item>
        <!--<el-form-item label="可用额度：">-->
        <!--<el-input placeholder="可用额度" v-model="order.limit"  clearable></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="下单时间：">
          <el-date-picker
            v-model="order.orderTime"
            type="datetime"
            clearable
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="业务员：">
          <el-input placeholder="业务员id" v-model="order.salesman" clearable>
            <!--<el-button slot="append" icon="el-icon-caret-bottom" @click=""></el-button>-->
          </el-input>
        </el-form-item>

        <el-form-item label="业务员名字：">
          <el-input placeholder="业务员名字" v-model="order.salesman" clearable>
            <!--<el-button slot="append" icon="el-icon-caret-bottom" @click=""></el-button>-->
          </el-input>
        </el-form-item>
        <el-form-item label="发货仓库：">
          <el-input placeholder="发货仓库" v-model="order.deliveryWarehouse" clearable>
            <!--<el-button slot="append" icon="el-icon-caret-bottom" @click=""></el-button>-->
          </el-input>
        </el-form-item>
        <el-form-item label="交货日期：">
          <el-date-picker
            v-model="order.deliveryDate"
            type="date"
            clearable
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="收货信息：">
          <el-input placeholder="收货信息" v-model="order.receivingAddress" clearable style="width:600px">
            <el-button slot="append" icon="el-icon-caret-bottom" @click="">选择收货地址</el-button>
          </el-input>
        </el-form-item>
      </el-form>
    </el-row>
    <br/>
    <hr>
    <el-row><h3>商品信息：</h3></el-row>
    <!-------------------按钮--------------->
    <el-row>
      <el-button @click="addCommodity" icon="el-icon-plus" type="primary">新增商品</el-button>
      <el-button @click="resetTableList('dynamicValidateForm')" type="danger">重置</el-button>
    </el-row>
    <br/>
    <br/>
    <!--表格-->
    <el-row>
      <el-table
        :data="commodityList"
        stripe
        border
        show-summary
        style="width: 100%">
        <el-table-column sortable label="选择" width="60px">
          <template slot-scope="scope">
            <el-button icon="el-icon-plus" v-show="!scope.row.name" @click="chooseCommodity(scope.$index)"></el-button>
          </template>
        </el-table-column>
        <el-table-column sortable prop="code" label="商品编码"></el-table-column>
        <el-table-column sortable prop="name" label="商品名称"></el-table-column>
        <el-table-column sortable prop="specificationAttribute" label="规格属性"></el-table-column>
        <el-table-column sortable prop="unit" label="单位">
          <template slot-scope="scope">
            <el-select v-model="scope.row.unit" placeholder="请选择" clearable>
              <el-option
                v-for="item in scope.row.units"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column sortable prop="inventory" label="实物库存"></el-table-column>
        <el-table-column sortable prop="saleInventory" label="可销售库存"></el-table-column>
        <el-table-column sortable prop="number" label="数量">
          <template slot-scope="scope">
            <el-input clearable v-model="scope.row.number"></el-input>
          </template>
        </el-table-column>
        <el-table-column sortable prop="orderPrice" label="订货价">
          <template slot-scope="scope">
            <el-input clearable v-model="scope.row.orderPrice"></el-input>
          </template>
        </el-table-column>
        <el-table-column sortable prop="amount" label="金额">
          <template slot-scope="scope">
            <el-input clearable v-model="scope.row.amount"></el-input>
          </template>
        </el-table-column>
        <el-table-column sortable prop="isPresent" label="赠品">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.isPresent"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column sortable prop="remark" label="备注">
          <template slot-scope="scope">
            <el-input clearable v-model="scope.row.remark"></el-input>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" class="text-danger" @click="deleteCommodity(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <br/>
    <el-form :label-position="labelPosition" label-width="90px">
      <el-row>
        <el-col :span="4" :offset="20">
          <el-form-item label="优惠金额：">
            <el-input clearable v-model="order.preferentialAmount" style="width: 80px"></el-input>
            <span>元</span>
          </el-form-item>
          <el-form-item label="优惠后金额：">
            <el-input clearable v-model="order.amount" style="width: 80px"></el-input>
            <span>元</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <hr>
    <!--底部-->
    <br/>
    <el-row><h3>备注：</h3></el-row>
    <el-row>
      <el-input
        type="textarea"
        :rows="6"
        placeholder="请输入备注,长度在500字以内"
        :maxlength="500"
        v-model="order.remark">
      </el-input>
    </el-row>
    <!--图片-->
    <el-row>
      <h3>商品图片：&nbsp;<span style="color: #909399;font-size: 15px ">最多上传10张图片,建议图片尺寸框1242*高934,支持图片格式JPG/JPEG,没唱图片大小不超过2M</span></h3>
      <ImageUpload v-model="order.pictures"/>
    </el-row>
    <!--图片展示区-->
    <br/>
    <el-row>
      <div>
            <span v-for="item  in order.pictures">
               <a :href="item" target="_blank"> <img :src="item" style="height: 100px;width: 100px"/></a>&nbsp;
            </span>
      </div>
    </el-row>
    <!------------弹窗部分---------->
    <el-dialog title="选择商品" :visible.sync="dialog.chooseCommodityVisible" width="800px">
      <com-chose-commodity @getCommodity="getCommodity"></com-chose-commodity>
    </el-dialog>
    <el-row>
      <pre>{{stringList}}</pre>
    </el-row>
  </div>
</template>

<script>
  import ComChoseCommodity from '../../inc/choose_commodity'
  import ComUpPicture from './inc/upload_picture'
  import ImageUpload from '../../lib/image-upload'

  export default {
    components: {
      ComChoseCommodity, ComUpPicture, ImageUpload
    },
    data() {
      return {
        // 订单
        order: {
          pictures:
            [
              "https://static.dingtalk.com/media/lADPBY0V4vRn0q_NBaDNCgA_2560_1440.jpg",
              "http://k2.jsqq.net/uploads/allimg/1711/17_171120091726_1.jpg"
            ]
        },
        commodityList: [],        // 动态添加商品列表
        dialog: {  // 弹窗
          chooseCommodityVisible: false
        },
        index: null, // 当前表单选择商品的行的下标
        labelPosition: 'left'
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      /* -----------动态表格------------------*/
      /* 添加商品*/
      addCommodity() {
        this.commodityList.push({});
      },
      /* 删除商品*/
      deleteCommodity(index) {

        this.commodityList.splice(index, 1);
      },
      /* 重置商品列表*/
      resetTableList() {
        this.commodityList = [];
      },
      // 选择商品
      chooseCommodity(index) {

        this.dialog.chooseCommodityVisible = true;
        this.index = index;
      },
      // 从组件中获取选中的商品
      getCommodity(msg) {
        if (msg) {
          this.commodityList.splice(this.index, 1);
          this.commodityList.push(msg);
        }
        this.index = null;
        this.dialog.chooseCommodityVisible = false;
      },
      // 订单确认提交
      onSubmit() {
        this.order.commodityList = this.commodityList;
        this.$http.post('/psi/order/add', this.order, r => {
        })
      },
      // 选择客户
      choseCustomer() {
        this.$http.get('/crm/customer/simple', r => {
        })
      }
    },
    watch: {},
    computed: {
      stringList: function () {
        return JSON.stringify(this.commodityList, null, 4);
      }
    }
  }
</script>

<style scoped>

</style>
