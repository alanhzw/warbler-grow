<template>
  <el-form :inline="true" :model="form" ref="ruleForm" >
    <el-row type="flex" align="middle">
      <el-col :span="18">
        <el-form-item label="下单时间范围：">
          <el-date-picker
            v-model="form.startDate"
            type="date"
            placeholder="选择开始日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="~">
          <el-date-picker
            v-model="form.endDate"
            type="date"
            placeholder="选择结束日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="6" class="text-right">
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleResetSearchForm('ruleForm')">清空</el-button>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="商品：" prop="itemName" >
      <el-autocomplete v-model="form.itemName"
                       :fetch-suggestions="querySearchAsync"
                       @select="handleSelect"
                       placeholder="请输入商品名称或编码">
        <template slot-scope="props">
          <div class="name">{{ props.item.name }}</div>
        </template>
      </el-autocomplete>
    </el-form-item>
    <el-form-item label="单号：" prop="code">
      <el-input v-model="form.code" placeholder="请输入单号"></el-input>
    </el-form-item>
    <el-form-item label="客户：" prop="customer">
      <el-input v-model="form.customerName" placeholder="请输入客户名称"></el-input>
    </el-form-item>
  </el-form>
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
        form: {
        },
        defaultValue: {}
      }
    },
    methods: {
      // 查询事件，对外公开，把form带出去
      handleSearch() {
        this.$emit('onSearch', this.form);
      },
      // 清空表单
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
        this.form.itemId = item.id;
      },
      // 选择客户事件
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
