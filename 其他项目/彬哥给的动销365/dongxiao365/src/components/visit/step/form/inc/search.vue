<template>
  <div>
    <el-form :inline="true" :model="form" ref="ruleForm" >
      <el-row type="flex" align="middle">
        <el-col :span="20">
          <!--<el-form-item label="客户名称" prop="customerName">-->
            <!--<el-input v-model="form.customerName" suffix-icon="el" placeholder="请输入客户名称" :clearable=true></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="共享人：" prop="shareUserName" v-show="showName == 'shareMe'">
            <el-input v-model="form.shareUserName" suffix-icon="el" placeholder="请输入共享人姓名，例如：张三" :clearable=true></el-input>
          </el-form-item>
          <el-form-item label="被共享人：" prop="beSharedUserName" v-show="showName == 'myShare'">
            <el-input v-model="form.beSharedUserName" suffix-icon="el" placeholder="请输入被共享人姓名，例如：李四" :clearable=true></el-input>
          </el-form-item>
          <el-form-item label="被共享部门：" prop="beSharedDept" v-show="showName == 'myShare'">
            <el-input v-model="form.beSharedDept" suffix-icon="el" placeholder="请输入被共享部门" :clearable=true></el-input>
          </el-form-item>
          <el-form-item label="表单名称：" prop="stepName" v-show="showName == 'formList'">
            <el-input v-model="form.stepName" suffix-icon="el" placeholder="请输入表单名称" :clearable=true></el-input>
          </el-form-item>
          <el-form-item label="发布状态：" prop="publish" v-show="showName == 'formList'">
            <el-select v-model="form.publish" clearable placeholder="请选择">
              <el-option
                v-for="item in optionsForm"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
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
  export default {
    name: "search",
    props: ["showName"],
    data () {
      return {
        form: {},
        defaultProps: {
          children: 'children',
          value: 'id',
          label: 'name'
        },
        salesRegionData: [],
        // 表单状态下拉选
        optionsForm: [{label: "未发布", value: false}, {label: "已发布", value: true}]
      }
    },
    created () {
    },
    methods: {
      handleSearch () {
        let data = {};
        data = this.$util.extend(this.form);
        this.$emit('onSearch', data);
      },
      handleResetSearchForm (formName) {
        this.form.saleAreaList = [];
        this.$refs[formName].resetFields();
        this.$emit('onClear');
      }
    }
  }
</script>

<style lang="scss">

</style>
