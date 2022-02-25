<template>
  <div class="page-consumer-insight">
    <div class="banner-wrapper">
      <div class="container">
        <div class="banner-box">
          <div class="left">
            <h1>全链路消费者洞察</h1>
            <p>全链路消费者洞察与数据分析，打造</p>
            <p>全新智能化数据服务，解决品牌数据</p>
            <p>营销痛点</p>
            <button class="button button-reverse hide">免费咨询</button>
          </div>
          <div class="right">
            <img src="/images/banner/banner5.png"
                 alt="全链路消费者洞察">
          </div>
        </div>
      </div>
    </div>
    <div class="block-wrapper">
      <div class="container">
        <card class="card-1">
          <h1>基于PaaS+SaaS+大数据</h1>
          <p>打造全新电商数据服务，解决品牌数据营销痛点</p>
          <div class="ci-list">
            <div class="ci-item ci-1">
              <div class="media-body">
                <p>安全可靠、满足品牌高度个性化</p>
                <p>的数据业务需求</p>
              </div>
              <img src="/images/ci-1.png"
                   class="media-image"
                   alt="基于PaaS+SaaS+大数据">
            </div>
            <div class="ci-item ci-2">
              <div class="media-body">
                <p>以数据作为支持，让数据</p>
                <p>创造价值</p>
              </div>
              <img src="/images/ci-2.png"
                   class="media-image"
                   alt="基于PaaS+SaaS+大数据">
            </div>
          </div>
        </card>
        <card class="card-2">
          <div class="media-body">
            <h2>日常数据洞察报告服务</h2>
            <p>打通线上线下用户数据，扩大私域用户池。打造全生命周期会员运营<br>管理中台，赋能品牌数字化变革</p>
          </div>
          <img src="/images/ci-3.png"
               class="media-image"
               alt="日常数据洞察报告服务">
        </card>
        <card class="card-3">
          <img src="/images/ci-4.png"
               class="media-image"
               alt="专享BI数据报告服务">
          <div class="media-body">
            <h2>专享BI数据报告服务</h2>
            <p>量身定制分析框架和数据佐证，完美结合平台商业模型和人货场，<br>形成完整故事闭环，提供后续运营策略</p>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SolutionInsight',
  head () {
    return {
      // title: '全链路消费者洞察'
    }
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

      .right img {
        width: 9.38rem;
        height: 7.24rem;
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
            margin-left: 0.97rem;
            margin-top: 0.95rem;
            text-align: left;

            p {
              color: $--color-white;
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
            top: -0.21rem;
            right: 0.32rem;
            width: 2.29rem;
            height: 2.42rem;
          }
        }

        .ci-2 {
          background-position: 1.35rem 1.25rem, 0 0;

          .media-image {
            width: 1.96rem;
            height: 2.67rem;
          }
        }
      }
    }

    .card-2, .card-3 {
      position: relative;

      .media-image {
        position: absolute;
        bottom: 0;
      }

      .media-body {
        h2 {
          position: relative;
          margin-bottom: 0.74rem;

          &:before, &:after {
            content: '';
            background-color: $--color-primary;
            border-radius: 0.03rem;
            position: absolute;
            bottom: -0.22rem;
          }

          &:before {
            left: 0;
            width: 0.5rem;
            height: 0.05rem;
          }

          &:after {
            left: .53rem;
            width: 0.05rem;
            height: 0.05rem;
          }
        }
      }
    }

    .card-2 {
      .media-body {
        padding-top: 2.35rem;
        padding-left: 1.68rem;
      }

      .media-image {
        right: 0;
        width: 9.61rem;
        height: 6.43rem;
      }
    }

    .card-3 {
      .media-body {
        padding-top: 2.35rem;
        padding-left: 10.03rem;
      }

      .media-image {
        left: 0;
        width: 8.93rem;
        height: 6.22rem;
      }
    }
  }
}
</style>
