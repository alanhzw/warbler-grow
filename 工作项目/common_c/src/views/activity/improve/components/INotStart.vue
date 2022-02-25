<!--
 * @Author: 一尾流莺
 * @Description:活动未开始弹窗
 * @Date: 2022-01-10 13:59:58
 * @LastEditTime: 2022-01-18 14:55:18
 * @FilePath: \common_c\src\views\activity\improve\components\INotStart.vue
-->
<template>
  <!-- :close-on-click-overlay="false" -->
  <div class="improve-not-start"
       :style="options.style">
    <van-popup v-model="show"
               :close-on-click-overlay="false"
               class="transparent-h">
      <div class="i-not-start">
        <div class="text">距活动开始还有</div>
        <van-count-down :time="time">
          <template #default="timeData">
            <span style="color:#000;background-color:#fff;font-size:0.24rem">{{ timeData.days }}天 </span>
            <span class="block"
                  :style="`backgroundColor:${defaultOption.buttonBackgroundColor}`">{{ timeData.hours }}</span>
            <span class="colon"
                  :style="`color:${defaultOption.buttonBackgroundColor}`">:</span>
            <span class="block"
                  :style="`backgroundColor:${defaultOption.buttonBackgroundColor}`">{{ timeData.minutes }}</span>
            <span class="colon"
                  :style="`color:${defaultOption.buttonBackgroundColor}`">:</span>
            <span class="block"
                  :style="`backgroundColor:${defaultOption.buttonBackgroundColor}`">{{ timeData.seconds }}</span>
          </template>
        </van-count-down>
        <!-- <div class="btn"
             @click="handleClick"
             :style="`backgroundColor:${defaultOption.buttonBackgroundColor};color:${defaultOption.buttonFrontColor}`">返回</div> -->
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'INotStart',
  props: {
    options: {
      default: () => ({}),
    },
    defaultOption: {
      default: () => ({}),
    },
    activityInfo: {
      default: () => ({}),
    },
  },
  data() {
    return {
      show: false,
      time: 0,
    };
  },
  methods: {
    handleClick() {
      window.history.back(-1);
      this.show = false;
    },
  },
  mounted() {

  },
  watch: {
    activityInfo(newValue, oldValue) {
      if (this.$moment(newValue.startTime) > this.$moment(Date.now())) {
        this.time = this.$moment(newValue.startTime) - this.$moment(Date.now());
        this.show = true;
      }
    },
  },
};
</script>

<style lang="scss">
.improve-not-start {
}
.transparent-h {
  background: transparent;
  .i-not-start {
    background-color: #ffffff;
    height: 3rem;
    width: 6.22rem;
    border-radius: 0.32rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .btn {
      width: 5.26rem;
      height: 0.72rem;
      line-height: 0.72rem;
      border-radius: 0.36rem;
    }
    img{
      width: 1.28rem;
      height: 1.28rem;
    }
    .text{
      font-size: 0.32rem;
      font-weight: 700;
      color: #000;
    }
  }
   .colon {
    display: inline-block;
    margin: 0 4px;
  }
  .block {
    display: inline-block;
    width: 22px;
    color: #fff;
    font-size: 12px;
    text-align: center;
  }
}
</style>
