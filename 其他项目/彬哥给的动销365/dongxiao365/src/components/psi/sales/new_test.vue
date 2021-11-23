<template>
  <div>
    <breadcrumb/>
    <!--按钮区-->
    <div>
      <el-row><h3>基本信息:</h3></el-row>
      <!------------第一部分-------------->
      <el-row>
        <el-form :inline="true" :model="order" ref="ruleForm" :rules="rules">
          <el-form-item label="客户名称：" prop="customerName">
            <el-input placeholder="请选择客户名称" v-model="order.customerName" suffix-icon="el-icon-arrow-down" @focus="chooseCustomer" :readonly=true></el-input>
          </el-form-item>
          <el-form-item label="可用额度：">
            <el-input placeholder="可用额度" v-model="order.limit" clearable disabled></el-input>
          </el-form-item>
          <el-form-item label="下单时间：" prop="orderTime">
            <el-date-picker
              v-model="order.orderTime"
              type="datetime"
              :editable="false"
              clearable
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="业务员：">
            <el-input placeholder="业务员" v-model="order.salesmanName" @focus="chooseSalesman">
            </el-input>
          </el-form-item>
          <el-form-item label="发货仓库：">
            <el-select v-model="order.warehouseId" placeholder="请选择仓库">
              <el-option
                v-for="item in warehouse"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="交货日期：">
            <el-date-picker
              v-model="order.deliverDate"
              type="date"
              :editable="false"
              clearable
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="收货信息：">
            <el-input placeholder="收货信息" v-model="order.deliverAddress" clearable></el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <hr>
      <h3>商品信息:</h3>
      <!-------------------按钮--------------->
      <el-row>
        <el-button type="primary" icon="el-icon-plus" @click="chooseCommodity()">选择商品</el-button>
      </el-row>
      <br/>
      <!--表格-->
      <el-row>
        <el-table
          :data="commodityList"
          stripe
          border
          style="width: 100%">
          <el-table-column sortable label="序号">
            <template slot-scope="scope">
              <div class="cell" v-text="scope.$index+1"></div>
            </template>
          </el-table-column>
          <el-table-column sortable prop="code" label="商品编码">
            <template slot-scope="scope">
              <div class="cell" v-if="!scope.row.code && scope.$index === indexForCodeSearch">
                <el-autocomplete
                  class="inline-input"
                  v-model="state"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入商品编码"
                  :trigger-on-focus="false"
                  @select="handleSelect"
                  @focus="handleSelectIndex(scope.$index)"

                  value-key="code"
                ></el-autocomplete>
              </div>

              <div class="cell" v-text="scope.row.code" v-else></div>
            </template>
          </el-table-column>
          <el-table-column sortable prop="name" label="商品名称"></el-table-column>
          <el-table-column sortable prop="specification" label="规格属性"></el-table-column>
          <el-table-column sortable prop="basicUnitId" label="单位">
            <template slot-scope="scope">
              <el-select v-model="scope.row.basicUnitId" placeholder="请选择" clearable disabled>
                <el-option
                  v-for="item in units"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column sortable prop="inventoryCount" label="实物总库存"></el-table-column>
          <el-table-column sortable prop="itemCount" label="订购数量" width="150px">
            <template slot-scope="scope">
              <el-input-number clearable v-model="scope.row.itemCount"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column sortable prop="wholesalePrice" label="订货价">
            <template slot-scope="scope">
              <span>{{scope.row.wholesalePrice |price}}元</span>
            </template>
          </el-table-column>
          <el-table-column sortable prop="amount" label="金额">
            <template slot-scope="scope">
              <span style="color: dodgerblue">{{scope.row.wholesalePrice*scope.row.itemCount| price}}元</span>
            </template>
          </el-table-column>
          <el-table-column sortable prop="isGift" label="赠品">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.isGift"></el-checkbox>
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
      <el-row>
        <el-button @click="addCommodity" type="text">添加一行</el-button>
      </el-row>
      <div class="text-right">
        <div style="width: 300px;  display: inline-block;">
          <el-form ref="form" :rules="rules" label-position="right" label-width="120px">
            <el-form-item prop="disSum" label="优惠金额：">
              <span>{{totalAmount -actualAmount}} 元</span>
            </el-form-item>
            <el-form-item prop="disSum" label="总金额：">
              <span>{{totalAmount}} 元</span>
            </el-form-item>
            <el-form-item label="优惠后金额：" prop="actualAmount">
              <el-number v-model.number="actualAmount" clearable class="input-larger"></el-number>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <hr>
      <h3>备注：</h3>
      <el-form ref="form">
        <el-form-item prop="disSum">
          <el-input type="textarea" placeholder="请输入备注,长度在500字以内" v-model="order.remark" :maxlength="500"></el-input>
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
          <el-button type="primary" @click="onSubmitAndAdd('ruleForm')">保存并新增</el-button>
          <el-button type="primary" @click="onSubmit('ruleForm')">保存</el-button>
        </div>
      </el-row>
    </div>
    <!------------弹窗部分---------->
    <el-dialog title="选择商品" :visible.sync="dialog.chooseCommodityVisible" width="800px">
      <com-chose-commodity :visible="dialog.chooseCommodityVisible" @getChosenItemList="getChosenItemList"></com-chose-commodity>
    </el-dialog>
    <el-dialog title="选择客户" :visible.sync="dialog.chooseCustomerVisible" width="800px">
      <com-choose-cus @defaultValue="defaultValue" @getCustomer="getCustomer"></com-choose-cus>
    </el-dialog>
    <!--弹窗-->
    <ComChooseUser title="选择业务员" :multiple="false" :visible.sync="dialog.chooseSalesmanVisible" @onOk="handleChooseUserOK"/>

  </div>
</template>

<script>
  import ComChoseCommodity from '../../inc/choose_item'
  import ImageUpload from '../../lib/image-upload'
  import ComChooseCus from './inc/choose_customer'
  import ComChooseUser from '../../inc/choose_user_by_depart'

  export default {
    components: {
      ComChoseCommodity, ImageUpload, ComChooseCus, ComChooseUser
    },
    data() {
      return {
        // 单位
        units: [],
        // 仓库
        warehouse: [],
        // 订单
        order: {
          orderDetailsRequestList: [],
          pictures: [],
          disSum: 0.00,
          actualAmount: 0.00
        },
        commodityList: [],        // 动态添加商品列表
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
    created() {
      this.loadUnit();
      this.loadWarehouse();
      this.loadData(this.$route.query);

    },
    mounted() {
      this.loadAll(this.state);
    },
    methods: {
      // 加载数据
      loadData(query) {
        this.$http.get('psi/order/detail', {orderId: query.id}, r => {

          this.order = r.data;
          this.order.actualSum = (parseFloat(r.data.actualAmount) + parseFloat(r.data.disAmount)) / 100;
          this.order.disSum = r.data.disAmount / 100;
          this.order.pictures = JSON.parse(r.data.pictures);

          const list = r.data.psiOrderDetailsList;
          // 处理商品列表
          list.forEach(value => {

            const item = {};

            item.id = value.itemId;
            item.code = value.itemCode;
            item.basicUnitId = value.itemUnitId;
            item.inventoryCount = value.psiItemResponse.inventoryCount;
            item.itemCount = value.itemCount;
            item.wholesalePrice = value.orderPrice;
            item.theItemAmount = value.itemAmount / 100;
            item.isGift = value.gift;
            item.remark = value.remark;
            item.name = value.itemName;
            item.specification = value.psiItemResponse.specification;

            this.commodityList.push(item);
          })
        })
      },
      /* 获取仓库*/
      loadWarehouse() {
        this.$http.get('/psi/warehouse/list/all', {}, r => {
          this.warehouse = r.data;
        });
      },
      handleKeydown(e) {
        const key = e.key;
        if (isNaN(e.srcElement.value)) {
          e.srcElement.value = parseFloat(e.srcElement.value);
        }

        if (key === 'Backspace' || key === 'Tab' || key === 'Delete' || key === 'Enter' || key === 'ArrowLeft' || key === 'ArrowRight' || key === 'Home' || key === 'End') {
          return true;
        }
        if (key === '.') {
          if (e.srcElement.value.indexOf('.') >= 0) {
            e.preventDefault();
            return false;
          }
          return true;
        }
        if (isNaN(key)) {
          e.preventDefault();
          return false;
        }
      },
      /* -----------动态表格------------------*/
      /* 获取单位*/
      loadUnit() {
        this.$http.get('/psi/item/unit/all', {}, r => {
          this.units = r.data;
        });
      },
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
      // 订单确认提交并新建
      onSubmitAndAdd(formName) {
        // 商品信息校验
        if (!this.commodityList || this.commodityList.length === 0) {

          this.$message({
            message: '请选择订单商品',
            type: 'error'
          });

          return;

        }

        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submit();
            location.reload();
          }
        });
      },
      // 订单确认提交
      onSubmit(formName) {
        // 商品信息校验
        if (!this.commodityList || this.commodityList.length === 0) {

          this.$message({
            message: '请选择订单商品',
            type: 'error'
          });

          return;

        }

        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submit();
            this.$router.back();
          }
        });
      },
      // 订单确认
      submit() {
        // 去除空行
        this.commodityList = this.executeEmptyRow(this.commodityList);

        for (let i = 0; i < this.commodityList.length; i++) {
          const item = {};
          const tmpItem = this.commodityList[i];
          item.orderId = this.order.id;
          item.itemId = tmpItem.id;
          item.itemName = tmpItem.name;
          item.itemCode = tmpItem.code;
          item.itemUnitId = tmpItem.basicUnitId;
          item.itemCount = tmpItem.itemCount; // 订货数
          item.theOrderPrice = tmpItem.wholesalePrice / 100;
          item.isGift = tmpItem.isGift;
          // 判断是否为赠品(赠品则不存在价格)
          if (item.isGift) {
            // item.theOrderPrice = 0;
          }
          item.updateUser = this.order.salesmanName;
          item.remark = tmpItem.remark;
          this.order.orderDetailsRequestList.push(item);
        }

        // 设置订单的总金额,优惠后金额
        if (this.actualAmount === '' || this.actualAmount === null) {
          this.order.actualAmount = 0;
        } else {
          this.order.actualSum = this.actualAmount;
        }

        if (this.order.totalAmount === '' || this.order.totalAmount === null) {
          this.order.totalAmount = 0;
        } else {
          this.order.totalAmount = this.totalAmount;
        }


        this.$http.post('/psi/order/add', this.order, r => {

          this.$message({
            type: "success",
            message: "添加成功!"
          });

        }, e => {
          this.$message({
            type: "success",
            message: e
          });
        });

      },
      // 从组件中获取客户
      getCustomer(msg) {
        this.order.customerName = msg.name;
        this.order.customerId = msg.id;
        this.dialog.chooseCustomerVisible = false;
      },
      // 选择客户事件
      chooseCustomer() {
        this.dialog.chooseCustomerVisible = true;
      },
      // 选择业务员事件
      chooseSalesman() {
        this.dialog.chooseSalesmanVisible = true;
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
      getChosenItemList(msg) {
        this.mergeItemList(msg);
        this.dialog.chooseCommodityVisible = false;
      },
      querySearch(queryString, cb) {
        const products = this.products;
        const results = queryString ? products.filter(this.createFilter(queryString)) : products;
        // 调用 callback 返回建议列表的数据
        cb(results);
        this.loadAll(this.state);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return restaurant.code.toLowerCase().indexOf(queryString.toLowerCase()) > -1;
        };
      },
      loadAll(state) {
        this.$http.get('/psi/item/list', {condition: state}, r => {
          this.products = r.data.list;
          this.loading = false;
        });
      },
      /* -----------商品选择业务---------------*/
      handleSelect(item) {
        this.commodityList.splice(this.index, 1);
        this.commodityList.push({});
        // 去重添加
        this.clearExit(item, this.index);
        this.index = this.state = '';
      },
      handleSelectIndex(index) {
        this.index = index;
      },
      // 页面商品列表运算(去重,重组等)(两个数组间的计算)
      mergeItemList(val) {
        const getItemListFormCom = val;
        const getItemListLength = getItemListFormCom.length;

        const itemList = this.commodityList;
        const itemListLength = this.commodityList.length;

        for (let i = 0; i < getItemListLength; i++) {

          let exit = false;

          for (let o = 0; o < itemListLength; o++) {

            // 如果组件内选择的商品不存在现有的商品列表(则加入)
            if (getItemListFormCom[i] && itemList[o]) {
              if (getItemListFormCom[i].id === itemList[o].id) {
                exit = true;
              }
            }
          }
          if (!exit) {
            itemList.push(getItemListFormCom[i]);
          }

        }

      },
      // 根据商品编码检索的去重运算
      clearExit(val, index) {

        let exit = false;

        const itemList = this.commodityList;
        const len = itemList.length;

        for (let i = 0; i < len; i++) {
          if (val && itemList[i]) {
            if (val.id === itemList[i].id) {
              this.$message({
                type: 'info',
                message: '当前商品已存在'
              });
              exit = true;
            }
          }
        }

        if (!exit) {
          itemList[index] = val;
        }

      },
      // 提交前去除集合中的空行
      executeEmptyRow() {
        const list = [];
        // 计算出空行的下标
        for (let i = 0; i < this.commodityList.length; i++) {
          const item = this.commodityList[i];
          if (item.id) {
            item.itemId = item.id;
            list.push(item);
          } else {
            this.$message({
              message: '请选择订单商品',
              type: 'error'
            });
          }
        }
        return list;
      },
      calcDisAmount() {
        let totalAmount = 0;
        this.commodityList.forEach(item => {
          let price = item.wholesalePrice;
          let count = item.itemCount;
          if (isNaN(price)) {
            price = 0;
          }
          if (isNaN(count)) {
            count = 0;
          }
          totalAmount += price * count;
        });
        this.actualAmount = totalAmount / 100;
        return totalAmount / 100;
      }
    },
    watch: {
      // 页面添加商品监听
      commodityList: function () {
        setTimeout(() => {
          for (let i = 0; i < this.commodityList.length; i++) {

            if (this.commodityList[i].code === null) {


              this.indexForCodeSearch = i;

              return;
            }
          }
        }, 200);
        return this.indexForCodeSearch;
      }
    },
    computed: {
      totalAmount: function () {

        return this.calcDisAmount();
      },
      stringList: function () {
        return JSON.stringify(this.order, null, 4);
      },
      stringListCommodity: function () {
        return JSON.stringify(this.commodityList, null, 4);
      }
    }
  }
</script>

<style scoped>

</style>
