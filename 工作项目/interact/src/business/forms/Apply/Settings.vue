<!--
 * @Description:申请设置组件
 * @Autor: hanzhiwei
 * @Date: 2021-01-19 17:57:33
 * @LastEditTime: 2021-08-18 11:58:03
 * @FilePath: \interact\src\business\forms\Apply\Settings.vue
-->
<template>
  <div class="component-trail-settings">
    <lz-form ref="elForm"
             label-width="200px"
             :model="form"
             :disabled="settings.disableStatus.includes(activityInfo.status) || calcuStarted">
      <lz-form-item label="会员申请限制："
                    prop="memberApplyForlimit"
                    v-if="settings.items.includes('memberApplyForlimit')">
        <lz-radio-group v-model="form.memberApplyForlimit">
          <lz-radio :label="0">活动期间可申请一次</lz-radio>
          <lz-radio :label="1">该活动类型仅可申请一次</lz-radio>
        </lz-radio-group>
      </lz-form-item>
      <lz-form-item label="自动停止："
                    prop="autoStop"
                    v-if="settings.items.includes('autoStop')">
        <lz-checkbox v-model="form.autoStop"
                     :true-label='1'
                     :false-label='0'>权益发完后自动停止</lz-checkbox>
      </lz-form-item>
    </lz-form>
  </div>
</template>

<script>

export default {
  name: 'DrawSettings',
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
        autoStop: 0, // (0:正常，1:权益发完后自动停止)
        memberApplyForlimit: 0, // （0：活动期间可申请一次，1：该活动类型仅可申请一次）
      },
    };
  },
  computed: {
    calcuStarted() {
      // 是否已经开始结算
      return new Date(this.activityInfo.orderStartTime) < new Date();
    },
  },
  created() {
    this.form = {
      ...this.form,
      ...this.formData,
    };
  },
  methods: {

  },
};
</script>

<style lang="scss">
@import '~lz-crm/style/variables';

.component-trail-settings {
  .count-input.lz-input {
    width: 60px;
    margin: 0 10px;
  }

  .draw-time-settings {
    font-size: 14px;

    color: $FONT_COMMON_GRAY;

    .btn-del {
      color: $TAG_INFO_BLUE;
      margin-left: 20px;
    }

    .lz-input {
      width: 80px;
      margin: 0 5px;
      text-align: center;
    }
  }
}
</style>
