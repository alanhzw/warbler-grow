<template>
  <div>
    <el-alert
      title="温馨提示"
      class="tip" type="warning" :closable="false" show-icon
      description="本系统角色属于内建角色，和钉钉提供的角色没有关系，系统内部新建和删除角色，不会影响企业钉钉的角色。同样，企业钉钉后台修改角色相关信息也不会影响本系统。"
    />
    <div class="box" v-show="role.group">
      <div class="box-header">
        <div class="box-title"><i class="fa fa-sitemap"></i>当前角色组【{{role.name}}】
        </div>
        <div class="box-tools">
          <el-button
            @click="addRole"
            size="small">
            添加角色
          </el-button>
          <el-button
            @click.native.prevent="deleteGroup"
            type="danger"
            v-if="!role.isInternal"
            size="small">
            删除角色组
          </el-button>
        </div>
      </div>
      <div class="box-body">
        <el-table
          ref="roleTable"
          :data="role.children"
          :show-header="false"
          stripe
          border
          @selection-change="handleRoleSelectionChange"
          style="width: 100%">
          <el-table-column type="index" width="50" align="center"></el-table-column>
          <el-table-column type="selection" width="55" align="center" :reserve-selection="true" :selectable="handleSelectable"></el-table-column>
          <el-table-column sortable prop="name" label=""></el-table-column>
          <el-table-column prop="name" label="" width="80" align="center">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRole(scope.$index,scope.row)"
                type="text"
                class="text-danger"
                v-if="!scope.row.isInternal"
                size="small">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="padding-top: 10px;">
          <el-button
            @click="addRole"
            size="small">
            添加角色
          </el-button>
          <el-button
            @click.native.prevent="deleteSelectedRole"
            type="danger"
            :disabled="multipleRoleSelection.length===0"
            size="small">
            删除选中角色（{{multipleRoleSelection.length}}）
          </el-button>
        </div>
      </div>
    </div>
    <div class="box" v-if="!role.group">
      <div class="box-header">
        <div class="box-title"><i class="fa fa-group"></i>当前角色【{{role.name}}】包含的人员</div>
        <div class="box-tools">
          <el-button
            @click.native.prevent="dialogFormVisible = true"
            size="small">
            添加员工
          </el-button>
          <el-button
            @click.native.prevent="removeAllUser"
            type="danger"
            :disabled="tableData.length===0"
            size="small">
            移除所有人员
          </el-button>
        </div>
      </div>
      <div class="box-body">
        <el-table
          v-loading="loading"
          ref="userTable"
          :data="tableData"
          stripe
          border
          row-key="id"
          @selection-change="handleSelectionChange"
          style="width: 100%">
          <el-table-column type="index" width="50" align="center"></el-table-column>
          <el-table-column type="selection" width="55" align="center" :reserve-selection="true"></el-table-column>
          <el-table-column sortable prop="name" label="姓名"></el-table-column>
          <el-table-column sortable prop="position" label="职位"></el-table-column>
          <el-table-column sortable prop="mobile" label="手机号"></el-table-column>
          <el-table-column sortable prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="name" label="" width="80" align="center">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="removeUser(scope.$index,scope.row)"
                type="text"
                class="text-danger"
                size="small">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="padding-top: 10px;">
          <el-button
            @click.native.prevent="dialogFormVisible = true"
            size="small">
            添加员工
          </el-button>
          <el-button
            @click.native.prevent="removeSelectedUser"
            type="danger"
            :disabled="multipleSelection.length===0"
            size="small">
            移除选中人员（{{multipleSelection.length}}）
          </el-button>
        </div>
        <el-pagination
          background
          @current-change="handlePaginationChange"
          :current-page="page.pageNum"
          :page-size="page.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="page.total">
        </el-pagination>
      </div>
    </div>
    <choose-user :visible.sync="dialogFormVisible" :exclude-user="userids" @onOk="handleAddUser"></choose-user>
  </div>
</template>
<script>
  import ChooseUser from '../inc/choose_user_by_depart'

  export default {
    components: {ChooseUser},
    props: {
      role: {
        type: Object,
        default: {
          children: []
        }
      },
      roleId: {
        type: [Number, String],
        default: 0
      }
    },
    data() {
      return {
        tableData: [], // 下级部门表格
        loading: false,
        page: {
          pageNum: 1,
          pageSize: 20,
          sortName: '',
          sortOrder: '',
          total: 0,
          roleId: ''
        },
        multipleRoleSelection: [],
        multipleSelection: [],
        dialogFormVisible: false,
        roleForm: {}
      }
    },
    computed: {
      userids: function () {
        return this.tableData.map(r => {
          return r.userid;
        });
      }
    },
    methods: {
      loadUserData() {
        this.loading = true;
        this.$http.get('/sys/user/list', this.page, r => {
          this.tableData = r.data.list;
          this.page.total = r.data.total;
          this.loading = false;
        });
      },
      // 分页
      handlePaginationChange(pageNum) {
        this.page.pageNum = pageNum;
        this.loadUserData();
      },
      handleRoleSelectionChange(val) {
        this.multipleRoleSelection = val;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSelectable(row, index) {
        return !row.isInternal;
      },
      addRole() {
        this.$prompt('请输入角色名称', '添加角色', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValidator: function (val) {
            if (!val) {
              return '请输入角色名称';
            }
            if (val.length > 20) {
              return '角色名称不能超过20个字符';
            }
            return true;
          }
        }).then(({value}) => {
          this.$http.post('/sys/role/add', {name: value, groupName: this.role.name, groupId: this.roleId}, r => {
            // this.$emit('change');
            this.role.children.push({
              id: r.data,
              name: value
            });
            this.$message({
              type: 'success',
              message: '新增成功!'
            });
          });
        });
      },
      deleteRole(index, row) {
        this.$confirm('确定要删除角色【' + row.name + '】吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/sys/role/delete', {id: row.id}, r => {
            // this.$emit('change');
            this.role.children.splice(index, 1);
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          });
        });
      },

      r() {
        const newChildren = [];
        this.role.children.forEach(d => {
          let isDel = false;
          for (let i = 0, len = this.multipleRoleSelection.length; i < len; i++) {
            const c = this.multipleRoleSelection[i];
            if (d.id === c.id) {
              isDel = true;
              break;
            }
          }
          if (!isDel) { newChildren.push(d); }
        });

        this.role.children.splice(0, this.role.children.length);

        newChildren.forEach(c => {
          this.role.children.push(c);
        });

        this.$refs.roleTable.clearSelection();
      },

      deleteSelectedRole() {
        const ids = this.multipleRoleSelection.map(r => {
          return r.id
        });
        this.$confirm('确定要删除选中的角色吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/sys/role/delete', {ids: ids}, r => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.r();
          });
        });
      },
      deleteGroup() {
        this.$confirm('确定要删除【' + this.role.name + '】角色组吗，删除角色组会自动删除下级所有角色?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/sys/role/group/delete', {id: this.roleId}, r => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.$emit('change');
          });
        });
      },
      handleAddUser(userList, departList) {
        const ids = userList.map(r => {
          return r.userid
        });
        this.$http.post('/sys/role/user/add', {roleId: this.roleId, users: ids}, r => {
          this.$message({
            type: 'success',
            message: '添加成功!'
          });
          this.loadUserData();
          this.$refs.userTable.clearSelection();
        });
      },
      removeSelectedUser() {
        const ids = this.multipleSelection.map(r => {
          return r.userid
        });
        this.$http.post('/sys/role/user/remove', {roleId: this.roleId, users: ids}, r => {
          this.$message({
            type: 'success',
            message: '移除成功!'
          });
          this.loadUserData();
          this.$refs.userTable.clearSelection();
        });
      },
      removeUser(index, row) {
        this.$http.post('/sys/role/user/remove', {roleId: this.roleId, users: [row.userid]}, r => {
          this.$message({
            type: 'success',
            message: '移除成功!'
          });
          this.tableData.splice(index, 1);
        });
      },
      removeAllUser() {
        this.$http.post('/sys/role/user/remove/all', {roleId: this.roleId}, r => {
          this.$message({
            type: 'success',
            message: '移除全部成功!'
          });
          this.tableData = [];
        });
      }
    },
    watch: {
      roleId: {
        immediate: true,
        handler: function (val) {
          this.page.pageSize = 20;
          this.page.pageNum = 1;
          this.page.total = 0;
          this.page.roleId = val;
          this.loadUserData();
        }
      }
    }
  }
</script>

<style lang="scss" scoped>


  .tip {
    padding: 20px;
  }

  .box {
    margin-top: 30px;
    .box-header {
      padding-left: 15px;
      padding-right: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 42px;
      border: solid 1px #EBEEF5;
      background-color: #F2F6FC;
      color: #606266;
      .box-title {
        font-size: 18px;
        font-weight: 500;
      }
      i {
        display: inline-block;
        margin-right: 6px;
        color: #909399;
      }
    }
    .box-body {
      padding: 12px 0;
    }
  }
</style>
