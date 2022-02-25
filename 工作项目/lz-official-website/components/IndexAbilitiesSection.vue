<template>
  <section class="abilities-list">
    <div class="abilities-item abilities-item-1">
      <!--      <h2 class="abilities-title">-->
      <!--        为品牌赋能-->
      <!--      </h2>-->
      <h2>我们的能力</h2>
      <h3>一、消费者增长运营</h3>
      <p>全域一站式数智化增长营销方案，<br>帮助品牌高效实践会员增长</p>
      <a href="/solution/operate" class="button">
        了解详情
        <icon-arrow direction="right" :reverse="true" />
      </a>
    </div>
    <div class="abilities-item abilities-item-2">
      <h3>二、全场景互动营销</h3>
      <p>全场景消费者互动营销解决方案，满足<br>品牌方个性化、定制化、多样化的<br>营销方案</p>
      <a href="/solution/marketing" class="button">
        <icon-arrow direction="left" :reverse="true" />
        了解详情
      </a>
    </div>
    <div class="abilities-item abilities-item-3">
      <h3>三、全链路消费者洞察</h3>
      <p>全链路消费者洞察与数据分析，打造<br>全新智能化数据服务，解决品牌数据<br>营销痛点</p>
      <a href="/solution/insight" class="button">
        了解详情
        <icon-arrow direction="right" :reverse="true" />
      </a>
    </div>
  </section>
</template>

<script>
import IconArrow from '@/components/IconArrow'

export default {
  name: 'IndexAbilitiesSection',
  components: {
    IconArrow
  }
}
</script>

<style lang="scss" scoped>
.abilities-list {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 31.79rem;
  left: 2.42rem;
  right: 2.36rem;
  top: 0;

  .abilities-item {
    flex: 1;
    padding-top: 3.21rem;
    background-repeat: no-repeat;

    h2 {
      font-size: .6rem;
      color: $--color-firstTitle;
      margin-bottom:.66rem;
    }
    h3 {
      font-size: .36rem;
      color: $--color-title;

    }
    p {
      font-size: .24rem;
      color: $--color-text;
      margin-top: .23rem;
      line-height: .42rem;
    }

    .button {
      margin: 0;
      width: 2rem;
      height: .60rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background-color: $--color-primary;
      border-radius: .3rem;
      font-size: .18rem;
      color: $--color-white;
      position: relative;
      cursor: pointer;
      transition: background-color 200ms linear;

      &:hover {
        background-color: $--color-primary-light-1;
      }

      .icon-arrow-right {
        position: absolute;
        right: .31rem;
        top: 50%;
        transform: translateY(-50%);
      }

      .icon-arrow-left {
        position: absolute;
        left: .31rem;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }

  .abilities-item-1 {

    .abilities-title {
      font-size: .60rem;
      color: $--color-primary;
      margin-bottom: .66rem;

    }
  }

  .abilities-item-2 {
    align-self: flex-end;
  }

  .abilities-item-3 {
  }
}
</style>
