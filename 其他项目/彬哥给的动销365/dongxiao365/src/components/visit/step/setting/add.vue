<template>
  <div>
    <!--头部导航链-->
    <breadcrumb/>
    <br/>
    <el-row>
      <el-col :span="23">
        <!--添加步骤主体form-->
        <el-form :model="step" :rules="rules" ref="step" label-width="150px">
          <!--流程名称-->
          <el-form-item label="步骤名称：" prop="name">
            <el-input v-model="step.name" placeholder="流程名称" :maxlength="20"></el-input>
          </el-form-item>
          <!--客户范围-->
          <el-form-item label="客户范围：" prop="customerRadio">
            <el-radio-group v-model="step.customerRadio" @change="customerRadioChange">
              <el-radio :label="0">不限制</el-radio>
              <el-radio :label="1">选择客户</el-radio>
            </el-radio-group>
            <!--选择客户隐藏卡片-->
            <el-card v-show="step.customerRadio == 1" class="box-card">
              <div slot="header" class="clearfix">
                <span>已选择标签</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="dialog.tagsVisible = true">选择客户标签</el-button>
              </div>
              <!--标签展示部分-->
              <com-tag-view v-model="defaultValue.tags"></com-tag-view>
            </el-card>
          </el-form-item>
          <!--使用人员选择或指定部分-->
          <el-form-item label="使用人员：" prop="useScope">
            <el-radio-group v-model="step.useScope" @change="usersRadioChange">
              <el-radio :label="0">不限制</el-radio>
              <el-radio :label="1">指定人员</el-radio>
              <el-radio :label="2">指定部门</el-radio>
            </el-radio-group>
            <!--指定人员隐藏卡片-->
            <el-card v-show="step.useScope === 1" class="box-card">
              <div slot="header" class="clearfix">
                <span>已添加人员</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="dialog.personsVisible = true">选择人员</el-button>
              </div>
              <el-tag v-for="(pp,index) in  step.users"
                      type="info"
                      :key="pp.id">
                {{pp.name}}
              </el-tag>
            </el-card>
            <!--指定部门隐藏卡片-->
            <el-card v-show="step.useScope === 2" class="box-card">
              <div slot="header" class="clearfix">
                <span>已添加部门</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="dialog.departmentVisible = true">选择部门</el-button>
              </div>
              <el-tag v-for="(pp,index) in  step.departments"
                      type="info"
                      :key="pp.id">
                {{pp.name}}
              </el-tag>
            </el-card>
          </el-form-item>
          <!--添加拜访流程部分-->
          <el-form-item label="添加拜访步骤：" prop="crmVisitStepList">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>步骤列表</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="dialog.addStepVisible = true">添加步骤</el-button>
              </div>
              <!--展示添加的步骤列表-->
              <el-table
                ref="tableDateSteps"
                :data="step.crmVisitStepList"
                tooltip-effect="dark"
                style="width: 100%"
                v-show="step.crmVisitStepList.length">
                <el-table-column label="步骤列表" prop="name"></el-table-column>
                <el-table-column label="属性" prop="isRequired">
                  <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.isRequired">是否必填</el-checkbox>
                  </template>
                </el-table-column>
                <!-- <el-table-column label="属性" prop="isCopyPrev">
                  <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.isCopyPrev">是否复制上一次记录</el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column label="属性" prop="isOnlyOnce">
                  <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.isOnlyOnce">是否仅执行一次</el-checkbox>
                  </template>
                </el-table-column> -->
              </el-table>
            </el-card>
          </el-form-item>
          <!--拜访拍照部分-->
          <el-form-item label="拜访拍照设置：">
            <el-radio-group v-model="step.pictureType">
              <el-radio :label="0">不限制</el-radio>
              <!-- <el-radio :label="1">抵达和离开不强制拍照</el-radio> -->
              <el-radio :label="2">抵达和离开位置异常时强制拍照</el-radio>
              <el-radio :label="3">抵达和离开强制拍照</el-radio>
            </el-radio-group>
          </el-form-item>
          <!--流程有效期部分-->
          <el-form-item label="流程有效期：">
            <el-date-picker
              :editable="false"
              v-model="step.validityEnd"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            <div class="font-color">
              注：流程仅在有效期内才生效，为空表示一直有效
            </div>
          </el-form-item>
          <!--备注部分-->
          <el-form-item label="备注：" prop="remark">
            <el-input v-model="step.remark" placeholder="请输入备注,长度在500字以内" type="textarea" :maxlength="500"></el-input>
          </el-form-item>
          <!--其他多选设置-->
          <el-form-item label="">
            <div class="tool-box">
              <el-checkbox v-model="step.isInvisiblePositioning" class="font-color-black">隐形定位</el-checkbox>
            </div>
            <div class="font-color">
              注：勾选隐形定位后，进行抵达/离开登记定位失败或与客户距离超出限定范围时将不再弹出提示信息。
            </div>
          </el-form-item>
          <!--表单按钮部分-->
          <el-form-item>
            <el-button @click="revert" class="text-success">返回</el-button>
            <el-button type="primary" @click="onSubmit('step')">保存</el-button>
          </el-form-item>
          <!--弹窗---选择客户标签-->
          <com-tags :multiple="true" :visible.sync="dialog.tagsVisible" v-model="step.labelIdList" @onOk="handleSelectTagOK"></com-tags>
          <!--弹窗---指定人员选择-->
          <ComChoosePersonsMutiple :visible.sync="dialog.personsVisible" v-model="step.users"/>
          <!--弹窗---指定部门选择-->
          <ComChooseDepartmentsMutiple :visible.sync="dialog.departmentVisible" v-model="step.departments"/>
          <!--弹窗---添加步骤-->
          <el-dialog title="添加步骤" :visible.sync="dialog.addStepVisible">
            <ComTransferStep @cancel="handleCloseAddSteps" @ok="acceptChosenSteps"/>
          </el-dialog>
        </el-form>
      </el-col>
    </el-row>
    <div v-show="false">
      <pre>{{stringStep}}</pre>
    </div>
  </div>
</template>


<script>
  import ComChoosePersonsMutiple from "../../../inc/choose_user_by_depart"
  import ComChooseDepartmentsMutiple from "../../../inc/choose_depart_multiple"
  import ComTransferStep from "./inc/add_step"
  import ComTags from "../../../lib/tag-selector"
  import ComTagView from "../../../lib/tag-view"

  export default {
    components: {
      ComChoosePersonsMutiple, ComChooseDepartmentsMutiple, ComTransferStep, ComTags, ComTagView
    },
    data() {
      return {
        // 步骤参数
        step: {
          name: '',
          customerRadio: 0, // 客户范围单选组
          tags: [], // 客户标签
          labelIdList: [], // 客户标签id集合
          isNotLimitCustomer: true, // 是否限制客户范围
          useScope: 0, // 使用人员单选组
          isPublic: true, // 使用人员是否不限制
          userIdList: [], // 使用人员id集合
          users: [], // 使用人员对象集合
          departmentIds: [], // 使用人员指定部门id集合
          departments: [], // 指定部门对象集合
          pictureType: 0,
          validityEnd: '', // 步骤有效日期
          remark: '', // 备注
          isInvisiblePositioning: false, // 是否隐形定位
          crmVisitStepList: [], // 步骤列表
          crmVisitFormIdList: []// 步骤列表id集合
        },
        // 弹窗参数
        dialog: {
          tagsVisible: false,
          personsVisible: false,
          departmentVisible: false,
          addStepVisible: false
        },
        // 页面组件所需默认值
        defaultValue: {
          tags: []
        },
        // 部门级联选择参数格式
        departCaseProps: {
          children: 'children',
          value: 'id',
          label: 'name'
        },
        // 表单校验规则
        rules: {
          name: [{required: true, message: '请输入步骤名称', trigger: 'red'}],
          crmVisitStepList: [{required: true, message: '请选择步骤所需表单', trigger: 'red'}]
        }
      };
    },
    created() {
    },
    mounted() {
    },
    methods: {
      // 客户范围单选change事件
      customerRadioChange(val) {
        // 如果单选值为0,则清空已选择的客户范围
        if (val === 0) {
          this.step.isNotLimitCustomer = true;
          this.step.tags = [];
          this.step.labelIdList = [];
        }
        if (val === 1) {
          this.step.isNotLimitCustomer = false;
        }
      },
      // 客户标签确定事件
      handleSelectTagOK(tags) {
        this.defaultValue.tags = tags;
      },
      // 使用人员单选change事件
      usersRadioChange(val) {
        // 如果单选值为0,则清空已选择的使用人员
        if (val === 0) {
          this.step.isPublic = true;
          this.step.userIdList = [];
          this.step.users = [];
          this.step.departments = [];
          this.step.departmentIds = [];
        } else if (val === 1) { // 如果在指定人员和指定部门之间跳转,则互相清空对方的数组
          this.step.isPublic = false;
          this.step.departments = [];
          this.step.departmentIds = [];
        } else if (val === 2) {
          this.step.isPublic = false;
          this.step.userIdList = [];
          this.step.users = [];
        }
      },
      // 多选人员组件监听事件
      acceptChoosePersonsMutiple(msg) {
        // 初始化人员ids数组
        this.step.users = msg;
        this.step.userIdList = [];
        this.step.userNameList = [];
        // 取出组件的的参数人员id集合
        for (const person of msg) {
          this.step.userIdList.push(person.userid);
          this.step.userNameList.push(person.name);
        }
      },
      // 多选部门组件监听事件,部门对象集合
      acceptChooseDepartments(msg) {

        this.step.departmentNmaes = [];
        this.step.departments = msg;
        msg.forEach(val => {
          this.step.departmentNmaes.push(val.name);
        })
      },
      // 多选部门组件监听事件,部门id集合
      acceptChooseDepartmentIds(msg) {
        this.step.departmentIds = msg;
      },
      // 添加步骤弹窗关闭事件,取消选择
      handleCloseAddSteps(msg) {
        this.dialog.addStepVisible = false;
      },
      // 添加步骤弹窗确定事件,接受选中的步骤
      acceptChosenSteps(msg) {
        this.step.crmVisitStepList = msg;
        // 提取当前的idList
        this.step.crmVisitFormIdList = [];

        if (this.step.crmVisitStepList) {
          for (const form of this.step.crmVisitStepList) {
            this.step.crmVisitFormIdList.push(form.id);
          }
        }
        this.dialog.addStepVisible = false;
      },
      // 添加表单确认事件
      onSubmit(formName) {
        const customerInfo = Object.assign({}, this.step)
        const value = customerInfo.remark
        customerInfo.remark = this.transChara(value)
        // 提出step的部门id集合
        const departments = this.step.departments;
        const users = this.step.users;
        if (departments) {
          departments.map(r => {
            return this.step.departmentIds.push(r.id);
          })
        }
        if (users) {
          users.map(r => {
            return this.step.userIdList.push(r.userid);
          })
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {

            this.$http.post("/crm/visit/flow/add", customerInfo, r => {
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.$router.back();
            }, e => {
              this.$message.error(e.msg);
            })
          } else {
            return false;
          }
        });
      },
      // 添加表单返回上级
      revert() {
        this.$router.go(-1);
      }
    },
    watch: {},
    filters: {},
    computed: {
      stringStep: function () {
        return JSON.stringify(this.step, null, 4);
      }
    }
  }
</script>



<style lang="scss">
</style>
