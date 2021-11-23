<template>
  <div>
    <breadcrumb/>
    <!--基本信息-->
    <div>
      <h3>基本信息：</h3>
      <!------------第一部分-------------->
      <el-form :inline="true" :model="order" ref="ruleForm" :rules="rules">
        <el-form-item label="仓库：" prop="warehouseId">
          <com-warehouse v-model="order.warehouseId" placeholder="选择仓库"></com-warehouse>
        </el-form-item>
        <el-form-item label="单据类型：" prop="invoiceType">
          <el-select v-model="order.invoiceType" placeholder="选择单据类型">
            <el-option
              v-for="item in invoiceType"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入库日期：" prop="invoiceDate">
          <el-date-picker
            v-model="order.invoiceDate"
            type="date"
            :editable="false"
            clearable
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="经办人：" prop="operator">
          <com-chose-user v-model="order.operator" :text="userName"/>
        </el-form-item>
      </el-form>
    </div>
    <!--商品信息-->
    <div>
      <h3>商品信息：</h3>
      <el-button type="primary" icon="el-icon-plus" @click="chooseCommodity()">选择商品</el-button>
      <br/>
      <br/>
      <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" :rules="dynamicValidateFormRules" label-width="0px" class="table-dynamic-form">
        <el-table
          :data="dynamicValidateForm.commodityList"
          stripe
          border
          style="width: 100%">
          <el-table-column label="选择" width="60px">
            <template slot-scope="scope">
              <div class="cell" v-text="scope.$index+1"></div>
            </template>
          </el-table-column>
          <el-table-column prop="code" label="商品编码">
            <template slot-scope="scope">
              <el-form-item
                :prop="'commodityList.' + scope.$index + '.code'"
                :rules="[{ required: true, message: '请填写商品编码', trigger: 'blur' }]">
                <com-item-auto-complete :exclude="dynamicValidateForm.commodityList" v-model="scope.row" :data="scope.$index" @select="handleSelect"></com-item-auto-complete>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="商品名称"></el-table-column>
          <el-table-column prop="specification" label="规格属性"></el-table-column>
          <el-table-column prop="baseUnitName" label="单位" width="150px">
            <template slot-scope="scope">
              <el-form-item
                :prop="'commodityList.' + scope.$index + '.itemUnitId'"
                :rules="[{ required: true, message: '请选择单位', trigger: 'blur' }]">
                <com-item-unit v-model="scope.row.itemUnitId" :itemId="scope.row.id" @change="subtotal(scope.row)"></com-item-unit>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="itemCount" label="数量" width="150px">
            <template slot-scope="scope">
              <el-form-item
                :prop="'commodityList.' + scope.$index + '.itemCount'"
                :rules="itemCountRules">
                <el-number v-model.number="scope.row.itemCount" controls-position="right" @change="subtotal(scope.row)"></el-number>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="itemPrice" label="单价  (元)" width="150px" align="right">
            <template slot-scope="scope">
              <el-form-item
                :prop="'commodityList.' + scope.$index + '.itemPrice'"
                :rules="[{ required: true, message: '请输入单价', trigger: 'blur' }]">
                <el-number v-model.number="scope.row.itemPrice" placeholder="单价" :maxlength="10" align="right" @change="subtotal(scope.row)"></el-number>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="totalAmount" label="金额  (元)" width="150px" align="right">
            <template slot-scope="scope">
              <el-form-item
                :prop="'commodityList.' + scope.$index + '.totalAmount'"
                :rules="[{ required: true, message: '请输入金额', trigger: 'blur' }]">
                <el-number v-model.number="scope.row.totalAmount" placeholder="金额" :maxlength="10"></el-number>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="80">
            <template slot-scope="scope">
              <el-button type="button" class="text-danger" @click="deleteCommodity(scope.$index)" v-if="scope.$index>0">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <el-button @click="addCommodity" type="text">添加一行</el-button>
    </div>
    <!--备注-->
    <div>
      <br/>
      <h3>备注：</h3>
      <el-input
        type="textarea"
        :rows="4"
        placeholder="请输入备注,长度在500字以内"
        v-model="order.remark"
        :maxlength="500">
      </el-input>
    </div>
    <br/>
    <!--按钮区-->
    <div>
      <el-button @click="$router.back()">返回</el-button>
      <el-button type="primary" @click="onSubmit('ruleForm')">保存</el-button>
    </div>
    <!--弹窗部分-->
    <el-dialog title="选择商品" :visible.sync="dialog.chooseCommodityVisible" width="800px">
      <com-chose-commodity :visible="dialog.chooseCommodityVisible" :disabledList="dynamicValidateForm.commodityList" @getChosenItemList="getChosenItemList"></com-chose-commodity>
    </el-dialog>
  </div>
</template>

<script>
  import ComChoseCommodity from '../../inc/choose_item'
  import ComChoseCus from '../../inc/choose_customer'
  import ComChoseUser from '../../lib/use-selector'
  import ComItemAutoComplete from '../../lib/item-autocomplete'
  import ComItemUnit from '../../lib/item-unit'
  import ComWarehouse from '../../lib/warehouse'
  import ItemUtil from '../../../util/itemUtil'

  export default {

    components: {
      ComChoseCommodity, ComChoseCus, ComChoseUser, ComItemAutoComplete, ComItemUnit, ComWarehouse
    },
    data() {
      const checkNotZero = (rule, value, callback) => {
        if (value === 0) { callback(new Error('数量不可以为0')); } else { callback(); }
      };

      const user = JSON.parse(decodeURIComponent(localStorage.user));
      console.log('user', user)
      return {
        invoiceType: [
          {'value': 1, 'name': '采购入库'},
          {'value': 2, 'name': '调拨入库'},
          {'value': 3, 'name': '补差入库'},
          {'value': 4, 'name': '退换货入库'},
          {'value': 0, 'name': '其他入库'}
        ],
        order: {
          invoiceDate: new Date(),
          operator: user.userid,
          operatorId: user.userid
        },
        userName: user.name,
        dynamicValidateForm: {
          commodityList: [
            {itemCount: 1}
          ]
        },
        getItemChosenList: [], // 从组件中接受的商品集合
        dialog: {  // 弹窗
          chooseCommodityVisible: false
        },
        products: [],
        state: "",
        rules: {
          invoiceType: [
            {required: true, message: '请选择单据类型', trigger: 'blur'}
          ],
          invoiceDate: [
            {required: true, message: '请选择入库日期', trigger: 'change'}
          ],
          operatorId: [
            {required: true, message: '请选择经办人', trigger: 'change'}
          ],
          warehouseId: [
            {required: true, message: '请选择仓库', trigger: 'change'}
          ]
        },
        itemCountRules: [
          {
            validator: checkNotZero
          },
          {required: true, message: '请输入数量', trigger: 'blur'},
          {type: 'number', message: '数量必须是数字'}
        ],
        dynamicValidateFormRules: {}
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
    methods: {
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
      // 入库单确认提交
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$refs.dynamicValidateForm.validate((valid2) => {
              if (valid2) {
                this.submit();
              }
            });
          }
        });
      },
      submit() {
        const receiptDetailsRequestList = [];
        if (this.dynamicValidateForm.commodityList) {
          this.dynamicValidateForm.commodityList.forEach(value => {
            if (value.id && value.basicUnitId && value.itemPrice && value.totalAmount) {
              const enableAuxiliaryUnit = value.enableAuxiliaryUnit;
              const auxiliaryUnitId = value.auxiliaryUnitId;
              const unitConvertRatio = value.unitConvertRatio;
              let count = value.itemCount;
              if (enableAuxiliaryUnit) {
                // 启动了辅助单位
                if (auxiliaryUnitId === value.itemUnitId) {
                  // 如果选择了辅助单位
                  // 把值转换成基本单位
                  count *= unitConvertRatio;
                }
              }
              const item = {
                itemId: value.id,
                itemCode: value.code,
                itemName: value.name,
                specification: value.specification,
                itemPrice: value.itemPrice,
                count: count,
                totalAmount: value.totalAmount,
                remark: value.remark
              };
              receiptDetailsRequestList.push(item);
            }
          })
        }
        this.order.receiptDetailsRequestList = receiptDetailsRequestList;
        this.$http.post('psi/receipt/add', this.order, r => {
          this.$message({
            type: "success",
            message: "添加成功"
          });
          this.$router.back();
        })
      },
      // 页面商品列表运算
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
      // 商品选择
      handleSelect(item, data) {
        item.itemCount = 1;
        this.dynamicValidateForm.commodityList.splice(data, 1, item)
      },
      // 从组件中获取商品
      getChosenItemList(items) {
        if (items && items.length > 0) {
          items.forEach(o => {
            this.mergeItemList(o);
          });
        }
        this.dialog.chooseCommodityVisible = false;
      },
      subtotal(row) {
        const unit = row.itemUnitId;
        const price = row.itemPrice;
        const count = row.itemCount;
        if (unit && price * count) {
          const cnt = ItemUtil.toBase(row, unit, count);
          row.totalAmount = cnt * price;
        }
      }
    }
  }
</script>
