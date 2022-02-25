<template>
  <section class="solution-section">
    <h1 class="section-title">
      我们的解决方案
    </h1>
    <div class="solution-list">
      <div
        v-for="(item,index) in list"
        :key="index"
        class="solution-item"
      >
        <div class="cover">
          <img :src="`/images/solution-item-${index+1}.png`">
        </div>
        <h2 class="title-3 under-line center-line">{{ item.title }}</h2>
        <p>{{ item.desc }} </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'IndexSolutionSection',
  data () {
    return {
      list: [
        {
          title: '全场景互动定制',
          desc: '为品牌提供个性化互动定制方案，增强用户粘性，提升营销效果'
        },
        {
          title: '全域人群触达',
          desc: '多维度客户画像分析，精准定位目标人群，实现用户精准触达'
        },
        {
          title: '多维度数据洞察',
          desc: '打破数据孤岛，构建品牌数据资产体系，开启数据驱动营销的增长之路'
        },
        {
          title: '全周期用户运营',
          desc: '专注用户行为分析，洞察用户全生命周期，数据“采集+管理+分析+应用”智能一体化'
        },
        {
          title: '全链路运营策略',
          desc: '深耕电商消费者营销，和众多SKA/KA品牌深度合作，提供行业专属营销策略和全链路运营解决方案'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.solution-section {
  position: relative;
  width: 100%;

  .section-title {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: .6rem;
    color: $--color-white;
    height: 2.53rem;
    margin: auto;

  }

  .solution-list {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .solution-item {
      width: 3.08rem;
      height: 6rem;
      background-color: #ffffff;
      box-shadow: 0rem 0.01rem 1.33rem 0rem rgba(38, 71, 200, 0.15);
      border-radius: 0.2rem;
      text-align: center;
      padding: 0.4rem;
      box-sizing: border-box;

      .cover {
        flex: 1;
        flex-grow: 0;
        flex-shrink: 0;
        height: 2.67rem;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          max-width: 100%;
          max-height: 100%;
        }
      }

      h2 {
        font-size: 0.3rem;
        margin-top: .26rem;
        margin-bottom: .6rem;
        color: $--color-title;
        z-index: 2;
        flex-grow: 0;
        flex-shrink: 0;

      }

      p {
        font-size: 0.2rem;
        color: $--color-text;
        line-height: 0.36rem;
        z-index: 2;
        flex-grow: 1;
        flex-shrink: 1;
      }
    }
  }
}
</style>
