<template>
  <div class="depart-tree">
    <div style="padding: 0 10px 10px 10px;">
      <el-input placeholder="请输入员工或部门" v-model="filterText" clearable></el-input>
    </div>
    <el-tree
      ref="tree"
      node-key="id"
      v-loading="loading"
      default-expand-all
      :data="departTree"
      :props="props"
      :highlight-current="true"
      :expand-on-click-node="false"
      :filter-node-method="filterNode"
      @node-click="handleDepartClick"></el-tree>
  </div>
</template>

<script>
  export default {
    name: "depart-tree",
    data() {
      return {
        departTree: [],
        filterText: '',
        props: {children: 'children', label: 'name', value: 'id'}
      }
    },
    created() {
      this.loadDepartTree();
    },
    methods: {
      loadDepartTree() {
        this.loading = true;
        this.$http.get("/sys/user/list/tree", {}, r => {
          this.loading = false;
          this.departTree = r.data;
        })
      },
      handleDepartClick(data) {
        this.$emit('node-click', data);
      },
      filterNode(value, data) {
        if (!value) { return true; }
        return data.name.indexOf(value) !== -1;
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
  .depart-tree {
    height: 100%;
  }
</style>
