<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-input placeholder="请输入商品名称" v-model="filterText" suffix-icon="el-icon-search" clearable></el-input>
        <!---------------商品组织结构---------------->
        <br/>
        <el-tree v-loading="treeLoading"
                 :data="commodityTree"
                 :props="defaultProps"
                 :highlight-current="true"
                 :expand-on-click-node="false"
                 node-key="id"
                 @node-click="handleNodeClick"
                 ref="tree"
                 :filter-node-method="filterNode"></el-tree>
      </el-col>
      <el-col :span="18">
        <!--------------------商品列表展示----------------------->
        <!--头部按钮-->
        <div class="text-right">
          <el-form :inline="true" class="form-compact" @submit.native.prevent>
            <el-form-item>
              <el-search v-model="page.keyword" @click="loadTableData" placeholder="请输入内容" @keyup.enter.native="loadTableData"></el-search>
            </el-form-item>
          </el-form>
        </div>
        <br/>
        <el-table
          v-loading="tableLoading"
          :data="tableData"
          :row-key="handleRowKey"
          class="table-compact"
          stripe
          ref="multipleTable"
          @selection-change="handleTableSelectionChange"
          border>
          <el-table-column type="index"></el-table-column>
          <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
          <el-table-column sortable prop="code" label="编码"></el-table-column>
          <el-table-column sortable prop="name" label="商品名称"></el-table-column>
          <el-table-column sortable prop="wholesalePrice" label="基本单位批发价" width="150px"></el-table-column>
        </el-table>
      </el-col>
    </el-row>

  </div>
</template>

<script>

  export default {
    model: {
      prop: 'commodityList',
      event: 'change'
    },
    props: {
      commodityList: Array
    },
    data() {
      return {
        commodityTree: [], // 商品组织结构
        filterText: '', // 商品组织结构筛选
        tableData: [], // 商品列表数据源
        page: {
          pageNum: 1,
          pageSize: 2,
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
        tableLoading: false,
        treeLoading: false,
        chosenList: this.commodityList, // 选中的对象的集合
        chosenIdList: []// 选中的id集合
      };
    },
    mounted() {
      this.loadCommodityTree();
    },
    methods: {
      /* 加商品织架构*/
      loadCommodityTree() {
        this.tableLoading = true;
        this.$http.get('/psi/item/type/list', {}, r => {
          this.commodityTree = r.data;
          this.tableLoading = false;
        });
      },
      /* 加载表格数据*/
      loadTableData(flag) {
        this.tableLoading = true;
        this.$http.get('/psi/stock/list', this.page, r => {
          this.tableData = r.data;
          this.tableLoading = false;
          if (flag) {
            this.updateChosenList();
          }
        });
      },
      /* 更新chosenList*/
      updateChosenList() {
        this.chosenList.forEach(row => {
          if (row.id !== undefined && row.id.length > 0) {
            this.$refs.multipleTable.toggleRowSelection(row, true);
          }
        });
      },
      /* 商品树形控件点击事件*/
      handleNodeClick(data) {
        this.page.itemCategoryId = data.id;
        this.loadTableData(false);
      },
      handleTableSelectionChange(val) {
        this.chosenList = val;
        const ids = [];
        val.forEach(o => {
          ids.push(o.id);
        });
        this.chosenIdList = ids;
        this.$emit('change', val);
      },
      handleRowKey(row) {
        return row.id;
      },
      /* 商品组织架构的过滤*/
      filterNode(value, data) {
        if (!value) { return true; }
        return data.name.indexOf(value) !== -1;
      },
      onSubmit() {
      }
    },
    watch: {
      /* 商品组织架构的过滤*/
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    }
  }
</script>


