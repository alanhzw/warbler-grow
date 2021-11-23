<template>
  <div>
    <!--头部导航-->
    <breadcrumb/>
    <el-tabs v-model="activeName">
      <!--共享给我的客户-->
      <el-tab-pane label="共享给我的客户" name="first">
        <!--头部按钮-->
        <div class="tool-box">
          <el-row>
            <el-col :span="12">
              <template v-if="optBoxVisible">
                <!--<el-button type="danger" icon="el-icon-delete"  @click="handleDeleteList()">批量删除</el-button>&nbsp;-->
              </template>&nbsp;
            </el-col>
            <el-col :span="12" class="text-right">
              <el-form :inline="true" class="form-compact" @submit.native.prevent>
                  <el-form-item>
                    <el-search v-model="page.keyword" @click="loadData" @keyup.enter.native="loadData" placeholder="请输入客户名称"></el-search>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="info" icon="fa fa-filter" @click="searchBoxVisible = !searchBoxVisible">筛选</el-button>
                  </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </div>
        <!--检索条件-->
        <div class="tool-box" v-show="searchBoxVisible">
          <div class="search-panel border">
            <ComSearchShare @onSearch="handleFilter" @onClear="handleClearFilter" :showName="showName"/>
          </div>
        </div>
        <!--表格table-->
        <div>
          <el-table
            border
            stripe
            v-loading="loading"
            @sort-change="handleSort"
            @selection-change="handleSelectionChange"
            @cell-dblclick="handleShowDetails"
            :data="tableData"
            ref="multipleTable"
            style="width: 100%">
            <el-table-column label="客户名称" min-width="120" sortable>
              <template slot-scope="scope">
                <a class="link" @click="handleShowDetails(scope.row)">{{scope.row.name}}</a>
              </template>
            </el-table-column>
            <el-table-column sortable prop="code" label="客户编码" width="110px"></el-table-column>
            <el-table-column sortable prop="operatorName" label="共享人" width="110px"></el-table-column>
            <el-table-column sortable prop="telephone" label="客户电话" width="110px"></el-table-column>
            <el-table-column sortable prop="updateTime" label="更新时间" width="110px">
              <template slot-scope="scope">
                {{scope.row.updateTime|date}}
              </template>
            </el-table-column>
            <el-table-column sortable prop="saleAreaName" label="所属销售区域" width="150px"></el-table-column>
            <el-table-column label="客户地址" min-width="120">
              <template slot-scope="scope">
                <i v-if="scope.row.location" class="fa fa-map-marker"></i>
                {{scope.row.address}} {{scope.row.addressDetail}}
                <!-- {{scope.row.addressDetail}} -->
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
            :total="page.total">
          </el-pagination>
        </div>
        <!--客户详情弹窗-->
        <ComInfo :visible.sync="dialog.details.visible" :customerId="dialog.details.customer.id"/>
      </el-tab-pane>
      <!------------------------------我共享的客户----------------------------->
      <el-tab-pane label="我共享的客户" name="second">
        <!--头部按钮-->
        <div class="tool-box">
          <el-row>
            <el-col :span="12">
              <template v-if="optBoxVisible2">
                <el-button v-auth="'customer.management.share.batch.cancel'" type="danger" icon="el-icon-delete" @click="cancelShare()">批量取消共享</el-button>&nbsp;
              </template>&nbsp;
            </el-col>
            <el-col :span="12" class="text-right">
              <el-form :inline="true" class="form-compact" @submit.native.prevent>
                <el-form-item>
                  <el-search v-model="page2.keyword" @click="loadData2" placeholder="请输入客户名称" @keyup.enter.native="loadData2"></el-search>
                </el-form-item>
                <el-form-item>
                  <el-button type="info" icon="fa fa-filter" @click="searchBoxVisible2 = !searchBoxVisible2">筛选</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </div>
        <!--批量操作按钮-->
        <!--检索条件-->
        <div class="tool-box" v-show="searchBoxVisible2">
          <div class="search-panel border">
            <ComSearchShare @onSearch="handleFilter2" @onClear="handleClearFilter2" :showName="showName2"/>
          </div>
        </div>
        <!--表格table-->
        <div>
          <el-table
            border
            stripe
            v-loading="loading2"
            @sort-change="handleSort2"
            @selection-change="handleSelectionChange2"
            @cell-dblclick="handleShowDetails2"
            :data="tableData2"
            ref="multipleTable2"
            style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="客户名称" width="200px">
              <template slot-scope="scope">
                <a class="link" @click="handleShowDetails2(scope.row)">{{scope.row.crmCustomer.name}}</a>
              </template>
            </el-table-column>
            <!--<el-table-column sortable prop="code" label="客户编码"></el-table-column>-->
            <el-table-column sortable prop="addressDetail" label="地址" width="300px">
              <template slot-scope="scope">
                {{scope.row.crmCustomer.address}} {{scope.row.crmCustomer.addressDetail}}
              </template>
            </el-table-column>
            <el-table-column sortable prop="telephone" label="客户电话" width="200px">
              <template slot-scope="scope">
                {{scope.row.crmCustomer.telephone}}
              </template>
            </el-table-column>
            <el-table-column sortable prop="saleAreaName" label="所属销售区域" width="200px">
              <template slot-scope="scope">
                {{scope.row.crmCustomer.saleAreaName}}
              </template>
            </el-table-column>
            <el-table-column sortable prop="userName" label="被共享人" width="150px"></el-table-column>
            <el-table-column sortable prop="departmentName" label="被共享部门" width="150px"></el-table-column>
            <el-table-column sortable prop="updateTime" label="更新时间" width="200px">
              <template slot-scope="scope">
                {{scope.row.updateTime|date}}
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
        </div>
        <!--客户详情弹窗-->
        <ComInfo :visible.sync="dialog2.details.visible" :customerId="dialog2.details.customer.id"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import ComInfo from '../../lib/customer-info'
  import ComSearchShare from '../inc/search_share'

  export default {
    components: {
      ComInfo, ComSearchShare
    },
    data() {
      return {
        // tag标签参数
        activeName: "first",
        /* --------------------共享给我的客户------------------*/
        loading: true,
        tableData: [], // 客户列表数据源
        ids: [], // 选中行的id集合
        optBoxVisible: false,
        searchBoxVisible: true,
        searchCondition: {
          keyword: ''
        },
        page: {
          pageNum: 1,
          pageSize: 20,
          sortName: '',
          sortOrder: '',
          total: 0
        }, // 检索条件参数
        customerForm: {
          name: "",
          saleArea: '',
          managerId: "",
          addressDetail: "",
          telephone: "",
          description: '',
          fax: '',
          labelList: []
        },
        dialog: {
          details: {
            customer: {},
            visible: false
          }
        },
        showName: 'shareMe', // 检索组件参数
        /* ---------------------共享给我的客户--------------------------*/
        loading2: true,
        tableData2: [], // 客户列表数据源
        ids2: [], // 选中行的id集合
        optBoxVisible2: false,
        searchBoxVisible2: true,
        searchCondition2: {
          keyword: ''
        },
        page2: {
          pageNum: 1,
          pageSize: 20,
          sortName: '',
          sortOrder: '',
          total: 0
        }, // 检索条件参数
        customerForm2: {
          name: "",
          saleArea: '',
          managerId: "",
          addressDetail: "",
          telephone: "",
          description: '',
          fax: '',
          labelList: []
        },
        dialog2: {
          details: {
            customer: {},
            visible: false
          },
          share: {
            visible: false
          }
        },
        showName2: 'myShare', // 检索组件参数
        /* --------------被共享人弹窗表格--------*/
        tableData3: [], // 客户列表数据源
        page3: {
          pageNum: 1,
          pageSize: 10,
          sortName: '',
          sortOrder: '',
          total: 0
        }// 检索条件参数
      }
    },
    created() {
      this.loadData();
      this.loadData2();
    },
    mounted() {
    },
    methods: {
      /* ---------------------共享给我的客户--------------------------*/
      // 加载客户列表
      loadData() {
        this.loading = true;
        this.$http.get("/crm/customer/list/share/me", this.page, r => {

          this.page.total = r.data.total;
          this.tableData = r.data.list;
          this.loading = false;
        }, e => {
          this.$message.error(e.msg);
          console.error(e)
        })
      },
      // 筛选
      handleFilter(val) {
        this.page = this.$util.extend(this.page, val);
        this.loadData();
      },
      handleClearFilter() {
        this.page = {
          pageNum: 1,
          pageSize: 20,
          sortName: '',
          keyword: '',
          sortOrder: '',
          total: 0
        };
        this.loadData();
      },
      // 客户列表排序
      handleSort(sort) {
        this.$util.build_sort(this.page, sort);
        this.loadData();
      },
      // 分页
      handlePaginationChange(pageNum) {
        this.page.pageNum = pageNum;
        this.loadData();
      },
      // 分页改变事件
      handleSizeChange(val) {
        this.page.pageSize = val;
        this.loadData();
      },
      // 表格行选中事件
      handleSelectionChange(val) { // 多选表格的change事件
        // this.optBoxVisible = true;// 展示多选的隐藏盒子
        this.ids = [];// 初始化id数组
        val.forEach(value => {
          this.ids.push(value.shareId);
        });
        if (this.ids.length === 0) {
          // this.optBoxVisible = false;
        }
      },
      // 客户详情展示页面
      handleShowDetails(row) {
        this.dialog.details.customer = row;
        this.dialog.details.visible = true;
      },
      /* ------------------------------我共享的客户-----------------------------*/
      // 取消共享
      cancelShare() {
        this.$http.post("/crm/customer/cancel", {ids: this.ids2}, r => {

          this.$message({
            message: '取消成功',
            type: 'success'
          });
        });
        this.loadData2();
      },
      // 加载客户列表
      loadData2() {
        this.loading2 = true;
        this.$http.get("/crm/customer/list/my/share", this.page2, r => {
          this.page2.total = r.data.total;
          this.tableData2 = r.data.list;
          this.loading2 = false;
        }, e => {
          this.$message.error(e.msg);
          console.error(e)
        })
      },
      // 检索
      handleSearch2() {
        this.loadData2(this.searchCondition2);
      },
      // 筛选
      handleFilter2(val) {
        this.page2 = this.$util.extend(this.page2, val);
        this.loadData2();
      },
      handleClearFilter2() {
        this.page2 = {
          pageNum: 1,
          pageSize: 20,
          sortName: '',
          keyword: '',
          sortOrder: '',
          total: 0
        };
        this.loadData2();
      },
      // 客户列表排序
      handleSort2(sort) {
        this.$util.build_sort(this.page2, sort);
        this.loadData2();
      },
      // 分页
      handlePaginationChange2(pageNum) {
        this.page2.pageNum = pageNum;
        this.loadData2();
      },
      // 分页改变事件
      handleSizeChange2(val) {
        this.page2.pageSize = val;
        this.loadData2();
      },
      // 表格行选中事件
      handleSelectionChange2(val) { // 多选表格的change事件
        this.optBoxVisible2 = true;// 展示多选的隐藏盒子
        this.ids2 = [];// 初始化id数组
        val.forEach(value => {
          this.ids2.push(value.id);
        });
        if (this.ids2.length === 0) {
          this.optBoxVisible2 = false;
        }
      },
      // 客户详情展示页面
      handleShowDetails2(row) {
        this.dialog2.details.customer = row.crmCustomer;
        this.dialog2.details.visible = true;
      }
    },
    watch: {}
  }
</script>

<style scoped>

</style>
