<template>
  <div class="page-content customer">
    <!--头部级联菜单-->
    <breadcrumb/>
    <div class="fh-container clearfix">
    <div style="width:100%">
        <!-- 查询条件 -->
        <div style="padding-top: 20px;padding-left:84%">
          <el-form :inline="true" class="form-compact" @submit.native.prevent>
            <el-form-item>
              <el-search style="width: 224px !important;" v-model="page.keyword" @click="search" @keyup.enter.native="search" placeholder="请输入标题名称"></el-search>
            </el-form-item>
          </el-form>
        </div>
        <!-- 表格 -->
        <div style="width:95%;margin:0 auto;">
            <el-table
            border
            stripe
            sortable="custom"
            v-loading="loading"
            @sort-change="handleSort"
            :data="tableData"
            ref="multipleTable"
            style="width: 100%;margin-top:20px;">
            <el-table-column prop="" label="标题">
                <template slot-scope="scope">
                    <span style="color:#38adff;cursor:pointer;" class="guide_title hand" v-text="scope.row.title" @click="getInfo(scope.row.id)"></span>
                </template>
            </el-table-column>
        </el-table>
        </div>
        <!-- 分页 -->
        <div style="padding-left:2%;">
                <el-pagination
                background
                @current-change="handlePaginationChange"
                @size-change="handleSizeChange"
                :page-sizes="[20,50,100, 200, 300, 400]"
                :current-page="page.pageNum"
                :page-size="page.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.total">
            </el-pagination>
        </div>
        <!-- 弹窗 -->
            <el-dialog
                width="800px"
                :lock-scroll='true'
                class="dialog_size"
                :title="info.title"
                :visible.sync="dialogVisible">
                <div style="height:400px;overflow:auto;">
                    <div v-html="info.content"></div>
                </div>
            </el-dialog>
        </div>
    </div>
  </div>
</template>

<script>

export default {
          data() {
            return {
                loading: true,
                dialogVisible: false,
                tableData: [],  // 客户列表数据源
                info: {},
                page: {
                    keyword: '', // 关键词
                    type: 2, // 发布端类型
                    pageNum: 1, // 当前页数
                    pageSize: 20, // 显示数量
                    sortName: '', // 排序字段
                    sortOrder: '', // 排序方式
                    total: 0
                }
            }
        },
        mounted: function () {
            this.loadData()
        },
        methods: {
            // 加载列表
            loadData() {
                this.loading = true;
                this.$http.get('/sys/helpDocument/getList', this.page, r => {
                    this.page.total = r.data.total;
                    this.tableData = r.data.list;
                    this.loading = false;
                }, e => {
                this.$message.error(e.msg);
                console.error(e)
                })
            },
               // 客户列表排序
            handleSort(sort) {
                this.$util.build_sort(this.page, sort);
                this.loadData();
            },
            // 分页
            handlePaginationChange(pageNum) {
                this.page.pageNum = pageNum;
                this.loadData();
            },
            handleSizeChange(val) {
                this.page.pageSize = val;
                this.loadData();
            },
            // 查看详情
            getInfo(val) {
                this.$http.get('/sys/helpDocument/getOne', {id: val}, r => {
                    // console.log('hcesd', r.data)
                     this.dialogVisible = true
                     this.info = r.data;
                }, e => {
                this.$message.error(e.msg);
                console.error(e)
                })
            },
            search() {
                this.loadData(this.page);
            }
        }
}

</script>

<style>
    .top_right_search .el-input {
        width: 150px !important;
    }
    .top_right_search .el-textarea {
        width: 150px !important;
    }
</style>
