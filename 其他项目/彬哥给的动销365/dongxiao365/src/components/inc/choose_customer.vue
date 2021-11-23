<template>
  <div>
    <el-row class="tool-box" v-if="array.length>0">
      <el-tag v-for="item in array" :key="item.id" type="info">{{item.name}}</el-tag>
    </el-row>
    <el-row>
        <!--------------------商品列表展示----------------------->
        <!--头部按钮-->
        <div class="text-right">
          <el-form :inline="true" class="form-compact" @submit.native.prevent>
            <el-form-item>
              <el-search v-model="page.keyword" @click="loadTableData" @keyup.enter.native="loadTableData"></el-search>
            </el-form-item>
          </el-form>
        </div>
        <br/>
        <el-table
          :data="tableData"
          class="table-compact"
          stripe
          ref="datatable"
          @row-click="rowClick"
          border>
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column sortable prop="name" label="客户名称"></el-table-column>
        </el-table>
        <el-pagination
          background
          @current-change="handlePaginationChange"
          @size-change="handleSizeChange"
          :current-page="page.pageNum"
          :page-size="page.pageSize"
          layout="total, sizes,prev, pager, next, jumper"
          :total="page.total">
        </el-pagination>
    </el-row>
    <div class="text-right">
      <el-button type="primary" @click="onSubmit" >确定</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['defaultValue'],
    data() {
      return {
        commodityTree: [], // 商品组织结构
        filterText: '', // 商品组织结构筛选
        tableData: [], // 商品列表数据源
        page: {
          pageNum: 1,
          pageSize: 10,
          sortName: '',
          sortOrder: '',
          total: 0,
          keyword: '',
          commodityId: '', // 产品id'
          selectValue: '全部商品', // 头部下拉选
          type: ''
        },
        defaultProps: {// 组织架构基础数据类型
          children: 'children',
          label: 'name',
          value: 'id'
        },
        loading: true,
        array: []
      };
    },
    created() {
      this.loadTableData();
    },
    mounted() {
    },
    methods: {
      /* 加载表格数据*/
      loadTableData(val) {
        if (val) {
          this.data = this.$util.extend(this.page, val);
        } else {
          this.data = this.page;
        }
        this.$http.get('crm/customer/simple', this.data, r => {
          this.tableData = r.data.list;
          this.page.total = r.data.total;
          this.loading = false;
        });
      },
      /* 分页*/
      handlePaginationChange(pageNum) {
        this.page.pageNum = pageNum;
        this.loadTableData();
      },
      // 分页改变事件
      handleSizeChange(val) {
        this.page.pageSize = val;
        this.loadTableData();
      },
      // 表行点击事件
      rowClick(row, column, cell, event) {
        this.array = [];
        this.array.push(row);
      },
      // 确定事件
      onSubmit() {
        if (this.array.length) {
          this.$emit('getCustomer', this.array[0]);
        } else {
          this.$emit('getCustomer', null);
        }
      }
    },
    watch: {
    },
    computed: {}
  }
</script>
<style lang="scss" scoped>
</style>
