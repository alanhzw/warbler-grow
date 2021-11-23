<template>
  <div>
    <breadcrumb/>
    <div class="fh-container clearfix">
      <div class="fh-side-left">
        <div>
          <el-input placeholder="请输入商品类型" v-model="filterText" suffix-icon="el-icon-search" clearable></el-input>
        </div>
        <br/>
        <!---商品组织结构-->
        <div>
          <el-tree v-loading="loading"
                   :data="commodityTree"
                   :props="defaultProps"
                   :highlight-current="true"
                   :expand-on-click-node="false"
                   node-key="id"
                   @node-click="handleNodeClick"
                   default-expand-all
                   ref="tree"
                   :filter-node-method="filterNode"></el-tree>
        </div>
      </div>
      <!--商品列表展示-->
      <div class="fh-content">
        <!--头部按钮-->
        <div class="tool-box">
          <el-row>
            <el-col :span="8">
              <div style="display:flex;">
                <el-button type="success" icon="el-icon-circle-plus-outline" @click="addCommodity">新增商品</el-button>
                <!--多选隐藏按钮-->
                <template v-if="optBoxVisible">
                  <el-button type="danger" icon="el-icon-delete" @click="multipleDelete">批量删除</el-button>&nbsp;
                </template>
              </div>
            </el-col>
            <!--头部-->
            <el-col :span="16" class="text-right">
              <el-form :inline="true" class="form-compact" @submit.native.prevent>
                  <el-form-item>
                    <el-search v-model="page.keyword" @click="loadTableData" @keyup.enter.native="loadTableData" placeholder="请输入商品名称、编码、标签"></el-search>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="info" icon="fa fa-filter" @click="searchBoxVisible = !searchBoxVisible">筛选</el-button>
                  </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </div>
        <!--检索条件-->
        <div class="tool-box" v-show="searchBoxVisible">
          <div class="search-panel border">
            <ComSearch @onSearch="handleFilter"/>
          </div>
        </div>
        <!--表格-->
        <div>
          <el-table
            :data="tableData"
            class="table-compact"
            ref="multipleTable"
            @selection-change="handleSelectionChange"
            stripe
            border
            style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column sortable prop="code" label="编码" width="110"></el-table-column>
            <el-table-column sortable prop="name" label="商品名称">
              <template slot-scope="scope">
                <el-button type="text" @click="info(scope.row)">{{scope.row.name}}</el-button>
              </template>
            </el-table-column>
            <el-table-column sortable prop="catetoryName" label="类型" width="150"></el-table-column>
             <el-table-column sortable prop="brandName" label="品牌" width="180"></el-table-column>
              <el-table-column sortable prop="basicUnitName" label="单位" width="100"></el-table-column>
            <el-table-column sortable prop="specification" label="规格属性" width="150"></el-table-column>
            <el-table-column sortable prop="retailPrice" label="批发价" width="120">
              <template slot-scope="scope">
                {{scope.row.retailPrice | price}} / ({{scope.row.basicUnitName}})
              </template>
            </el-table-column>
            <div style="display:flex;">
              <el-table-column sortable prop="tag" label="标签" width="100">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.tag" size="small">{{scope.row.tag}}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column sortable prop="status" label="状态" width="100">
                <template slot-scope="scope">
                  <el-tag :type="scope.row.status === 0 ? 'danger' : 'success'" size="small">{{scope.row.status | status}}
                  </el-tag>
                </template>
              </el-table-column>
            </div>
            <el-table-column fixed="right" label="操作" width="230">
              <template slot-scope="scope">
                <el-button type="button" size="small" class="text-primary" @click="editOne(scope.row)">修改</el-button>
                <el-button type="button" size="small" class="text-danger" @click="deleteOne(scope.row)">删除</el-button>
                <el-button type="button" size="small" class="text-info" @click="stopSale(scope.row)" v-show="scope.row.status === 1">停售</el-button>
                <el-button type="button" size="small" class="text-success" @click="sale(scope.row)" v-show="scope.row.status === 0">发售</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            @current-change="handlePaginationChange"
            @size-change="handleSizeChange"
            :current-page="page.pageNum"
            :page-size="page.pageSize"
            :page-sizes="[20,50, 100, 200, 300]"
            layout="total, sizes,prev, pager, next, jumper"
            :total="page.total">
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- ---------------------弹窗部分----------------- -->
    <el-dialog title="商品详情" :visible.sync="dialog.infoVisible">
        <com-info :id="infoId"></com-info>
    </el-dialog>

  </div>
</template>

<script>
  import ComSearch from './search'
  import ComInfo from '../inc/commodity_info'

  export default {
    components: {
      ComSearch, ComInfo
    },
    data() {
      return {
        commodityTree: [
          {name: "全部", id: 0, children: []}
        ], // 商品组织结构
        filterText: '', // 商品组织结构筛选
        tableData: [], // 商品列表数据源
        page: {
          pageNum: 1,
          pageSize: 20,
          total: 0,
          keyword: ''
        },
        defaultProps: {// 组织架构基础数据类型
          children: 'children',
          label: 'name',
          value: 'id'
        },
        loading: true,
        optBoxVisible: false, // 多选操作隐藏属性
        searchBoxVisible: true, // 筛选隐藏属性
        multipleSelection: [], // 多选数据
        /* ------弹窗部分------*/
        infoId: '', // 详情数据id
        dialog: {
          infoVisible: false
        }
      };
    },
    created() {
      this.loadCommodityTree();
      this.loadTableData();
    },
    mounted() {
    },
    methods: {
      /* 加商品类型织架构*/
      loadCommodityTree() {
        this.loading = true;
        this.$http.get('psi/item/type/list', {}, r => {
          this.commodityTree[0].children = r.data;
          this.loading = false;
          const param = this.commodityTree[0];
          setTimeout(() => {
            this.$refs.tree.setCurrentKey(param.id);
          }, 100)
          // this.handleNodeClick(param);
        });
      },
      /* 加载表格数据*/
      loadTableData() {
        this.$http.get('psi/item/list', this.page, r => {
          this.tableData = r.data.list;
          this.page.total = r.data.total;
          this.loading = false;
        });
      },
      // 筛选
      handleFilter(val) {
        this.page = this.$util.extend(this.page, val);
        this.loadTableData(val);
      },
      // 修改--下拉菜单
      editOne(val) {
        this.$router.push({path: '/data/base/commodity/edit', query: {id: val.id}})
      },
      // 删除--下拉菜单
      deleteOne(row) {
        this.$confirm('确认要删除商品【' + row.name + '】吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('psi/item/delete', {id: row.id}, r => {
            this.loadTableData();
          })
        })
      },
      // 停售--下拉菜单
      stopSale(val) {
        this.$http.post('psi/item/putDownSale', {id: val.id}, r => {
          this.loadTableData();
        })
      },
      // 发售--下拉菜单
      sale(val) {
        this.$http.post('psi/item/putOnSale', {id: val.id}, r => {
          this.loadTableData();
        })
      },
      /* 商品树形控件点击事件*/
      handleNodeClick(data) {
        this.page.categoryId = data.id;
        this.page.type = data.name;
        this.loadTableData(this.page);
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
      /* 商品组织架构的过滤*/
      filterNode(value, data) {
        if (!value) { return true; }
        return data.name.indexOf(value) !== -1;
      },
      /* 表格多选*/
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.optBoxVisible = !!val.length;
      },
      // 批量删除
      multipleDelete() {
        this.$confirm('确认要删除选中的商品吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const ids = [];
          this.multipleSelection.forEach(value => {
            ids.push(value.id);
          });
          this.$http.post('psi/item/batchDelete', {ids: ids}, r => {
            this.loadTableData();
          })
        })
      },
      /* 新增商品,页面跳转*/
      addCommodity() {
        this.$router.push({path: '/data/base/commodity/add'});
      },
      // 查看商品详情
      info(row) {
        this.dialog.infoVisible = true;
        this.infoId = row.id;
      }
    },
    watch: {
      /* 商品组织架构的过滤*/
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    computed: {},
    filters: {
      status: function (val) {
        switch (val) {
          case  -1:
            return '已删除';
          case  0:
            return '已停售';
          case  1:
            return '在售';
          default:
            // do nothing
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

