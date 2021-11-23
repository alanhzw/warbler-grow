<template>
  <div class="page-content customer">
    <!--头部级联菜单-->
    <breadcrumb/>
    <div>
    <div class="tool-box">
        <el-row>
          <el-col :span="12">
            <div style="display:flex;">
              <el-button v-auth="'customer.management.list.add'" type="success" icon="el-icon-circle-plus-outline" @click="handleAdd">新增客户</el-button>
              <template >
                <el-button v-auth="'customer.management.list.batch.delete'" type="danger" icon="el-icon-delete" @click="handleDeleteList()">批量删除</el-button>&nbsp;
                <!-- <el-button v-auth="'customer.management.list.transfer'" type="info" icon="el-icon-d-arrow-right" @click="dialog.selectTransferUser.visible=true">移交客户</el-button>
                <el-button v-auth="'customer.management.list.share'" type="warning" icon="el-icon-share" @click="dialog.shareCardVisible=true">共享客户</el-button> -->
                <el-button v-auth="'customer.management.list.transfer'" type="info" icon="el-icon-d-arrow-right" @click="selectUser">移交客户</el-button>
                <el-button v-auth="'customer.management.list.share'" type="warning" icon="el-icon-share" @click="shareCustomer">共享客户</el-button>
              </template>
              &nbsp;
            </div>
          </el-col>
          <el-col :span="12" class="text-right">
            <el-form :inline="true" class="form-compact" @submit.native.prevent>
                <el-form-item>
                  <el-search v-model="keyword"
                    @click.native="getData" @keyup.enter.native="getData" placeholder="请输入客户名称、客户编码"></el-search>
                </el-form-item>
                <el-form-item>
                  <el-button type="info" icon="fa fa-filter" @click="searchBoxVisible = !searchBoxVisible">筛选</el-button>
                </el-form-item>

                <el-form-item>
                  <el-dropdown @command="handleCommand">
                    <el-button class="text-success"> 更多<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-auth="'customer.management.list.export'" command="export"><i class="fa fa-file-excel-o"></i>
                        导出客户
                      </el-dropdown-item>
                      <el-dropdown-item v-auth="'customer.management.list.import'" command="import"><i class="fa fa-file-excel-o"></i>
                        导入客户
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
      <div class="tool-box" v-show="searchBoxVisible">
        <div class="search-panel border">
          <ComSearch @onSearch="handleFilter"
                     @onClear="handleClearFilter"
                     :cusManager="activeName === '1' ? false : true"/>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="我负责的客户" name="1">
        <div>
          <list-table :tableData="mineList.data.list"
                      @handleSelectionChange="handleSelectionChange"
                      @handleShowDetails="handleShowDetails"
                      @handleSort="handleSort"
                      @handleEdit="handleEdit"
                      @handleDelete="handleDelete"/>
          <el-pagination
            background
            @current-change="handlePaginationChange"
            @size-change="handleSizeChange"
            :page-sizes="[20,50,100, 200, 300, 400]"
            :current-page="page1.pageNum"
            :page-size="page1.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="mineList.data.total">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我下属的客户" name="3">
        <div>
         <list-table :tableData="undelingList.data.list"
                      @handleSelectionChange="handleSelectionChange"
                      @handleShowDetails="handleShowDetails"
                      @handleSort="handleSort"
                      @handleEdit="handleEdit"
                      @handleDelete="handleDelete"/>
          <el-pagination
            background
            @current-change="handlePaginationChange"
            @size-change="handleSizeChange"
            :page-sizes="[20,50,100, 200, 300, 400]"
            :current-page="page3.pageNum"
            :page-size="page3.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="undelingList.data.total">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="全公司的客户" name="0">
        <div>
          <list-table :tableData="allList.data.list"
                      @handleSelectionChange="handleSelectionChange"
                      @handleShowDetails="handleShowDetails"
                      @handleSort="handleSort"
                      @handleEdit="handleEdit"
                      @handleDelete="handleDelete"/>
          <el-pagination
            background
            @current-change="handlePaginationChange"
            @size-change="handleSizeChange"
            :page-sizes="[20,50,100, 200, 300, 400]"
            :current-page="page0.pageNum"
            :page-size="page0.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="allList.data.total">
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>


    <!--选择移交人员弹窗-->
    <com-choose-user title="选择移交人员" :excludeUser="excludeUser" submit-text="立即移交" :multiple="false" :visible.sync="dialog.selectTransferUser.visible" @onOk="handleSelectTransferOK"/>
    <!--共享客户-->
    <com-choose-user title="选择部门/人员" :excludeUser="excludeUser" :userOnly="false" :visible.sync="dialog.shareCardVisible" submit-text="立即共享" @onOk="handleSelectShareOK"/>
    <el-dialog title="批量导入客户" :visible.sync="dialog.importCustomer.visible" width="400px">
      <ImportCustomer/>
    </el-dialog>
    <com-info :visible.sync="dialog.details.visible" :customer-id="this.dialog.details.customer.id"></com-info>
    <iframe id="downFrame" width="0" height="0" :frameborder="0"></iframe>
  </div>
</template>

<script>
  // 引入组件
  import ComChooseUser from "../../inc/choose_user_by_depart"
  import ComSearch from '../inc/search'
  import ListTable from './inc/table'
  import ComInfo from '../../lib/customer-info'
  import ImportCustomer from '../../inc/import_customer'

  export default {
    components: {
      ComChooseUser, ComSearch, ComInfo, ImportCustomer, ListTable
    },
    data() {
      return {
        id: '',
        activeName: '1', // tab标签属性
        loading: true,
        tableData: [],  // 客户列表数据源
        ids: [], // 选中行的id集合
        page1: {
          pageNum: 1,
          pageSize: 20
        },
        keyword: '',
        page0: {
          pageNum: 1,
          pageSize: 20
        },
        page3: {
          pageNum: 1,
          pageSize: 20
        },
        dialog: {
          chooseUserShareVisible: false,
          shareCardVisible: false,
          importCustomer: {
            visible: false
          },
          details: {
            customer: {},
            visible: false
          },
          selectManagerVisible: false,
          selectTransferUser: {
            visible: false,
            value: null,
            tempValue: null,
            defaultValue: null
          },
          selectShareUser: {
            visible: false,
            value: null,
            tempValue: null,
            defaultValue: null
          },
          selectShareDept: {
            visible: false,
            value: [],
            ids: []
          }
        },
        excludeUser: [],
        optBoxVisible: false, // 是否显示批量按钮
        searchBoxVisible: true, // 筛选条件隐藏条件
        /* --------------------我下属的客户------------------*/
        searchFlg: 0
      };
    },
    computed: {
      mineList() {
        return this.$store.state.cusDetail.mine
      },
      undelingList() {
        return this.$store.state.cusDetail.underling
      },
      allList() {
        return this.$store.state.cusDetail.all
      }
    },
    created() {
      this.excludeUser.push(this.$util.getCurrentUser().userid);
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        [1, 0, 3].map(item => {
          this.loadData(item);
        })
      },
      loadData( type = {}) {
        this.loading = true;
        const par =  Object.assign({
          keyword: this.keyword,
          searchFlg: type,
          sortName: this.sortName,
          sortOrder: this.sortOrder}, this['page' + type])
        this.$store.dispatch('GET_CUS_DETAIL', par)
      },
      // 筛选
      handleFilter(val) {
        // this.page = Object.assign({}, this.page, val)
        this.page1 = Object.assign(this.page1, val, {managerName: ''});
        this.page0 = Object.assign(this.page0, val);
        this.page3 = Object.assign(this.page3, val);
        this.getData();
      },
      handleClearFilter() {
        [1, 0, 3].map(item => {
          this['page' + item] = {
            pageNum: 1,
            pageSize: 20
          }
        })
        this.sortName = ''
        this.sortOrder = ''
        this.keyword = ''
        this.getData();
      },
      // 客户列表排序
      handleSort(sort) {
        this.$util.build_sort(this.page, sort);
        this.loadData();
      },
      // 分页
      handlePaginationChange(pageNum) {
        this.page0.pageNum = pageNum;
        this.loadData(Number(this.activeName));
      },
      // 分页改变事件
      handleSizeChange(val) {
        this.page0.pageSize = val;
        this.loadData(Number(this.activeName));
      },
      handleSelectTransferOK(val) {
        if (val && val.length > 0) {
          const user = val[0];
          this.$http.post('/crm/customer/turn', {userId: user.userid, userName: user.name, customerList: this.ids}, r => {
            this.$message({
              message: '移交成功！',
              type: 'success'
            });
            this.loadData(Number(this.activeName))
          });
        }
      },
      // 共享客户
      handleSelectShareOK(userList, departList) {
        const userIds = [];
        const departIdList = [];
        userList.forEach(u => {
          userIds.push({userid: u.userid, name: u.name});
        });
        departList.forEach(u => {
          departIdList.push({
            id: u.id,
            name: u.name
          });
        });
        this.$http.post('/crm/customer/share', {users: userIds, departments: departIdList, customerList: this.ids}, r => {
          this.$message({
            message: '共享成功！',
            type: 'success'
          });
        });
      },
      // 当新建客户点击的时候
      handleAdd() {
        // this.$router.push({path: '/customer/management/list/add', query: {keyword: this.customerInfo.name}})
        this.$router.push('/customer/management/list/add')
        
      },
      // 编辑客户户事件
      handleEdit(index, row) {
        this.$router.push({
          path: '/customer/management/list/edit',
          query: {
            id: row.id
          }
        });
      },
      // 删除客户事件
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该客户，是否继续？', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/crm/customer/batchDel', {ids: [row.id]}, r => {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getData();
          }, e => {
            this.$message.error(e.msg);
            console.error(e)
          });
        });
      },
      // 批量删除
      handleDeleteList() {
      if (this.ids.length === 0) {
          this.$confirm('请先选择待删除客户！', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          })
        } else {
          this.$confirm('此操作将永久删除这些客户，是否继续？', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
            }).then(() => {
          this.$http.post('/crm/customer/batchDel', {ids: this.ids}, r => {
            this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getData();
        }, e => {
          this.$message.error(e.msg);
          console.error(e)
        });
       });
      }
    },

    // 移交客户
    selectUser() {
      if (this.ids.length === 0) {
          this.$confirm('请先选择待移交客户！', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          })
        } else {
          this.dialog.selectTransferUser.visible = true
        }
    },

    // 共享客户
    shareCustomer() {
      if (this.ids.length === 0) {
         this.$confirm('请先选择待共享客户！', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          })
        } else {
          this.dialog.shareCardVisible = true
        }
    },

      // 表格行选中事件
      handleSelectionChange(val) { // 多选表格的change事件
        this.optBoxVisible = true;// 展示多选的隐藏盒子
        this.ids = [];// 初始化id数组
        val.forEach(value => {
          this.ids.push(value.id);
        });
        if (this.ids.length === 0) {
          this.optBoxVisible = false;
        }
      },
      // 客户详情展示页面
      handleShowDetails(row) {
        this.dialog.details.customer = row;
        this.dialog.details.visible = true;
      },
      exportExcel() {
        this.$http.get('/crm/customer/export', this.page, r => {
          document.getElementById('downFrame').src = this.$http.root + '/common/download?id=' + r.data + '&fileName=客户资料.xls';
        })
      },
      importCustomer() {
        this.dialog.importCustomer = true;
      },
      handleCommand(cmd) {
        if (cmd === 'import') {
          this.dialog.importCustomer.visible = true;
        } else if (cmd === 'export') {
          this.exportExcel();
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../assets/css/tag";

  .tag-group {
    margin: 0 -12px;
    border: none;
    box-shadow: none;
  }

  .contact-list + .contact-list {
    margin-top: 5px;
  }
</style>
