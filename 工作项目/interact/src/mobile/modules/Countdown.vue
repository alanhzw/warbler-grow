<!--
 * @Description:
 * @Date: 2021-03-29 16:31:33
 * @LastEditTime: 2021-03-29 17:40:36
 * @FilePath: \yunluhuodong\src\mobile\modules\Countdown.vue
-->
<template>
  <div v-if="$route.params.type != 501 || (activityInfo.signUp == 1 && options.timeKey == 'awardStartTime') ||  (activityInfo.signUp == 2 && options.timeKey == 'enrollEndTime')">
    <div v-if="time > 0" class="count-down" :style="options.style">
      <span>{{ options.label }}</span>
      &nbsp;&nbsp;
      <van-count-down :time="time" :format="options.format" @finish="$emit('update')" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Countdown',
  props: {
    options: {
      default: () => ({}),
    },
    activityInfo: {
      default: () => ({}),
    },
  },
  computed: {
    time() {
      return this.activityInfo[this.options.timeKey] ? new Date(this.activityInfo[this.options.timeKey]).getTime() - Date.now() : 0;
    },
  },
};
</script>
<style lang="scss">
.count-down {
  position: absolute;
  transform: translate(-50%, -50%);
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  line-height: 0.6rem;
  font-size: 0.24rem;
  color: #e2231a;
  display: flex;
  align-items: center;
  justify-content: center;
  .van-count-down {
    font-size: 0.24rem;
    // line-height: 0.23rem;
    line-height: 0.6rem;
    color: #e2231a;
  }
}
</style>
