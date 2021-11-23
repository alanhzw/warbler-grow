<template>
  <div>
    <!--头部-->
    <div class="tool-box text-right">
      <el-form :inline="true" class="form-compact" @submit.native.prevent>
        <el-form-item>
          <el-search v-model="form.keyword" @click="handleSearch" :placeholder="placeholder" @keyup.enter.native="handleSearch"></el-search>
        </el-form-item>
        <el-form-item>
          <el-button type="info" icon="fa fa-filter" @click="searchBoxVisible = !searchBoxVisible">筛选</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--检索条件-->
    <div class="tool-box" v-show="searchBoxVisible">
      <div class="search-panel border">
        <el-form :inline="true" :model="form">
          <el-row type="flex" align="middle">
            <el-col :span="18">
              <el-form-item label="时间范围：" prop="dateRange">
                <el-date-picker
                  v-model="form.dateRange"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions2"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="拍照类型：" v-if="type==='pic_browse'">
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
                <el-button @click="handleResetSearchForm">清空</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "search-bar",
    props: {
      placeholder: {
        type: String,
        default: '请输入上报人、客户'
      },
      type: String
    },
    data() {
      return {
        form: {},
        searchBoxVisible: true,
        typeList: [],
          pickerOptions2: {
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
      if (this.type === 'pic_browse') {
        this.loadType();
      }
    },
    methods: {
      // 检索
      handleSearch() {
        const data = {
          keyword: this.form.keyword,
          typeId: this.form.typeId,
          startDate: null,
          endDate: null
        };
        // 处理时间
        if (this.form && this.form.dateRange) {
          data.startDate = this.form.dateRange[0];
          data.endDate = this.form.dateRange[1];
        }
        this.$emit('onSearch', data);
      },

      // 清空查询条件
      handleResetSearchForm(formName) {
        this.form = {};
        this.$refs[formName].resetFields();
        this.$emit('onSearch', {
          startDate: null,
          endDate: null
        });
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

<style scoped lang="scss">

</style>
