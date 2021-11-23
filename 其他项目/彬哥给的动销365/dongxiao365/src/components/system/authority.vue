<template>
  <div class="page-content">
    <breadcrumb/>
    <div class="fh-container clearfix">
      <div class="fh-side-left">
        <div>
          <el-input placeholder="请输入角色名称" v-model="filterTextRole" suffix-icon="el-icon-search" clearable ></el-input>
        </div>
        <br/>
        <!--角色-->
        <el-tree v-loading="loadingRole"
                 :data="roleTree"
                 :empty-text="emptyText"
                 :props="defaultPropsRole"
                 :highlight-current="true"
                 :expand-on-click-node="false"
                 default-expand-all
                 node-key="id"
                 @node-click="handleNodeClickRole"
                 ref="tree2"
                 :filter-node-method="filterNodeRole"></el-tree>
      </div>
      <div class="fh-content">
        <div v-loading="loadingConfig">
          <div class="page-title">
            当前选中角色：{{role.name}}
          </div>
          <div class="module-list">
            <div class="">
              <el-tree
                ref="customerTree"
                :data="customerTree.data"
                :default-checked-keys="checkedList"
                :props="menuProps"
                :expand-on-click-node="false"
                show-checkbox
                default-expand-all
                node-key="id">
              </el-tree>
              <br/>
              <el-button type="primary" @click="addMenu('customer')">新增菜单</el-button>
            </div>
            <div class="">
              <el-tree
                ref="visitTree"
                :data="visitTree.data"
                :default-checked-keys="checkedList"
                :props="menuProps"
                :expand-on-click-node="false"
                show-checkbox
                default-expand-all
                node-key="id">
              </el-tree>
              <br/>
              <el-button type="primary" @click="addMenu('visit')">新增菜单</el-button>
            </div>
            <div class="">
              <el-tree
                ref="orderTree"
                :data="orderTree.data"
                :default-checked-keys="checkedList"
                :props="menuProps"
                :expand-on-click-node="false"
                show-checkbox
                default-expand-all
                node-key="id">
              </el-tree>
              <br/>
              <el-button type="primary" @click="addMenu('order')">新增菜单</el-button>
            </div>
            <div class="">
              <el-tree
                ref="dataTree"
                :data="dataTree.data"
                :default-checked-keys="checkedList"
                :props="menuProps"
                :expand-on-click-node="false"
                show-checkbox
                default-expand-all
                node-key="id">
              </el-tree>
              <br/>
              <el-button type="primary" @click="addMenu('data')">新增菜单</el-button>
            </div>
            <div class="">
              <el-tree
                ref="systemTree"
                :data="systemTree.data"
                :default-checked-keys="checkedList"
                :props="menuProps"
                :expand-on-click-node="false"
                show-checkbox
                default-expand-all
                node-key="id">
              </el-tree>
              <br/>
              <el-button type="primary" @click="addMenu('system')">新增菜单</el-button>
            </div>
          </div>
          <div class="search-panel">
            <el-form  inline>
              <el-form-item>
                <el-button type="primary" @click="save" :disabled="!role.id">保存更改</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="warning" @click="reset">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="新增菜单"
      :visible.sync="dialogVisible"
      width="500px">
      <el-form :model="form" label-width="110px" ref="form">
        <el-form-item label="名称：">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="KEY">
          <el-input v-model="form.key" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单：">
          <el-cascader
            expand-trigger="hover"
            :change-on-select="true"
            :options="cascaderOptions"
            :props="menuProps"
            v-model="form.parent">
          </el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer text-right">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveMenu">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        /* ----------------加载角色树--------------------*/
        roleTree: [], // 角色数据源
        defaultPropsRole: {// 组织架构基础数据类型
          children: 'children',
          label: 'name',
          value: 'id'
        },
        role: {
          name: '未选择'
        },
        menuProps: {
          children: 'children',
          label: 'name',
          value: 'id'
        },
        emptyText: '没有角色数据',
        loadingRole: true,
        loadingConfig: false,
        filterTextRole: '',
        customerTree: {
          data: []
        },
        visitTree: {
          data: []
        },
        orderTree: {
          data: []
        },
        dataTree: {
          data: []
        },
        systemTree: {
          data: []
        },
        checkedList: [],
        dialogVisible: false,
        cascaderOptions: [],
        form: {}
      }
    },
    created() {
      this.loadRole();
    },
    mounted() {
      this.$http.get('/authority/getTree', {}, r => {
        const list = r.data;
        for (let i = 0, len = list.length; i < len; i++) {
          const item = list[i];
          const key = item.key;
          switch (key) {
            case 'customer':
              this.customerTree.data = [item];
              break;
            case 'visit':
              this.visitTree.data = [item];
              break;
            case 'order':
              this.orderTree.data = [item];
              break;
            case 'data':
              this.dataTree.data = [item];
              break;
            case 'system':
              this.systemTree.data = [item];
              break;
            default:
            // do nothing
          }
        }
      });
    },
    methods: {
      init(val) {
        this.title = val.name;
      },
      loadRole() {
        this.loadingRole = true;
        this.$http.get('/sys/role/list', {}, r => {
          this.roleTree = r.data;
          this.handleNodeClickRole(r.data[0]);
          setTimeout(() => {
            this.$refs.tree2.setCurrentKey(r.data[0].id);
          }, 1000);
          this.loadingRole = false;
        });
      },
      loadAuthority() {
        this.loadingConfig = true;
        this.$http.get('/authority', {roleId: this.role.id}, r => {
          this.checkedList = [];
          if (r.data && r.data.checkMenus) { this.checkedList = JSON.parse(r.data.checkMenus); }
          this.reset();
          this.loadingConfig = false;
        })
      },
      handleNodeClickRole(data) {
        this.role = data;
        this.loadAuthority();
      },
      reset() {
        this.$refs.customerTree.setCheckedKeys(this.checkedList);
        this.$refs.visitTree.setCheckedKeys(this.checkedList);
        this.$refs.orderTree.setCheckedKeys(this.checkedList);
        this.$refs.dataTree.setCheckedKeys(this.checkedList);
        this.$refs.systemTree.setCheckedKeys(this.checkedList);
      },
      filterNodeRole(value, data) {
        if (!value) { return true; }
        return data.name.indexOf(value) !== -1;
      },
      save() {
        if (this.role.id) {
          const customerData = this.$refs.customerTree.getCheckedKeys();
          const visitData = this.$refs.visitTree.getCheckedKeys();
          const orderData = this.$refs.orderTree.getCheckedKeys();
          const dataData = this.$refs.dataTree.getCheckedKeys();
          const systemData = this.$refs.systemTree.getCheckedKeys();

          const customerHalfData = this.$refs.customerTree.getHalfCheckedKeys();
          const visitHalfData = this.$refs.visitTree.getHalfCheckedKeys();
          const orderHalfData = this.$refs.orderTree.getHalfCheckedKeys();
          const dataHalfData = this.$refs.dataTree.getHalfCheckedKeys();
          const systemHalfData = this.$refs.systemTree.getHalfCheckedKeys();

          const halfMenus = customerHalfData.concat(visitHalfData).concat(orderHalfData).concat(dataHalfData).concat(systemHalfData);
          const checkMenus = customerData.concat(visitData).concat(orderData).concat(dataData).concat(systemData);

          const postData = {
            roleId: this.role.id,
            halfMenus: halfMenus,
            checkMenus: checkMenus
          };

          this.$http.post('/authority/save', postData, r => {
            this.$message({
              message: '保存成功',
              type: 'success'
            });
          })
        }
      },
      addMenu(reg) {
        switch (reg) {
          case 'customer':
            this.cascaderOptions = this.customerTree.data;
            break;
          case 'visit':
            this.cascaderOptions = this.visitTree.data;
            break;
          case 'order':
            this.cascaderOptions = this.orderTree.data;
            break;
          case 'data':
            this.cascaderOptions = this.dataTree.data;
            break;
          case 'system':
            this.cascaderOptions = this.systemTree.data;
            break;
          default:
            // do nothing
        }
        this.dialogVisible = true;
      },
      saveMenu() {
        if (this.form.parent) { this.form.parentId = this.form.parent[this.form.parent.length - 1]; }
        this.$http.post('/authority/add', this.form, r => {
          this.$message({
            message: '保存成功',
            type: 'success'
          });
          this.form.name = '';
          this.form.key = '';
        })
      }
    },
    watch: {
      /* 部门组织架构的过滤,角色架构的过滤*/
      filterTextRole(val) {
        this.$refs.tree2.filter(val);
      }
    },
    filters: {}
  }
</script>
<style lang="scss" scoped>
  .fh-content {
    padding: 0;
    .page-title {
      padding: 10px;
      border-bottom: solid 1px #EBEEF5;
    }
  }

  .module-list {
    display: flex;
    justify-content: flex-start;
    & > div {
      min-width: 160px;
      border-right: solid 1px #EBEEF5;
      margin-right: 10px;
      padding: 10px 20px 20px 1px;
    }
  }
</style>
