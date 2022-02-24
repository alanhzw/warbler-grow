<template>
  <div class="earn-methods">
    <section class="content">
      <header>您也可以通过以下方式<br/>获取“晶透水滴”</header>
      <div class="animate__animated" v-scrollIn="'animate__fadeIn'">
        <div class="method method1">
          <p class="title">注册</p>
          <p class="subtitle">通过微信、京东或天猫。</p>
          <p class="detail">即可获取100个“晶透水滴”</p>
        </div>
        <!-- <div class="method method2">
          <p class="title">再次购买</p>
          <p class="subtitle">首次购买后90天内。</p>
          <p class="detail">领取专属复购礼</p>
        </div> -->
        <div class="method method3">
          <p class="title">接受肌龄测试</p>
          <p class="subtitle">首次购买后90天内。</p>
          <p class="detail">即可获取75个“晶透水滴”</p>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>

</script>

<style lang="scss" scoped>
$SKII_RED: #EA0429;
$WHITE: #FFFFFF;
.earn-methods {
  display: flex;
  align-items: center;
  justify-content: center;

  header {
    font-size: 0.28rem;
    line-height: 0.32rem;
    margin-bottom: 0.24rem;;
  }
  .content {
    height: 5.56rem;
  }
  .method {
    width: 3.27rem;
    height: 1.4rem;
    border-radius: 0.05rem;
    text-align: left;
    padding: 30px;
    box-sizing: border-box;
    margin: 0.16rem 0;
    display: flex;
    flex-direction: column;
    .title {
      font-size: 0.18rem;
      line-height: 0.24rem;
    }
    .subtitle {
      font-size: 0.12rem;
      line-height: 0.16rem;
      flex: 1
    }
    .detail {
      color: $SKII_RED;
      font-size: 0.1rem;
      margin-top: 0.12rem;
    }
  }
  .method1 {
    background-color: #EEECE7;
    padding-left: 1.36rem;
    background-image: url('../assets/method1.png');
    background-position: top 0.1rem;
    background-repeat: no-repeat;
    background-size: 1.39rem 1.39rem;
  }
  .method2 {
    background-color: #ECE8DF;
    background-image: url('../assets/method2.png');
    background-position: bottom right;
    background-repeat: no-repeat;
    background-size: 1.3rem 1.4rem;

  }
  .method3 {
    background-color: #F3F3F7;
    padding-left: 1.36rem;
    background-image: url('../assets/method3.png');
    background-position: bottom left;
    background-repeat: no-repeat;
    background-size: 1.4rem 1.4rem;
  }
}
</style>
