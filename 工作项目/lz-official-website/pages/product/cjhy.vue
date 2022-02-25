<template>
  <div class="page-consumer-insight">
    <div class="banner-wrapper">
      <div class="container">
        <div class="banner-box">
          <div class="left">
            <h1>超级会员</h1>
            <p>会员运营增长业务主要解决品牌会员增长和运营的难题，</p>
            <p>助力会员招募、转化、促活、复购全链路会员运营，</p>
            <p>高效管理会员全生命周期，快速拉升会员营销能力。</p>
            <button class="button button-reverse hide">免费咨询</button>
          </div>
          <div class="right">
            <img src="/images/banner/banner7.png"
                 alt="超级会员">
          </div>
        </div>
      </div>
    </div>
    <div class="block-wrapper">
      <div class="container">
        <card class="card-1">
          <h1>超级会员功能介绍</h1>
          <!--          <p>会员开卡、会员拉新、引导下单、品牌会员招募、微信裂变、用户运营、会员中心装修、积分互动、积分商城、<br>支持自营、签到、积分换购、BI、店铺首页定投、会员营销、精准触达、店铺会员运营、crm会员管理。</p>-->
          <div class="ci-list">
            <div class="ci-item ci-1">
              <div class="media-body">
                <ul class="circle-marker-list">
                  <li>会员中心装修</li>
                  <li>会员权益</li>
                </ul>
              </div>
              <img src="/images/pa5.png"
                   class="media-image"
                   alt="超级会员功能介绍">
            </div>
            <div class="ci-item ci-2">
              <div class="media-body">
                <ul class="circle-marker-list">
                  <li>积分互动</li>
                  <li>BI模块-个性化推荐</li>
                </ul>
              </div>
              <img src="/images/pa6.png"
                   class="media-image"
                   alt="超级会员功能介绍">
            </div>
          </div>
        </card>
        <card class="box">
          <div class="media-body">
            <h2 class="title-3 under-line">会员中心装修</h2>
            <p>多种模块组件+定制专属会员中心模板，轻松完成<br>店铺会员中心装修</p>
          </div>
          <div class="media-image">
            <img src="/images/pa1.png"
                 alt="会员中心装修">
          </div>
        </card>
        <card class="box">
          <div class="media-body">
            <h2 class="title-3 under-line">会员权益</h2>
            <p>开通会员享特权，激励消费者入会，维护新老会员权益</p>
            <ul>
              <li>会员专享价</li>
              <li>积分加钱购</li>
              <li>会员试用</li>
              <li>会员升级礼包</li>
            </ul>
          </div>
          <div class="media-image">
            <img src="/images/pa2.png"
                 alt="会员权益">
          </div>
        </card>
        <card class="box">
          <div class="media-body">
            <h2 class="title-3 under-line">积分互动</h2>
            <p>解锁全新积分玩法、会员互动更加活跃</p>
          </div>
          <div class="media-image">
            <img src="/images/pa3.png"
                 alt="积分互动">
          </div>
        </card>
        <card class="box">
          <div class="media-body">
            <h2 class="title-3 under-line">BI模块-个性化推荐</h2>
            <p>内容精细化运营，深挖流量价值；<br>
              商品差异化投放，提高成交转化；<br>
              千人千面，围绕消费者用户标签进行个性化推荐及智能广告营销。</p>
          </div>
          <div class="media-image">
            <img src="/images/pa4.png"
                 alt="BI模块-个性化推荐">
          </div>
        </card>
      </div>
    </div>
    <!--合作伙伴-->
    <div class="partner-wrapper">
      <div class="partner-title">这些品牌都在用</div>
      <partner-section title="这些品牌都在用"
                       class="product-b-partner" />
    </div>
  </div>
</template>

<script>
import PartnerSection from '@/components/PartnerSection'

export default {
  name: 'ProductCjhy',
  components: { PartnerSection },
  head () {
    return {
      // title: '超级会员'
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
          font-weight: 400;
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
          width: 7.22rem;
          height: 5.94rem;
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
            margin-left: 0.97rem;
            height: 100%;
            display: flex;
            align-items: center;
            text-align: left;

            ul {
              color: $--color-white;
              line-height: 0.48rem;
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
            top: 0.28rem;
            right: 0.8rem;
            width: 2.06rem;
          }
        }

        .ci-2 {
          background-position: 1.35rem 1.25rem, 0 0;

          .media-image {
            top: -0.44rem;
            right: 0.87rem;
            width: 1.42rem;
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

        ul {
          li {
            color: $--color-primary;
            font-size: .16rem;
            line-height: 2;
          }
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
