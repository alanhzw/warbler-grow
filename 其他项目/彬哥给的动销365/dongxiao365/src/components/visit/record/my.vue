<template>
  <div>
    <!--表格table-->
    <el-table
      border
      stripe
      v-loading="mineData.loading"
      @sort-change="handleSort"
      :data="mineData.data.list"
      ref="multipleTable"
      class="table-compact">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <span v-for="item in scope.row.formList">
            <el-button type="text" @click="formDetails(item.id)" v-show="item.status===2">{{item.name}}</el-button>
            <span class="text-info" v-show="item.status===0">{{item.name}}</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column type="index" align="center" width="48"></el-table-column>
      <el-table-column sortable prop="customerName" label="客户名称" min-width="120"></el-table-column>
      <el-table-column sortable prop="flowName" label="拜访步骤" min-width="120"></el-table-column>
      <el-table-column sortable prop="visitorName" label="拜访人" width="120"></el-table-column>
      <el-table-column sortable prop="planTime" label="拜访时间" width="120">
        <template slot-scope="scope">
          <div v-if="scope.row.visitType===2&&scope.row.visitStatus===0">
            {{scope.row.planTime|date}}
          </div>
          <div v-else>
            {{scope.row.startTime|date}}
          </div>
        </template>
      </el-table-column>
      <el-table-column sortable label="状态" prop="visitStatus" width="120">
        <template slot-scope="scope">
          <el-tag type="warning" v-if="scope.row.visitStatus===0" size="small">未执行</el-tag>
          <el-tag type="primary" v-if="scope.row.visitStatus===1" size="small">执行中</el-tag>
          <el-tag type="success" v-if="scope.row.visitStatus===2" size="small">已完成</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120px">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleShowRecordDetails(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- {{page}} -->
    <el-pagination
      background
      @current-change="handlePaginationChange"
      @size-change="handleSizeChange"
      :page-sizes="[20,50,100, 200, 300, 400]"
      :current-page="page.pageNum"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      v-if="mineData.data.total"
      :total="mineData.data.total">
    </el-pagination>
    <!--表单详情弹窗-->
    <el-dialog title="表单详情" :visible.sync="formDetailsVisible" width="800px">
      <form-details :id="formId"/>
    </el-dialog>
    <!--记录详情弹窗-->
    <el-dialog title="记录详情" :visible.sync="infoVisible" width="800px">
      <ComInfo :executeId="executeId"/>
    </el-dialog>
  </div>
</template>

<script>
  import ComSearch from './inc/search'
  import FormDetails from './inc/form_details'
  import ComInfo from './inc/info'

  export default {
    components: {ComSearch, FormDetails, ComInfo},
    props: {
      mineData: {
        type: Object
      }
    },
    data() {
      return {
        // loading: false,
        searchBoxVisible: true,
        formDetailsVisible: false,
        infoVisible: false,
        formId: 0,
        executeId: 0,
        page: {
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
    // computed: {
    //   mineData() {
    //     return this.$store.state.visitRecord.mine
    //   }
    // },
    methods: {
      loadData() {
        this.$store.dispatch('GET_MINE_LIST', this.page)
      },
      // 筛选/查询
      handleFilter(val) {
        this.page = this.$util.extend(this.page, val);
        this.loadData();
      },
      // 清空筛选
      handleClearFilter() {
        this.page = {
          pageNum: 1,
          pageSize: 20,
          sortName: '',
          sortOrder: '',
          total: 0,
          keyword: ''// 关键字
        };
        this.loadData();
      },
      // 列表排序
      handleSort(sort) {
        this.$util.build_sort(this.page, sort);
        this.loadData();
      },
      // 分页
      handlePaginationChange(pageNum) {
        this.page.pageNum = pageNum;
        this.$emit('paginationChange', pageNum)
      },
      // 分页改变事件
      handleSizeChange(val) {
        this.$emit('pageSizeChange', val)
        this.page.pageSize = val;
      },
      // 查看表单详情
      formDetails(id) {
        this.formId = id;
        this.formDetailsVisible = true;
      },
      // 记录详情
      handleShowRecordDetails(row) {
        this.executeId = row.id;
        this.infoVisible = true;
      }
    }
  }
</script>

<style scoped>

</style>
