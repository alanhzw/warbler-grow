<template xmlns="">
  <el-dialog title="选择部门" :visible="visible" width="800px" @close="handleClose">
    <el-row type="flex" class="row-bg" justify="left" align="middle">
      <!--引入树形控件-->
      <el-col :span="10">
        <el-card class="box-card transfer-panel">
          <el-tree
            ref="tree"
            v-loading="loading"
            :data="departTree"
            show-checkbox
            :check-strictly="checkStrictly"
            :props="defaultProps"
            node-key="id"
            auto-expand-parent
            default-expand-all
            :default-expanded-keys="checkedIds"
            :default-checked-keys="checkedIds"
            @check-change="handleCheckChange"
          >
          </el-tree>
        </el-card>
      </el-col>
      <el-col :span="1"><br></el-col>
      <el-col :span="11">
        <el-card class="box-card transfer-panel">
          <el-table
            ref="datatable"
            :data="departList"
            :show-header="false">
            <el-table-column sortable prop="name"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">关闭</el-button>
      <el-button type="primary" @click="handleOK">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  export default {
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      visible: Boolean,
      checkStrictly: {
        type: Boolean,
        default: false
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
        isLoaded: false
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
          return r.id
        });
      }
    },
    methods: {
      loadDepart() {
        this.loading = true;
        this.$http.get('/sys/department/tree', null, r => {
          this.departTree = r.data;
          this.loading = false;
        });
      },
      handleCheckChange() {
        this.departList = this.$refs.tree.getCheckedNodes();
      },
      handleClose() {
        this.$emit('update:visible', false);
      },
      handleOK() {
        this.$emit('update:visible', false);
        this.$emit('change', this.departList);
        this.$emit('onOk', this.departList);
      }
    },
    watch: {
      visible(val) {
        if (val) {
          this.departList = this.value || [];
          if (this.$refs.tree) { this.$refs.tree.setCheckedKeys(this.checkedIds); }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .transfer-panel {
    position: relative;
    height: 480px;
    box-shadow: none;
    overflow: auto;

  }
</style>
