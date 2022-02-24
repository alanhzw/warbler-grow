<template>
  <div class="join-now bg-skii-red">
    <div>
      <p class="title">加入SK-II NOW社区</p>
      <p class="slogan">不仅仅有<br/>积分和奖励</p>
      <div class="avatar">
        <div class="bg" v-scrollIn="'full'"></div>
      </div>
      <!-- <img class="avatar" src="../assets/tangwei.png"> -->
      <p class="desc">一个了解您肌肤的社区，<br/>全天侯获取护肤知识。</p>
      <p class="footer">
        *神仙水,洁面,清莹露,大红瓶,小灯泡,前男友面膜,为消费者对SK-II护肤精华露,SK-II护肤洁面霜,SK-II嫩肤清莹露,SK-II赋能焕采精华霜,SK-II光蕴环采钻白精华露,SK-II护肤面膜的昵称,
        非产品注册/备案名称,不代表产品功效,实际效果因人而异。
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup>
</script>
<style lang="scss" scoped>
$SKII_RED: #EA0429;
$WHITE: #FFFFFF;

@keyframes join-now-frame {
  from {
    width: 0;
    height: 0;
    border-width: 1.41rem;
  }
  to {
    border-width: 0;
    width: 2.6rem;
    height: 2.6rem;
  }
}

.join-now {
  height: 100vh;
  display: flex;
  justify-content: center;
  color: $WHITE;
  flex-direction: column;
  background-color: $SKII_RED;

  p {
    margin-top: 0;
    margin-bottom: 0;
  }

  .title {
    font-size: 0.14rem;
    line-height: 0.18rem;
    margin-bottom: 0.15rem;
  }

  .avatar {
    position: relative;
    width: 2.52rem;
    height: 2.52rem;
    margin: 0.4rem auto 0.24rem;
    background-image: url(../assets/tangwei.png);
    background-size: 2.52rem 2.52rem;
    background-position: center;
    background-repeat: no-repeat;

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
      border: solid 1.41rem $SKII_RED;

      &.full {
        animation-name: join-now-frame;
        animation-duration: 1s;
        animation-fill-mode: both;
      }
    }
  }

  .slogan {
    font-size: 0.32rem;
    line-height: 0.4rem;
  }

  .desc {
    font-size: 0.2rem;
    line-height: 0.24rem;
  }

  .footer {
    margin-top: .5rem;
    font-size: 0.06rem;
    text-align: left;
    padding: 0 0.2rem;
    font-weight: 100;
  }
}
</style>
