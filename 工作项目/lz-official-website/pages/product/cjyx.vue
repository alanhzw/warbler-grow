<template>
  <div class="page-consumer-insight">
    <div class="banner-wrapper">
      <div class="container">
        <div class="banner-box">
          <div class="left">
            <h1>超级营销</h1>
            <p>为品牌搭建个性化的全场景全链路营销平台，帮助品牌实现智能化自动化营销。</p>
            <p>提供消费者数据运营策略服务，对品牌历史数据进行诊断，辅助大数据洞察，</p>
            <p>帮助品牌建立多维度衡量体系及评估体系，进行可视化数据展现，</p>
            <p>提供数据运营策略指导。</p>
            <button class="button button-reverse hide">免费咨询</button>
          </div>
          <div class="right">
            <img src="/images/banner/banner6.png">
          </div>
        </div>
      </div>
    </div>
    <div class="block-wrapper">
      <div class="container">
        <card class="card-1">
          <h1>超级营销功能介绍</h1>
          <!--          <p>全链路人群触达，150+人群标签、店铺个性化推荐/消息盒子/短信精准营销、会员营销、流量精准转化营销、精准营销短信、短信群发、<br>-->
          <!--            官方通道、订单催付、互动活动人群触达、预售尾款催付、订单关怀、群聊、支持自营。-->
          <!--          </p>-->
          <div class="ci-list">
            <div class="ci-item ci-1">
              <div class="media-body">
                <ul class="circle-marker-list">
                  <li>人群标签</li>
                  <li>订单关怀</li>
                  <li>多渠道精准触达</li>
                </ul>
              </div>
              <img src="/images/pb1.png"
                   class="media-image"
                   alt="超级营销功能介绍">
            </div>
            <div class="ci-item ci-2">
              <div class="media-body">
                <ul class="circle-marker-list">
                  <li>营销画布</li>
                  <li>智能监控助手</li>
                  <li>智能数据分析</li>
                </ul>
              </div>
              <img src="/images/pb2.png"
                   class="media-image"
                   alt="超级营销功能介绍">
            </div>
          </div>
        </card>
        <card class="box">
          <div class="media-body">
            <h2 class="title-3 under-line">人群标签</h2>
            <p>支持150+基础标签自由搭配筛选，基于大数据分析，<br>生成重点人群，实现一键营销</p>
          </div>
          <div class="media-image">
            <img src="/images/pb10.png"
                 alt="人群标签">
          </div>
        </card>
        <card class="box">
          <div class="media-body">
            <h2 class="title-3 under-line">订单关怀</h2>
            <p>全链路订单关怀，全流程提升消费者购物体验</p>
          </div>
          <div class="media-image">
            <img src="/images/pb7.png"
                 alt="订单关怀">
          </div>
        </card>
        <card class="box">
          <div class="media-body">
            <h2 class="title-3 under-line">多渠道精准触达</h2>
            <p>站内站外多渠道直推，拉新-转化-首购-复购全链路覆盖；<br>消费者精准触达，智能定向投放，助力精细化运营，实现降本增效。</p>
          </div>
          <div class="media-image">
            <img src="/images/pb9.png"
                 alt="多渠道精准触达">
          </div>
        </card>
        <card class="box">
          <div class="media-body">
            <h2 class="title-3 under-line">营销画布</h2>
            <p>针对单个或多个人群策略进行画布营销复合运算，轻松<br>
              完成人群策略运算。</p>
          </div>
          <div class="media-image">
            <img src="/images/pb6.png"
                 alt="营销画布">
          </div>
        </card>
        <card class="box">
          <div class="media-body">
            <h2 class="title-3 under-line">智能监控助手</h2>
            <p>智能监控助手，及时发送提醒。助力实时督战，重要<br>
              信息不遗漏<br>
            </p>
          </div>
          <div class="media-image">
            <img src="/images/pb5.png"
                 alt="智能监控助手">
          </div>
        </card>
        <card class="box">
          <div class="media-body">
            <h2 class="title-3 under-line">智能数据分析</h2>
            <p>RFM人群分析：基于RFM模型，挖掘客户价值和复购时间分布规律，<br>
              合理优化营销人群，分析人群结果一键触达；</p>
            <p>店铺诊断：漏斗分析、店铺分析、会员画像。轻松掌握店铺运营状况；</p>
            <p>智能四象限分析：对比多任务执行效果；</p>
            <p>活动汇总分析：多维度投放效果复盘更直观。</p>
          </div>
          <div class="media-image">
            <img src="/images/pb4.png"
                 alt="智能数据分析">
          </div>
        </card>
      </div>
    </div>
    <!--合作伙伴-->
    <div class="partner-wrapper">
      <div class="partner-title">
        这些品牌都在用
      </div>
      <partner-section title="这些品牌都在用"
                       class="product-b-partner" />
    </div>
  </div>
</template>

<script>
import PartnerSection from '@/components/PartnerSection'

export default {
  name: 'ProductCjyx',
  components: { PartnerSection },
  data () {
    return {}
  },
  head () {
    return {
      // title: '超级营销'
    }
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
.page-consumer-insight {
  .banner-wrapper {
    height: 10.10rem;
    display: flow-root;

    .banner-box {
      margin: 1.65rem 1rem 0 1rem;
      color: $--color-white;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;

      .left {
        h1 {
          padding-top: 1.43rem;
          height: .57rem;
          font-size: .60rem;
          padding-bottom: .40rem;

        }

        p {
          font-size: .24rem;
          white-space: nowrap;
          padding-top: 0.25rem;
        }

        button {
          width: 1.70rem;
          height: .50rem;
        }
      }

      .right {
        align-self: flex-end;

        img {
          width: 7.08rem;
          height: 6.12rem;
        }
      }
    }
  }

  .block-wrapper {
    position: relative;
    margin-top: -1.83rem;

    h1 {
      font-size: 0.6rem;
      color: $--color-primary;
      padding-top: 1.2rem;
      padding-bottom: 0.38rem;
    }

    h2 {
      font-size: 0.48rem;
      color: $--color-title
    }

    p {
      font-size: 0.18rem;
      color: $--color-text;
      line-height: 1.5;
    }

    .card {
      margin-bottom: .7rem;
      position: relative;
    }

    .card-1 {
      text-align: center;

      .ci-list {
        font-size: 0.24rem;
        line-height: 1.5;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        margin-top: 1.12rem;

        .ci-item {
          background-repeat: no-repeat;
          width: 7.2rem;
          height: 2.5rem;
          background-image: url("/images/ci-hexagon.png"), linear-gradient(0deg, #2c73de 0%, #3d98f4 100%);
          background-size: 1.56rem 1.82rem, 100% 100%;
          border-radius: 0.1rem;
          margin: 0.3rem;
          position: relative;

          .media-body {
            margin-left: 0.65rem;
            height: 100%;
            display: flex;
            align-items: center;
            text-align: left;

            ul {
              color: $--color-white;

              li {
                line-height: 0.48rem;
              }
            }
          }

          .media-image {
            position: absolute;
            top: -0.46rem;
            right: 0.73rem;
          }
        }

        .ci-1 {
          background-position: 0.56rem -0.57rem, 0 0;

          .media-image {
            top: 0.19rem;
            right: 0.75rem;
            width: 2.7rem;
          }
        }

        .ci-2 {
          background-position: 1.35rem 1.25rem, 0 0;

          .media-image {
            top: -0.23rem;
            right: 0.71rem;
            width: 2.08rem;
          }
        }
      }
    }

    .box {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      box-sizing: border-box;

      .media-body {
        flex: 1;
        padding-left: 1.78rem;

        h2 {
          margin-top: 1.59rem;
          margin-bottom: 0.74rem;
        }

        p {
          color: $--color-text;
          font-size: 0.18rem;
          margin-bottom: 0.2rem;
        }
      }

      .media-image {
        align-self: center;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        padding: 0.2rem 1.05rem;

        img {
          max-width: 100%;
          max-height: 100%;
        }
      }

      &:nth-child(odd) {
        flex-direction: row-reverse;
      }

      &:nth-child(even) {
      }
    }
  }

  .partner-wrapper {
    margin-bottom: 1.2rem;

    .partner-title {
      color: $--color-title;
      font-size: 0.6rem;
      text-align: center;
      height: 1.5rem;

    }

    .partner-section {
      box-shadow: 0rem 0.01rem 1.33rem 0rem rgba(38, 71, 200, 0.15);
      background-color: #f0f2fb;
    }
  }
}
</style>
