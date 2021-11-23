<template>
  <div>
    <!--头部导航-->
    <breadcrumb/>
    <div class=" text-right">
      <el-button @click="returnBackUp" >返回</el-button>
    </div>
    <br/>
    <!--表格table-->
    <el-table
      border
      stripe

      v-loading="loading2"
      @sort-change="handleSort2"
      :data="tableData2"
      ref="multipleTable2"
      class="table-compact">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <div>
              <span v-for="item in scope.row.formList">
                              <el-button type="text" @click="formDetails(item.id)" v-show="item.status===2">{{item.name}}</el-button>
                              <el-button type="text" class="text-info" v-show="item.status===0">{{item.name}}</el-button>
              </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column sortable prop="visitTime" width="170px" label="拜访时间">
        <template slot-scope="scope">
          {{scope.row.startTime|datetime}}
        </template>
      </el-table-column>
      <el-table-column sortable prop="customerName" label="客户名称">
        <template slot-scope="scope">
          <el-button type="text" @click="customerDetails(scope.row.customerId)">{{scope.row.customerName}}</el-button>
        </template>
      </el-table-column>
      <el-table-column sortable prop="flowName" label="拜访步骤">
      </el-table-column>
      <el-table-column sortable prop="visitorName" width="150px" label="拜访人"></el-table-column>
      <el-table-column label="状态"
                       prop="visitStatus"
                       width="100px"
                       :filters="[{ text: '未开始', value: 0 }, { text: '进行中', value: 1 },{ text: '已结束', value: 2 }]"
                       :filter-method="filterTag"
                       filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag  type="info" v-if="scope.row.visitStatus===0">未开始</el-tag>
          <el-tag  type="primary" v-if="scope.row.visitStatus===1">进行中</el-tag>
          <el-tag  type="success" v-if="scope.row.visitStatus===2">已结束</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200px">
        <template slot-scope="scope">
          <el-button type="text" @click="handleShowRecordDetails2(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @current-change="handlePaginationChange2"
      @size-change="handleSizeChange2"
      :page-sizes="[20,50,100, 200, 300, 400]"
      :current-page="page2.pageNum"
      :page-size="page2.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page2.total">
    </el-pagination>

    <!------------------------------弹窗部分------------------------------------------->
    <!--记录详情弹窗-->
    <el-dialog title="记录详情" :visible.sync="dialog.infoVisible" width="800px">
      <ComInfo :executeId="executeId"/>
    </el-dialog>
    <!--客户详情弹窗-->
    <ComCusInfo :visible.sync="dialog.customerDetailsVisible" :customerId="customerId"/>
    <!--表单详情弹窗-->
    <el-dialog title="表单详情" :visible.sync="dialog.formDetailsVisible" width="800px">
      <FormDetails :id="formId"/>
    </el-dialog>

  </div>
</template>

<script>
  import ComSearch from './inc/search'
  import ComInfo from './inc/info'
  import ComCusInfo from '../../lib/customer-info'
  import ComSteInfo from '../step/setting/inc/info'
  import FormDetails from './inc/form_details'

  export default {
    components: {
      ComSearch, ComInfo, ComCusInfo, ComSteInfo, FormDetails
    },
    data() {
      return {
        /* --------------------客户被拜访记录------------------*/
        loading2: true,
        tableData2: [],
        /* 表单加载筛选基础参数*/
        page2: {
          pageNum: 1,
          pageSize: 20,
          sortName: '',
          sortOrder: '',
          total: 0,
          customerId: ''// 客户Id
        },
        searchBoxVisible2: false, // 筛选条件隐藏参数
        // 弹窗
        dialog: {
          infoVisible: false,
          customerDetailsVisible: false,
          stepDetailsVisible: false,
          formDetailsVisible: false
        },
        executeId: '', // 目标id,详情弹窗
        stepId: "", // 步骤id,详情弹窗
        customerId: null,
        formId: ''// 表单id

      };
    },
    created() {
      this.loadData2(this.$route.query);
    },
    methods: {
      /* ---------------------客户被拜访记录-----------------------*/
      // 加载记录列表
      loadData2(params) {

        const data = this.$util.extend(this.page2, params);

        this.$http.get("crm/visit/record/list", data, r => {

          this.page2.total = r.data.total;
          this.tableData2 = r.data.list;
          this.loading2 = false;

        }, e => {
          this.$message.error(e.msg);
          console.error(e);
        })
      },
      // 检索
      handleSearch2() {
        this.loadData2();
      },
      // 列表排序
      handleSort2(sort) {
        this.$util.build_sort(this.page, sort);
        this.loadData();
      },
      // 记录详情
      handleShowRecordDetails2(row) {
        this.executeId = row.id;
        this.dialog.infoVisible = true;
      },
      // 分页
      handlePaginationChange2(pageNum) {
        this.page.pageNum = pageNum;
        this.loadData();
      },
      // 分页改变事件
      handleSizeChange2(val) {
        this.page.pageSize = val;
        this.loadData();
      },
      // 筛选记录状态
      filterTag(value, row) {
        return row.visitStatus === value;
      },
      // 客户详情
      customerDetails(id) {
        this.customerId = id;
        this.dialog.customerDetailsVisible = true;
      },
      // 步骤详情
      stepDetails(row) {
        this.stepId = row.flowId;
        this.dialog.stepDetailsVisible = true;
      },
      // 返回
      returnBackUp() {
        this.$router.back(-1);
      },
      // 查看表单详情
      formDetails(row) {
        this.formId = row.id;
        this.dialog.formDetailsVisible = true;
      }

    },
    watch: {},
    computed: {}
  }
</script>

<style scoped>

</style>
