<template>
  <div class="page-content">
    <breadcrumb/>
    <!--主体-->
    <div class="fh-container clearfix">
      <div class="fh-side-left">
        <!--第一部分-->
        <el-tree
          :data="treeData"
          :props="defaultProps"
          v-loading="loading"
          node-key="id"
          :default-expand-all="true"
          highlight-current
          :expand-on-click-node="false"
          @node-click="handleClickForTree"
          ref="tree">
        </el-tree>
      </div>
      <!--第二部分-->
      <div class="fh-content">
        <!--表格table-->
        <h4>当前区域</h4>
        <el-table
          border
          stripe
          :data="[currentData]">
          <el-table-column
            prop="name"
            label="区域名称" width="300">
          </el-table-column>
          <el-table-column
            prop="parentName"
            label="上级区域" width="300">
          </el-table-column>
          <!-- <el-table-column
            prop="belongsDeptVO"
            label="分配部门">
            <template slot-scope="scope">
              <el-tag v-for="(item,index) in scope.row.belongsDeptVO"
                      :disable-transitions="false"
                      :key="item.id"
                      type="info"
                      class="choose_user_tag"
              >{{item.name}}
              </el-tag>
            </template>
          </el-table-column> -->
          <el-table-column
            prop="belongsUserVO"
            label="分配个人">
            <template slot-scope="scope">
              <el-tag v-for="(item,index) in scope.row.belongsUserVO"
                      :disable-transitions="false"
                      :key="item.id"
                      type="info"
                      class="choose_user_tag"
              >{{item.name}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="80" header-align="center">
            <template slot-scope="scope">
              <div v-show="scope.row.id !== 0">
                <el-button type="button" class="text-primary" @click="handleDistribute(scope.row)">分配</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <br/>
        <div v-show="downData && downData.length>0">
          <h4>下级区域</h4>
          <el-table
            border
            stripe
            :data="downData">
            <el-table-column
              prop="name"
              label="区域名称"
              width="300">
            </el-table-column>
            <el-table-column
              prop="parentName"
              label="上级区域"
              width="300">
            </el-table-column>
            <!-- <el-table-column
              prop="belongsDeptVO"
              label="分配部门" header-align="center">
              <template slot-scope="scope">
                <el-tag v-for="(item,index) in scope.row.belongsDeptVO"
                        :disable-transitions="false"
                        :key="item.id"
                        type="info"
                        size="small"
                        class="choose_user_tag"
                >{{item.name}}
                </el-tag>
              </template>
            </el-table-column> -->
            <el-table-column
              prop="belongsUserVO"
              label="分配个人">
              <template slot-scope="scope">
                <el-tag v-for="(item,index) in scope.row.belongsUserVO"
                        :disable-transitions="false"
                        :key="item.id"
                        type="info"
                        class="choose_user_tag"
                >{{item.name}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作" width="80" header-align="center">
              <template slot-scope="scope">
                <el-button type="button" size="small" class="text-primary" @click="handleDistribute(scope.row)">分配</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <!--选择人员组件-->
    <com-choose-user :visible.sync="choosePersonVisible" v-model="distributeObject.values" @onOk="handleDistributeOK"/>
  </div>
</template>

<script>
  import ComChooseUser from "../../inc/choose_user_by_depart"

  export default {
    components: {
      ComChooseUser
    },
    data() {
      return {
        loading: true,
        // 弹窗参数
        choosePersonVisible: false,
        // 销售区域数据源
        treeData: [{name: '全部区域', id: 0, children: []}],
        // 树形控件默认格式
        defaultProps: {
          value: 'id',
          label: 'name'
        },
        currentData: [], // 当前对象(右侧表格)
        downData: [], // 下级对象(右侧表格)
        distributeObject: {
          values: []
        }// 分配部门对象
      }
    },
    mounted() {
      this.loadData();
    },
    methods: {
      // 加载树(初始化加载数据)
      loadData() {
        this.loading = true;
        this.$http.get('/crm/sale/area/tree/details', {}, r => {
          this.treeData[0].children = r.data;
          this.loading = false;
          this.handleClickForTree(this.treeData[0]);
          this.$nextTick(function() {
            this.$refs.tree.setCurrentKey(this.treeData[0].id);
          })
          // setTimeout(() => {

          // }, 1000);
        });
      },
      // 树的点击事件
      handleClickForTree(data) {
        this.currentData = data;
        if (!this.currentData.children) {
          this.currentData.children = [];
        }
        // this.$refs.tree.setCurrentKey(this.treeData[0].id);
        this.downData = data.children;
      },
      // 选择部门插件按钮
      handleDistribute(row) {
        console.log('row',row)
        this.distributeObject = row;
        if (row.belongsUserVO && row.belongsUserVO.length && row.belongsUserVO && row.belongsUserVO.length) {
            this.distributeObject.values = row.belongsUserVO.concat(row.belongsDeptVO)
          } else {
            this.distributeObject.values = [];
          }
          this.choosePersonVisible = true;
      },
      handleDistributeOK(users) {

        // this.distributeObject.belongsDeptVO = departs;
        this.distributeObject.belongsUserVO = users;
        // const departIdList = departs.map(d => {
        //   return d.id
        // });

        const userIdList = users.map(u => {
          return u.userid
        });
        // 添加中间层
        const param = {
          id: this.distributeObject.id,
          belongsUser: userIdList,
          belongsDepartment: departIdList
        };

        this.$http.post('/crm/sale/area/edit', param, r => {
          this.$message({
            message: '分配成功！',
            type: 'success'
          });
        });
      }
    }
  }
</script>

<style scoped>
  .choose_user_tag {
    margin: 3px;
  }
</style>
