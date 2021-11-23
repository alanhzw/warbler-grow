<template>
  <div>
    <el-form :inline="true" :model="form" ref="ruleForm" >
      <el-row type="flex" align="middle">
        <el-col :span="20">
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
          <!--<el-form-item label="流水号：" prop="orderNumber">-->
          <!--<el-input v-model="form.code" placeholder="请输入流水号" :clearable=true></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="上报人：" prop="reporter">
            <el-input v-model="form.salesmanName" placeholder="请输入上报人名称"></el-input>
          </el-form-item>
          <!--<el-form-item label="客户：" prop="customer">-->
          <!--<el-input v-model="form.customerName" placeholder="请输入客户名称"></el-input>-->
          <!--</el-form-item>-->
        </el-col>
        <el-col :span="4" class="text-right">
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="handleResetSearchForm('ruleForm')">清空</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--弹窗-->
    <com-choose-user title="选择上报人" :multiple="false" :visible.sync="dialog.chooseSalesmanVisible" @onOk="handleChooseUserOK"/>
  </div>
</template>

<script>
  import ComChooseCus from '../../../inc/choose_customer'
  import ComChooseUser from '../../../inc/choose_user_by_depart'

  export default {
    components: {
      ComChooseCus, ComChooseUser
    },
    name: "search",
    data() {
      return {
        dialog: {
          chooseCustomerVisible: false,
          chooseSalesmanVisible: false
        },
        form: {},
        defaultValue: {}
      }
    },
    methods: {
      // 查询
      handleSearch() {
        this.$emit('onSearch', this.form);
      },
      // 清空表单
      handleResetSearchForm(formName) {
        this.form = {};
        this.$refs[formName].resetFields();
        this.$emit('onClear');
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
      },
      // 选择业务员事件
      chooseSalesman() {
        this.dialog.chooseSalesmanVisible = true;
      },
      // 选择销售员
      getSalesman(msg) {
        this.form.salesmanName = msg.name;
        this.form.salesmanId = msg.userid;
      },
      // 选择上报人
      handleChooseUserOK(userList) {
        if (userList && userList.length > 0) {
          const user = userList[0];
          this.form.salesmanId = user.userid;
          this.form.salesmanName = user.name;
        }
      }
    }
  }
</script>

<style lang="scss">

</style>
