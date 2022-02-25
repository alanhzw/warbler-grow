<template>
  <card>
    <div class="box-caught">
      <h1>电商品牌如何重构增长，破局2021？</h1>
      <p>获客成本攀升、会员增长放缓、营销玩法枯竭、数据资产割裂……</p>
      <div class="content">
        互联网红利消失，电商行业正经历由“粗放式获取流量”到“精细化用户运营”的重构。存量竞争的加剧，<br>
        倒逼品牌加速“数智化”会员体系建设，从“流量思维”逐渐转向“用户思维”……
      </div>
      <button v-scroll-to="'.abilities-wrapper'" class="button button-primary">
        How can we help you ?
      </button>
      <icon-arrow direction="down" :block="true" />
    </div>
  </card>
</template>

<script>
import IconArrow from '@/components/IconArrow'

export default {
  name: 'IndexCaughtSection',
  components: { IconArrow }
}
</script>

<style lang="scss" scoped>

.box-caught {
  text-align: center;
  position: relative;

  h1 {
    font-size: .6rem;
    color: $--color-primary;
    padding-top: 1.2rem;

  }

  p {
    font-size: .36rem;
    margin-top: .48rem;
    color: $--color-title;
  }

  .content {
    margin-top: .47rem;
    font-size: .24rem;
    line-height: .42rem;
    color: $--color-text;
  }

  button {
    margin-top: 1.07rem;
    width: 4.5rem;
    height: .88rem;
    font-size: .24rem;
  }

  .icon-arrow {
    margin-top: .23rem;
  }
}
</style>
