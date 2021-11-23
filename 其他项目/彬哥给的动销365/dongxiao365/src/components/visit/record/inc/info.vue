<template>
  <div style="height:400px;overflow:auto;">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column type="index" width="42"></el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="180">
        <template slot-scope="scope">
          {{scope.row.createTime|datetime}}
        </template>
      </el-table-column>
      <el-table-column sortable prop="visitorName" label="姓名" width="180"></el-table-column>
      <el-table-column sortable prop="action" label="内容"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    props: ["executeId"],
    data() {
      return {
        tableData: []
      };
    },
    created() {
      this.loadInfo();
    },
    mounted() {
    },
    methods: {
      loadInfo() {
        this.tableData = [];
        this.$http.get('/crm/visit/record/list/detail', {executeId: this.executeId}, r => {
          this.tableData = r.data;
        });
      }
    },
    watch: {
      executeId() {
        this.loadInfo();
      }
    },
    filters: {},
    computed: {}
  }
</script>

<style lang="scss">

</style>

