<template>
  <div class="drop-way">
    <section class="exchange">
      <header>如何赚取“晶透水滴”</header>
      <div  class="label">指定渠道购买正装商品</div>
      <div class="formula">
        <div class="item ">
          <div class="cost">¥1</div>
          <p class="label">每消费<br/>1元人民币</p>
        </div>
        <img class="arrow" src="../assets/arrow.png">
        <div class="item">
          <div class="drop">1</div>
          <p class="label">即可赚取<br/>1个“晶透水滴”</p>
        </div>
      </div>
      <div class="des">只有SK-II会员，才有机会享受NOW的积分，
        目前在SK-II线下专柜、天猫及京东官方旗舰店购买正装商品才能享受积分，
        如果您在小程序注册入会，在天猫或京东渠道，需要分别在对应平台额外绑卡入会，
        之后购买正装才有机会积分累积。</div>
    </section>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
$SKII_RED: #EA0429;
.drop-way{
  background: transparent url("../assets/bg-drop_03.png") no-repeat center top;
  background-size: 10rem auto;
}
.exchange {
  position: relative;
  //margin-top: -3rem;
  //z-index: 2;
  margin-left: auto;
  margin-right: auto;
  width: 3.27rem !important;
  height: 4rem;
  border-radius: 0.08rem;
  padding: 0.48rem 0;
  box-sizing: border-box;
  background: #FAFAFA;

  header {
    text-align: center;
    // padding: 0.24rem 0;
    font-size: 0.28rem;
    line-height: 0.32rem;
  }

  .formula {
    display: flex;
    justify-content: center;
    align-items: flex-end;

    .item {
      flex: 1;
      font-size: 0.42rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .cost {
      color: #ffffff;
      background-color: $SKII_RED;
      border-radius: 50%;
      width: 1.05rem;
      height: 1.05rem;
      line-height: 1.05rem;
      margin: 0.15rem 0;
    }

    .drop {
      background-image: url(../assets/bubble.png);
      background-repeat: no-repeat;
      background-position: center;
      background-size: 1.4rem 1.35rem;
      width: 1.4rem;
      height: 1.35rem;
      line-height: 1.4rem;
      color: $SKII_RED;
    }

    .label {
      font-size: 0.14rem;
      line-height: 0.18rem;
    }

    .arrow {
      width: 0.24rem;
      height: 0.24rem;
      margin-bottom: 0.1rem;
    }
  }
  .des{
    color: #999;
    font-size: .12rem;
    margin: .2rem auto;
    padding: 0 .1rem;
    text-align: left;
  }
}
</style>
