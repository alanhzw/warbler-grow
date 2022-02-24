<!--
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2021-01-19 14:07:03
 * @LastEditTime: 2021-12-08 10:14:33
 * @FilePath: \interact\src\business\forms\Rule\Settings.vue
-->
<template>
  <div class="component-rule-settings">
    <lz-form ref="elForm"
             label-width="200px"
             :model="form"
             :rules="rules"
             :disabled="settings.disableStatus.includes(activityInfo.status)">
      <lz-form-item label="活动规则："
                    prop="activityRule">
        <lz-input type="textarea"
                  v-model="form.activityRule"
                  :rows="4"
                  placeholder="请输入活动规则"
                  maxlength="2000"
                  show-word-limit />
      </lz-form-item>
      <!-- <lz-form-item label=" ">
      <lz-button type="text">自动生成</lz-button>
    </lz-form-item> -->
    </lz-form>
  </div>
</template>

<script>
export default {
  name: 'RuleSettings',
  props: {
    formData: {
      default: () => ({}),
    },
    activityInfo: {
      default: () => ({}),
    },
    settings: {
      default: () => ({}),
    },
  },
  data() {
    return {
      form: {
        activityRule: '',
      },
      rules: {
        activityRule: [
          {
            required: true,
            message: '请输入活动规则',
            trigger: 'change',
          },
          {
            validator: (rule, value, cb) => {
              if (!value.trim()) {
                cb(new Error('请输入活动规则'));
              } else {
                cb();
              }
            },
            trigger: 'change',
          },
        ],
      },
    };
  },
  created() {
    this.form = {
      ...this.form,
      ...this.formData,
    };
  },
};
</script>

<style lang="scss">
.component-rule-settings {
  .lz-textarea{
width: 600px;
  }
  .lz-textarea__inner {
    padding-bottom: 100px;
    width: 600px;
  }

}
</style>
