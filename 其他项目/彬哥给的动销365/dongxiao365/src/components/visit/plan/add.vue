<template>
<div>
  <div style="height:350px;overflow:auto;">
    <el-form ref="form" :model="form" :rules="rules" label-width="110px">
      <el-form-item label="拜访客户：" prop="customerIdList">
        <el-button type="text" @click="handleChooseCustomer">选择客户</el-button>
        <div class="border padding" v-show="dialog.customer.chosenList&&dialog.customer.chosenList.length>0">
          <el-tag
            type="info"
            v-for="(cusotmer,index) in dialog.customer.chosenList"
            :key="cusotmer.id"
            @close="removeCustomer(index)"
            closable>{{cusotmer.name}}
          </el-tag>
        </div>
      </el-form-item>
      <el-form-item label="拜访日期：" prop="planVisitTime">
        <el-date-picker v-model="form.planVisitTime" type="date" :editable="false" placeholder="选择日期" :picker-options="pickerOptions1"/>
      </el-form-item>
      <el-form-item label="拜  访 人 ：" prop="visitorId">
        <el-button type="text" @click="handleDistribute">选择人员</el-button>
        <div class="tip tip-inline">提示：只能给自己或下属制定计划</div>
        <div class="border padding" v-show="distributeObject.users&&distributeObject.users.length>0">
          <el-tag v-for="(pp,index) in  distributeObject.users"
                        type="info"
                        :key="index"
                        @close="removePerson(index)"
                        closable>
                        {{pp.name}}
          </el-tag>
        </div>
      </el-form-item>
      <el-form-item label="计划内容：" prop="planDetail">
        <el-input v-model="form.planDetail" type="textarea" :autosize="{minRows:3}" :maxlength="500" placeholder="请输入计划内容,长度在500字以内"/>
      </el-form-item>
    </el-form>
    <el-dialog
      title="选择客户"
      :visible.sync="dialog.customer.visible"
      append-to-body
      width="648px">
      <ComCustomer @onOk="handleChooseCustomerOK"/>
    </el-dialog>
    <!--选择人员组件-->
    <com-choose-user :multiple="false" :visible.sync="choosePersonVisible" v-model="distributeObject.values" @onOk="handleDistributeOK"/>
  </div>
  <el-row>
      <el-col :span="24" class="text-right">
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </el-col>
    </el-row>
</div>
  
</template>

<script>

  import ComCustomer from '../../lib/com_customer'
  import ComChooseUser from "./inc/choose_user_by_depart.vue"

  export default {
    components: {ComCustomer, ComChooseUser},
    data() {
      return {
        // 选择人员
        choosePersonVisible: false,
        distributeObject: {
          chosenIdList1: [],
          values: [],
          users: [] // 使用人员对象集合
        }, // 分配部门对象
        // 选择人员
        form: {visitorId: ''},
        userList: [],
        pickerOptions1: {
          disabledDate(time) {
            const today = new Date();
            return time.getTime() < new Date(today.getFullYear(), today.getMonth(), today.getDate());
          }
        },
        rules: {
          planVisitTime: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
          ],
          visitorId: [
            {required: true, message: '请选择执行人员', trigger: 'change'}
          ],
          customerIdList: [
            {required: true, message: '请选择要拜访的客户', trigger: 'change'}
          ]
        },
        dialog: {
          customer:
            {
              visible: false,
              chosenList: [],
              chosenIdList: []
            }
        }
      }
    },
    created() {
      
    },
    mounted() {
     
    },
    methods: {
      // 选择人员
      // 选择部门插件按钮
      handleDistribute() {
        this.choosePersonVisible = true;
      },

      handleDistributeOK(itemList, idList1) {
        this.distributeObject.users = itemList;
        this.choosePersonVisible = false;
        this.form.visitorId = itemList[0].userid;
      },
      removePerson(index) {
        this.distributeObject.users.splice(index, 1);
        this.distributeObject.chosenIdList1.splice(index, 1);
        this.form.visitorId = ""
      },
      // 选择人员

      // 客户
      handleChooseCustomer() {
        this.dialog.customer.visible = true;
      },
      handleChooseCustomerOK(itemList, idList) {
        this.dialog.customer.chosenList = itemList;
        this.dialog.customer.chosenIdList = idList;
        this.dialog.customer.visible = false;
        this.form.customerIdList = idList;
      },
      removeCustomer(index) {
        this.dialog.customer.chosenList.splice(index, 1);
        this.dialog.customer.chosenIdList.splice(index, 1);
        this.form.customerIdList.splice(index, 1);
      },
      onSubmit() {
        const customerInfo = Object.assign({}, this.form)
        const value = customerInfo.planDetail
        customerInfo.planDetail = this.transChara(value)
        this.form.visitorId = this.distributeObject.users;
        this.form.customerIdList = this.dialog.customer.chosenIdList;
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$http.post('/crm/visit/plan/add', customerInfo, r => {
              this.$message({
                message: '恭喜你，计划添加成功',
                type: 'success'
              });
              this.$emit('onSuccess', this.$util.extend(this.form));
              this.$refs.form.resetFields();
            });
          } else {
            this.$emit('onError', this.$util.extend(this.form));
            console.error('error submit!!');
            this.$message({
              message: '警告，验证不通过，请认真填写',
              type: 'warning'
            });
            return false;
          }
        });
      }
    },
    watch: {}
  };
</script>

<style scoped>

</style>
