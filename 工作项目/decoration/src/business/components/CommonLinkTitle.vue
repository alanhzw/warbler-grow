<!--
 * @Description:
 * @Date: 2021-03-23 14:17:32
 * @LastEditTime: 2021-03-29 16:09:04
 * @FilePath: \yunluzhuangxiu\src\business\components\CommonLinkTitle.vue
-->
<template>
  <div class="common-link-title">
    <span class="set-link-title" :class="{'no-name':!isChangedLinkTitle}" @click='dialogVisible=true'>
      <i class="iconfont icon-yemianzhuangxiuiconshezhi-12"></i>
    </span>
    <common-confirm class="common-dialog" title='楼层追踪设置' v-if="dialogVisible" :dialogVisible='dialogVisible' @confirm='submitForm("ruleForm")' @cancle='resetForm("ruleForm")' width='40%'>
      <p class="tip">注：用户行为明细追踪为定制业务报表，如有需求请和商务经理联系</p>
      <br>
      <lz-form :model="formData" label-position="right" :rules="rules" ref="ruleForm" label-width='100px'>
        <lz-form-item label="链接标题：" prop="linkTitle">
          <lz-input v-model="formData.linkTitle" placeholder="请输入链接标题" maxlength="20"></lz-input>
        </lz-form-item>
      </lz-form>
    </common-confirm>
  </div>
</template>

<script>

import CommonConfirm from '@business/components/CommonConfirm.vue';

export default {
  name: 'CommonLinkTitle',
  components: { CommonConfirm },
  props: {
    isChangedLinkTitle: {
      default: true,
    },
    propsLink: {
      default: '',
    },
    propsTitle: {
      default: '',
    },
  },
  data() {
    return {
      formData: {
        linkTitle: '',
      },
      dialogVisible: false,
      rules: {
        linkTitle: [
          { required: false, message: '请输入链接标题', trigger: 'change' },
        ],
      },
    };
  },
  created() {
    this.formData.linkTitle = this.propsTitle;
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('changeTitle', this.formData.linkTitle);
          this.dialogVisible = false;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.dialogVisible = false;
      this.$refs[formName].resetFields();
    },
  },
  watch: {
    propsTitle() {
      this.formData.linkTitle = this.propsTitle;
    },
  },
};
</script>

<style lang='scss'>
.common-link-title {
  margin-left: 10px;
  .set-link-title {
    cursor: pointer;
    color: #39f;
  }
  .no-name {
    color: red;
  }
}
</style>
