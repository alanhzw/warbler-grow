<template>
  <div>
    <el-form :inline="true" :model="form" ref="ruleForm">
      <el-row type="flex" align="middle">
        <el-col :span="20">
          <el-form-item label="使用人员：" prop="useUsersName">
            <el-input v-model="form.userId" suffix-icon="el" placeholder="使用人员" :clearable=true></el-input>
          </el-form-item>
          <el-form-item label="使用部门：" prop="departmentId">
            <el-cascader
              clearable
              :change-on-select="true"
              v-model="form.departmentId"
              @change="handleChange"
              :options="departmentCascaderSource"
              :props="departCaseProps"
            >
            </el-cascader>
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
    data() {
      return {
        form: {},
        defaultProps: {
          children: 'children',
          value: 'id',
          label: 'name'
        },
        salesRegionData: [],
        // 表单状态下拉选
        optionsForm: [{label: "未发布", value: false}, {label: "已发布", value: true}],
        // 部门级联选择参数格式
        departCaseProps: {
          children: 'children',
          value: 'id',
          label: 'name'
        },
        // 部门级联数据
        departmentCascaderSource: []
      }
    },
    created() {
      this.loadDepartmentSource();
    },
    methods: {
      handleSearch() {
        let data = {};
        data = this.$util.extend(this.form);
        this.$emit('onSearch', data);
      },
      handleResetSearchForm(formName) {
        this.form.saleAreaList = [];
        this.$refs[formName].resetFields();
        this.$emit('onClear');
      },
      // 加载指定管理范围,单选部门,数据源
      loadDepartmentSource() {
        this.$http.get('/sys/department/tree', null, r => {

          this.departmentCascaderSource = [r.data];
        });
      },
      handleChange(val) {

      }

    }
  }
</script>

<style lang="scss">

</style>
