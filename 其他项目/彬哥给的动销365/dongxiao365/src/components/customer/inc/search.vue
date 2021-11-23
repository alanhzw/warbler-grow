<template>
  <div>
    <el-form :inline="true" :model="form" ref="ruleForm" >
      <el-row type="flex" align="middle">
        <el-col :span="20">
          <el-form-item label="客户经理：" prop="managerName" v-if="cusManager">
            <el-input v-model="form.managerName" suffix-icon="el" placeholder="请输入客户经理" :clearable=true></el-input>
          </el-form-item>
          <el-form-item label="销售区域：" prop="saleAreaList">
            <el-cascader
              v-loading="regionLoading"
              :options="salesRegionData"
              :props="defaultProps"
              v-model="form.saleAreaList" change-on-select placeholder="请选择销售区域">
            </el-cascader>
          </el-form-item>
          <el-form-item label="客户标签：" prop="saleAreaList">
            <el-select multiple
                       v-loading="tagLoading"
                       v-model="form.tags" placeholder="请选择客户标签" >
              <el-option-group
                v-for="group in tags"
                :key="group.id"
                :label="group.labelName">
                <el-option
                  v-for="item in group.children"
                  :key="item.id"
                  :label="item.labelName"
                  :value="item.id">
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5" class="text-right">
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
    props: {
      cusManager: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        form: {},
        defaultProps: {
          children: 'children',
          value: 'id',
          label: 'name'
        },
        regionLoading: false,
        tagLoading: false,
        salesRegionData: [],
        tags: []
      }
    },
    created() {
      this.loadSalesRegion();
      this.loadTagData();
    },
    methods: {
      // 加载销售区域
      loadSalesRegion() {
        this.regionLoading = true;
        this.$http.get('/crm/sale/area/tree', {}, r => {
          this.salesRegionData = r.data;
          this.regionLoading = false;
        });
      },
      loadTagData() {
        this.tagLoading = true;
        this.$http.get('/crm/customer/label/list', {}, r => {
          this.tags = r.data;
          this.tagLoading = false;
        })
      },
      handleSearch() {
        let data = {};
        if (this.form.saleAreaList && this.form.saleAreaList.length > 0) {
          this.form.saleArea = this.form.saleAreaList.join(',');
        } else {
          this.form.saleArea = null;
        }
        if (this.form.tags && this.form.tags.length > 0) { this.form.labelIds = this.form.tags.join(','); }
        data = this.$util.extend(this.form);
        data.saleAreaList = null;
        data.tags = [];
        this.$emit('onSearch', data);
      },
      handleResetSearchForm(formName) {
        this.form.saleAreaList = [];
        this.form = {tags: []};
        this.$refs[formName].resetFields();
        this.$emit('onClear');
      }
    }
  }
</script>

<style lang="scss">

</style>
