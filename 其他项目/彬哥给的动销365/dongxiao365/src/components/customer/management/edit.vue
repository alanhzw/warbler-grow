<template>
  <div>
    <!--头部级联菜单-->
    <breadcrumb/>
    <el-form :model="customerForm" :rules="customerRule" ref="customerForm" label-width="120px">
      <el-row>
        <el-col :span="18">
          <el-form-item label="客户名称：" prop="name">
            <el-input v-model="customerForm.name" placeholder="请输入客户名称" class="input-larger" :maxlength="25" :clearable=true></el-input>
          </el-form-item>
          <el-form-item label="客户标签：" prop="tagIdList">
            <el-button type="text" @click="chooseTagVisible=true">选择客户标签</el-button>
            <br>
            <com-tag-view v-model="customerForm.tagList"></com-tag-view>
          </el-form-item>
          <el-form-item label="销售区域：" prop="saleArea">
            <el-cascader
              v-loading="areaLoading"
              class="input-normal"
              :options="salesRegion"
              :props="defaultProps"
              v-model="customerForm.saleAreaIdList"
              change-on-select>
            </el-cascader>
          </el-form-item>
          <el-form-item label="客户经理：" prop="managerId">
            <el-input v-model="customerForm.managerName" placeholder="请选择" suffix-icon="el-icon-arrow-down" :readonly="true" class="input-normal" @focus="managerVisible=true"></el-input>
          </el-form-item>
          <el-form-item label="客户地址：" prop="address">
            <el-cascader
              class="input-normal"
              :options="address"
              :props="{label:'name',value:'name'}"
              v-model="customerForm.address">
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="logo" label-width="0px">
            <com-avatar v-model="customerForm.logo"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="详细地址：" prop="addressDetail">
        <el-input v-model="customerForm.addressDetail" placeholder="请输入详细地址" class="input-normal" :clearable=true :maxlength="200"></el-input>
      </el-form-item>
      <!--客户电话,客户传真-->
      <el-form-item label="客户电话：" prop="telephone">
        <el-input v-model="customerForm.telephone" placeholder="请输入客户电话" class="input-normal" :maxlength="16" :clearable=true></el-input>
      </el-form-item>
      <el-form-item label="客户传真：" prop="fax">
        <el-input v-model="customerForm.fax" placeholder="请输入客户传真" class="input-normal" :maxlength="16" :clearable=true></el-input>
      </el-form-item>
      <el-form-item label="联系人：" v-model="customerForm.contactList" prop="contactList" required>
        <el-row v-for="(contact,index) in customerForm.contactList" :key="index" class="contact-list">
          <el-col :span="6">
            <el-form-item prop="editContactName" ref="editContactName">
              <el-input v-model="contact.name" placeholder="请输入联系人姓名" class="input-large" :maxlength="16" :clearable=true></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="editContactTel" ref="editContactTel">
              <el-input v-model="contact.telephone" placeholder="请输入联系人电话" class="input-large" :maxlength="11" :clearable=true></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="text" v-if="index===0" @click="handleAddContact">增加</el-button>
            <el-button type="text" class="text-danger" v-else @click="handleRemoveContact(index)">移除</el-button>
          </el-col>
        </el-row>
         <el-row v-if="showInputErr">
          <span class="el-form-item__error">请填写联系人信息</span>
        </el-row>
      </el-form-item>
      <el-form-item label="收货地址：" prop="addressList">
        <el-row v-for="(address,index) in customerForm.addressList" :key="index" class="contact-list">
          <el-col :span="6">
            <el-input v-model="address.name" placeholder="请输入收货人姓名" class="input-large" :clearable=true :maxlength="16"></el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="address.tel" placeholder="请输入收货人电话" class="input-large" :clearable=true :maxlength="11"></el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="address.address" placeholder="请输入收货地址" class="input-large" :clearable=true :maxlength="40"></el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="text" v-if="index===0" @click="handleAddAddress">增加</el-button>
            <el-button type="text" class="text-danger" v-else @click="handleRemoveAddress(index)">移除</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="备注：" prop="description">
        <el-input type="textarea" placeholder="请输入备注,长度在500字以内" v-model="customerForm.description" :autosize="{ minRows: 4, maxRows: 4}" resize="none" class="input-larger" :clearable=true :maxlength="500"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit('customerForm')" :disabled="submitting">保存</el-button>
        <el-button @click="revert" class="text-success">取消</el-button>
      </el-form-item>
    </el-form>
    <!--按标签筛选弹窗-->
    <com-tag :visible.sync="chooseTagVisible" v-model="customerForm.tags" @onOk="handleChooseTagOK"/>
    <com-choose-user :multiple="false" :visible.sync="managerVisible" v-model="customerForm.managerList" @onOk="handleChooseUserOK"/>
  </div>
</template>

<script>
  import ComTag from '../../lib/tag-selector'
  import ComTagView from '../../lib/tag-view'
  import address from '../../../util/address'
  import ComAvatar from '../inc/avatar'
  import ComChooseUser from "../../inc/choose_user_by_depart"

  export default {
    name: "add",
    components: {
      ComTag, ComAvatar, ComChooseUser, ComTagView
    },
    data() {
      const validateName = (rule, value, callback) => {
        if ( !/(^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$)/ig.test(value) ) {
          return callback(new Error('请输入汉字、字母或下划线'));
        } else {
          callback();
        }
      };
      const validateName1 = (rule, value, callback) => {
        if ( value ) {
          return callback(new Error('请选择销售区域'));
        } else {
          callback();
        }
      };
       const validateName2 = (rule, value, callback) => {
        if ( !value ) {
          return callback(new Error('请选择客户经理'));
        } else {
          callback();
        }
      };
      return {
        showInputErr: false,
        chooseTagVisible: false,
        managerVisible: false,
        areaLoading: false,
        customerLoading: false,
        salesRegion: [],
        defaultProps: {
          children: 'children',
          value: 'id',
          label: 'name'
        },
        address: address,
        customerRule: {
          name: [
            {required: true, validator: validateName, trigger: 'blur'},
            {max: 25, message: '长度在25个字符之内', trigger: 'blur' }
          ],
        saleArea: [
            {required: true, trigger: 'change'}
          ],
          managerId: [
            {required: true, validator: validateName2, trigger: 'change'}
          ]
        },
        customerForm: {
          contactList: [{}],
          addressList: [{}],
          address: ''
        },
        submitting: false,
        id: 0
      }
    },
    mounted() {
      this.id = this.$route.query.id;
      if (this.id > 0) {
        this.loadCustomer();
        this.loadSalesRegion();
      } else {
        this.$message.error('参数错误，请返回上一个页面刷新后重新尝试');
      }
    },
    methods: {
      loadCustomer() {
        this.customerLoading = true;
        this.$http.get('/crm/customer/info', {id: this.id}, r => {
          this.customerForm = r.data;
          if (this.customerForm.managerId) {
            this.customerForm.managerList = [{userid: this.customerForm.managerId, name: this.customerForm.managerName}];
          }
          this.customerForm.tags = this.customerForm.tagIdList;

          if (this.customerForm.address && this.customerForm.address.length > 0) {
            this.customerForm.address = this.customerForm.address.split(' ');
          }
          this.customerForm.addressList = this.tryParseArray(this.customerForm.addressList);
          this.customerForm.contactList = this.tryParseArray(this.customerForm.contact);
          if (this.customerForm.saleArea && this.customerForm.saleArea.length > 0) {
            this.customerForm.saleAreaIdList = this.customerForm.saleArea.toLongArray();
          } else {
            this.customerForm.saleAreaIdList = [];
          }
          this.customerLoading = false;
        });
      },
      tryParseArray(str) {
        try {
          return JSON.parse(str)
        } catch (e) {
          return [{}];
        }
      },
      verifyContact() {
        const contact =  this.customerForm.contactList[0]
        if (!contact.name || !contact.telephone) {
          this.showInputErr = true
          this.$refs.editContactName[0].$children[0].$refs.input.style.borderColor = '#f56c6c'
          this.$refs.editContactTel[0].$children[0].$refs.input.style.borderColor = '#f56c6c'
        } else {
          this.showInputErr = false
          this.$refs.editContactName[0].$children[0].$refs.input.style.borderColor = '#dcdfe6'
          this.$refs.editContactTel[0].$children[0].$refs.input.style.borderColor = '#dcdfe6'
        }
      },
      // 加载销售区域
      loadSalesRegion() {
        this.areaLoading = true;
        this.$http.get('/crm/sale/area/tree', [], r => {
          this.salesRegion = r.data;
          this.areaLoading = false;
        });
      },
      handleChooseUserOK(userList) {
        if (userList && userList.length > 0) {
          const user = userList[0];
          this.customerForm.managerId = user.userid;
          this.customerForm.managerName = user.name;
        }
      },
      handleChooseTagOK(tags) {
        this.customerForm.tagList = tags;
      },
      handleAddContact() {
        this.customerForm.contactList.push({
          name: '', telephone: ''
        });
      },
      handleRemoveContact(index) {
        this.customerForm.contactList.splice(index, 1);
      },
      // 收货地址
      handleAddAddress() {
        this.customerForm.addressList.push({
          address: ''
        });
      },
      handleRemoveAddress(index) {
        this.customerForm.addressList.splice(index, 1);
      },
      // 新增,修改客户保存
      handleSubmit(formName) {
        const customerForm = this.$util.extend(this.customerForm, {});
        if (customerForm.tagList) {
          customerForm.tagIdList = customerForm.tagList.map(item => {
            return item.id;
          });
        }
        if (customerForm.address) { customerForm.address = customerForm.address.join(' '); }
        this.verifyContact()
        this.$refs[formName].validate((valid) => {
          if (valid && !this.showInputErr) {
            this.submitting = true;
            this.$http.post('/crm/customer/edit', customerForm, r => {
              this.$router.back();
              // this.$refs[formName].resetFields();
              this.$message({
                message: '客户保存成功',
                type: 'success'
              });
            }, e => {
              this.$message.error('保存失败，请刷新页面后重新尝试.');
            })
          } else {
            console.error('error submit!!');
            return false;
          }
        });
      },
      // 添加表单返回上级
      revert() {
        this.$router.go(-1);
      }
    },
    watch: {
      'customerForm.contactList': function(newVal, oldVal) {
        console.log('watch', newVal, oldVal)
        // if (!!newVal[0].name && !!newVal[0].telephone) {
        //   this.showInputErr = false
        //   this.$refs.editContactName[0].$children[0].$refs.input.style.borderColor = '#dcdfe6'
        //   this.$refs.editContactTel[0].$children[0].$refs.input.style.borderColor = '#dcdfe6'
        // } else {
        //    this.showInputErr = true
        //   this.$refs.editContactName[0].$children[0].$refs.input.style.borderColor = '#f56c6c'
        //   this.$refs.editContactTel[0].$children[0].$refs.input.style.borderColor = '#f56c6c'
        // }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .contact-list + .contact-list {
    margin-top: 5px;
  }
</style>
