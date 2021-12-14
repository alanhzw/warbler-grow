<!--
 * @Description:时间日期选择器组件
 * @Autor: hanzhiwei
 * @Date: 2021-01-07 15:52:31
 * @LastEditTime: 2021-01-07 16:33:20
 * @FilePath: \SNActivity\src\components\personalCenter\DateTimePacker.vue
-->
<template>
  <div class="date-time-picker">
    <van-popup v-model="dataShow" position="bottom" :close-on-click-overlay="false" @click-overlay='closePopup'>
      <van-datetime-picker v-model="currentDate" type="year-month" :min-date="minDate" :max-date="maxDate" :formatter="formatter" @confirm="confirm()" @cancel="closePopup" />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    defaultDate: {
      default: () => ({}),
    },
  },
  data () {
    return {
      dataShow: false, // 是否展示日期选择弹窗
      minDate: new Date(2000, 0, 1), // 最小时间
      maxDate: new Date(2030, 11, 1), // 最大时间
      currentDate: new Date(), // 当前时间
    };
  },
  methods: {
    // 选择年月的格式
    formatter (type, val) {
      if (type === 'year') {
        return `${val}年`;
      } else if (type === 'month') {
        return `${val}月`;
      }
      return val;
    },
    // 确认选择的年月
    confirm () {
      this.dataShow = false;
      this.$emit('changeDate', this.currentDate);
    },
    // 关闭弹出窗口
    closePopup () {
      this.dataShow = false;
    },
  }
};
</script>

<style lang="scss">
.date-time-picker {
}
</style>