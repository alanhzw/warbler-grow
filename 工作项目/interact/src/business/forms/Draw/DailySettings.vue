<template>
  <div class="component-daily-draw-settings">
    <lz-form ref="elForm"
             label-width="200px"
             :model="form"
             :rules="rules"
             :disabled="settings.disableStatus.includes(activityInfo.status) || calcuStarted">

      <lz-form-item label="活动期间获奖次数："
                    prop="maxAward"
                    v-if="settings.items.includes('maxAward')">
        <lz-radio-group v-model="form.maxAwardType"
                        @change="changeMaxAwardType">
          <lz-radio :label="1">无限制</lz-radio>
          <lz-radio :label="2">
            有限制
            <span style="margin-left: 10px"
                  v-show="form.maxAwardType == 2">限
              <lz-input class="count-input"
                        @input='toInteger("maxAward")'
                        :disabled="form.maxAwardType == 1"
                        maxlength="7"
                        v-model="form.maxAward" />次
            </span>
          </lz-radio>
        </lz-radio-group>
        <!-- <p class="tip">注：限制活动周期内用户最大中奖次数</p> -->
      </lz-form-item>

      <lz-form-item label="每日获奖次数："
                    prop="dailyPrizeTimes"
                    v-if="settings.items.includes('dailyPrizeTimes')">
        <lz-radio-group v-model="form.dailyPrizeTimesType"
                        @change="changeDailyPrizeTimesType">
          <lz-radio :label="1">无限制</lz-radio>
          <lz-radio :label="2">
            有限制
            <span style="margin-left: 10px"
                  v-show="form.dailyPrizeTimesType == 2">限
              <lz-input class="count-input"
                        :disabled="form.dailyPrizeTimesType == 1"
                        maxlength="7"
                        @input='toInteger("dailyPrizeTimes")'
                        v-model="form.dailyPrizeTimes" />次
            </span>
          </lz-radio>
        </lz-radio-group>
        <!-- <p class="tip">注：限制活动周期内用户最大抽奖次数，为避免客诉，需谨慎设置</p> -->
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
        maxAward: -1,
        maxAwardType: 1,
        dailyPrizeTimes: -1,
        dailyPrizeTimesType: 1,
      },
      rules: {
        dailyPrizeTimes: [
          {
            required: true,
            message: '请设置活动期间获奖次数：',
            trigger: 'change',
          },
          {
            validator(rule, value, cb) {
              if (value > 0 || value === -1) {
                cb();
              } else {
                cb(new Error('请输入正整数'));
              }
            },
            trigger: 'change',
          },
        ],
        maxAward: [
          {
            required: true,
            message: '请设置最大中奖次数',
            trigger: 'change',
          },
          {
            validator(rule, value, cb) {
              if (value > 0 || value === -1) {
                cb();
              } else {
                cb(new Error('请输入正整数'));
              }
            },
            trigger: 'change',
          },
        ],
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
    this.form.dailyPrizeTimesType = this.form.dailyPrizeTimes === -1 ? 1 : 2;


    this.form.maxAwardType = this.form.maxAward === -1 ? 1 : 2;
  },
  methods: {
    // 输入正整数
    toInteger(content) {
      this.form[content] = Number(this.form[content].toString().replace(/^(0+)|[^\d]+/g, ''));
    },
    changeDailyPrizeTimesType(value) {
      if (value === 1) {
        this.form.dailyPrizeTimes = -1;
      } else {
        this.form.dailyPrizeTimes = 1;
      }
    },
    changeMaxAwardType(value) {
      if (value === 1) {
        this.form.maxAward = -1;
      } else {
        this.form.maxAward = 1;
      }
    },
  },
};
</script>

<style lang="scss">
@import '~lz-crm/style/variables';

.component-daily-draw-settings {
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
