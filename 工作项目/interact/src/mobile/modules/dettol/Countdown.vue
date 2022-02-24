<!--
 * @Description:
 * @Date: 2021-03-29 16:31:33
 * @LastEditTime: 2021-09-22 15:12:58
 * @FilePath: \interact\src\mobile\modules\dettol\Countdown.vue
-->
<template>
  <div>
    <div v-if="time > 0"
         class="count-down-dettol"
         :style="options.style">
      <span>{{ options.label }}</span>
      <span>:</span>
      <van-count-down :time="time"
                      :format="options.format"
                      @finish="$emit('update')" />
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
.count-down-dettol {
  position: absolute;
  transform: translate(-50%, -50%);
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  line-height: 0.6rem;
  font-size: 0.5rem;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  .van-count-down {
    font-size: 0.5rem;
    // line-height: 0.23rem;
    line-height: 0.6rem;
    color: #f7e298;
  }
}
</style>
