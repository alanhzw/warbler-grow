<template>
  <div>
    <breadcrumb/>
    <div class="fh-container clearfix">
      <div class="fh-side-left">
        <div class="fh-side-header">
          选择部门
        </div>
        <div style="padding: 0 10px 10px 10px;">
          <el-input  placeholder="请输入员工或部门" v-model="filterText" clearable></el-input>
        </div>
        <el-tree
          ref="tree"
          :data="departTree"
          v-loading="loading1"
          :props="{children: 'children',label: 'name',value: 'id'}"
          :highlight-current="true"
          :expand-on-click-node="false"
          node-key="id"
          default-expand-all
          :filter-node-method="filterNode"
          @node-click="handleDepartClick"></el-tree>
      </div>
      <div class="fh-content">
        <!--头部按钮-->
        <div class="tool-box">
          <el-row>
            <el-col :span="12">
              <!--多选隐藏按钮-->
              <el-button type="success" icon="el-icon-circle-plus-outline" @click="handleAdd" >新建计划</el-button>
              <template v-if="optBoxVisible">
                <el-button type="danger" icon="el-icon-delete"  @click="handleDeleteList">批量删除</el-button>&nbsp;
              </template>
            </el-col>
            <el-col :span="12" class="text-right">
              <el-form :inline="true" class="form-compact" @submit.native.prevent>
                <el-form-item>
                  <el-search v-model="page.keyword" @click="loadData" placeholder="请输入客户名称" @keyup.enter.native="loadData"></el-search>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </div>
        <el-table
          v-loading="loading3"
          :data="planList">
          <el-table-column
            label="日期">
            <template slot-scope="scope">{{scope.row.planTime|date}}</template>
          </el-table-column>
          <el-table-column
            prop="customerName"
            label="客户名称"  >
          </el-table-column>
          <!--    <el-table-column
                prop="customerCode"
                label="客户编码">
              </el-table-column>-->
          <el-table-column
            prop="customerAddress"
            label="客户地址">
          </el-table-column>
          <el-table-column
            label="拜访状态">
            <template slot-scope="scope">
              <el-tag  v-if="scope.row.planStatus===0" type="warning">计划中</el-tag>
              <el-tag  v-if="scope.row.planStatus===1" type="primary">拜访中</el-tag>
              <el-tag  v-if="scope.row.planStatus===2" type="success">已完成</el-tag>
            </template>
          </el-table-column>
          <!--<el-table-column-->
          <!--label="操作">-->
          <!--<template slot-scope="scope">-->
          <!--<el-button type="text" @click="handleView(scope.$index,scope.row.id)">查看明细</el-button>-->
          <!--</template>-->
          <!--</el-table-column>-->
        </el-table>
        <el-pagination
          background
          v-show="page.total>0"
          @current-change="handlePaginationChange"
          @size-change="handleSizeChange"
          :page-sizes="[20,50,100, 200, 300, 400]"
          :current-page="page.pageNum"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="新建计划"
      :visible.sync="dialog.visible"
      width="800px">
      <ComAdd :user="dialog.user" @onSuccess="handlePlanAddOK" v-if="dialog.visible"/>
    </el-dialog>
    <!--记录详情弹窗-->
    <el-dialog title="记录详情" :visible.sync="dialog.infoVisible" width="800px">
      <ComInfo :executeId="executeId"/>
    </el-dialog>
  </div>
</template>

<script>
  import ComAdd from './add'
  import ComInfo from '../record/inc/info'

  export default {
    components: {ComAdd, ComInfo},
    data() {
      return {
        departTree: [],
        filterText: '',
        planList: [],
        loading1: false,
        loading3: false,
        page: {
          pageNum: 1,
          pageSize: 20,
          sortName: '',
          sortOrder: '',
          total: 0,
          visitorId: '',
          keyword: ''
        },
        optBoxVisible: false,
        dialog: {
          visible: false,
          action: 'add',
          userId: null,
          infoVisible: false
        },
        executeId: null,
        currentTime: new Date().getTime()
      }
    },
    created() {
      this.loadDepartTree();
      this.currentTime = this.$util.format_date(new Date());
    },
    mounted() {
    },
    methods: {
      loadDepartTree() {
        this.loading1 = true;
        this.$http.get("/sys/user/list/tree", {}, r => {

          this.loading1 = false;
          this.departTree = r.data;
          // this.handleDepartClick(this.departTree[0]);
        })
      },
      handleDepartClick(data) {
        if (data.userid) {
          this.page = {
            pageNum: 1,
            pageSize: 20,
            sortName: '',
            sortOrder: '',
            total: 0,
            visitorId: data.userid
          };
          this.dialog.user = this.$util.extend(data);
          this.loadData();
        } else {
          this.planList = [];
          this.page.total = 0;
        }
      },
      loadData() {
        this.loading3 = true;
        this.$http.get('/crm/visit/plan/getPage', this.page, r => {
          this.planList = r.data.list;
          this.page.total = r.data.total;
          this.loading3 = false;
        })
      },
      filterNode(value, data) {
        if (!value) { return true; }
        return data.name.indexOf(value) !== -1;
      },
      // 新增计划成功
      handlePlanAddOK() {
        this.dialog.visible = false;
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
      handleAdd() {
        this.dialog.action = 'add';
        this.dialog.visible = true;
      },
      handleDeleteList() {
      },
      handleDelete(index, id) {
        this.$confirm('确认要删除该计划么?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/crm/visit/plan/delete', {id: id}, r => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.planList.splice(index, 1);
          });
        });
      },
      // 查看明细事件
      handleView(id) {
        this.executeId = id;
        this.dialog.infoVisible = true;
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .fh-side-left {
    padding: 0;
  }
</style>
