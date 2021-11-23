<template>
  <div>
    <el-form :inline="true" :model="form" ref="ruleForm">
      <el-row type="flex" align="middle">
        <el-col :span="20">
          <!--<el-form-item label="品牌：" prop="code">-->
          <!--<el-input v-model="form.code" suffix-icon="el" placeholder="商品编码" :clearable=true></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="类型：" prop="code">-->
          <!--<el-input v-model="form.code" suffix-icon="el" placeholder="商品编码" :clearable=true></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="标签：" prop="tag">
            <el-select v-model="form.tag" placeholder="请选择" :multiple="true" clearable>
              <el-option
                v-for="item in tags"
                :key="item.value"
                :label="item.name"
                :value="item.value">
                <span style="float: left">{{ item.name}}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态：" prop="status">
            <el-select v-model="form.status" placeholder="请选择" :multiple="true" clearable>
              <el-option
                v-for="item in status"
                :key="item.value"
                :label="item.name"
                :value="item.value">
                <span style="float: left">{{ item.name}}</span>
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
    data() {
      return {
        form: {},
        defaultProps: {
          children: 'children',
          value: 'id',
          label: 'name'
        },
        salesRegionData: [],
        tags: [
          {"name": "新品", "value": "新品"},
          {"name": "热卖", "value": "热卖"},
          {"name": "促销", "value": "促销"},
          {"name": "重点", "value": "重点"},
          {"name": "赠品", "value": "赠品"}
        ],
        status: [
          {"name": "已发售", "value": "1"},
          {"name": "已停售", "value": "0"}
        ]
      }
    },
    created() {
    },
    methods: {
      handleSearch() {
        const data = {
          tag: null,
          status: null
        };
        if (this.form.tag && this.form.tag.length > 0) {
          data.tag = JSON.stringify(this.form.tag);
        }
        if (this.form.status && this.form.status.length > 0) {
          data.status = JSON.stringify(this.form.status);
        }
        this.$emit('onSearch', data);
      },
      handleResetSearchForm(formName) {
        this.form = {
          tag: [],
          status: []
        };
        const data = {
          tag: null,
          status: null
        };
        this.$emit('onSearch', data);
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="scss">

</style>
