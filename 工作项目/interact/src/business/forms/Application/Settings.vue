<!--
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2021-01-13 09:56:36
 * @LastEditTime: 2021-08-18 11:50:07
 * @FilePath: \interact\src\business\forms\Application\Settings.vue
-->
<template>
  <div class="component-application-settings">
    <!--<p class="tip">注：客户可在领奖时间段内领取奖品，超过领奖截止时间不可领奖</p>
  <p class="tip">领奖开始时间不得早于订单结算截止时间7天后，领奖开始截止时间不得早于领奖开始时间1日后</p> -->
    <lz-form ref="elForm"
             label-width="200px"
             :model="form"
             :rules="rules"
             :disabled="settings.disableStatus.includes(activityInfo.status)">
      <lz-form-item label="报名时间："
                    prop="enrollRange">
        <lz-date-picker v-model="form.enrollRange"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        @change="rangeChange" />
        <p class="tip">注：活动报名周期不得超过60天</p>
      </lz-form-item>
    </lz-form>
  </div>
</template>

<script>
import Moment from 'moment';

export default {
  name: 'ApplicationSettings',
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
        enrollRange: [],
        enrollStartTime: '', // 报名开始时间
        enrollEndTime: '', // 报名结束时间
      },
      rules: {
        enrollRange: [
          {
            required: true,
            message: '请设置报名时间',
            trigger: 'change',
          },
          {
            validator: (rule, value, cb) => {
              console.log('data -> value', value);
              const now = new Date();
              if (value[0] < now) {
                cb(new Error('报名开始时间不早于当前时间'));
              } else if (value[1] - value[0] > 60 * 24 * 60 * 60 * 1000) {
                cb(new Error('报名时间间隔不大于60天'));
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
    if (this.formData.enrollStartTime) {
      this.form.enrollRange = [this.form.enrollStartTime, this.form.enrollEndTime];
    }
  },
  methods: {
    rangeChange(range) {
      if (range[0]) {
        this.form.enrollStartTime = Moment(range[0]).format('YYYY-MM-DD HH:mm:ss');
      }
      if (range[1]) {
        this.form.enrollEndTime = Moment(range[1]).format('YYYY-MM-DD HH:mm:ss');
      }
    },
  },
};
</script>

<style lang="scss">
.component-application-settings {
  .lz-date-editor--datetimerange.lz-input, .lz-date-editor--datetimerange.lz-input__inner{
    width: 600px;
  }
}
</style>
