<template>
  <div class="page-brand-service">
    <div class="banner-wrapper">
      <div class="container">
        <div class="banner-box">
          <div class="left">
            <h1>品牌服务</h1>
            <p>为品牌提供全链路一站式消费者增长运营服务、</p>
            <p>品牌CRM代运营服务、精准营销运营托管服务、</p>
            <p>品牌数据分析报告、个性化会员运营策略，</p>
            <p>帮助品牌提升数字资产运营水平，实现降本增效。</p>
            <button class="button button-reverse hide">免费咨询</button>
          </div>
          <div class="right">
            <img src="/images/banner/banner11.png"
                 alt="品牌服务">
          </div>
        </div>
      </div>
    </div>
    <div class="block-wrapper">
      <div class="container">
        <card class="card-1">
          <h1>数据驱动的品牌用户运营服务</h1>
          <!--          <p>亮点功能亮点功能亮点功能亮点功能亮点功能亮点功能亮点功能</p>-->
          <div class="ci-list">
            <div class="ci-item ci-1">
              <div class="media-body">
                <ul class="circle-marker-list">
                  <li>品牌专属互动定制服务</li>
                  <li>品牌联合活动定制服务</li>
                  <li>会员CRM代运营服务</li>
                </ul>
              </div>
              <img src="/images/bs1.png"
                   class="media-image"
                   alt="数据驱动的品牌用户运营服务">
            </div>
            <div class="ci-item ci-2">
              <div class="media-body">
                <ul class="circle-marker-list">
                  <li>精准营销运营托管服务</li>
                  <li>品牌数据报告服务</li>
                  <li>内容营销服务</li>
                </ul>
              </div>
              <img src="/images/bs2.png"
                   class="media-image"
                   alt="数据驱动的品牌用户运营服务">
            </div>
          </div>
        </card>
        <card class="card-2">
          <div class="media-body">
            <h2 class="title-3 under-line">品牌专属互动定制服务</h2>
            <p>根据品牌个性化需求，提供一站式全方位的互动营销、<br>
              解决方案和创意表现等活动支撑。</p>
          </div>
          <img class="media-image"
               src="/images/bs3.png"
               alt="品牌专属互动定制服务">
          <img src="/images/pc-coin.png"
               class="pc-coin">
          <img src="/images/pc-light.png"
               class="light">
          <img src="/images/hexagon-2.png"
               class="hexagon">
          <img src="/images/flower.png"
               class="flower">
          <img src="/images/bg/bg11.png"
               class="bg">
          <div class="phone-wrapper phone-wrapper-1">
            <img src="/images/game/game25.png"
                 alt="品牌专属互动定制服务">
          </div>
          <div class="phone-wrapper phone-wrapper-2">
            <img src="/images/game/game24.png"
                 alt="品牌专属互动定制服务">
          </div>
        </card>
        <card class="card-3">
          <div class="media-body">
            <h2 class="title-3 under-line">品牌联合活动定制服务</h2>
            <p>多品牌多店铺联合定制，同类目、跨类目联合项目支持，<br>
              达到1+1＞2联合效果。</p>
          </div>
          <img class="media-image"
               src="/images/bs4.png"
               alt="品牌联合活动定制服务">
          <img src="/images/pc-coin.png"
               class="pc-coin">
          <img src="/images/pc-light.png"
               class="light">
          <img src="/images/hexagon-2.png"
               class="hexagon">
          <img src="/images/flower.png"
               class="flower">
          <img src="/images/bg/bg12.png"
               class="bg">
          <div class="phone-wrapper phone-wrapper-1">
            <img src="/images/game/game20.png"
                 alt="品牌联合活动定制服务">
          </div>
          <div class="phone-wrapper phone-wrapper-2">
            <img src="/images/game/game23.png"
                 alt="品牌联合活动定制服务">
          </div>
        </card>
      </div>
    </div>
    <div class="more-service-wrapper">
      <div class="container">
        <div class="header">
          更多优质服务
        </div>
        <div class="service-list">
          <div class="service-item">
            <h4 class="title-3 under-line center-line">会员CRM代运营服务</h4>
            <p>以结果为导向，为品牌企业提供线上CRM代运营一站式服务，<br>
              助力品牌企业在电商市场快速优质发展。 </p>
            <!--            <ul>-->
            <!--              <li>拉新</li>-->
            <!--              <li>留存</li>-->
            <!--              <li>转化</li>-->
            <!--              <li>复购</li>-->
            <!--            </ul>-->
          </div>
          <div class="service-item">
            <h4 class="title-3 under-line center-line">精准营销运营托管服务</h4>
            <p>拥有公域私域全人群触达营销能力，托管服务全方位<br>
              提升品牌影响力。</p>
          </div>
          <div class="service-item">
            <h4 class="title-3 under-line center-line">品牌数据报告服务</h4>
            <p>拥有公域私域全人群触达营销能力，托管服务全方位<br>
              提升品牌影响力。 </p>
          </div>
          <div class="service-item">
            <h4 class="title-3 under-line center-line">内容营销服务</h4>
            <p>构建企业内部数据资产体系,定制开发个性化数据看板，<br>
              充分利用数据资产以达成效益增值。 </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'BrandService',
  components: {},
  head () {
    return {
      // title: '品牌服务'
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
.page-brand-service {
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
          width: 7.90rem;
          height: 7.68rem;
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
          }

          &:nth-child(1) {
            .media-image {
              bottom: 0.26rem;
              right: 0.9rem;
              width: 1.12rem;
              height: 2.93rem;
            }
          }

          &:nth-child(2) {
            .media-image {
              bottom: 0.26rem;
              right: 0.94rem;
              width: 2.38rem;
              height: 2.85rem;
            }
          }
        }
      }
    }

    .card-2, .card-3 {
      display: flow-root;

      h2 {
        margin-bottom: 0.74rem;
      }

      p {
        font-size: 0.18rem;
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
        margin-left: 1.8rem;
      }

      .media-image {
        width: 1rem;
        height: 2.87rem;
        top: 2.08rem;
        left: 7.02rem;
        z-index: 1;
      }

      .pc-coin {
        top: 5.52rem;
        left: 1.74rem;
      }

      .bg {
        width: 9.61rem;
        height: 2.35rem;
        right: 0;
        bottom: 0;
        z-index: 2;
        position: absolute;
      }

      .light {
        bottom: 1.2rem;
        right: 0.29rem;
      }

      .hexagon {
        top: 4.42rem;
        left: 6.68rem;
      }

      .flower {
        bottom: 0.37rem;
        left: 7.82rem;
        z-index: 3;
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
        width: 1.68rem;
        height: 3.59rem;
        top: 2.26rem;
        left: 8.35rem;
        z-index: 1;
      }

      .pc-coin {
        right: 4.6rem;
        bottom: 0.95rem;
      }

      .light {
        bottom: 0.67rem;
        left: 0.43rem;
        z-index: 4;
      }

      .hexagon {
        top: 4rem;
        left: 8.7rem;
      }

      .flower {
        top: 1.03rem;
        right: 1.04rem;
      }

      .bg {
        position: absolute;
        width: 8.45rem;
        height: 3.97rem;
        left: 0;
        bottom: 0;
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
  }

  .more-service-wrapper {
    height: 11rem;
    background-image: linear-gradient(0deg,
      #4296ff 0%,
      #004ebf 100%);

    .header {
      height: 2rem;
      line-height: 2rem;
      font-size: 0.6rem;
      color: $--color-white;
      text-align: center;

    }

    .service-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      grid-row-gap: 0.4rem;
      grid-column-gap: 0.4rem;

      .service-item {
        width: 8.3rem;
        height: 3.6rem;
        background-color: $--color-white;
        box-shadow: 0rem 0.01rem 1.33rem 0rem rgba(38, 71, 200, 0.15);
        border-radius: 0.2rem;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      h4 {
        font-size: 0.36rem;
        margin-bottom: 0.64rem;
      }

      p {
        font-size: 0.24rem;
        line-height: 0.42rem;
        color: $--color-text;
        margin-bottom: 0.44rem;
      }

      ul {
        display: flex;

        li {
          display: block;
          height: 0.17rem;
          font-size: 0.18rem;
          color: $--color-primary;
          border-right: solid 1px $--color-primary;
          padding-left: 0.13rem;
          padding-right: 0.13rem;

          &:first-child {
            padding-left: 0;
          }

          &:last-child {
            border: none;
            padding-right: 0;
          }
        }
      }
    }
  }
}
</style>
