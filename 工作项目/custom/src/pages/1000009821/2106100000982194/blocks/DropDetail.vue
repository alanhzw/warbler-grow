<template>
    <section class="drop">
      <p class="title">入会成功后,您每次购买<br>我们的产品,即有可能获取<br>“晶透水滴”</p>
      <div class="count-wrapper">
        <div class="count-value"><scroll-number :value="dropCount"/></div>
        <div class="count-name">“晶透水滴”</div>
      </div>
    </section>
</template>
<script lang="ts" setup>
import {
  computed, inject,
  ref, Ref,
} from 'vue';
import { Toast, Notify } from 'vant';
import { cjwxRequest } from '@/utils/service';
import ScrollNumber from '../components/ScrollNumber.vue';

const dropCount: Ref<number> = ref(0);

const earn = inject('earn');

if (earn) {
  Toast.loading({
    message: '加载中...',
    duration: 0,
    forbidClick: true,
  });
}

cjwxRequest.post('/wx/skii/memship/pointInfo', {}).then((res) => {
  console.log('获得积分：', res);
  // 测试的时候，使用一个默认值
  Toast.clear();
  if (res.result) {
    dropCount.value = res.data.pointAvailable || 0;
  } else if (earn) {
    Notify({ type: 'danger', message: res.errorMessage });
  }
}).catch((e) => {
  Toast.clear();
  if (earn) {
    Notify({ type: 'danger', message: e.message });
  }
});

</script>

<style lang="scss" scoped>
@use "sass:math";

$SKII_RED: #EA0429;

@function px2rem($px) {
  $rem: 100px;
  @return  math.div($px, $rem)+rem;
}
.drop {
    //height: 10.9rem;
    background: transparent url("../assets/bg-drop_02.png") no-repeat center center;
    background-size: auto 100%;
    padding-top: 1.35rem;
    height: 4.99rem;

    .title {
      //padding-top: 3.44rem;
      font-size: 0.28rem;
      line-height: 0.32rem;
      padding: 0 .1rem;
    }
    .count-wrapper {
      position: relative;
      width: 3.24rem;
      height: 3.13rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0.2rem auto;
      background-image: url(../assets/big-drop.png);
      background-position: center;
      background-size: contain;

      .count-name{
        margin-top: 0.01rem;
        font-style: normal;
        font-weight: 300;
        font-size: 14px;
        line-height: 18px;
        text-align: center;
        color: #404040;
        position: absolute;
        top: 2rem;
      }
    }
  }
</style>
