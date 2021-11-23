<template>
  <div class="page-content">
    <!--头部级联菜单-->
    <breadcrumb/>
    <!--头部按钮-->
    <br>
    <div class="tool-box text-left">
      <el-button type="primary"  icon="el-icon-circle-plus-outline" @click="addTags"> 新增标签组</el-button>
    </div>
    <!--页面平铺展示部分-->
    <div v-for="(tag,group_index) in customerTag" class="tool-box">
      <el-card class="box-card tag-group" :class="'tag-group-'+tag.labelColor">
        <div slot="header" class="clearfix">
          <el-row>
            <el-col :span="12">
              <span class="tag-color"></span> {{tag.labelName}}
              <el-tooltip class="item" effect="dark" content="修改标签组" placement="top">
                <el-button type="text" icon="el-icon-edit" @click="tagItemEdit(tag)"></el-button>
              </el-tooltip>
            </el-col>
            <el-col :span="12" class="text-right">
              <el-button type="button" class="text-danger" @click="deleteOne(tag,group_index)">删除标签组</el-button>
            </el-col>
          </el-row>
        </div>
        <el-row class="clearfix">
          <el-tag v-for="(dd,index) in tag.children" :key="dd.id" @close="handleClose(index,tag,dd)" closable>{{dd.labelName}}
            <el-tooltip class="item" effect="dark" content="修改标签" placement="top">
              <el-button type="text" icon="el-icon-edit" @click="tagChildEdit(dd)"></el-button>
            </el-tooltip>
          </el-tag>
          <el-button type="text" icon="el-icon-circle-plus-outline" class="text-success" @click="addNewTag(tag)">新标签</el-button>
        </el-row>
      </el-card>
    </div>
    <!--新增标签组弹窗-->
    <el-dialog style="height:520px;" title="新建标签组" :visible.sync="newGroupDialogVisible" width="400px">
      <el-form :model="groupForm" :rules="rules" ref="groupForm" label-position="top">
        <el-form-item label="标签组名称" prop="labelName">
          <div class="tool-box ">
            <el-input v-model="groupForm.labelName" placeholder="" :maxlength="10"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="标签组颜色" prop="labelColor">
          <!--选色板-->
          <div class="choose-tag-group">
            <a class="tag-group" :class="'tag-group-'+vo.id" v-for="vo in tagColors" @click="chooseColor(groupForm,vo)">
              <div class="tag-color" :class="{active:vo.checked}"><i class="fa fa-check"></i></div>
            </a>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="newGroupDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="shureForAddFatherTag()">添加</el-button>
      </div>
    </el-dialog>
    <!--修改标签组弹窗/子标签-->
    <el-dialog style="height:430px;" :title="editTitle" :visible.sync="editGroupDialogVisible" width="400px">
      <el-form :model="editGroupForm" :rules="rules" ref="editGroupForm" label-position="top">
        <el-form-item :label="editLabel" prop="labelName">
          <div class="tool-box ">
            <el-input v-model="editGroupForm.labelName" placeholder="请输入新名称" :maxlength="10"></el-input>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="editGroupDialogVisible = false" >取消</el-button>
        <el-button type="primary" @click="shureForEditFatherTag('editGroupForm')" >修改</el-button>
      </div>
    </el-dialog>
    <!--新标签-->
    <el-dialog style="height:430px;" title="新标签" :visible.sync="addNewTagDialogVisible" width="400px">
      <el-form :model="newTagForm" :rules="rules" ref="newTagForm" label-position="top">
        <el-form-item label="新标签名称" prop="labelName">
          <div class="tool-box ">
            <el-input v-model="newTagForm.labelName" placeholder="请输入新名称" :maxlength="10"></el-input>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addNewTagDialogVisible= false" >取消</el-button>
        <el-button type="primary" @click="shureForAddNewTag('newTagForm')" >保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        customerTag: [],
        groupForm: {
          labelName: '新标签组',
          labelColor: 1
        },
        editGroupForm: {},
        newTagForm: {},
        rules: {
          labelName: [
            {required: true, message: '请输入标签组名称', trigger: 'change'},
            {max: 10, message: '名称长度在 1 到 10 个字符', trigger: 'blur'}
          ],
          labelColor: [
            {required: true, message: '请选择标签组颜色', trigger: 'blur'}
          ]
        },
        tagColors: [{id: 1, checked: true}, {id: 2, checked: false}, {id: 3, checked: false}, {id: 4, checked: false}, {id: 5, checked: false}, {id: 6, checked: false}],
        newGroupDialogVisible: false,
        editGroupDialogVisible: false,
        addNewTagDialogVisible: false,
        middleData: {}, // 临时中间变量
        editTitle: '修改标签组：',
        editLabel: '标签组名：'
      };
    },
    created() {
      this.loadTags();
    },
    methods: {
      // 标签加载初始化部分
      loadTags() {
        this.$http.get('/crm/customer/label/list', this.dynamicForm, r => {
          console.log("dddf", r.data)
          this.customerTag = r.data;
        })
      },
      chooseColor(f, vo) {
        this.tagColors.forEach(o => {
          o.checked = vo.id === o.id;
        });
        f.labelColor = vo.id;
      },
      // 新标签
      addNewTag(tag) {
        this.newTagForm = {};
        this.middleData = tag;
        this.addNewTagDialogVisible = true;
      },
      // 新标签提交
      shureForAddNewTag(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addNewTagDialogVisible = false;
            const postData = {
              labelName: this.newTagForm.labelName,
              parentId: this.middleData.id,
              labelColor: this.middleData.labelColor
            };
            this.$http.post('/crm/customer/label/add', postData, r => {
              this.$message({
                type: 'success',
                message: '保存成功'
              });

              this.loadTags();
            })
          }
        });
      },
      // 删除标签组
      deleteOne(tag, index) {
        this.$confirm('此操作将永久删除【' + tag.labelName + '】标签组, 是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/crm/customer/label/delete', {id: tag.id}, r => {
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            this.customerTag.splice(index, 1);
          })
        });
      },
      // 标签组中的tag组件的删除标签
      handleClose(index, group, tag) {
        this.$confirm('此操作将永久删除【' + tag.labelName + '】标签, 是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/crm/customer/label/delete', {id: tag.id}, r => {
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            group.children.splice(index, 1);
          })
        });
      },
      shureForAddFatherTag() {
        this.$refs.groupForm.validate((valid) => {
          if (valid) {
            this.$http.post('/crm/customer/label/add', this.groupForm, r => {
              this.newGroupDialogVisible = false;
              this.$message({
                type: 'success',
                message: '保存成功'
              });
              this.loadTags();
            })
          }
        });
      },
      // 编辑子标签名字
      tagChildEdit(tagItem) {
        this.middleData = tagItem;
        const editObject = JSON.parse(JSON.stringify(tagItem));
        this.editGroupForm = editObject;
        this.editGroupDialogVisible = true;
        this.editTitle = '编辑子标签';
        this.editLabel = '标签名称';
      },
      // 编辑标签组
      tagItemEdit(tagItem) {
        this.middleData = tagItem;
        const editObject = JSON.parse(JSON.stringify(tagItem));
        this.editGroupForm = editObject;
        this.editGroupDialogVisible = true;
        this.editTitle = '编辑标签组';
        this.editLabel = '标签组名称';
      },
      // 确认编辑标签组名字,并提交
      shureForEditFatherTag(formName) {

        this.$refs[formName].validate((valid) => {
          if (valid) {
            const postData = {
              id: this.editGroupForm.id,
              parentId: this.editGroupForm.parentId,
              labelName: this.editGroupForm.labelName
            };
            this.$http.post('/crm/customer/label/edit', postData, r => {

              this.middleData.labelName = postData.labelName;
              this.editGroupDialogVisible = false;

              this.$message({
                type: 'success',
                message: '保存成功'
              });
            })

          }
        });
      },
      // 新增标签组
      addTags() {
        this.newGroupDialogVisible = true;
        this.groupForm = {
          labelColor: 1
        };
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/tag";

  .tag-group {
    .tag-color {
      width: 12px;
      height: 12px;
      border-radius: 100%;
      display: inline-block;
      margin-right: 5px;
      border: solid 1px;
    }

    &.tag-group-1 .tag-color {
      background-color: $--color-tag-1;
      border-color: $--color-tag-border-1;
    }

    &.tag-group-2 .tag-color {
      background-color: $--color-tag-2;
      border-color: $--color-tag-border-2;
    }

    &.tag-group-3 {
      .tag-color {
        background-color: $--color-tag-3;
        border-color: $--color-tag-border-3;
      }
    }

    &.tag-group-4 {
      .tag-color {
        background-color: $--color-tag-4;
        border-color: $--color-tag-border-4;
      }
    }

    &.tag-group-5 {
      .tag-color {
        background-color: $--color-tag-5;
        border-color: $--color-tag-border-5;
      }
    }

    &.tag-group-6 {
      .tag-color {
        background-color: $--color-tag-6;
        border-color: $--color-tag-border-6;
      }
    }
  }


  .choose-tag-group {
    .tag-group {
      display: inline-block;
      padding: 6px 12px;
      cursor: pointer;
      .tag-color {
        width: 24px;
        height: 24px;
        border: solid 1px transparent;
        text-align: center;
        line-height: 24px;
        i {
          opacity: 0;
        }
        &.active {
          i {
            opacity: 1;
          }
        }
      }
      &:hover {
        .tag-color {
          /*i {*/
          /*opacity: 1;*/
          /*}*/
        }
      }
    }
  }

  .el-tag {
    margin: 5px;
  }
</style>
