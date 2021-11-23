<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-input placeholder="请输入商品类型" v-model="filterText" suffix-icon="el-icon-search" clearable></el-input>
        <!---------------商品组织结构---------------->
        <br/>
        <br/>
        <el-tree v-loading="treeLoading"
                 :data="commodityTree"
                 :props="defaultProps"
                 :highlight-current="true"
                 node-key="id"
                 @node-click="handleNodeClick"
                 default-expand-all
                 ref="tree"
                 :filter-node-method="filterNode"></el-tree>
      </el-col>
      <el-col :span="18">
        <!--------------------商品列表展示----------------------->
        <!--头部按钮-->
        <div class="text-right">
          <el-form :inline="true" class="form-compact" @submit.native.prevent>
            <el-form-item>
              <el-search v-model="page.keyword" @click="loadTableData" placeholder="请输入商品名称或商品编码" @keyup.enter.native="loadTableData"></el-search>
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
          <el-table-column type="selection" width="55" :reserve-selection="true" :selectable="handleSelectable"></el-table-column>
          <el-table-column sortable prop="code" label="编码"></el-table-column>
          <el-table-column sortable prop="name" label="商品名称"></el-table-column>
          <el-table-column sortable prop="wholesalePrice" label="基本单位批发价" width="150px">
            <template slot-scope="scope">
              {{scope.row.wholesalePrice | price}}/{{scope.row.basicUnitName}}
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          @current-change="handlePaginationChange"
          :current-page="page.pageNum"
          :page-size="page.pageSize"
          layout="total, prev, pager, next"
          :total="page.total">
        </el-pagination>
      </el-col>
    </el-row>
    <div class="text-right">
      <el-button type="primary" @click="onChoose">确定</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      visible: {
        type: Boolean
      },
      disabledList: {
        type: Array,
        default: function () {
          return null;
        }
      }
    },
    data() {
      return {
        commodityTree: [{'name': '全部商品', 'id': 0, 'children': []}], // 商品组织结构
        filterText: '', // 商品组织结构筛选
        tableData: [], // 商品列表数据源
        page: {
          pageNum: 1,
          pageSize: 20,
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
        chosenIdList: [], // 选中的id集合
        commodityList: []// 选中商品集合
      };
    },
    mounted() {
      this.loadCommodityTree();
      this.loadTableData();
    },
    methods: {
      /* 加商品织架构*/
      loadCommodityTree() {
        this.tableLoading = true;
        this.$http.get('/psi/item/type/list', {}, r => {
          this.commodityTree[0].children = r.data;
          this.tableLoading = false;
        });
      },
      /* 加载表格数据*/
      loadTableData(flag) {
        this.tableLoading = true;
        this.$http.get('/psi/item/list/simple', this.page, r => {
          this.tableData = r.data.list;
          this.page.total = r.data.total;
          this.tableLoading = false;
          if (flag) {
            this.updateChosenList();
          }
        });
      },
      updateChosenList() {
        if (!this.chosenList) {
          this.chosenList = [];
        }
        this.chosenList.forEach(row => {
          if (row.id !== undefined && row.id.length > 0) {
            this.$refs.multipleTable.toggleRowSelection(row, true);
          }
        });
      },
      /* 商品树形控件点击事件*/
      handleNodeClick(data) {
        this.page.categoryId = data.id;
        this.loadTableData(false);
      },
      /* 分页*/
      handlePaginationChange(pageNum) {
        this.page.pageNum = pageNum;
        this.loadTableData(false);
      },
      handleTableSelectionChange(val) {
        this.commodityList = val;
      },
      handleRowKey(row) {
        return row.id;
      },
      handleSelectable(row, index) {
        let canChoose = true;
        if (this.disabledList && this.disabledList.length > 0) {
          for (let i = 0, len = this.disabledList.length; i < len; i++) {
            const obj = this.disabledList[i];
            if (obj === row.id) {
              canChoose = false;
              break;
            }
          }
        }
        return canChoose;
      },
      /* 商品组织架构的过滤*/
      filterNode(value, data) {
        if (!value) { return true; }
        return data.name.indexOf(value) !== -1;
      },
      // 组件选中事件
      onChoose(rows) {
        const list = JSON.parse(JSON.stringify(this.commodityList));
        this.$emit('getChosenItemList', list);
        this.$refs.multipleTable.clearSelection();
      }
    },
    watch: {
      /* 商品组织架构的过滤*/
      filterText(val) {
        this.$refs.tree.filter(val);
      },
      visible: function (val) {
        this.$refs.multipleTable.clearSelection();
      }
    },
    computed: {}
  }
</script>
<style lang="scss" scoped>
</style>
