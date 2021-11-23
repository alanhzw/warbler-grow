<template>
  <div class="el-select el-select--small">
    <el-input
      suffix-icon="el-icon-arrow-down"
      v-model="selectedUserName"
      :placeholder="placeholder"
      :readonly=true
      :clearable="clearable"
      style="cursor: pointer;"
      @focus="chooseUserVisible = true"
    >
    </el-input>
    <ComChoseUser title="人员选择" v-model="selectedUser" :multiple="false" :visible.sync="chooseUserVisible" @onOk="handleChooseUserOK"/>
  </div>
</template>

<script>
  import ComChoseUser from '../../inc/choose_user_by_depart'

  export default {
    name: "warehouse",
    components: {ComChoseUser},
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      clearable: Boolean,
      size: {
        type: String,
        default: 'small'
      },
      value: {
        type: [String, Number],
        default: null
      },
      placeholder: {
        type: String,
        default: '选择业务员'
      },
      text: String
    },
    data() {
      return {
        selectedUser: [],
        selectedUserId: this.value,
        selectedUserName: this.text,
        chooseUserVisible: false
      }
    },
    methods: {
      // 选择上报人
      handleChooseUserOK(userList) {
        if (userList && userList.length > 0) {
          const user = userList[0];
          this.selectedUser = [user];
          this.selectedUserId = user.userid;
          this.selectedUserName = user.name;
          this.$emit('change', this.selectedUserId);
        }
      }
    },
    watch: {
      text: {
        handler(val) {
          console.log('val', val)
          this.selectedUserName = val;
        }
      },
      value: {
        handler(val) {
          this.selectedUserId = val;
          this.selectedUser.push(val);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
