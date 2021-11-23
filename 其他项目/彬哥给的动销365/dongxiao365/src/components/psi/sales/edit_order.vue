<template>
  <div>
    <breadcrumb/>
    <!--按钮区-->
    <div>
      <el-row><h3>销售订单：【{{order.code}}】</h3></el-row>
      <!--第一部分-->
      <el-row>
        <el-form :inline="true" :model="order" ref="ruleForm" :rules="rules">
          <el-row>
            <el-form-item label="客户名称：" prop="customerName">
              <el-input placeholder="请选择客户名称" v-model="order.customerName" suffix-icon="el-icon-arrow-down" @focus="chooseCustomer" :readonly=true></el-input>
            </el-form-item>
            <el-form-item label="可用额度：">
              <el-input placeholder="可用额度" v-model="order.limit" suffix-icon="el-" clearable disabled></el-input>
            </el-form-item>
            <el-form-item label="业务员：" style="padding-left: 13px;">
              <com-choose-user-in-line v-model="order.salesmanId" :text="order.salesmanName"></com-choose-user-in-line>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="下单时间：" prop="orderTime">
              <el-date-picker
                v-model="order.orderTime"
                type="datetime"
                :editable="false"
                clearable
                style="width: 215px;"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="发货仓库：">
              <com-warehouse v-model="order.warehouseId"></com-warehouse>
            </el-form-item>
            <el-form-item label="交货日期：">
              <el-date-picker
                v-model="order.deliverDate"
                type="date"
                :editable="false"
                clearable
                style="width: 215px;"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="收货信息：" style="padding-left: 10px;">
              <el-select v-model="order.deliverAddress" placeholder="请选择" style="width: 525px;">
                <el-option
                  v-for="(item,index) in currentCustomerAddressList"
                  :key="index"
                  :label="item.name+' '+item.tel+' '+item.address"
                  :value="item.name+' '+item.tel+' '+item.address">
                  <span> {{ item.name }} </span>
                  <span> {{ item.tel }} </span>
                  <span style="color: #8492a6; font-size: 13px">{{ item.address }}</span>
                </el-option>
              </el-select>
              <!--<el-input placeholder="收货信息" v-model="order.deliverAddress"  clearable :maxlength="200"></el-input>-->
            </el-form-item>
          </el-row>
        </el-form>
      </el-row>
      <hr>
      <h3>商品信息：</h3>
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
            <el-table-column label="#" width="60px" align="center">
              <template slot-scope="scope">
                <div class="cell" v-text="scope.$index+1"></div>
              </template>
            </el-table-column>
            <el-table-column prop="code" label="商品编码" align="left">
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
            <el-table-column prop="inventoryCount" label="实物总库存" width="100px" align="right">
              <template slot-scope="scope">
                <el-tooltip effect="dark" :content="'1'+scope.row.auxiliaryUnitName+'='+scope.row.unitConvertRatio+''+scope.row.basicUnitName" placement="top-start" v-if="scope.row.enableAuxiliaryUnit">
                  <div>{{scope.row,scope.row.inventoryCount|unit}}</div>
                </el-tooltip>
                <div v-else>
                  {{scope.row,scope.row.inventoryCount|unit}}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="itemCount" label="订购数量" width="220px">
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
                      :rules="[{message: '请选择单位', trigger: 'blur' }]">
                      <com-item-unit v-model="scope.row.itemUnitId" :itemId="scope.row.id" class="input-full"></com-item-unit>
                    </el-form-item>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column prop="wholesalePrice" label="批发价" align="right" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.wholesalePrice |price}}元</span>
              </template>
            </el-table-column>
            <el-table-column prop="amount" label="小计金额" align="right" width="120">
              <template slot-scope="scope">
                {{scope.row| unitPrice}}元
              </template>
            </el-table-column>
            <el-table-column prop="isGift" label="赠品" width="50" align="center">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.isGift"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注">
              <template slot-scope="scope">
                <el-input clearable v-model="scope.row.remark" :maxlength="500"></el-input>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="60" align="center">
              <template slot-scope="scope">
                <el-button type="text" class="text-danger" @click="deleteCommodity(scope.$index)" v-if="scope.$index>0">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </el-row>
      <el-button @click="addCommodity" type="text" size="medium">添加一行</el-button>
      <el-row>
        <div class="pull-right">
          <el-form ref="form" :rules="rules" label-width="100px" class="form-compact-2">
            <el-form-item prop="disSum" label="优惠金额：">
              <div class="el-input el-input--small text-right">
                {{totalAmount - actualAmount}} 元
              </div>
            </el-form-item>
            <el-form-item prop="disSum" label="总金额：">
              <div class="el-input el-input--small text-right">
                {{totalAmount}} 元
              </div>
            </el-form-item>
            <el-form-item label="优惠后金额：" prop="actualAmount" class="text-right">
              <el-number v-model.number="actualAmount" align="right" class="input-large"></el-number>
              元
            </el-form-item>
          </el-form>
        </div>
      </el-row>
      <hr>
      <h3>备注：</h3>
      <el-form ref="form">
        <el-form-item prop="disSum">
          <el-input type="textarea" placeholder="请输入备注,长度在500字以内" :rows="4" v-model="order.remark" :maxlength="500"></el-input>
        </el-form-item>
      </el-form>
      <!--底部-->
      <!--图片-->
      <h3>商品图片：</h3>
      <image-upload v-model="order.pictures"/>
      <br/>
      <el-row>
        <div>
          <el-button @click="$router.back()">返回</el-button>
          <el-button type="primary" @click="onSubmit('ruleForm',false)">保存并新增</el-button>
          <el-button type="primary" @click="onSubmit('ruleForm',true)">保存</el-button>
        </div>
      </el-row>
    </div>
    <!------------弹窗部分---------->
    <el-dialog title="选择商品" :visible.sync="dialog.chooseCommodityVisible" width="800px">
      <com-chose-commodity :visible="dialog.chooseCommodityVisible" :disabledList="commodityIdList" @getChosenItemList="getChosenItemList"></com-chose-commodity>
    </el-dialog>
    <el-dialog title="选择客户" :visible.sync="dialog.chooseCustomerVisible" width="800px">
      <com-choose-cus @defaultValue="defaultValue" @getCustomer="getCustomer"></com-choose-cus>
    </el-dialog>
  </div>
</template>

<script>
  import ComChoseCommodity from '../../inc/choose_item'
  import ImageUpload from '../../lib/image-upload'
  import ComChooseCus from './inc/choose_customer'
  import ComChooseUser from '../../inc/choose_user_by_depart'
  import ComItemAutocmoplete from '../../lib/item-autocomplete'
  import ComChooseUserInLine from '../../lib/use-selector'
  import ItemUtil from '../../../util/itemUtil'
  import ComWarehouse from '../../lib/warehouse'
  import ComItemUnit from '../../lib/item-unit'

  export default {
    components: {
      ComChoseCommodity, ImageUpload, ComChooseCus, ComChooseUser, ComItemAutocmoplete, ComChooseUserInLine, ComWarehouse, ComItemUnit
    },
    data() {
      return {
        // 单位
        units: [],
        // 仓库
        warehouse: [],
        // 订单
        order: {
          id: 0,
          orderDetailsRequestList: [],
          pictures: [],
          disSum: 0.00,
          actualAmount: 0.00,
          deliverAddress: '',
          orderTime: new Date(),
          deliverDate: new Date()
        },
        currentCustomerAddressList: [],
        dynamicValidateForm: {
          commodityList: []
        },
        // 动态添加商品列表
        getItemChosenList: [], // 从组件中接受的商品集合
        dialog: {  // 弹窗
          chooseCommodityVisible: false,
          chooseCustomerVisible: false,
          chooseSalesmanVisible: false
        },
        index: null, // 当前表单选择商品的行的下标
        labelPosition: 'left',
        defaultValue: {}, // 选择客户组件反选默认值
        /* fetch_suggestions----start*/
        products: [],
        state: "",
        indexForCodeSearch: 0,
        actualAmount: 0, // 优惠后金额
        preferentialAmount: 0, // 优惠金额
        /* -----页面数据校验------*/
        rules: {
          customerName: [
            {required: true, message: '请选择客户名称', trigger: 'change'}
          ],
          orderTime: [
            {required: true, message: '请选择下单时间', trigger: 'blur'}
          ],
          actualAmount: [
            {type: 'number', message: '请输入数字', trigger: 'change'}
          ]
        }
      }
    },
    mounted() {
      this.order.id = this.$route.query.id;
      this.loadData();
    },
    methods: {
      // 加载数据
      loadData() {
        this.$http.get('psi/order/info', {orderId: this.order.id}, r => {
          this.order = r.data;
          this.$http.get('psi/order/item/detail', {orderId: this.order.id}, r => {
            const list = r.data;
            // 处理商品列表
            for (let i = 0, len = list.length; i < len; i++) {
              const item = list[i];
              this.$http.get('psi/stock/itemCountWarehouse', {warehouseId: this.order.warehouseId, itemId: list[i].itemId}, r => {
                item.inventoryCount = r.data;
              });
              item.id = item.itemId;
              item.code = item.itemCode;
              item.wholesalePrice = item.orderPrice;
              item.name = item.itemName;
              this.dynamicValidateForm.commodityList.push(item);
            }
          })
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
      onSubmit(formName, back) {
        // 商品信息校验
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$refs.dynamicValidateForm.validate((valid) => {
              if (valid) {
                this.submit(back);
              }
            });
          }
        });
      },
      // 订单确认
      submit(back) {
        this.order.orderDetailsRequestList = [];
        for (let i = 0; i < this.dynamicValidateForm.commodityList.length; i++) {
          const item = {};
          const tmpItem = this.dynamicValidateForm.commodityList[i];
          item.orderId = this.order.id;
          item.itemId = tmpItem.id;
          item.itemCount = ItemUtil.toBase(tmpItem, tmpItem.itemUnitId, tmpItem.itemCount);
          item.isGift = tmpItem.isGift;
          item.remark = tmpItem.remark;
          this.order.orderDetailsRequestList.push(item);
        }
        // 设置订单的总金额,优惠后金额
        if (this.actualAmount === '' || this.actualAmount === null) {
          this.order.actualAmount = 0;
        } else {
          this.order.actualAmount = this.actualAmount;
        }

        if (this.order.totalAmount === '' || this.order.totalAmount === null) {
          this.order.totalAmount = 0;
        } else {
          this.order.totalAmount = this.totalAmount;
        }

        this.$http.post('/psi/order/edit', this.order, r => {
          this.$message({
            type: "success",
            message: "编辑成功!"
          });
          if (back) { this.$router.back(); } else { location.reload(); }
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
        const price = item.wholesalePrice;
        const count = item.itemCount;
        const unitId = item.itemUnitId;
        if (price > 0 && count > 0) {
          const baseCount = ItemUtil.toBase(item, unitId, count);
          const sum = baseCount * price;
          return Math.round(sum / 100).toFixed(0);
        }
        return 0;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .form-compact-2 {
    .el-form-item--small.el-form-item {
      margin-bottom: 5px;
    }
  }
</style>
