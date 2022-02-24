<template>
  <div class="do-good">
    <div>
      <div class="window">
        <div class="bg" v-scrollIn="'full'"></div>
        <p class="title" v-scrollIn="'full'"></p>
      </div>
      <p class="action">将“晶透水滴”捐赠给公益项目，共同改写地球命运。</p>
      <p class="desc">
      SK-II与SEE基金会携手合作，致力于达到零废弃目标
      </p>
      <a class="link" @click="detailShow = true">了解更多信息</a>
    </div>
    <van-popup
      closeable
      v-model:show="detailShow"
    >
      <div class="content">
        <img class="main-pic" src="../assets/bg1-do-good.png" />
        <header>SK-II携手SEE基金会<br>共同推广零废弃社区行动</header>
        <p class="text">
         SEE基金会与SK-II携手，支持致力于推动零废弃社区的女性领导组织。

         为了建立零废弃的未来共同目标，SK-I携手SEE基金会，赋能这些女性，发起改写地球命运的环保行动。加入我们的环保公益之旅。
        </p>
        <a :href="openCardLink" class="link" v-if="!isOpenCarded"
        >注册支持该公益事业</a
        >
      </div>
    </van-popup>
<!--    <div class="popup animate__animated animate__fadeIn" v-show="detailShow">-->
<!--    </div>-->
  </div>
</template>
<script lang="ts" setup>
import { Popup as VanPopup } from 'vant';

import { ref, inject } from 'vue';

const openCardLink = `https://shopmember.m.jd.com/shopcard?venderId=1000009821&shopId=1000009821&venderType=1&channel=7002&returnUrl=${window.location.href}`;

// 是否开卡表示是否注册
const isOpenCarded = inject('isOpenCard');

const detailShow = ref(false);
</script>

<style lang="scss" scoped>
$SKII_RED: #ea0429;
$WHITE: #ffffff;

@keyframes do-good-frame {
  from {
    width: 0;
    height: 0;
    border-width: 1.41rem;
  }
  to {
    border-width: 0;
    width: 3rem;
    height: 3rem;
  }
}

.do-good {
  background-color: #faf5f0;
  display: flex;
  justify-content: center;
  align-items: center;
  .window {
    width: 2.8rem;
    height: 2.8rem;
    position: relative;
    background-image: url(../assets/bg-do-good.png);
    background-size: 2.8rem 2.8rem;
    background-position: center;
    background-repeat: no-repeat;
    margin: 0 auto;

    .bg {
      position: absolute;
      left: 50%;
      top: 50%;
      -webkit-backface-visibility: hidden;
      -moz-backface-visibility: hidden;
      -ms-backface-visibility: hidden;
      backface-visibility: hidden;
      -webkit-perspective: 1000;
      -moz-perspective: 1000;
      -ms-perspective: 1000;
      perspective: 1000;
      -webkit-transform: translate3d(0, 0, 0);
      -moz-transform: translate3d(0, 0, 0);
      -ms-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      transform: translate(-50%, -50%);
      width: 0;
      height: 0;
      border-radius: 50%;
      border: solid 1.41rem #faf5f1;
      z-index: 10;

      &.full {
        animation-name: do-good-frame;
        animation-duration: 1s;
        animation-fill-mode: both;
      }
    }
    .title {
      position: absolute;
      left: 50%;
      top: 50%;
      -webkit-backface-visibility: hidden;
      -moz-backface-visibility: hidden;
      -ms-backface-visibility: hidden;
      backface-visibility: hidden;
      -webkit-perspective: 1000;
      -moz-perspective: 1000;
      -ms-perspective: 1000;
      perspective: 1000;
      -webkit-transform: translate3d(0, 0, 0);
      -moz-transform: translate3d(0, 0, 0);
      -ms-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      transform: translate(-50%, -50%);
      color: #ffffff;
      font-size: 0rem;
      margin: 0;
      transition: font-size 0.55s linear;
      z-index: 10;

      &.full {
        font-size: 0.32rem;
      }
    }
  }
  .action {
    font-size: 0.28rem;
    line-height: 0.32rem;
    color: $SKII_RED;
    margin-top: 0.48rem;
  }
  .desc {
    font-size: 0.14rem;
    line-height: 0.18rem;
    margin-top: 0.12rem;
    margin-bottom: 0.4rem;
  }
  .link {
    font-size: 0.12rem;
    line-height: 0.16rem;
    padding-bottom: 0.04rem;
    color: $SKII_RED;
    border-bottom: 0.01rem solid $SKII_RED;
  }
  //.popup {
  //  position: fixed;
  //  top: 0;
  //  left: 0;
  //  width: 100vw;
  //  height: 100vh;
  //  display: flex;
  //  justify-content: center;
  //  align-items: center;
  //  background-color: rgba(32, 32, 32, 0.6);
  //  z-index: 10;
  //  pointer-events: none;
  //}

  .content {
    position: relative;
    width: 3.47rem;
    height: 6.39rem;
    background: #ffffff;
    box-sizing: border-box;
    padding: 0.37rem 0.3rem;

    .close {
      position: absolute;
      width: 0.22rem;
      height: 0.22rem;
      right: 0.22rem;
      top: 0.18rem;
    }

    .main-pic {
      width: 2.53rem;
      height: 2.53rem;
      border-radius: 50%;
    }
    header {
      font-size: 0.26rem;
      line-height: 0.32rem;
      margin: 0.3rem auto 0.2rem;
    }
    .text {
      font-size: 0.14rem;
      color: #404040;
      text-align: left;
      margin-bottom: 0.4rem;
    }
  }
}
</style>
