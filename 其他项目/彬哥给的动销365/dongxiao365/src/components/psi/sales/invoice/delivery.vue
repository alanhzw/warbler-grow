<template>
  <!--弹窗部分-->
  <el-dialog title="发货单" :visible.sync="show" width="800px" @close="cancel">
    <!--头部-->
    <el-row>
      <el-card class="box-card">
        <el-form :inline="true" :model="invoice">
          <el-form-item label="客户姓名：">
            <span class="orderFormMess1">{{invoice.customerName}}</span>
          </el-form-item>
          <el-form-item label="可用额度：">
            <span class="orderFormMess1">{{invoice.limit}}</span>
          </el-form-item>
          <el-form-item label="业务员：">
            <span class="orderFormMess1">{{invoice.salesmanName}}</span>
          </el-form-item>
          <el-form-item label="发货仓库：">
            <span class="orderFormMess1" v-text="invoice.warehouseName"></span>
          </el-form-item>
          <el-form-item label="交货日期：">
            <span class="orderFormMess1">{{invoice.deliverDate | date}}</span>
          </el-form-item>
          <el-form-item label="收货人联系方式：" v-if="invoice.customer">
            <span class="orderFormMess1"> {{invoice.customer.telephone}}</span>
          </el-form-item>
          <el-form-item label="收货地址：">
            <span class="orderFormMess1">{{invoice.deliverAddress}}</span>
          </el-form-item>
        </el-form>
      </el-card>
    </el-row>
    <!--商品清单-->
    <br/>
    <el-row>
      <h3>商品清单：</h3>
    </el-row>
    <el-form :model="invoice" ref="invoiceForm">
      <el-row>
        <!--<el-form>-->
        <el-table
          :data="invoice.commodityList"
          stripe
          border
          style="width: 100%">
          <el-table-column sortable prop="itemCode" label="商品编码"></el-table-column>
          <el-table-column sortable prop="itemName" label="商品名称"></el-table-column>
          <el-table-column sortable prop="specification" label="规格属性"></el-table-column>
          <el-table-column sortable prop="itemCount" label="订货/已发/待发" align="center">
            <template slot-scope="scope">
              <span>
                {{scope.row,scope.row.itemCount|unit}}
              </span>
              /
              <span>
                {{scope.row,scope.row.shippedCount|unit}}
              </span>
              /
              <span>
                {{scope.row,scope.row.unshipCount|unit}}
              </span>
            </template>
          </el-table-column>
          <el-table-column sortable prop="realityStock" label="实物库存" align="center">
            <template slot-scope="scope">
              <el-tooltip effect="dark" :content="'1'+scope.row.auxiliaryUnitName+'='+scope.row.unitConvertRatio+''+scope.row.basicUnitName" placement="top-start" v-if="scope.row.enableAuxiliaryUnit">
                <div>{{scope.row,scope.row.realityStock|unit}}</div>
              </el-tooltip>
              <div v-else>
                {{scope.row,scope.row.realityStock|unit}}
              </div>
            </template>
          </el-table-column>
          <el-table-column sortable prop="deliverCount" label="本次发货数" width="220px">
            <template slot-scope="scope">
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item
                    :prop="'commodityList.' + scope.$index + '.deliverCount'"
                    :rules="[{ required: true,  message: '请输入订购数量', trigger: 'blur' }]">
                    <el-input-number v-model.number="scope.row.deliverCount" :min="1" :max="Number(scope.row.unshipCount||0)" @change="deliverChange(scope.row,$event)" controls-position="right"></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    :prop="'commodityList.' + scope.$index + '.itemUnitId'"
                    :rules="[{ required: true, message: '请选择单位', trigger: 'blur' }]">
                    <el-select v-model="scope.row.itemUnitId" placeholder="单位" @change="dnitChange(scope.row)">
                      <el-option
                        :label="scope.row.basicUnitName"
                        :value="scope.row.basicUnitId">
                      </el-option>
                      <el-option
                        v-if="scope.row.auxiliaryUnitId"
                        :label="scope.row.auxiliaryUnitName"
                        :value="scope.row.auxiliaryUnitId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
        <!--</el-form>-->
      </el-row>
      <br/>
      <!--其他信息-->
      <el-form-item label="发货时间：" prop="deliverDate">
        <el-date-picker
          v-model="invoice.deliverDate"
          type="date"
          clearable
          style="width: 180px"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="配送人员：" prop="deliverUserName">
        <el-input v-model="invoice.deliverUserName" style="width: 180px" :maxlength="16"></el-input>
      </el-form-item>
    </el-form>
    <!--底部按钮-->
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="onSubmit">发货</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import ItemUtil from '../../../../util/itemUtil'
  import ComItemUnit from '../../../lib/item-unit'

  export default {
    name: "delivery",
    components: {ComItemUnit},
    props: {
      visible: Boolean,
      data: {
        type: Object,
        default: {}
      }
    },
    computed: {},
    data() {
      return {
        show: false,
        invoice: {}
      }
    },
    methods: {
      dnitChange(row) {
        const dCount = row.deliverCount;
        const itemUnitId = row.itemUnitId;
        const unshipCount = row.unshipCount;
        const baseCount = ItemUtil.toBase(row, itemUnitId, dCount);

        if (baseCount > unshipCount) {
          row.itemUnitId = row.basicUnitId;
        }
      },
      deliverChange(row, val) {
        const itemUnitId = row.itemUnitId;
        const unshipCount = row.unshipCount;
        const baseCount = ItemUtil.toBase(row, itemUnitId, val);
        if (baseCount > unshipCount) {
          row.itemUnitId = row.basicUnitId;
        }
      },
      onSubmit() {
        // 商品信息校验
        this.$refs.invoiceForm.validate((valid) => {
          if (valid) {
            const postData = {
              orderId: this.invoice.orderId,
              warehouseId: this.invoice.warehouseId,
              deliverDate: this.invoice.deliverDate,
              deliverUserName: this.invoice.deliverUserName,
              commodityList: []
            };

            const list = this.invoice.commodityList;

            for (let i = 0, len = list.length; i < len; i++) {
              const item = list[i];
              postData.commodityList.push({
                itemId: item.itemId,
                itemUnitId: item.itemUnitId,
                orderDetailsId: item.id,
                deliverCount: ItemUtil.toBase(item, item.itemUnitId, item.deliverCount)
              });
            }
            this.$http.post('psi/invoice/add', postData, r => {
              this.$message({
                type: "success",
                message: "发货成功!"
              });
              this.$emit('delivered');
              this.$emit('update:visible', false);
            })
          }
        });
      },
      cancel() {
        this.$emit('update:visible', false);
      }
    },
    filters: {
      unit(item, val) {
        return ItemUtil.format(item, val);
      }
    },
    watch: {
      visible: function (val) {
        this.show = val;
        if (val) {
          this.invoice = this.data;
          this.invoice.deliverDate = new Date();
        }
      }
    }
  }
</script>

<style scoped>

</style>
