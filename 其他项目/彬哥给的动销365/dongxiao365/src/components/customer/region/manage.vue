<template>
  <div lass="page-content">
    <breadcrumb/>
    <el-container>
      <!--页面左侧tree-->
      <el-aside width="180px">
        <el-tree style="margin-top:8px;" v-loading="loading"
                 :data="commodityTree"
                 :props="defaultProps"
                 :highlight-current="true"
                 :expand-on-click-node="false"
                 default-expand-all
                 node-key="id"
                 @node-click="handleClickForTree"
                 ref="tree"
                 :filter-node-method="filterNode">
        </el-tree>
      </el-aside>
      <!--页面中部-->
      <el-main>
        <div>
          <h4>当前区域</h4>
          <el-table
            border
            stripe
            :data="currentData"
            style="width: 100%">
            <el-table-column
              prop="name"
              label="区域名称">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope" v-if="scope.row.id>0">
                <div style="display:flex;">
                  <el-button type="button" size="small" class="text-primary" @click="editOne(scope.row)">编辑</el-button>
                  <el-button type="button" size="small" class="text-danger" @click="deleteOneCurrent(scope.row)">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!--右侧下部---下级对象-->
        <div>
          <!--新增按钮-->
          <el-row>
            <el-col :span="12" class="text-left">
              <br>
              <el-button icon="el-icon-circle-plus-outline" type="success" @click="addOne" v-show="currentData.length">新增下级</el-button>
            </el-col>
          </el-row>
          <el-col :span="12"><h4>下级区域</h4></el-col>
        </div>
        <!--表格table-->
        <div>
          <el-table
            border
            stripe
            :data="lowerData"
            style="width: 100%">
            <el-table-column
              prop="name"
              label="区域名称">
            </el-table-column>、
            <!-- <el-table-column
              prop="parentName"
              label="上级区域">
            </el-table-column> -->
            <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope" v-if="scope.row.id>0">
                <el-button type="button" size="small" class="text-primary" @click="editOne(scope.row)">编辑</el-button>
                <el-button type="button" size="small" class="text-danger" @click="deleteOne(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!--新增元素弹窗-->
        <el-dialog style="height:455px;" title="新增区域" :visible.sync="dialog.addVisible" width="450px">
          <el-form :model="addObject" :rules="rules" ref="addRuleForm" label-width="120px">
            <el-form-item label="区域名称：" prop="name">
              <el-input v-model="addObject.name" class="input-large" :maxlength="10" @keydown.native.enter="onSubmit('addRuleForm')"></el-input>
            </el-form-item>
            <el-form-item label="上级区域：">
              <span>{{parentObject.name}}</span>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialog.addVisible=false">取消</el-button>
            <el-button type="primary" @click="onSubmit('addRuleForm')">保存</el-button>
          </div>
        </el-dialog>
        <!--编辑元素弹窗-->
        <el-dialog style="height:450px;" title="编辑区域" :visible.sync="dialog.editVisible" width="450px">
          <el-form :model="editObject" :rules="rules" ref="editRuleForm" label-width="120px">
            <el-form-item label="区域名称：" prop="name">
              <el-input v-model="editObject.name" class="input-large" :maxlength="10" @keydown.native.enter="onSubmit('addRuleForm')"></el-input>
            </el-form-item>
            <el-form-item label="上级区域：">
              <span>{{parentObject.name}}</span>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialog.editVisible=false">取消</el-button>
            <el-button type="primary" @click="onSubmitEdit('editRuleForm')">保存</el-button>
          </div>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: true, // 树加载动画
        commodityTree: [
          {"name": "全部区域", "id": 0, "children": []}
        ],
        defaultProps: {// 组织架构基础数据类型
          children: 'children',
          label: 'name',
          value: 'id'
        },
        currentData: [], // 右侧当前对象
        lowerData: [], // 右侧当前对象的下级字对象
        parentObject: {// 当前页面商品树的父类对象
          id: 0,
          name: '全部类型'
        },
        dialog: {
          addVisible: false,
          editVisible: false
        },
        addObject: {}, // 新增类型中间变量
        editObject: {}, // 编辑类型中间变量
        currentObject: {}, // 当前树形控件选中对象
        editCurrentData: '', // 编辑当前对象
        /* ------校验规则--------*/
        rules: {
          name: [
            {required: true, message: '请输入类型名称', trigger: 'change'},
            {max: 20, message: '长度在1-10个字符之间', trigger: 'change'}
          ]
        }
      }
    },
    mounted() {
       this.loadCommodityTree();
    },
    methods: {
      /* 区域织架构*/
      loadCommodityTree() {
        this.loading = false;
        this.$http.get('/crm/sale/area/tree/details', {}, r => {
          this.commodityTree[0].children = r.data;
          this.loading = false;
          const param = this.commodityTree[0];
          this.$nextTick(function() {
            this.$refs.tree.setCurrentKey(param.id);
          })
          this.handleClickForTree(param);
        });
      },
      // 树的点击事件,获取右侧对象,和其下级
      handleClickForTree(data) {
        this.parentObject.id = data.id;
        this.parentObject.name = data.name;

        if (data.parentName === '' || data.id === 0) {
          data.parentName = '全部类型';
          data.parentId = 0;
        }

        this.currentData = [data];

        // 为页面的元素初始化,以便以增删改的时候页面同步
        if (data.children) {
          this.lowerData = data.children;
        } else {
          data.children = [];
          this.lowerData = data.children;
        }
      },
      // 右侧下级对象或列表删除事件
      deleteOne(val) {
        this.$confirm('确定要删除该分类么?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/crm/sale/area/delete', {id: val.id}, r => {
            this.$message({
              message: '删除成功！',
              type: 'success'
            });
            this.$refs.tree.remove(val.id);
            let deleteIndex = null;
            // 删除后更新页面
            for (const index in this.lowerData) {
              if (this.lowerData[index].id === val.id) {
                deleteIndex = index;
                break;
              }
            }
            if (deleteIndex) {
              this.lowerData.splice(deleteIndex, 1);
            }
          });
        });
      },
      // 右侧当前对象或列表删除事件
      deleteOneCurrent(val) {
        this.$confirm('确定要删除该分类么，删除父级会自动删除所有子分类?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/crm/sale/area/delete', {id: val.id}, r => {
            this.$message({
              message: '删除成功！',
              type: 'success'
            });
            const node = this.$refs.tree.getNode(val.id);
            this.$refs.tree.setCurrentKey(node.parent.data.id);
            this.handleClickForTree(node.parent.data);
            this.$refs.tree.remove(node);
          });
        });
      },
      // 右侧对象或列表编辑事件
      editOne(val) {
        const value = JSON.stringify(val);
        this.editObject = JSON.parse(value);
        this.dialog.editVisible = true;
      },
      // 右侧对象或列表新增事件
      addOne() {
        this.dialog.addVisible = true;
      },
      // 新增确认事件
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            return false;
          } else {
            this.addObject.parentId = this.parentObject.id;
            this.$http.post('/crm/sale/area/add', this.addObject, r => {
              this.$message({
                message: '添加成功！',
                type: 'success'
              });
              // 处理新增后的页面变化(深拷贝过程)
              const object = JSON.parse(JSON.stringify(this.addObject));
              this.addObject = {};
              object.id = r.data;
              object.children = null;
              this.lowerData.push(object);
              this.$refs[formName].resetFields();
            });
            this.dialog.addVisible = false;
          }
        });
      },
      // 确认编辑提交
      onSubmitEdit(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            return false;
          } else {
            this.$http.post('/crm/sale/area/edit', this.editObject, r => {
              this.loading = false;
              this.commodityTree = [
                {"name": "全部区域", "id": 0, "children": []}
              ]
              this.$http.get('/crm/sale/area/tree/details', {}, r => {
                this.commodityTree[0].children = r.data;
                this.loadCommodityTree(this.commodityTree = [
                  {"name": "全部区域", "id": 0, "children": []}
                ])
              });
              this.$message({
                message: '保存成功！',
                type: 'success'
              })
            });
            this.dialog.editVisible = false;
          }
        });
      }
    },
    watch: {

    },
    computed: {},
    components: {}
  }
</script>

<style scoped>

</style>
