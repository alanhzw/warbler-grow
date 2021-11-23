<template>
  <div class="page-content">
    <breadcrumb/>
    <div class="fh-container clearfix">
      <div class="fh-side-left">
        <div>
          <el-input placeholder="请输入部门名称" v-model="filterText" suffix-icon="el-icon-search" clearable v-if="activeName==='first'"></el-input>
          <el-input placeholder="请输入角色名称" v-model="filterTextRole" suffix-icon="el-icon-search" clearable v-else></el-input>
        </div>
        <br/>
        <el-radio-group v-model="activeName">
          <el-radio-button label="first">组织架构</el-radio-button>
          <el-radio-button label="second">&emsp;角色&emsp;</el-radio-button>
        </el-radio-group>
        <br/>
        <br/>
        <!--组织架构-->
        <div v-show="activeName==='first'">
          <!-- <div class="tool-box"> -->
            <!--同步按钮-->
            <!-- <el-button type="info" icon="el-icon-loading" v-if="isSyncing">正在同步中</el-button>
            <el-button type="warning" icon="el-icon-refresh" @click="handleSync" v-else>同步组织架构</el-button>
            <el-progress v-if="showBar" :percentage="syncProcess"></el-progress>
          </div> -->
          <el-tree v-loading="loading"
                    empty-text=""
                   :data="departTree"
                   :props="defaultProps"
                   :highlight-current="true"
                   :expand-on-click-node="false"
                   default-expand-all
                   node-key="id"
                   @node-click="handleNodeClick"
                   ref="tree"
                   :filter-node-method="filterNode">
          </el-tree>
        </div>
        <!--角色-->
        <div v-show="activeName==='second'">
          <div>
            <!--新增按钮-->
            <el-button type="info" icon="el-icon-plus" @click="handleAddRole">新增角色组</el-button>
            <br/>
            <br/>
          </div>
          <el-tree v-loading="loadingRole"
                   ref="tree2"
                   default-expand-all
                   node-key="id"
                   :data="roleTree"
                   :props="defaultProps"
                   :highlight-current="true"
                   :expand-on-click-node="false"
                   @node-click="handleNodeClickRole"
                   :filter-node-method="filterNodeRole"
          >
            <div class="el-tree-node" slot-scope="{ node, data }">
                <span class="el-tree-node__label">{{ node.label }}
                  <span v-if="data.isInternal">（内置）</span>
                </span>
            </div>
          </el-tree>
        </div>
      </div>
      <div class="fh-content">
        <!--组织架构展示-->
        <structure v-if="activeName==='first'"
                   :department-id="departmentId"
                   :department="department"/>
        <!--角色架构展示-->
        <role v-else
              :role="role"
              :role-id="roleId"
              @change="handleRoleChange"
        >
        </role>
      </div>
    </div>
  </div>
</template>
<script>
  import structure from './structure'
  import role from './role'

  export default {
    components: {structure, role},
    data() {
      return {

        departTree: [], // 组织架构数据源
        roleTree: [], // 角色数据源

        defaultProps: {// 组织架构基础数据类型
          children: 'children',
          label: 'name',
          value: 'id'
        },

        isSyncing: false,
        syncProcess: 0,
        showBar: false,
        activeName: 'first',

        loading: true,
        loadingRole: true,

        filterText: '',
        filterTextRole: '',

        departmentId: 0,
        department: {},

        role: {},
        roleId: 0
      }
    },
    created() {
    },
    mounted() {
      this.loadDepart();
      this.loadRole();
      this.getStatus();
    },
    methods: {
      loadDepart() {
        this.$http.get('/sys/department/tree', {}, r => {
          this.departTree = r.data;
          this.loading = false;
          const param = r.data[0];
          setTimeout(() => {
            this.$refs.tree.setCurrentKey(param.id);
          }, 100)
          console.log('param', param)
          this.handleNodeClick(param);
        });
      },
      loadRole() {
        this.$http.get('/sys/role/tree', {}, r => {
          this.roleTree = r.data;
          if (r.data && this.$refs.tree2) {
            setTimeout(() => {
              if (this.$refs.tree2) {
                this.$refs.tree2.setCurrentKey(r.data[0].id);
              }
            }, 1000)
            this.handleNodeClickRole(r.data[0]);
          }
          this.loadingRole = false;
        });
      },
      getStatus() {
        this.$http.get('/sys/corp/sync/process', {}, r => {
          if (r.data === null) {
            this.isSyncing = false;
            this.syncProcess = 0;
          } else if (r.data === 'completed') {
            this.isSyncing = false;
            this.syncProcess = 100;
            if (this.showBar) {
              this.$message({
                message: '同步完成',
                type: 'success'
              });
              this.loadDepart();
              setTimeout(() => {
                this.syncProcess = 0;
                this.showBar = false;
              }, 5000);
            }
          } else {
            // 更新进度
            this.isSyncing = true;
            this.syncProcess = parseInt(r.data, 10);
            setTimeout(this.getStatus, 100);
          }
        });
      },
      filterNode(value, data) {
        if (!value) { return true; }
        return data.name.indexOf(value) !== -1;
      },
      filterNodeRole(value, data) {
        if (!value) { return true; }
        return data.name.indexOf(value) !== -1;
      },
      handleSync() {
        this.showBar = true;
        this.syncProcess = 0;
        this.$http.post('/sys/corp/sync', {}, r => {

          this.getStatus();
        });
      },
      handleAddRole() {
        this.$prompt('请输入角色组名称', '添加角色组', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValidator: function (val) {
            if (!val) {
              return '请输入角色组名称';
            }
            if (val.length > 20) {
              return '角色组名称不能超过20个字符';
            }
            return true;
          }
        }).then(({value}) => {
          this.$http.post('/sys/role/group/add', {name: value, groupName: value}, r => {
            this.roleTree.push({
              id: r.data,
              name: value,
              groupName: value,
              group: true,
              children: []
            });
            this.$message({
              type: 'success',
              message: '新增成功!'
            });
            this.$refs.tree2.setCurrentKey(r.data);
          });
        });
      },
      handleRoleChange() {
        this.loadRole();
      },
      handleNodeClick(data) {
        this.departmentId = data.id;
        this.department = data;
      },
      handleNodeClickRole(data) {
        this.roleId = data.id;
        this.role = data;
      }
    },
    watch: {
      /* 部门组织架构的过滤,角色架构的过滤*/
      filterText(val) {
        this.$refs.tree.filter(val);
      },
      /* 部门组织架构的过滤,角色架构的过滤*/
      filterTextRole(val) {
        this.$refs.tree2.filter(val);
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
