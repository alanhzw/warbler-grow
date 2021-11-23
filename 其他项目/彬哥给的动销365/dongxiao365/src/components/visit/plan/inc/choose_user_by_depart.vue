<template>
<div>
  <el-dialog :title="title" :visible="visible" width="800px" @close="handleClose" append-to-body>
    <div style="height:350px;">
    <el-row type="flex" class="row-bg" justify="left" align="middle">
      <el-col :span="10">
        <el-card class="box-card transfer-panel">
          <el-input placeholder="输入姓名进行过滤" v-model="filterText"></el-input>
          <el-tree
            ref="tree"
            node-key="id"
            v-loading="loading"
            auto-expand-parent
            default-expand-all
            :filter-node-method="filterNode"
            :data="departTree"
            :show-checkbox="multiple"
            :props="defaultProps"
            :check-strictly="!userOnly"
            :default-expanded-keys="checkedIds"
            :default-checked-keys="checkedIds"
            @check-change="handleCheckChange"
            @node-click="handleNodeClick"
          >
          </el-tree>
        </el-card>
      </el-col>
      <el-col :span="1"><br></el-col>
      <el-col :span="11">
        <el-card class="box-card transfer-panel">
          <template v-if="!userOnly">
            <el-tag v-for="(item,index) in departList" :key="index" v-if="!item.userid" type="primary">{{item.name}}</el-tag>
            <hr/>
          </template>
          <el-tag v-for="(item,index) in departList" :key="index" v-if="item.userid" type="info">{{item.name}}</el-tag>
        </el-card>
      </el-col>
    </el-row>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">关闭</el-button>
      <el-button type="primary" @click="handleOK">{{submitText}}</el-button>
    </div>
  </el-dialog>
</div>
</template>
<script>
  export default {
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      multiple: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: '选择人员'
      },
      submitText: {
        type: String,
        default: '保 存'
      },
      visible: Boolean,
      // 排除用户
      excludeUser: {
        type: Array,
        default: function () {
          return [];
        }
      },
      // 排除用户
      excludeDepart: {
        type: Array,
        default: function () {
          return [];
        }
      },
      userOnly: {
        type: Boolean,
        default: true
      },
      value: {
        type: Array,
        default: function () {
          return [];
        }
      }
    },
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'name',
          value: 'id'
        },
        departList: [],
        loading: true,
        loadingTable: false,
        departTree: [], // 部门树
        isLoaded: false,
        filterText: ''
      }
    },
    created() {
      this.loadDepart();
    },
    mounted() {
      //
    },
    computed: {
      // 选中的
      checkedIds() {
        if (this.value === null) {
          return [];
        }
        return this.value.map(r => {
          return r.id || r.userid || 0
        });
      }
    },
    methods: {
      loadDepart() {
        this.loading = true;
        this.$http.get('/sys/user/list/tree', {
          excludeUser: JSON.stringify(this.excludeUser),
          excludeDepart: JSON.stringify(this.excludeDepart)
        }, r => {
          this.departTree = r.data;
          this.loading = false;
        });
      },
      filterNode(value, data) {
        if (!value) { return true; }
        return data.name.indexOf(value) !== -1;
      },
      handleCheckChange() {
        this.departList = this.$refs.tree.getCheckedNodes();
      },
      handleNodeClick(data) {
        if (!this.multiple) {
          if (data.userid) { this.departList = [data]; }
        }
      },
      handleClose() {
        this.$emit('update:visible', false);
      },
      handleOK() {
        this.$emit('update:visible', false);

        const userList = [];
        const departList = [];
        this.departList.forEach(r => {
          if (r.userid) {
            userList.push(r);
          } else {
            departList.push(r);
          }
        });

        if (this.userOnly) {
          this.$emit('change', userList);
        } else {
          this.$emit('change', this.departList);
        }

        this.$emit('onOk', userList, departList);
      }
    },
    watch: {
      visible(val) {
        if (val) {
          this.departList = this.value || [];
          if (this.$refs.tree) { this.$refs.tree.setCheckedKeys(this.checkedIds); }
        }
      },
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .transfer-panel {
    position: relative;
    height: 370px;
    box-shadow: none;
    overflow: auto;
  }

  .el-tag {
    margin: 5px;
  }
</style>
