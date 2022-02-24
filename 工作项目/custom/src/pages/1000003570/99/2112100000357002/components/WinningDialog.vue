<template>
  <!-- 中奖弹窗 -->
  <div class="box">
    <img src="../assets/dialog/dialog-winning.png" style="width: 7.05rem"/>

    <div class="info">
      <div v-for="(item,index) in drawPrizes" :key="index" class="bg">
        <img src="../assets/dialog/icon-prize.png" class="icon"/>
        <img class="prize-img" :src="item.showImage" style="width: 1.5rem"/>
        <div class="word">
          <div class="name">奖品：{{ item.name }}</div>
          <div class="tip">开福袋奖品</div>
        </div>
      </div>
    </div>
    <div class="close-btn" @click="closeDialog"></div>
    <div class="sure-btn" @click="openDialog"></div>
  </div>
</template>

<script lang='ts' setup>
import { defineEmits, defineProps } from 'vue';

const props = defineProps({ drawPrizes: Array });
const emit = defineEmits(['closeDialog', 'openBottomDialog']);

const closeDialog = () => {
  emit('closeDialog');
};

// 打开填写地址弹窗
const openDialog = () => {
  emit('closeDialog');
  setTimeout(() => {
    emit('openBottomDialog', 'address');
  }, 300);
};

</script>

<style lang='scss' scoped>
.box {
  width: 7.5rem;
  text-align: center;
  margin: 0 auto;
  box-sizing: border-box;
  position: relative;

  .info {
    width: 100%;
    position: absolute;
    padding: 0 .75rem 0 1.33rem;
    box-sizing: border-box;
    top: 2.3rem;

    .bg {
      width: 5.3rem;
      height: 1.9rem;
      position: relative;
      background-color: #ffffff;
      border-radius: 0.2rem;
      padding: .15rem;
      box-sizing: border-box;
      margin: .05rem 0;
      display: flex;
      align-items: center;

      .icon {
        position: absolute;
        left: 0;
        top: 0;
        width: .73rem;
      }

      .prize-img {
        max-width: 1.5rem;
        max-height: 1.5rem;
      }

      .word {
        margin-left: .3rem;

        .name {
          width: 2.8rem;
          font-family: PingFang-SC-Bold;
          font-size: 0.27rem;
          color: #f2270c;
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .tip {
          width: 1.14rem;
          height: 0.34rem;
          margin-top: .2rem;
          line-height: .34rem;
          color: #ff9900;
          font-size: 0.2rem;
          background-color: #fff1db;
          border-radius: 0.05rem;
          border: solid 0.01rem #ff9900;
        }
      }
    }
  }

  .sure-btn {
    width: 5.71rem;
    height: .94rem;
    overflow: auto;
    margin-left: 1.1rem;
    background: {
      image: url("../assets/dialog/btn-save-address.png");
      repeat: no-repeat;
      size: contain;
    };
  }

  .close-btn {
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 1.2rem;
    right: 0;
  }
}
</style>
