<template>
  <div class="page-consumer-insight">
    <div class="banner-wrapper">
      <div class="container">
        <div class="banner-box">
          <div class="left">
            <h1>超级无线</h1>
            <p>
              超级无线是轻量级互动插件，帮助商家解决粉丝互动，无线营销难题，丰富店铺营销玩法，通过互动营销，提升品牌知名度，增加店铺粉丝量，推广新品，发放权益，无线引流！现已有超过12万家品牌商家运用超级无线为店铺实现营销目的。
              超级无线内的互动活动同时也提升店铺关注量，提高商品曝光率、提升店铺人气、提高店铺转化、提升店铺排名、提升粉丝粘性！</p>
            <button class="button button-reverse hide">免费咨询</button>
          </div>
          <div class="right">
            <img src="/images/banner/banner8.png"
                 alt="超级无线">
          </div>
        </div>
      </div>
    </div>
    <div class="block-wrapper">
      <div class="container">
        <card class="card-1">
          <h1>超级无线功能介绍</h1>
          <p>
            超级无线内近40种互动活动，涵盖抽奖类、签到类、增加权重类、评价类、组队集卡类、答题类、转化类、关注类、裂变分享类，开卡入会类等多种类别。
          </p>
          <div class="ci-list">
            <div class="ci-item">
              <div class="media-body">
                <ul class="circle-marker-list">
                  <li>购物车锦鲤</li>
                  <li>游戏中心</li>
                  <li>抽奖中心</li>
                </ul>
              </div>
              <img src="/images/pc1.png"
                   class="media-image"
                   alt="超级无线">
            </div>
          </div>
        </card>
        <card class="card-2">
          <div class="media-body">
            <h2 class="title-3 under-line">购物车锦鲤</h2>
            <p>加购指定商品即可抽取大奖，同时可裂变分享给其他用户。<br>
              店铺加权+流量裂变双重营销方式保障互动营销目的。</p>
          </div>
          <img class="media-image"
               src="/images/pc4.png"
               alt="超级无线">
          <img src="/images/pc-coin.png"
               class="pc-coin">
          <img src="/images/pc-light.png"
               class="light">
          <img src="/images/hexagon-2.png"
               class="hexagon">
          <img src="/images/flower.png"
               class="flower">
          <div class="phone-wrapper phone-wrapper-1">
            <img src="/images/game/game1.jpg"
                 alt="超级无线">
          </div>
          <div class="phone-wrapper phone-wrapper-2">
            <img src="/images/game/game3.jpg"
                 alt="超级无线">
          </div>
        </card>
        <card class="card-3">
          <div class="media-body">
            <h2 class="title-3 under-line">游戏中心</h2>
            <p>超级无线独家首发超好玩互动小游戏，紧张刺激游戏体验，<br>
              丝滑般的游戏流畅度。与高端定制相媲美，更将粉丝入会融入其中，<br>
              视觉效果可自定义，给用户沉浸式体验。</p>
          </div>
          <img class="media-image"
               src="/images/pc2.png">
          <img src="/images/pc-coin.png"
               class="pc-coin">
          <img src="/images/pc-light.png"
               class="light">
          <img src="/images/hexagon-2.png"
               class="hexagon">
          <img src="/images/flower.png"
               class="flower">
          <div class="phone-wrapper phone-wrapper-1">
            <img src="/images/game/game5.jpg"
                 alt="超级无线">
          </div>
          <div class="phone-wrapper phone-wrapper-2">
            <img src="/images/game/game6.jpg"
                 alt="超级无线">
          </div>
        </card>
        <card class="card-4">
          <div class="media-body">
            <h2 class="title-3 under-line">抽奖中心</h2>
            <p> 商家最喜爱的互动活动之一，是创建频率最高的，<br>
              通过简单的玩法，帮助商家获得了更高的转化。<br>
              从拉新、裂变、转化、复购等一站式解决电商营销难题。</p>
          </div>
          <img class="media-image"
               src="/images/pc3.png"
               alt="超级无线">
          <img src="/images/pc-coin.png"
               class="pc-coin">
          <img src="/images/pc-light.png"
               class="light">
          <img src="/images/hexagon-2.png"
               class="hexagon">
          <img src="/images/flower.png"
               class="flower">
          <div class="phone-wrapper phone-wrapper-1">
            <img src="/images/game/game2.jpg"
                 alt="超级无线">
          </div>
          <div class="phone-wrapper phone-wrapper-2">
            <img src="/images/game/game4.jpg"
                 alt="超级无线">
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
  name: 'ProductCjwx',
  components: { PartnerSection },
  head () {
    return {
      // title: '超级无线'
    }
  },
  mounted () {
    this.swiper = new window.Swiper('#productBSwiper', {
      pagination: {
        el: '#productBSwiperPagination',
        clickable: true,
        renderBullet (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>'
        }
      }
    })
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
          white-space: normal;
          padding-top: 0.25rem;
          line-height: 1.5;
          padding-right: 1rem;
        }

        button {
          width: 1.70rem;
          height: .50rem;
        }
      }

      .right {
        align-self: flex-end;

        img {
          width: 8.21rem;
          height: 5.77rem;
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
          width: 15rem;
          height: 2.5rem;
          background-image: url("/images/ci-hexagon.png"), linear-gradient(0deg, #2c73de 0%, #3d98f4 100%);
          background-size: 1.56rem 1.82rem, 100% 100%;
          background-position: 0.36rem -0.57rem, left top;
          border-radius: 0.1rem;
          margin: 0.3rem;
          position: relative;

          .media-body {
            text-align: left;

            ul {
              color: $--color-white;
              display: flex;
              width: 9.98rem;
              justify-content: space-evenly;
              align-items: center;
              height: 2.5rem;
            }
          }

          .media-image {
            position: absolute;
            top: -1.11rem;
            right: 1.06rem;
            width: 2.84rem;
            height: 3.23rem;
          }
        }
      }
    }

    .card-2, .card-3, .card-4 {
      display: flow-root;

      h2 {
        margin-bottom: 0.74rem;
      }

      p {
        line-height: 1.5;
      }

      .media-image {
        position: absolute;
      }

      .pc-coin {
        position: absolute;
        width: 0.79rem;
        height: 0.65rem;
      }

      .light {
        position: absolute;
        width: 1rem;
        height: 1.38rem;
      }

      .hexagon {
        position: absolute;
        width: 1.49rem;
        height: 1.74rem;
      }

      .flower {
        position: absolute;
        width: 0.75rem;
        height: 1.78rem;
      }

      .phone-wrapper {
        position: absolute;
        width: 3.1rem;
        height: 6.1rem;
        top: 0.55rem;
        background-image: url("/images/phone-bg.png");
        background-repeat: no-repeat;
        background-size: 3.10rem 6.10rem;
        padding: 0.42rem 0.15rem 0.48rem 0.15rem;
        box-sizing: border-box;

        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          object-position: top;
        }
      }

      .phone-wrapper-1 {
      }

      .phone-wrapper-2 {
      }
    }

    .card-2 {

      .media-body {
        margin-top: 2.35rem;
        margin-left: 1.77rem;
      }

      .media-image {
        width: 1.45rem;
        height: 3.56rem;
        top: 2.97rem;
        left: 9.7rem;
      }

      .pc-coin {
        top: 5.19rem;
        left: 5.22rem;
      }

      .light {
        bottom: 0.67rem;
        right: 0.29rem;
      }

      .hexagon {
        top: 4.51rem;
        left: 1.79rem;
      }

      .flower {
        top: 4.95rem;
        left: 8.21rem;
      }

      .phone-wrapper {
      }

      .phone-wrapper-1 {
        left: 9.08rem;
      }

      .phone-wrapper-2 {
        left: 12.41rem;
      }
    }

    .card-3 {
      .media-body {
        margin-top: 2.35rem;
        margin-left: 10.31rem;
      }

      .media-image {
        width: 1.62rem;
        height: 5.44rem;
        top: 1.09rem;
        left: 8.13rem;
      }

      .pc-coin {
        top: 4.4rem;
        left: 10.57rem;
        z-index: 2;
      }

      .light {
        top: 5.15rem;
        left: 0.43rem;
      }

      .hexagon {
        top: 4.5rem;
        left: 10.23rem;
      }

      .flower {
        top: 4.25rem;
        right: 1rem;
      }

      .phone-wrapper {
      }

      .phone-wrapper-1 {
        left: 1.7rem;
      }

      .phone-wrapper-2 {
        left: 5.03rem;
      }
    }

    .card-4 {

      .media-body {
        margin-top: 2.35rem;
        margin-left: 1.77rem;
      }

      .media-image {
        width: 1.36rem;
        height: 3.09rem;
        top: 3.16rem;
        left: 7.78rem;
      }

      .pc-coin {
        top: 5.19rem;
        left: 6.32rem;
      }

      .light {
        top: 5.15rem;
        right: 0.29rem;
      }

      .hexagon {
        top: 4.51rem;
        left: 1.79rem;
      }

      .flower {
        top: 4.95rem;
        left: 8.21rem;
      }

      .phone-wrapper {
      }

      .phone-wrapper-1 {
        left: 9.08rem;
      }

      .phone-wrapper-2 {
        left: 12.41rem;
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
