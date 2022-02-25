<template>
  <!-- 选择年月弹出层 -->
  <div class="IDataTimePicker">
    <van-popup v-model="dataShow" :close-on-click-overlay="false" position="bottom" @click-overlay='closePopup'>
      <van-datetime-picker
        v-model="currentDate"
        :formatter="formatter"
        :max-date="maxDate"
        :min-date="minDate"
        type="year-month"
        @cancel="closePopup"
        @confirm="submitDate"
      />
    </van-popup>
  </div>
</template>
<script>
export default {
  name: 'IDataTimePicker',
  props: ['dataShow', 'defaultDate'],
  data() {
    return {
      minDate: new Date(2000, 0, 1),
      maxDate: new Date(2030, 11, 1),
      currentDate: new Date(),
    };
  },
  mounted() {
    this.currentDate = this.defaultDate;
  },
  methods: {
    submitDate() {
      this.$emit('timeChange', this.currentDate);
    },
    closePopup() {
      this.$emit('closePop');
    },
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`;
      }
      if (type === 'month') {
        return `${val}月`;
      }
      return val;
    },
  },

};
</script>

<style scoped>

</style>
