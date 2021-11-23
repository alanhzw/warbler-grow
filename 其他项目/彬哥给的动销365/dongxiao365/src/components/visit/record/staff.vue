<template>
  <el-container>
    <el-aside width="200px">
      <el-row class="tool-box">
        <el-input placeholder="输入名称进行过滤" v-model="filterText" clearable></el-input>
      </el-row>
      <el-tree
        ref="tree"
        :data="departTree"
        v-loading="loadingTree"
        :props="{children: 'children',label: 'name',value: 'id'}"
        :highlight-current="true"
        :expand-on-click-node="false"
        node-key="id"
        default-expand-all
        :filter-node-method="filterNode"
        @node-click="handleDepartClick"></el-tree>
    </el-aside>
    <el-main>
      <!--表格table-->
      <el-table
        border
        stripe
        v-loading="staffData.data.loading"
        @sort-change="handleSort"
        :data="staffData.data.list"
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
        <el-table-column sortable prop="customerName" min-width="120" label="客户名称"></el-table-column>
        <el-table-column sortable prop="flowName" label="拜访步骤" min-width="120"></el-table-column>
        <el-table-column sortable prop="visitorName" label="拜访人" width="110"></el-table-column>
         <el-table-column sortable prop="planTime" label="拜访时间" width="110">
          <template slot-scope="scope">
            {{scope.row.planTime|date}}
          </template>
        </el-table-column>
        <el-table-column sortable label="状态" prop="visitStatus" width="110">
          <template slot-scope="scope">
            <el-tag type="warning" v-if="scope.row.visitStatus===0" size="small">未执行</el-tag>
            <el-tag type="primary" v-if="scope.row.visitStatus===1" size="small">执行中</el-tag>
            <el-tag type="success" v-if="scope.row.visitStatus===2" size="small">已完成</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100px">
          <template slot-scope="scope">
            <el-button type="text" @click="handleShowRecordDetails(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @current-change="handlePaginationChange"
        @size-change="handleSizeChange"
        :page-sizes="[20,50,100, 200, 300, 400]"
        :current-page="page.pageNum"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        v-if="staffData.data.total"
        :total="staffData.data.total">
      </el-pagination>
      <!--表单详情弹窗-->
      <el-dialog title="表单详情" :visible.sync="formDetailsVisible" width="800px">
        <form-details :id="formId"/>
      </el-dialog>
      <!--记录详情弹窗-->
      <el-dialog title="记录详情" :visible.sync="infoVisible" width="800px">
        <ComInfo :executeId="executeId"/>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
  import ComSearch from './inc/search'
  import FormDetails from './inc/form_details'
  import ComInfo from './inc/info'

  export default {
    components: {ComSearch, FormDetails, ComInfo},
    props: {
      staffData: {
        type: Object
      }
    },
    data() {
      return {
        // tableData: [],//列表数据源
        // loading: false,
        loadingTree: false,
        departTree: [],
        searchBoxVisible: true,
        filterText: '',
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
    // computed: {
    //   data() {
    //     return this.$store.state.visitRecord.staff
    //   }
    // },
    created() {
      this.loadDepartTree()
      this.loadData()
    },
    methods: {
      loadData() {
        console.log(this.page)
        this.$store.dispatch('GET_STAFF_LIST', this.page)
      },
      // 加载组织架构数据
      loadDepartTree() {
        this.loadingTree = true;
        this.$http.get('/sys/user/list/tree', {}, r => {
          this.loadingTree = false;
          this.departTree = r.data;
        })
      },
      // 组织架构过滤事件
      filterNode(value, data) {
        if (!value) { return true; }
        return data.name.indexOf(value) !== -1;
      },
      handleDepartClick(data) {
        this.page.userId = data.userid;
        this.loadData();
        this.$emit('onDepartSearch', data.userid);
      },
      // 列表排序
      handleSort(sort) {
        // this.$util.build_sort(this.page, sort);
        // this.loadData();
      },
      // 分页
      handlePaginationChange(pageNum) {
        this.page.pageNum = pageNum;
        this.$emit('handleFilter', val)
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
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    }

  }
</script>

<style scoped>

</style>
