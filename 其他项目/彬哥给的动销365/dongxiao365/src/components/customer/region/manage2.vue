<template>
  <div class="page-content">
    <breadcrumb/>
    <!--主体-->
    <div class="fh-container clearfix">
      <div class="fh-side-left">
        <!--第一部分-->
        <el-tree
          v-loading="loading"
          :data="treeData"
          :props="defaultProps"
          node-key="id"
          :expand-on-click-node="false"
          :default-expand-all="true"
          highlight-current
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
            label="区域名称">
          </el-table-column>
          <el-table-column
            prop="parentName"
            label="上级区域">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template slot-scope="scope">
              <div v-show="scope.row.id !== 0">
                <el-button type="button" size="small" class="text-primary" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button type="button" size="small" class="text-danger" @click="handleDelete(scope.row)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <br/>
        <div class="text-left">
          <el-button id="addRegionButton"  icon="el-icon-plus" type="success" @click="handleAdd()">新增区域</el-button>
        </div>
        <div v-show="downData && downData.length>0">
          <h4>下级区域</h4>
          <el-table
            border
            stripe
            :data="downData">
            <el-table-column
              prop="name"
              label="区域名称">
            </el-table-column>
            <el-table-column
              prop="parentName"
              label="上级区域">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作" width="150" align="center">
              <template slot-scope="scope">
                <el-button type="button" size="small" class="text-primary" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button type="button" size="small" class="text-danger" @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!--编辑区域弹窗-->
    <el-dialog style="height:455px;" title="编辑区域" :visible.sync="dialog.editRegionVisible" width="450px">
      <el-form :model="editObject" :rules="rules" ref="editRuleForm" label-width="110px">
        <el-form-item label="区域名称：" prop="name">
          <el-input v-model="editObject.name" class="input-large" :maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="上级区域：">
          <span>{{editObject.parentName}}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editCancel('editRuleForm')" >取消</el-button>
        <el-button type="primary" @click="onSubmitEdit('editRuleForm')" >保存</el-button>
      </div>
    </el-dialog>

    <!--新增区域弹窗-->
    <el-dialog style="height:455px;" title="新增区域" :visible.sync="dialog.addRegionVisible" width="450px">
      <el-form :model="addObject" :rules="rules" ref="addRuleForm" label-width="110px">
        <el-form-item label="区域名称：" prop="name">
          <el-input v-model="addObject.name" class="input-large" :maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="上级区域：">
          <span>{{addObject.parentName}}</span>
          <!-- {{parentObject.name}} -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCancel('addRuleForm')" >取消</el-button>
        <el-button type="primary" @click="onSubmit('addRuleForm')" >保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    data() {
      const validateName = (rule, value, callback) => {
        if ( !/(^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$)/ig.test(value) ) {
          return callback(new Error('请输入汉字、字母或下划线并且长度在1-10个字符之间'));
        } else {
          callback();
        }
      };
      return {
        loading: true,
        // 弹窗参数
        dialog: {
          editRegionVisible: false,
          chooseDeptTreeVisible: false,
          addRegionVisible: false
        },
        // 销售区域数据源
        treeData: [{name: '全部区域', id: 0, children: []}],
        // 树形控件默认格式
        defaultProps: {
          value: 'id',
          label: 'name'
        },
        currentData: [], // 当前对象(右侧表格)
        downData: [], // 下级对象(右侧表格)
        editObject: {}, // 编辑对象
        addObject: {
          name: ''
        },
        editCurrentData: '', // 编辑当前对象

        /* -------------校验规则-------------*/
        rules: {
          name: [
            {required: true, validator: validateName, trigger: 'blur'}
            // {max: 20, message: '长度在1-10个字符之间', trigger: 'blur'}
          ]
        }
      }
    },
    mounted() {
      this.loadData();
    },
    methods: {
      loadData() {
        this.loading = true;
        this.$http.get('/crm/sale/area/tree/details', {}, r => {
          this.treeData[0].children = r.data;
          this.loading = false;
          this.handleClickForTree(this.treeData[0]);
          setTimeout(() => {
            // 设置高亮行
            this.$refs.tree.setCurrentKey(this.treeData[0].id);
          }, 1000);
        });
      },
      // 页面功能执行后的刷新树
      reloadData() {
        this.loading = true;
        this.$http.get('/crm/sale/area/tree/details', {}, r => {
          this.treeData = [{children: r.data}]
          this.loading = false;
        });
      },

      // 树的点击事件
      handleClickForTree(data) {
        this.currentData = data;
        if (!this.currentData.children) {
          this.currentData.children = [];
        }
        this.downData = data.children;
        // 设置高亮
        this.$refs.tree.setCurrentKey(data.id);
      },
      // 编辑区域(当前对象)
      handleEdit(row) {
        this.dialog.editRegionVisible = true;
        this.editCurrentData = row;
        const value = JSON.stringify(row);
        this.editObject = JSON.parse(value);
      },
      // 删除
      handleDelete(row) {
        this.$confirm('此操作将永久删除该区域，是否继续？', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/crm/sale/area/delete', {id: row.id}, r => {
            this.$message({
              message: '删除成功！',
              type: 'success'
            });
            this.loadData()
            // 刷新树
            this.reloadData();
        }, e => {
            this.$message.error(e.msg);
            console.error(e)
          });
        });
      },
      // 选择区域
      chooseDeparts() {
        this.dialog.chooseDeptTreeVisible = true;
      },
      // 编辑区域提交按钮
      onSubmitEdit(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            this.$refs[formName].resetFields()
            return false;
          } else {
            this.dialog.editRegionVisible = false;
            const param = {
              id: this.editObject.id,
              name: this.editObject.name
            }
            // 调用接口
            this.$http.post('/crm/sale/area/edit', param, r => {
              this.$http.get('/crm/sale/area/tree/details', {}, r => {
                this.treeData[0].children = r.data;
              });
              this.currentData = this.editObject;
              setTimeout(() => {
                this.handleClickForTree(this.currentData);
              }, 1000)
              this.$refs.tree.setCurrentKey(this.currentData.id);
              this.$message({
                message: '保存成功！',
                type: 'success'
              });
              this.editObject.name = '';
              this.loadData();
            });
          }
        });
      },
      // 编辑-取消
      editCancel(formName) {
        this.dialog.editRegionVisible = false;
        this.$refs[formName].resetFields();
      },
      // 新增区域保存提交
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            return false;
          } else {
            this.dialog.addRegionVisible = false;
            this.$http.post('/crm/sale/area/add', this.addObject, r => {
              this.dialog.addRegionVisible = false;
              this.$message({
                message: '新增成功！',
                type: 'success'
              });
              this.addObject.name = '';
              // 返回值id绑定页面数据
              const value = this.addObject;
              value.id = r.data;
              this.downData.push(value);
              // this.loadData();
              // 刷新树
              this.reloadData();
              // 设置高亮行(不加入延时,设置高亮不好用)
              setTimeout(() => {
                this.handleClickForTree(this.currentData);
              }, 500)
            });
          }
        });
      },
      // 新增-取消
       addCancel(formName) {
        this.dialog.addRegionVisible = false;
        this.$refs[formName].resetFields();
      },
      // 点击新增区域按钮
      handleAdd() {
        this.dialog.addRegionVisible = true;
        this.addObject = {
          parentName: this.currentData.name,
          parentId: this.currentData.id,
          belongsDeptVO: [],
          belongsDepartment: []
        }
      }
    }
  }
</script>
