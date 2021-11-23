<template>
  <div class="table">
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
      <el-table-column width="30" align="center" type="selection"></el-table-column>
      <el-table-column sortable prop="name" label="客户名称" min-width="120">
        <template slot-scope="scope">
          <a class="link" @click="handleShowDetails(scope.row)">{{scope.row.name}}</a>
        </template>
      </el-table-column>
      <el-table-column sortable prop="code" label="客户编码" width="110"></el-table-column>
      <el-table-column sortable label="客户电话" width="120">
        <template slot-scope="scope">
          {{scope.row.telephone}}
        </template>
      </el-table-column>
      <el-table-column sortable prop="createTime" label="创建时间" width="120">
        <template slot-scope="scope">
          {{scope.row.createTime| date}}
        </template>
      </el-table-column>
      <el-table-column sortable label="所属销售区域" width="180">
        <template slot-scope="scope">
          {{scope.row.saleAreaName}}
        </template>
      </el-table-column>
      <el-table-column sortable prop="addressDetail" label="客户地址" min-width="120">
        <template slot-scope="scope">
          <i v-if="scope.row.location" class="fa fa-map-marker"></i>
          {{scope.row.address}} {{scope.row.addressDetail}}
          <!-- {{scope.row.addressDetail}} -->
        </template>
      </el-table-column>
      <el-table-column fixed="right" width="150" label="操作" header-align="center">
        <template slot-scope="scope">
          <el-button size="small" v-auth="'customer.management.list.edit'" type="button" class="text-primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" v-auth="'customer.management.list.delete'" type="button" class="text-danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    props: {
      tableData: {
        type: Array
      }
    },
    data() {
      return {
        
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.$emit('handleSelectionChange', val)
      },
      handleShowDetails(val) {
        this.$emit('handleShowDetails', val)
      },
      handleSort(val) {
        this.$emit('handleSort', val, )
      },
      handleEdit(val, row) {
        this.$emit('handleEdit', val, row)
      },
      handleDelete(val, row) {
        this.$emit('handleDelete', val, row)
      }
    }
  }
</script>
<style lang="scss">
</style>
