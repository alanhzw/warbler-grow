<template>
  <div>
    <breadcrumb/>
    <h3>基本信息：</h3>
    <!------------第一部分-------------->
    <el-form :inline="true" :model="order" ref="ruleForm" :rules="rules" label-width="110px">
      <el-row>
        <el-form-item label="单据类型：" prop="returnType">
          <el-select v-model="order.returnType" placeholder="单据类型">
            <el-option
              v-for="item in returnType"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="结算状态：" prop="settleAccountsStatus">
          <el-select v-model="order.settleAccountsStatus" placeholder="请选择结算状态">
            <el-option
              v-for="item in settleAccountsStatus"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="客户名称：" prop="customerName">
          <el-input placeholder="请选择客户" suffix-icon="el-icon-arrow-down" v-model="order.customerName" @focus="dialog.chooseCustomerVisible = true"></el-input>
        </el-form-item>
        <el-form-item label="退换货人：" prop="returnUser">
          <el-input placeholder="" suffix-icon="el-" v-model="order.returnUser" :maxlength="8" clearable></el-input>
        </el-form-item>
        <el-form-item label="退换货人电话：" prop="returnUserPhone">
          <el-input placeholder="" suffix-icon="el" v-model="order.returnUserPhone" :maxlength="11" clearable></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="退换货地址：" prop="returnAddress">
          <el-input placeholder="" v-model="order.returnAddress" :maxlength="250" clearable style="width:555px"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="退换货日期：" prop="returnDate">
          <el-date-picker
            v-model="order.returnDate"
            type="date"
            clearable
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="收货仓库：" prop="receiptWarehouse">
          <com-warehouse v-model="order.receiptWarehouse"></com-warehouse>
        </el-form-item>
        <el-form-item label="业务员：" prop="salesmanName">
          <com-chouse-user-inline v-model="order.salesmanId" :text="order.salesmanName"></com-chouse-user-inline>
        </el-form-item>
      </el-row>
    </el-form>
    <hr>
    <el-row><h3>商品信息：</h3></el-row>
    <!-------------------按钮--------------->
    <el-row>
      <el-button type="primary" icon="el-icon-plus" @click="chooseCommodity()">选择商品</el-button>
    </el-row>
    <br/>
    <!--表格-->
    <el-row>
      <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="0px" class="table-dynamic-form">
        <el-table
          :data="dynamicValidateForm.commodityList"
          stripe
          border
          style="width: 100%">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="code" label="商品编码">
            <template slot-scope="scope">
              <el-form-item
                :prop="'commodityList.' + scope.$index + '.code'"
                :rules="[{ required: true, message: '请输入商品编码', trigger: 'blur' }]">
                <com-item-autocmoplete :exclude="dynamicValidateForm.commodityList" v-model="scope.row" :data="scope.$index" @select="handleSelect"></com-item-autocmoplete>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="商品名称"></el-table-column>
          <el-table-column prop="specification" label="规格属性"></el-table-column>
          <el-table-column prop="inventoryCount" label="实物库存" width="100px" align="right">
            <template slot-scope="scope">
              <el-tooltip effect="dark" :content="'1'+scope.row.auxiliaryUnitName+'='+scope.row.unitConvertRatio+''+scope.row.basicUnitName" placement="top-start" v-if="scope.row.enableAuxiliaryUnit">
                <div>{{scope.row,scope.row.inventoryCount|unit}}</div>
              </el-tooltip>
              <div v-else>
                {{scope.row,scope.row.inventoryCount|unit}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="itemCount" label="退换货数量" width="220px">
            {{commodityList}}
            <template slot-scope="scope">
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item
                    :prop="'commodityList.' + scope.$index + '.itemCount'"
                    :rules="[{ required: true, message: '请输入订购数量', trigger: 'blur' }]">
                    <el-number v-model.number="scope.row.itemCount" :min="1" align="right" class="input-full"></el-number>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    :prop="'commodityList.' + scope.$index + '.itemUnitId'"
                    :rules="[{ required: true, message: '请选择单位', trigger: 'blur' }]">
                    <com-item-unit v-model="scope.row.itemUnitId" :itemId="scope.row.id" class="input-full"></com-item-unit>
                  </el-form-item>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column prop="returnPrice" label="退货价" v-if="order.returnType === 1">
            <template slot-scope="scope">
              <el-form-item
                :prop="'commodityList.' + scope.$index + '.returnPrice' | price"
                :rules="[{ required: true, message: '请输入退货价格', trigger: 'blur' }]">
                <el-number v-model.number="scope.row.returnPrice" :min="1" align="center" class="input-full">
                </el-number>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="itemAmount" label="金额" width="100" align="center" v-if="order.returnType === 1">
            <template slot-scope="scope">
              {{scope.row | unitPrice}}元
            </template>
          </el-table-column>
          <el-table-column prop="isPresent" label="赠品" width="60" align="center">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.isGift"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注">
            <template slot-scope="scope">
              <el-input clearable v-model="scope.row.remark" :maxlength="500"></el-input>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="80" align="center">
            <template slot-scope="scope">
              <el-button type="button" class="text-danger" v-if="scope.$index>0" @click="deleteCommodity(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <el-button @click="addCommodity" type="text" size="medium">添加一行</el-button>
    </el-row>
    <el-form :inline="true" :model="order" ref="ruleForm" :rules="rules" label-width="110px">
       <el-row v-if="order.returnType===1">
          <div class="pull-right">
            <el-form-item label="订单金额：" prop="totalAmount" :rules="[{ required: true, message: '请填写订单金额', trigger: 'blur' }]">
              <el-number v-model.number="order.totalAmount" align="center" class="input-large"></el-number>
              元
            </el-form-item>
          </div>
        </el-row>
      </el-form>


    <el-row><h3>备注：</h3></el-row>
    <el-row>
      <el-input
        type="textarea"
        :rows="6"
        placeholder="请输入备注,长度在500字以内"
        v-model="order.remark"
        :maxlength="500">
      </el-input>
    </el-row>
    <br/>
    <el-row>
      <div>
        <el-button @click="$router.back()" class="text-info">返回</el-button>
        <el-button type="primary" @click="onSubmit('ruleForm')">保存</el-button>
      </div>
    </el-row>
    <!------------弹窗部分---------->
    <el-dialog title="选择商品" :visible.sync="dialog.chooseCommodityVisible" width="800px">
      <com-chose-commodity @getChosenItemList="getChosenItemList"></com-chose-commodity>
    </el-dialog>

    <el-dialog title="客户选择" :visible.sync="dialog.chooseCustomerVisible" width="800px">
      <com-chose-cus @getCustomer="getCustomer"></com-chose-cus>
    </el-dialog>
  </div>
</template>

<script>
  import ComChoseCommodity from '../../inc/choose_item'
  import ComChoseCus from '../../inc/choose_customer'
  import ComChouseUserInline from '../../lib/use-selector'
  import ComWarehouse from '../../lib/warehouse'
  import ComItemUnit from '../../lib/item-unit'
  import ItemUtil from '../../../util/itemUtil'
  import ComItemAutocmoplete from '../../lib/item-autocomplete'

  export default {
    components: {
      ComChoseCommodity, ComChoseCus, ComWarehouse, ComChouseUserInline, ComItemAutocmoplete, ComItemUnit
    },
    data() {
      return {
        // 退换货单
        returnType: [{"name": "退货单", "value": 1}, {"name": "换货单", "value": 2}],
        settleAccountsStatus: [{"name": "已结算", "value": 1}, {"name": "未结算", "value": 0}],
        order: {psiReturnDetailsRequestList: [], totalAmount: ''},
        dynamicValidateForm: {
          commodityList: []
        },
        getItemChosenList: [], // 从组件中接受的商品集合
        dialog: {  // 弹窗
          chooseCommodityVisible: false,
          chooseCustomerVisible: false
        },
        rules: {
          returnType: [{required: true, message: '请选择单据类型', trigger: 'blur'}],
          settleAccountsStatus: [{required: true, message: '结算状态', trigger: 'blur'}],
          returnUser: [{required: true, message: '请填写退换货人', trigger: 'blur'}],
          returnDate: [{required: true, message: '请选择退换货日期', trigger: 'blur'}],
          customerName: [{required: true, message: '请选择客户名称', trigger: 'blur'}]
        }
      }
    },
    created() {
      this.order.id = this.$route.query.id;
    },
    mounted() {
      this.loadData();
      this.loadItem();
    },
    methods: {
      loadData() {
        this.$http.get('psi/return/info', {id: this.order.id}, r => {
          this.order = r.data;
          this.order.totalAmount = r.data.totalAmount / 100
        });
      },
      loadItem() {
        this.$http.get('psi/return/info/details/list', {id: this.order.id}, r => {
          const list = r.data;
           console.log('count', r.data)
          // 处理商品列表
          for (let i = 0, len = list.length; i < len; i++) {
            const item = list[i];
            item.returnPrice /= 100;
             item.wholesalePrice = item.orderPrice;
             item.name = item.itemName;
             item.id = item.itemId;
             item.code = item.itemCode;


            this.$http.get('psi/stock/count', {itemId: list[i].itemId}, r => {

              item.inventoryCount = r.data;


               this.dynamicValidateForm.commodityList.push(item);


            });
          }
        });
      },
      /* 添加商品*/
      addCommodity() {
        this.dynamicValidateForm.commodityList.push({itemCount: 1});
      },
      /* 删除商品*/
      deleteCommodity(index) {
        this.dynamicValidateForm.commodityList.splice(index, 1);
      },
      // 选择商品
      chooseCommodity(index) {
        this.dialog.chooseCommodityVisible = true;
        this.index = index;
      },
      // 订单确认提交
      onSubmit(formName) {
        // 商品信息校验
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$refs.dynamicValidateForm.validate((valid) => {
              if (valid) {
                this.submit();
              }
            });
          }
        });
      },
      // 订单确认
      submit() {
        this.order.psiReturnDetailsRequestList = [];
        for (let i = 0; i < this.dynamicValidateForm.commodityList.length; i++) {
          const item = {};
          const tmpItem = this.dynamicValidateForm.commodityList[i];
          item.returnPrice = tmpItem.returnPrice;
          item.itemCount = ItemUtil.toBase(tmpItem, tmpItem.itemUnitId, tmpItem.itemCount);
          item.isGift = tmpItem.isGift;
          item.remark = tmpItem.remark;
          this.order.psiReturnDetailsRequestList.push(item);
        }
        // 设置订单的总金额,优惠后金额
        if (this.actualAmount === '' || this.actualAmount === null) {
          this.order.actualAmount = 0;
        } else {
          this.order.actualAmount = this.actualAmount;
        }

        // if (this.order.totalAmount === '' || this.order.totalAmount === null) {
        //   this.order.totalAmount = 0;
        // } else {
        //   this.order.totalAmount = this.totalAmount;
        // }
        // this.order.totalAmount = this.order.totalAmount
        this.$http.post('/psi/return/edit', this.order, r => {
          this.$message({
            type: "success",
            message: "保存成功!"
          });
          this.$router.back();
        });
      },
      // 从组件中获取客户
      getCustomer(msg) {
        this.order.customerName = msg.name;
        this.order.customerId = msg.id;
        this.order.deliverAddress = '';
        // this.currentCustomerAddressList = [];
        if (msg.addressList) { this.currentCustomerAddressList = JSON.parse(msg.addressList); } else { this.currentCustomerAddressList = []; }

        this.dialog.chooseCustomerVisible = false;
      },
      // 选择客户事件
      chooseCustomer() {
        this.dialog.chooseCustomerVisible = true;
      },
      handleChooseDeliverAddress(val) {
        const add = this.currentCustomerAddressList[val]

      },
      // 选择上报人
      handleChooseUserOK(userList) {
        if (userList && userList.length > 0) {
          const user = userList[0];
          this.order.salesmanId = user.userid;
          this.order.salesmanName = user.name;
        }
      },
      // 从组组件中获取商品
      getChosenItemList(items) {
        if (items && items.length > 0) {
          items.forEach(o => {
            this.mergeItemList(o);
          });
        }
        this.dialog.chooseCommodityVisible = false;
      },
      handleSelect(item, data) {
        item.itemCount = 1;
        this.dynamicValidateForm.commodityList.splice(data, 1, item)
      },
      mergeItemList(item) {
        let emptyIndex = -1;
        item.itemCount = 1;
        for (let i = 0, len = this.dynamicValidateForm.commodityList.length; i < len; i++) {
          const obj = this.dynamicValidateForm.commodityList[i];
          if (!obj.id) {
            emptyIndex = i;
            break;
          }
        }
        // 如果没有空位了，我就新增一行
        if (emptyIndex === -1) {
          this.dynamicValidateForm.commodityList.push(item);
        } else {
          // 有位子的话，就是我了
          this.dynamicValidateForm.commodityList.splice(emptyIndex, 1, item)
        }
      },
      calcDisAmount() {
        let totalAmount = 0;
        this.dynamicValidateForm.commodityList.forEach(item => {
          const price = item.wholesalePrice;
          const count = item.itemCount;
          const unitId = item.itemUnitId;
          if (price > 0 && count > 0) {
            const baseCount = ItemUtil.toBase(item, unitId, count);
            totalAmount += baseCount * price;
          }
        });
        this.actualAmount = Math.round(totalAmount / 100).toFixed(0);
        return Math.round(totalAmount / 100).toFixed(0);
      }
    },
    computed: {
      commodityIdList() {
        if (this.dynamicValidateForm.commodityList && this.dynamicValidateForm.commodityList.length > 0) {
          const ids = [];
          this.dynamicValidateForm.commodityList.forEach(r => {
            if (r && r.id) {
              ids.push(r.id);
            }
          });
          return ids;
        }
        return null;
      },
      totalAmount: function () {
        return this.calcDisAmount();
      }
    },
    filters: {
      unit(item, val) {
        return ItemUtil.format(item, val);
      },
      unitPrice(item) {
        const price = item.returnPrice;
        const count = item.itemCount;
        const unitId = item.itemUnitId;
        if (price > 0 && count > 0) {
          const baseCount = ItemUtil.toBase(item, unitId, count);
          return baseCount * price;
        }
        return 0;
      }
    }
  }
</script>

<style scoped>

</style>
