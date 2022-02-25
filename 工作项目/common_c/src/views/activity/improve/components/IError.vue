<!--
 * @Author: 一尾流莺
 * @Description:活动未开始弹窗
 * @Date: 2022-01-10 13:59:58
 * @LastEditTime: 2022-01-24 15:25:46
 * @FilePath: \common_c\src\views\activity\improve\components\IError.vue
-->
<template>
  <div class="improve-not-start"
       :style="options.style">
    <van-popup v-model="show"
               :close-on-click-overlay="false"
               class="transparent-h">
      <div class="i-not-start">
        <div class="text">{{error}}</div>
        <div class="btn"
             v-if="showBtn"
             @click="handleClick"
             :style="`backgroundColor:${defaultOption.buttonBackgroundColor};color:${defaultOption.buttonFrontColor}`">返回</div>
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
    showBtn: {
      default: () => (true),
    },
  },
  data() {
    return {
      show: false,
      error: '活动太火爆了,请稍候再试~',
    };
  },

  methods: {
    handleClick() {
      this.show = false;
    },
    showError() {
      this.show = true;
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
    height: 3.84rem;
    width: 6.22rem;
    border-radius: 0.32rem;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
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
