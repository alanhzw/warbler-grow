<template>
  <div>
    <el-form :inline="true" :model="form">
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
          <el-form-item label="拍照类型：">
            <el-select placeholder="请选择拍照类型" v-model="form.typeId">
              <el-option
                v-for="item in typeList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" class="text-right">
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
        typeList: [],
        form: {},
        defaultValue: {}
      }
    },
    created() {
      this.loadType();
    },
    methods: {
      // 检索
      handleSearch() {
        this.$emit('onSearch', this.form);
      },
      // 清空查询条件
      handleResetSearchForm() {
        this.form = {};
        this.$emit('onClear');
      },
      // 根据输入的内容检索拍照类型
      loadType() {
        this.$http.get("/psi/pic/type/list", {}, r => {
          this.typeList = r.data.list;
        });
      }
    }
  }
</script>

<style lang="scss">

</style>
