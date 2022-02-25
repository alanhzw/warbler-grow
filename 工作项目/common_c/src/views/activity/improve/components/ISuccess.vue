<!--
 * @Author: 一尾流莺
 * @Description:提交成功弹窗
 * @Date: 2022-01-10 13:59:58
 * @LastEditTime: 2022-01-18 15:54:48
 * @FilePath: \common_c\src\views\activity\improve\components\ISuccess.vue
-->
<template>
  <div class="improve-success"
       :style="options.style">
    <van-popup v-model="show"
               :close-on-click-overlay="false"
               class="transparent-h">
      <div class="success">
        <div style="height:20px"></div>
        <img src="../assets/success.png" />
        <div class="text">提交成功</div>
        <div class="prize"
             v-if="points != 0">获得 <span class="points">{{ points }}</span> 积分</div>
        <div class="btn"
             @click="handleClick"
             :style="`backgroundColor:${defaultOption.buttonBackgroundColor};color:${defaultOption.buttonFrontColor}`">返回</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'ISuccess',
  props: {
    options: {
      default: () => ({}),
    },
    defaultOption: {
      default: () => ({}),
    },
  },
  data() {
    return {
      show: false,
      points: 0,
    };
  },
  methods: {
    handleClick() {
      this.show = false;
      this.$emit('get-activity-info');
    },
  },
};
</script>

<style lang="scss">
.improve-success {
}
.transparent-h {
  background: transparent;
  .success {
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
      width: 1.28rem;
      height: 1.28rem;
    }
    .text{
      font-size: 0.32rem;
      font-weight: 700;
      color: #000;
    }
    .prize{
      font-size: 0.28rem;
      color: #646566;
    }
    .points{
      font-size: 0.28rem;
      color: #000000;
    }
  }
}
</style>
