<!--
 * @Author: 一尾流莺
 * @Description:活动已结束弹窗
 * @Date: 2022-01-10 13:59:58
 * @LastEditTime: 2022-01-18 14:55:07
 * @FilePath: \common_c\src\views\activity\improve\components\IEnd.vue
-->
<template>

  <div class="improve-end"
       :style="options.style">
    <van-popup v-model="show"
               :close-on-click-overlay="false"
               class="transparent-h">
      <div class="end">
        <div class="text">活动已结束</div>
        <img src="../assets/end.png" />
        <!-- <div class="btn"
             @click="handleClick"
             :style="`backgroundColor:${defaultOption.buttonBackgroundColor};color:${defaultOption.buttonFrontColor}`">返回</div> -->
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'IEnd',
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
    };
  },
  methods: {
    handleClick() {
      window.history.back(-1);
      this.show = false;
    },
  },
  watch: {
    activityInfo(newValue, oldValue) {
      if (this.$moment(newValue.endTime) < this.$moment(Date.now())) {
        this.show = true;
      }
    },
  },
};
</script>

<style lang="scss">
.improve-end {
}
.transparent-h {
  background: transparent;
  .end {
    background-color: #ffffff;
    height: 6.92rem;
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
      width: 3.2rem;
      height: 3.2rem;
    }
    .text{
      font-size: 0.32rem;
      font-weight: 700;
      color: #000;
    }
  }
}
</style>
