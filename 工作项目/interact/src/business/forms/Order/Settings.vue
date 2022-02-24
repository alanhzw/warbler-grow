<template>
  <div class="component-order-settings">
    <lz-form ref="elForm"
             label-width="200px"
             :model="form"
             :rules="rules"
             :disabled="settings.disableStatus.includes(activityInfo.status) || calcuStarted">

      <lz-form-item label=""
                    prop="orderTip"
                    v-if="settings.items.includes('orderTip')">
        <p class="tip">注：客户可在领奖时间段内领取奖品，超过领奖截止时间不可领奖</p>
        <p class="tip">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;领奖开始时间不得早于订单结算截止时间1天后，领奖截止时间需在领奖开始时间1日后</p>
        <p class="tip">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;由于京东接口原因，订单获取时间可能产生延迟</p>
      </lz-form-item>

      <lz-form-item label="订单结算周期："
                    prop="orderRange"
                    v-if="settings.items.includes('orderRange')">
        <lz-date-picker :picker-options="pickerOptions"
                        :disabled="calcuStarted"
                        v-model="form.orderRange"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        @change="rangeChange" />
        <p class="tip"
           v-if='activityInfo.activityType===506'>注：订单结算周期不得超过90天</p>
        <p class="tip"
           v-if='activityInfo.activityType===507'>注：订单结算开始时间不得早于当天，周期不得超过60天</p>

      </lz-form-item>

      <lz-form-item label="订单结算价："
                    prop="orderPriceType"
                    v-if="settings.items.includes('orderPrice')">
        <lz-radio-group v-model="form.orderPriceType">
          <lz-radio :label="2">京东价</lz-radio>
        </lz-radio-group>
        <p class="tip">注：“京东价”即按京东标价作为金额结算标准</p>
      </lz-form-item>

      <lz-form-item label="订单价格结算方式："
                    prop="orderPriceType"
                    v-if="settings.items.includes('orderPriceType')">
        <lz-radio-group v-model="form.orderPriceType">
          <lz-radio :label="1">实付金额</lz-radio>
        </lz-radio-group>
        <p class="tip">注：“实付金额”即按订单的实际付款金额作为订单金额计算标准</p>
      </lz-form-item>

      <lz-form-item label="订单结算状态："
                    prop="orderStatus"
                    v-if="settings.items.includes('orderStatus')">
        <lz-radio-group v-model="form.orderStatus">
          <lz-radio v-if='activityInfo.activityType===505 ||activityInfo.activityType===507 '
                    :label="1">付款完成</lz-radio>
          <lz-radio :label="1"
                    v-if='activityInfo.activityType===502 '>交易完成</lz-radio>
          <lz-radio :label="1"
                    v-if='activityInfo.activityType===506 '>订单完成</lz-radio>
        </lz-radio-group>
        <p class="tip"
           v-if='activityInfo.activityType===505||activityInfo.activityType===507  '>注：付款完成的订单可计入计算</p>
        <p class="tip"
           v-if='activityInfo.activityType===502 '>注：只有交易完成的订单可计入计算</p>
        <p class="tip"
           v-if='activityInfo.activityType===506 '>注：收货完成的订单可计入计算</p>

      </lz-form-item>

      <lz-form-item label="订单金额计算方式："
                    prop="priceCalculateType"
                    v-if="settings.items.includes('priceCalculateType')">
        <lz-radio-group v-model="form.priceCalculateType">
          <lz-radio v-if="activityInfo.activityType!==502"
                    :label="1">最高单笔金额</lz-radio>
          <lz-radio :label="2">累计金额</lz-radio>
        </lz-radio-group>
        <p class="tip">注：“累计金额”，将结算周期内，全部订单的累计金额是否超过评奖基准额度作为评判标准</p>
        <p v-if="activityInfo.activityType!==502"
           class="tip">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;“最高单笔金额”，将结算周期内，单笔最高金额是否超过评奖基准额度作为评判标准</p>
      </lz-form-item>

      <lz-form-item label="订单最小金额："
                    prop="priceLimit"
                    v-if="settings.items.includes('priceLimit') && activityInfo.activityType===507">
        <lz-radio-group v-model="form.priceLeastLimitType"
                        @change="changePriceLeastLimitType">
          <lz-radio :label="1">无限制</lz-radio>
          <lz-radio :label="2">
            有限制
            <span style="margin-left: 10px"
                  v-show="form.priceLeastLimitType == 2">不少于
              <lz-input class="count-input"
                        :disabled="form.priceLeastLimitType == 1"
                        @input="toFixedTwo('priceLimit')"
                        v-model="form.priceLimit" />元
            </span>
          </lz-radio>
        </lz-radio-group>
        <p class="tip">注：可输入0-1,000,000之间的数字，保留2位小数</p>
      </lz-form-item>

      <lz-form-item label="获奖最低额度限制"
                    prop="priceLimit"
                    v-if="settings.items.includes('priceLimit') && activityInfo.activityType!==507">
        <lz-radio-group v-model="form.priceLeastLimitType"
                        @change="changePriceLeastLimitType">
          <lz-radio :label="1">无限制</lz-radio>
          <lz-radio :label="2">
            有限制
            <span style="margin-left: 10px"
                  v-show="form.priceLeastLimitType == 2">不少于
              <lz-input class="count-input"
                        :disabled="form.priceLeastLimitType == 1"
                        v-model="form.priceLimit"
                        @input='toFixedTwo("priceLimit")' />元
            </span>
          </lz-radio>
        </lz-radio-group>
        <p class="tip">注：按所选订单结算方式，可领取奖品的最低金额</p>
      </lz-form-item>

      <!-- <lz-form-item label="订单范围：" prop="orderScopeType" v-if="settings.items.includes('orderScopeType')">
        <lz-select v-model="form.orderScopeType" placeholder="请选择">
          <lz-option v-for="item in orderScopeTypeOptions" :key="item.value" :label="item.label" :value="item.value">
          </lz-option>
        </lz-select>
      </lz-form-item> -->

    </lz-form>
  </div>
</template>

<script>
import Moment from 'moment';

export default {
  name: 'OrderSettings',
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
      // orderScopeTypeOptions: [{
      //   value: '2',
      //   label: '品牌订单'
      // }],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 90 * 24 * 3600 * 1000;// 禁止选择以前的时间
        },
      },
      allData: {},

      form: {
        // orderScopeType: '2', // 订单范围 订单范围(1-单店 2-品牌)
        orderPriceType: 1, // 订单价格结算方式(1-实付金额)  2 京东价
        orderStatus: 1,
        priceCalculateType: 1, // 获奖金额累计方式(1-最高单笔金额；2-累计金额)
        orderRange: [],
        orderStartTime: '', // 订单结算开始时间
        orderEndTime: '', // 订单结算结束时间
        priceLeastLimitType: 1, // 获奖最低额度限制单选框
        priceLimit: -1,
      },
      rules: {
        // orderScopeType: [
        //   {
        //     required: true,
        //     trigger: 'change',
        //     message: '请设置订单范围',
        //   },
        // ],
        orderPriceType: [
          {
            required: true,
            trigger: 'change',
            message: '请设置订单结算价',
          },
        ],
        orderPrice: [
          {
            required: true,
            trigger: 'change',
            message: '请设置订单结算价',
          },
        ],
        priceLimit: [
          {
            required: true,
            message: '请设置获奖最低额度限制',
            trigger: 'change',
          },
          {
            validator: (rule, value, cb) => {
              if (value > 1000000) {
                cb(new Error('可输入0-1,000,000之间的数字'));
              } else if (isNaN(value)) {
                cb(new Error('情输入正确格式的数字'));
              } else {
                cb();
              }
            },
            trigger: 'change',
          },
        ],
        orderStatus: [
          {
            required: true,
            trigger: 'change',
          },
        ],
        priceCalculateType: [
          {
            required: true,
            trigger: 'change',
          },
        ],
        orderRange: [
          {
            required: true,
            message: '请设置订单结算时间',
            trigger: 'change',
          },
          {
            validator: (rule, value, cb) => {
              // eslint-disable-next-line no-console
              console.log('data -> value', value);
              const now = new Date();
              if (value[0] < now - 90 * 24 * 60 * 60 * 1000) {
                cb(new Error('订单结算不可早于90天'));
              } else if (value[1] - value[0] > 60 * 24 * 60 * 60 * 1000) {
                cb(new Error('订单结算时间间隔不大于60天'));
              } else if (this.activityInfo.activityType == 503 || this.activityInfo.activityType == 506 || this.activityInfo.activityType == 507) {
                const orderEndTime = value[1];
                const awardStartTime = this.allData.prizeDistributionForm.awardStartTime;
                const awardStartTs = typeof awardStartTime === 'string' ? new Date(awardStartTime).getTime() : awardStartTime.getTime();
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
      },
    };
  },
  computed: {
    calcuStarted() {
      // 是否已经开始结算
      return new Date(this.activityInfo.orderStartTime) < new Date();
    },
    isFinished() {
      if (this.activityInfo.activityType === 501 || this.activityInfo.activityType === 502) {
        return this.activityInfo.awardEndTime && new Date() > new Date(this.activityInfo.awardEndTime);
      }
    },
  },
  created() {
    this.form = {
      ...this.form,
      ...this.formData,
      orderStatus: 1,
    };
    if (this.activityInfo.activityType === 502) {
      this.form.priceCalculateType = 2;
    }
    if (this.formData.orderStartTime) {
      this.form.orderRange = [this.form.orderStartTime, this.form.orderEndTime];
    }
    if (this.settings.items.includes('orderPrice')) {
      this.form.orderPriceType = 2;
    }
    this.form.priceLeastLimitType = this.form.priceLimit === -1 ? 1 : 2;
  },
  mounted() {
    setTimeout(() => {
      this.getAllDataSelf();
    }, 500);
  },
  methods: {
    // 获取所有数据
    getAllDataSelf() {
      this.allData = this.getAllData();
    },
    // 输入正整数
    toInteger(content) {
      this.form[content] = Number(this.form[content].toString().replace(/^(0+)|[^\d]+/g, ''));
    },
    // 保留两位小数
    toFixedTwo(content) {
      try {
        if (this.form[content] > 9999999.99) {
          this.form[content] = 9999999.99;
        }
        this.form[content] = this.form[content].replace(/[^\d.]/g, ''); // 清除除了“数字”和“.”以外的字符
        this.form[content] = this.form[content].replace(/\.{2,}/g, '.'); // 只保留第一个. 清除多余的
        this.form[content] = this.form[content].replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
        // eslint-disable-next-line no-useless-escape
        this.form[content] = this.form[content].replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');// 只能输入2个小数
        if (this.form[content].indexOf('.') < 0 && this.form[content] !== '') {
          // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
          this.form[content] = parseFloat(this.form[content]);
        }
        if (this.form[content].indexOf('.') == 0) {
          this.form[content] = `${'0' + ''}${this.form[content]}`;
        }
      } catch (error) {
        console.log('error:', error);
      }
    },
    changePriceLeastLimitType(value) {
      if (value === 1) {
        this.form.priceLimit = -1;
      } else {
        this.form.priceLimit = 0;
      }
    },
    rangeChange(range) {
      if (this.activityInfo.activityType == 503 || this.activityInfo.activityType == 506 || this.activityInfo.activityType == 507) {
        this.$emit('checkOneOption', 'prizeDistributionForm', 'awardRange');
        console.log(11);
      }
      // eslint-disable-next-line no-console
      console.log('rangeChange -> range', range);
      if (range[0]) {
        this.form.orderStartTime = Moment(range[0]).format('YYYY-MM-DD HH:mm:ss');
      }
      if (range[1]) {
        this.form.orderEndTime = Moment(range[1]).format('YYYY-MM-DD HH:mm:ss');
      }
    },
  },
};
</script>

<style lang="scss">
@import '~lz-crm/style/variables';
.component-order-settings {


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
}
</style>
