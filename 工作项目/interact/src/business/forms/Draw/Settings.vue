<template>
  <div class="component-draw-settings">
    <lz-form ref="elForm"
             label-width="200px"
             :model="form"
             :rules="rules"
             :disabled="settings.disableStatus.includes(activityInfo.status) || calcuStarted">

      <lz-form-item label="抽奖时间："
                    prop="drawRange"
                    v-if="settings.items.includes('drawRange')">
        <lz-date-picker v-model="form.drawRange"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        @change="rangeChange" />
        <p class="tip">注：抽奖时间区间不得超过60天</p>
      </lz-form-item>

      <lz-form-item label="新增抽奖次数:"
                    prop="drawTimesInfoList"
                    v-if="settings.items.includes('drawTimesInfoList')">
        <lz-radio-group v-model="form.drawTimesType"
                        @change="changeDrawTimeType">
          <lz-radio :label="1">固定金额倍数</lz-radio>
          <lz-radio :label="2">自定义阶梯</lz-radio>
        </lz-radio-group>
        <p class="tip">注：按不同消费金额设置奖项等级，请按消费金额从低到高排列，最多可设置3级
          <lz-tooltip class="item"
                      effect="light"
                      content="每级获得的获奖次数为用户可抽奖的总次数，如设置为消费满100元获得1次抽奖机会，
          满200元获得2次抽奖机会，用户购买满200元时，实际获得2次抽奖机会"
                      placement="bottom">
            <i class="iconfont icon-icon4-33"></i>
          </lz-tooltip>
        </p>

        <div v-if="form.drawTimesType === 1"
             class="draw-time-settings">
          累计消费每满
          <lz-input v-model="form.drawTimesInfoList[0].quota"
                    @input='toFixedTwo("quota")' />元，可获得
          <lz-input maxlength="7"
                    v-model="form.drawTimesInfoList[0].times"
                    @input='form.drawTimesInfoList[0].times=form.drawTimesInfoList[0].times.toString().replace(/^(0+)|[^\d]+/g, "")' />次抽奖机会
        </div>
        <div v-if="form.drawTimesType === 2"
             class="draw-time-settings">
          <div v-for="(draw, index) in form.drawTimesInfoList"
               :key="`draw-time-setting-${index}`">
            {{ index + 1 }}级奖项 累计消费满
            <lz-input v-model="draw.quota"
                      @input='toFixedTwo("quota")' />元，共获得
            <lz-input v-model="draw.times"
                      maxlength="7"
                      @input="draw.times= draw.times.toString().replace(/^(0+)|[^\d]+/g, '')" />次抽奖机会
            <i v-show=" form.drawTimesInfoList.length> 1"
               class="btn-del iconfont icon-icon-07"
               @click="deleteTimeSettings(index)" />
          </div>
          <lz-button v-if="form.drawTimesType === 2 && form.drawTimesInfoList.length < 3"
                     type="primary"
                     @click="addTimeSettings">添加设置</lz-button>
        </div>
      </lz-form-item>

      <lz-form-item label="最大抽奖次数："
                    prop="maxDraw"
                    v-if="settings.items.includes('maxDraw')">
        <lz-radio-group v-model="form.maxDrawType"
                        @change="changeMaxDrawType">
          <lz-radio :label="1">无限制</lz-radio>
          <lz-radio :label="2">
            有限制
            <span style="margin-left: 10px"
                  v-show="form.maxDrawType == 2">限
              <lz-input class="count-input"
                        :disabled="form.maxDrawType == 1"
                        v-model="form.maxDraw"
                        @input='toInteger("maxDraw")'
                        maxlength="7" />次
            </span>
          </lz-radio>
        </lz-radio-group>
        <p class="tip">注：限制活动周期内用户最大抽奖次数，为避免客诉，需谨慎设置</p>
      </lz-form-item>

      <lz-form-item label="最大获奖次数："
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
                        :disabled="form.maxAwardType == 1"
                        v-model="form.maxAward"
                        @input='toInteger("maxAward")'
                        maxlength="7" />次
            </span>
          </lz-radio>
        </lz-radio-group>
        <p class="tip">注：限制活动周期内用户最大中奖次数</p>
      </lz-form-item>
    </lz-form>
  </div>
</template>

<script>
import Moment from 'moment';

const defaltDrawTime = {
  quota: 100,
  times: 1,
};
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
        drawRange: [],
        drawStartTime: '', // 抽奖开始时间
        drawEndTime: '', // 抽奖结束时间
        drawTimesType: 1,
        drawTimesInfoList: [
          {
            ...defaltDrawTime,
          },
        ],
        maxDraw: -1,
        maxDrawType: 1,
        maxAward: -1,
        maxAwardType: 1,
      },
      rules: {
        drawTimesInfoList: [
          {
            required: true,
            message: '请设置抽奖次数',
            trigger: 'change',
          },
          {
            validator(rule, value, cb) {
              if (value.some(settings => !(settings.quota > 0 && settings.times > 0))) {
                cb(new Error('请输入大于零的数字'));
              } else if (value.length > 1) {
                let flag = true;
                for (let i = 1; i < value.length; i++) {
                  if (value[i].quota <= value[i - 1].quota) {
                    flag = false;
                    cb(new Error(`${i + 1}级设置的满额额度必须大于${i}级`));
                  }
                }
                if (flag) {
                  cb();
                }
              } else {
                cb();
              }
            },
            trigger: 'blur',
          },
        ],
        maxDraw: [
          {
            required: true,
            message: '请设置最大抽奖次数',
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
        drawRange: [
          {
            required: true,
            message: '请设置抽奖时间',
            trigger: 'change',
          },
          {
            validator: (rule, value, cb) => {
              // eslint-disable-next-line no-console
              console.log('data -> value', value);
              const now = new Date();
              if (value[0] < now) {
                cb(new Error('抽奖开始时间不早于当前时间'));
              } else if (value[1] - value[0] > 60 * 24 * 60 * 60 * 1000) {
                cb(new Error('抽奖时间间隔不大于60天'));
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
    if (this.formData.drawStartTime) {
      this.form.drawRange = [this.form.drawStartTime, this.form.drawEndTime];
    }
    this.form.maxDrawType = this.form.maxDraw === -1 ? 1 : 2;
    this.form.maxAwardType = this.form.maxAward === -1 ? 1 : 2;
  },
  methods: {
    toFixedTwo(content) {
      this.form.drawTimesInfoList.forEach((item, index) => {
        try {
          if (this.form.drawTimesInfoList[index][content] > 9999999.99) {
            this.form.drawTimesInfoList[index][content] = 9999999.99;
          }
          this.form.drawTimesInfoList[index][content] = this.form.drawTimesInfoList[index][content].replace(/[^\d.]/g, ''); // 清除除了“数字”和“.”以外的字符
          this.form.drawTimesInfoList[index][content] = this.form.drawTimesInfoList[index][content].replace(/\.{2,}/g, '.'); // 只保留第一个. 清除多余的
          this.form.drawTimesInfoList[index][content] = this.form.drawTimesInfoList[index][content].replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
          // eslint-disable-next-line no-useless-escape
          this.form.drawTimesInfoList[index][content] = this.form.drawTimesInfoList[index][content].replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');// 只能输入2个小数
          if (this.form.drawTimesInfoList[index][content].indexOf('.') < 0 && this.form.drawTimesInfoList[index][content] !== '') {
            // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
            this.form.drawTimesInfoList[index][content] = parseFloat(this.form.drawTimesInfoList[index][content]);
          }
          if (this.form.drawTimesInfoList[index][content].indexOf('.') == 0) {
            this.form.drawTimesInfoList[index][content] = `${'0' + ''}${this.form.drawTimesInfoList[index][content]}`;
          }
        } catch (error) {
          console.log('error:', error);
        }
      });
    },
    // 输入正整数
    toInteger(content) {
      this.form[content] = Number(this.form[content].toString().replace(/^(0+)|[^\d]+/g, ''));
    },
    changeMaxDrawType(value) {
      if (value === 1) {
        this.form.maxDraw = -1;
      } else {
        this.form.maxDraw = 1;
      }
    },
    changeMaxAwardType(value) {
      if (value === 1) {
        this.form.maxAward = -1;
      } else {
        this.form.maxAward = 1;
      }
    },
    rangeChange(range) {
      if (range[0]) {
        this.form.drawStartTime = Moment(range[0]).format('YYYY-MM-DD HH:mm:ss');
      }
      if (range[1]) {
        this.form.drawEndTime = Moment(range[1]).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    changeDrawTimeType() {
      this.form.drawTimesInfoList = [{
        quota: 100,
        times: 1,
      }];
    },
    addTimeSettings() {
      this.form.drawTimesInfoList.push({
        ...defaltDrawTime,
      });
      this.$refs.elForm.validateField('drawTimesInfoList');
    },
    deleteTimeSettings(index) {
      this.form.drawTimesInfoList.splice(index, 1);
    },
  },
};
</script>

<style lang="scss">
@import '~lz-crm/style/variables';

.component-draw-settings {


  .draw-time-settings {
    font-size: 14px;

    color: $FONT_COMMON_GRAY;

    .btn-del {
      color: $TAG_INFO_BLUE;
      margin-left: 20px;
    }


  }

  .lz-date-editor--datetimerange.lz-input, .lz-date-editor--datetimerange.lz-input__inner{
    width: 600px;
  }

  .lz-input {
    width: 600px;
  }
}
</style>
