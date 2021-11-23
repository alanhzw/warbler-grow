<template>
  <div>
    <!-- <el-alert
      title="温馨提示"
      class="tip" type="warning" :closable="false" show-icon
      description="组织架构信息是通过钉钉端导入（同步）过来的，系统不支持修改。如果需要更新组织架构和用户的信息，请使用管理员通过钉钉端进行修改，然后系统会自动同步（如果没有同步，可以通过本系统提供的《同步组织架构》按钮进行手动同步，提示：钉钉端修改完以后，可能会有一段时间的延时）。"
    /> -->
    <el-alert
      title="温馨提示"
      class="tip" type="warning" :closable="false" show-icon
      description="组织架构信息是通过钉钉端导入（同步）过来的，系统不支持修改。如果需要更新组织架构和用户的信息，请使用管理员通过钉钉端进行修改，然后系统会自动同步。提示：钉钉端修改完以后，可能会有一段时间的延时）。"
    />
    <div class="box">
      <div class="box-title"><i class="fa fa-sitemap"></i>{{department.name}}</div>
      <div class="box-body">
        <el-table
          border
          :data="department.children"
          :show-header="false"
          stripe
          style="width: 100%">
          <el-table-column type="index" width="50" align="center"></el-table-column>
          <el-table-column sortable prop="name" label=""></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="box">
      <div class="box-title"><i class="fa fa-group"></i>部门成员</div>
      <div class="box-body">
        <el-table
          v-loading="loading"
          :data="tableData"
          class="table-compact"
          stripe
          border
          style="width: 100%">
          <el-table-column type="index" width="50" align="center"></el-table-column>
          <el-table-column sortable prop="name" label="姓名" width="180">
            <template slot-scope="scope">
              {{scope.row.name}}
              <el-tag
                style="color:#fff;"
                type="warning"
                color="#f7cb27"
                v-if="scope.row.isLeader" size="small">
                主管
               </el-tag>
            </template>
          </el-table-column>  
          <el-table-column sortable prop="position" label="职位" width="250"></el-table-column>
          <el-table-column prop="jobnumber" label="工号"></el-table-column>
          <!-- <el-table-column label="管理部门">
            <template slot-scope="scope">
              <el-tag
                v-for="(tag,index) in scope.row.manageDepartmentList"
                :key="tag.departmentName"
                @close="handleRemoveManageDepart(index,tag,scope.row.manageDepartmentList)"
                closable>
                {{tag.departmentName}}
              </el-tag>
            </template>
          </el-table-column> -->
          <!-- <el-table-column prop="name" label="" width="100" align="center">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="setDepart(scope.$index,scope.row)"
                type="text"
                size="small">
                分配部门
              </el-button>
            </template>
          </el-table-column> -->
        </el-table>
        <el-pagination
          background
          @current-change="handlePaginationChange"
          :current-page="page.pageNum"
          :page-size="page.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="page.total">
        </el-pagination>
      </div>
    </div>
    <depart-selector :check-strictly="true"
      :visible.sync="chooseDepartVisible" @onOk="handleChooseDepartOK"></depart-selector>
  </div>
</template>

<script>
  import DepartSelector from '../inc/choose_depart_multiple'

  export default {
    name: "structure",
    components: {DepartSelector},
    props: {
      department: {
        type: Object,
        default: {
          children: []
        }
      },
      departmentId: {
        type: [Number, String],
        default: 0
      }
    },
    data() {
      return {
        tableData: [], // 下级部门表格
        loading: false,
        page: {
          pageNum: 1,
          pageSize: 20,
          sortName: '',
          sortOrder: '',
          total: 0,
          departmentId: ''
        },
        // currentUser: {
        //   manageDepartmentList: []
        // },
        chooseDepartVisible: false
      }
    },
    methods: {
      loadUserData() {
        if (this.page.departmentId) {
          this.loading = true;
          this.$http.get('/sys/user/list', this.page, r => {
            // r.data.list.forEach(r => {
            //   this.loadManageDepart(r);
            // });
            this.tableData = r.data.list;
            this.page.total = r.data.total;
            this.loading = false;
          });
        }
      },
      // loadManageDepart(row) {
      //   row.manageDepartmentList = [];
      //   this.$http.get('/sys/user/manage/depart/list', {userId: row.userid}, r => {
      //     row.manageDepartmentList = r.data;
      //   });
      // },
      // 分页
      handlePaginationChange(pageNum) {
        this.page.pageNum = pageNum;
        this.loadUserData();
      },
      // setDepart(index, row) {
      //   this.chooseDepartVisible = true;
      //   this.currentUser = row;
      // },
      handleChooseDepartOK(departList) {
        const ids = departList.map(r => {
          return r.id
        });
        this.$http.post('/sys/user/manage/depart/set', {userId: this.currentUser.userid, departmentIdList: ids}, r => {
          this.$message({
            type: 'success',
            message: '设置成功!'
          });
          // this.loadManageDepart(this.currentUser);
        });
      }
      // handleRemoveManageDepart(index, tag, list) {
      //   this.$http.post('/sys/user/manage/depart/remove', {id: tag.id}, r => {
      //     this.loadUserData()
      //   });
      // }
    },
    watch: {
      departmentId: {
        immediate: true,
        handler: function (val) {
          this.page.pageSize = 20;
          this.page.pageNum = 1;
          this.page.total = 0;
          this.page.departmentId = val;
          this.loadUserData();
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tip {
    padding: 20px;
  }

  .box {
    margin-top: 30px;
    .box-title {
      line-height: 42px;
      height: 42px;
      padding-left: 15px;
      font-size: 18px;
      font-weight: 500;
      border: solid 1px #EBEEF5;
      background-color: #F2F6FC;
      color: #606266;
      i {
        display: inline-block;
        margin-right: 6px;
        color: #909399;
      }
    }
    .box-body {
      padding: 12px 0;
    }
  }
</style>
