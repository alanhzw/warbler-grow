<template>
  <div>
    <el-form :inline="true" :model="form" ref="ruleForm" >
      <el-row type="flex" align="middle">
        <el-col :span="20">
          <el-form-item label="时间范围：" prop="dateScope">
            <el-date-picker
              v-model="form.dateScope"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd">
            </el-date-picker>
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
        /* 时间插件*/
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }],
          disabledDate(time) {
            return  time.getTime() > new Date()
          }
        }
      }
    },
    created() {
    },
    methods: {
        handleSearch() {
        const data = {
          startDate: null,
          endDate: null
        };
        // 处理时间
        if (this.form && this.form.dateScope) {
          data.startDate = this.form.dateScope[0];
          data.endDate = this.form.dateScope[1];
        }
        this.$emit('onSearch', data);
      },
      handleResetSearchForm(formName) {
        this.form = {};
        this.$refs[formName].resetFields();
        this.$emit('onSearch', {
          startDate: null,
          endDate: null
        });
      }
    }
  }
</script>

<style lang="scss">

</style>
