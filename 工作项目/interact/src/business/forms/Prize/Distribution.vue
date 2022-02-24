<template>
  <div class="component-prize-distribution">
    <lz-form ref="elForm"
             label-width="200px"
             :model="form"
             :rules="rules"
             :disabled="settings.disableStatus.includes(activityInfo.status) || awardStarted">

      <lz-form-item>
        <p class="tip">注：领奖开始当日凌晨为订单结算时间，客户可在订单排名结算完成后，在领奖时间段内可领取奖品，超过领奖截止时间不可领奖

        </p>
        <p class="tip"> 结算后排名不可改变，为保证结算订单完整，领奖开始时间不得早于订单结算截止时间7天后

        </p>
      </lz-form-item>

      <lz-form-item label="领奖时间："
                    prop="awardRange"
                    v-if="settings.items.includes('awardRange')">
        <lz-date-picker :picker-options="pickerOptions"
                        v-model="form.awardRange"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        @change="rangeChange" />
        <p class="tip"
           v-if='activityInfo.activityType===503'>注：领奖周期不得超过60天，且领奖开始时间不得早于订单结算截止时间</p>
        <p class="tip"
           v-else-if='activityInfo.activityType===506'>注：领奖周期不得超过60天，领奖开始时间不得早于报名截止时间，且不应早于订单结算截止时间7天后</p>
        <p class="tip"
           v-else>注：领奖周期不得超过60天，且领奖开始时间不得早于报名截止时间，及订单结算截止时间</p>
      </lz-form-item>

      <lz-form-item label="可领取奖项数量："
                    prop="awardType"
                    v-if="settings.items.includes('awardType') && (activityInfo.activityType===506 ||activityInfo.activityType===507) ">
        <lz-radio-group v-model="form.awardType"
                        @change='changeAwardType'>
          <lz-radio :label="1">全部奖项</lz-radio>
          <lz-radio :label="2">最高奖项</lz-radio>
        </lz-radio-group>
        <p class="tip">注：选择全部奖项，客户在取得一级奖项排名时，可同时获取一级奖项以下所有等级奖项；如选择最高等级奖项，客户只能领取所获奖项等级中最高等级的奖品</p>
      </lz-form-item>

      <lz-form-item label="可领取奖项数量："
                    prop="awardType"
                    v-if="settings.items.includes('awardType') && activityInfo.activityType!==506 && activityInfo.activityType!==507">
        <lz-radio-group v-model="form.awardType"
                        @change='changeAwardType'>
          <lz-radio :label="1">全部奖项</lz-radio>
          <lz-radio :label="2">最高奖项（如无库存，则不发放）</lz-radio>
          <lz-radio :label="3">最高奖项（如无库存，降级发放）</lz-radio>
        </lz-radio-group>
      </lz-form-item>

      <lz-form-item label="奖品领取范围："
                    prop="awardLimit"
                    v-if="settings.items.includes('awardLimit')">
        <lz-radio-group v-model="form.awardType">
          <lz-radio :label="1">全部奖品</lz-radio>
          <lz-radio :label="4">选取单个奖品</lz-radio>
        </lz-radio-group>
        <p class="tip">注：用户满足获奖条件后可以领取奖品的数量，选择“全部奖品”，用户在满足获奖条件后，可领取该等级以下的全部奖品；如选择“选取单个奖品”，用户在活动中只能在满足获奖条件的奖品中选择一个</p>
      </lz-form-item>

    </lz-form>
  </div>
</template>

<script>
import Moment from 'moment';

export default {
  name: 'PrizeDistribution',
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
    getAllData: {
      type: Function,
    },
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 3600 * 1000;// 禁止选择以前的时间
        },
      },
      allData: {},
      form: {
        awardRange: [],
        awardType: 1, // 发奖方案   1-全部奖品；2-最高奖项(如无库存 则不发放)；3-最高奖项(如无库存降级发放) 选取单个奖品
        awardStartTime: '', // 领奖开始时间
        awardEndTime: '', // 领奖结束时间
      },
      rules: {
        awardRange: [
          {
            required: true,
            message: '请设置领奖时间',
            trigger: 'change',
          },
          {
            validator: (rule, value, cb) => {
              // eslint-disable-next-line no-console
              console.log('data -> value', value);
              const now = new Date();
              if (value[0] < now) {
                cb(new Error('领奖开始时间不早于当前时间'));
              } else if (value[1] - value[0] < 24 * 60 * 60 * 1000) {
                cb(new Error('领奖时间间隔不小于1天'));
              } else if (value[1] - value[0] > 60 * 24 * 60 * 60 * 1000) {
                cb(new Error('领奖时间间隔不大于60天'));
              } else if (this.activityInfo.activityType == 503 || this.activityInfo.activityType == 506 || this.activityInfo.activityType == 507) {
                const orderEndTime = this.allData.orderForm.orderEndTime;
                const awardBeginTime = value[0];
                const awardStartTs = typeof awardBeginTime === 'string' ? new Date(awardBeginTime).getTime() : awardBeginTime.getTime();
                const orderEndTs = typeof orderEndTime === 'string' ? new Date(orderEndTime).getTime() : orderEndTime.getTime();
                if (awardStartTs - orderEndTs < 24 * 60 * 60 * 1000 * 1) {
                  cb(new Error('领奖开始时间不得早于订单结算截止时间1天后'));
                } else {
                  cb();
                }
              } else {
                cb();
              }
            },
            trigger: 'change',
          },
        ],
        enrollRange: [
          {
            required: true,
            message: '请设置报名时间',
            trigger: 'change',
          },
          {
            validator: (rule, value, cb) => {
              if (value[1] - value[0] > 60 * 24 * 60 * 60 * 1000) {
                cb(new Error('领奖时间间隔不大于60天'));
              } else {
                cb();
              }
            },
            trigger: 'change',
          },
        ],
        awardType: [
          {
            required: true,
            trigger: 'change',
          },
        ],
      },
    };
  },
  computed: {
    awardStarted() {
      // 是否已经开始结算
      return new Date(this.activityInfo.awardStartTime) < new Date();
    },
  },
  created() {
    this.form = {
      ...this.form,
      ...this.formData,
    };
    if (this.formData.awardStartTime) {
      this.form.awardRange = [this.form.awardStartTime, this.form.awardEndTime];
    }
  },
  mounted() {
    setTimeout(() => {
      this.getAllDataSelf();
    }, 500);
  },
  methods: {
    // 获取所有数据
    async getAllDataSelf() {
      this.allData = await this.getAllData();
      const orderEndTime = this.allData.orderForm.orderEndTime;
      const orderEndTs = typeof orderEndTime === 'string' ? new Date(orderEndTime).getTime() : orderEndTime.getTime();
      this.pickerOptions.disabledDate = time => time.getTime() < orderEndTs + 24 * 60 * 60 * 1000 * 1; // 禁止选择以前的时间
    },
    changeAwardType() {
      this.$emit('upDatePrizeList');
    },
    rangeChange(range) {
      if (this.activityInfo.activityType == 503 || this.activityInfo.activityType == 506 || this.activityInfo.activityType == 507) {
        this.$emit('checkOneOption', 'orderForm', 'orderRange');
        this.getAllDataSelf();
      }
      if (range[0]) {
        this.form.awardStartTime = Moment(range[0]).format('YYYY-MM-DD HH:mm:ss');
      }
      if (range[1]) {
        this.form.awardEndTime = Moment(range[1]).format('YYYY-MM-DD HH:mm:ss');
      }
    },
  },
};
</script>

<style lang="scss">
.component-prize-distribution {
  .lz-date-editor--datetimerange.lz-input, .lz-date-editor--datetimerange.lz-input__inner{
    width: 600px;
  }

}
</style>
