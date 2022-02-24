<template>
  <section id="skillWorld" class="skill-world">
    <p class="subtitle">前所未有的个人护肤体验</p>
    <p class="title">直接访问SK-II的美肌世界。</p>
    <div class="worlds" v-scrollIn>
      <transition name="custom" leave-active-class="animate__rotateOutUpRight">
        <div class="world world1 animate__animated" v-show="world1Show">
          <div class="close" @click="world1Show=false"></div>
          <div class="subscribe-title">
            店内购买，即可赚取“晶透水滴”*。<br/>
            *指会员积分
          </div>
          <a class="subscribe-button" href="https://shop.m.jd.com/shopv2/mzpage?venderid=1000009821">立即购买</a>
        </div>
      </transition>
      <img class="world world2" src="../assets/world2.png"
           onclick="window.location.href = 'https://item.m.jd.com/product/6088552.html'">
      <img class="world world3" src="../assets/world3.png"
           onclick="window.location.href = 'https://item.m.jd.com/product/100014743626.html'">
    </div>
    <p class="label">护肤心得、小技巧，探索更多</p>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const world1Show = ref(true);

</script>

<style lang="scss" scoped>
@use "sass:math";

$SKII_RED: #EA0429;

@function px2rem($px) {
  $rem: 100px;
  @return  math.div($px, $rem)+rem;
}

.skill-world {
  //margin-bottom: -2.1rem;
  //z-index: 2;
  background: transparent url("../assets/bg-drop_01.png") no-repeat center bottom;
  background-size: 11.5rem auto;
  .subtitle {
    margin-top: 0.64rem;
    font-size: 0.14rem;
    line-height: 0.18rem;
    color: $SKII_RED;
  }

  .title {
    margin-top: 0.16rem;
    font-size: 0.28rem;
    line-height: 0.32rem;
  }

  .worlds {
    position: relative;
    height: 1.8rem;
    margin-top: 0.64rem;
    margin-bottom: 0.7rem;

    .world {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }

    .world1 {
      //width: 1.74rem;
      width: px2rem(174.28px);
      height: px2rem(174.28px);
      z-index: 3;
      background: transparent url("../assets/book-appointment@2x.png") no-repeat center center;
      background-size: 100% 100%;
      font-size: px2rem(17.8744px);
      line-height: px2rem(20px);
      letter-spacing: -0.02em;
      color: #FFFFFF;
      position: relative;
      border-radius: px2rem(2.79288px);
      overflow: hidden;

      .close {
        position: absolute;
        width: px2rem(48px);
        height: px2rem(48px);
        top: 0;
        right: 0;
      }

      .subscribe-title {
        position: absolute;
        width: px2rem(148.87px);
        left: px2rem(13.96px);
        top: px2rem(16.76px);
        font-style: normal;
        font-weight: normal;
        font-size: px2rem(17.8744px);
        line-height: 1.5;
        letter-spacing: -0.02em;
        text-align: left;
        word-break: break-all;
      }

      .subscribe-button {
        color: inherit;
        display: flex;
        align-items: center;;
        justify-content: center;
        position: absolute;
        width: px2rem(121.21px);
        height: px2rem(17.87px);
        left: px2rem(13.69px);
        bottom: px2rem(16.76px);
        font-size: px2rem(6.70291px);
        letter-spacing: 0.1em;
        text-transform: uppercase;
        border: px2rem(0.558576px) solid #FFFFFF;
        box-sizing: border-box;
        border-radius: px2rem(26.8116px);
        text-align: center;

        &:after {
          display: block;
          content: '';
          background-image: url("../assets/arrow-right-white@2x.png");
          background-repeat: no-repeat;
          width: px2rem(7.26px);
          height: px2rem(8.94px);
          background-size: 100% 100%;
          position: absolute;
          top: 50%;
          right: px2rem(10.6px);
          transform: translateY(-50%);
        }
      }
    }

    .world2 {
      width: 1.63rem;
      z-index: 2;
    }

    .world3 {
      width: 1.61rem;
      z-index: 1;
    }

    &.in{
      .world2 {
        animation: world2-frames 1s ease 0.5s 1 normal forwards;
      }
      .world3 {
        animation: world3-frames 1s ease 0.5s 1 normal forwards;
      }
    }

    @keyframes world2-frames {
      to {
        margin-left: -0.65rem;
        transform: translateX(-50%) rotate(-5.32deg);
      }
    }

    @keyframes world3-frames {
      to {
        margin-left: 0.8rem;
        transform: translateX(-50%) rotate(4.48deg);
      }
    }
  }

  .label {
    font-size: 0.2rem;
    line-height: 0.24rem;
    color: $SKII_RED;
  }
}
</style>
