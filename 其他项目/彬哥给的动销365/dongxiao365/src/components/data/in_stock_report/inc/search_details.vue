<template>
  <div>
    <el-form :inline="true" :model="form" ref="ruleForm" >
      <el-row type="flex" align="middle">
        <el-col :span="20">
          <el-form-item label="下单时间范围：" prop="startDate">
            <el-date-picker
              v-model="form.startDate"
              type="date"
              placeholder="选择开始日期"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="~" prop="endDate">
            <el-date-picker
              v-model="form.endDate"
              type="date"
              placeholder="选择结束日期"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <!--<el-form-item label="商品：" prop="itemName">-->
            <!--<el-autocomplete v-model="form.itemName"-->
                             <!--:fetch-suggestions="querySearchAsync"-->
                             <!--@select="handleSelect"-->
                             <!--placeholder="请输入商品名称或编码检索"-->
                             <!--:clearable=true>-->
              <!--<template slot-scope="props">-->
                <!--<div class="name">{{ props.item.name }}</div>-->
              <!--</template>-->
            <!--</el-autocomplete>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="客户：" prop="customer">-->
            <!--<el-input v-model="form.customerName" placeholder="请输入客户名称"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-dialog title="选择客户" :visible.sync="dialog.chooseCustomerVisible">-->
            <!--<ComChooseCus @defaultValue="defaultValue" @getCustomer="getCustomer"></ComChooseCus>-->
          <!--</el-dialog>-->
        </el-col>
        <el-col :span="4" class="text-right">
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="handleResetSearchForm('ruleForm')">清空</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import ComChooseCus from '../../../inc/choose_customer'
  export default {
    components: {
      ComChooseCus
    },
    name: "search",
    data() {
      return {
        dialog: {
          chooseCustomerVisible: false
        },
        form: {},
        /* 时间插件*/
        defaultValue: []
      }
    },
    created() {
    },
    methods: {
      handleSearch() {
        this.$emit('onSearch', this.form);

      },
      handleResetSearchForm(formName) {
        this.form = {};
        this.$refs[formName].resetFields();
        this.$emit('onClear');
      },
      // 根据输入内容检索商品
      querySearchAsync(queryString, cb) {
        this.$http.get("/psi/item/simple", {keyword: queryString}, r => {

          cb(r.data);
        });
      },
      // 将检索的商品名称跟id赋值给form
      handleSelect(item) {
        this.form.itemName = item.name;
        this.form.itemCode = item.code;
      },
      // 选择客户
      chooseCustomer() {
        this.dialog.chooseCustomerVisible = true;
      },
      // 从组件中获取客户
      getCustomer(msg) {
        this.form.customerName = msg.name;
        this.form.customerId = msg.id;
        this.dialog.chooseCustomerVisible = false;
      }
    }
  }
</script>

<style lang="scss">

</style>
