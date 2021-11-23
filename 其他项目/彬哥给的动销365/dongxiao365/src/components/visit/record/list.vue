<template>
  <div>
    <!--头部导航-->
    <breadcrumb/>
     <!--关键字搜索-->
    <div class="tool-box">
      <el-row>
        <el-col :span="24" class="text-right">
          <el-form :inline="true" class="form-compact" @submit.native.prevent>
            <el-form-item>
              <el-search v-model="searchParams.keyword" @click="loadData" @keyup.enter.native="loadData" placeholder="请输入客户名称"></el-search>
            </el-form-item>
            <el-form-item>
              <el-button type="info" icon="fa fa-filter" @click="searchBoxVisible = !searchBoxVisible">筛选</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <!--筛选-->
    <div class="tool-box" v-show="searchBoxVisible">
      <div class="search-panel border">
        <ComSearch @onSearch="handleFilter" @onClear="handleClearFilter"/>
      </div>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="我的任务记录" name="first">
        <com-my-record  @paginationChange=paginationChange
                        @pageSizeChange=pageSizeChange
                        :mineData=mineData></com-my-record>
      </el-tab-pane>
      <el-tab-pane label="我下属的任务记录" name="second">
        <com-under-record @paginationChange=paginationChange
                          @pageSizeChange=pageSizeChange
                          :underlingData=underlingData></com-under-record>
      </el-tab-pane>
      <el-tab-pane label="员工任务记录" name="third">
        <com-staff-record @paginationChange=paginationChange
                          @onDepartSearch="onDepartSearch"
                          @pageSizeChange=pageSizeChange
                          :staffData=staffData></com-staff-record>
      </el-tab-pane>
      <el-tab-pane label="员工任务记录" name="third"
                   v-if="showStaffTab">
        <com-staff-record></com-staff-record>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import ComMyRecord from './my.vue'
  import ComUnderRecord from './underling.vue'
  import ComStaffRecord from './staff.vue'
  import ComSearch from './inc/search'

  export default {
    components: {
      ComStaffRecord, ComUnderRecord, ComMyRecord, ComSearch
    },
    data() {
      return {
        activeName: 'first', // tab标签属性
        searchBoxVisible: true,
        userId: '',
        searchParams: {
          pageNum: 1,
          pageSize: 20,
          sortName: '',
          sortOrder: '',
          total: 0,
          keyword: ''// 关键字

        }
      }
    },
    created() {
      this.loadData();
    },
    computed: {
      mineData() {
        return this.$store.state.visitRecord.mine
      },
      staffData() {
        return this.$store.state.visitRecord.staff
      },
      underlingData() {
        return this.$store.state.visitRecord.underling
      }
    },
    methods: {
      loadData() {
        this.$store.dispatch('GET_MINE_LIST', this.searchParams)
        this.$store.dispatch('GET_UNDERLING_LIST', this.searchParams)
        this.$store.dispatch('GET_STAFF_LIST', Object.assign(this.searchParams, {userId: this.userId}))
      },
      onDepartSearch(val) {
        this.userId = val
      },
      // 筛选/查询
      handleFilter(val) {
        this.searchParams = this.$util.extend(this.searchParams, val)
        this.loadData()
      },
      // 清空筛选
      handleClearFilter() {
        this.searchParams = {
          pageNum: 1,
          pageSize: 20,
          sortName: '',
          sortOrder: '',
          total: 0,
          keyword: ''
        }
        this.searchParams.keyword = ''
        this.loadData()
      },
      paginationChange(pageNum) {
        this.searchParams.pageNum = pageNum
        this.loadData();
      },
      // 分页改变事件
      pageSizeChange(val) {
        this.searchParams.pageSize = val
        this.loadData();
        false
      }
    }
  }
</script>

