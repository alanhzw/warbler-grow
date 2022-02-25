<template>
  <div class="page-digital-assets">
    <div class="banner-wrapper">
      <div class="container">
        <div class="banner-box">
          <div class="left">
            <h1>全场景互动营销</h1>
            <p>全场景消费者互动营销解决方案，</p>
            <p>满足品牌个性化、定制化、多样化的营销需求</p>
            <button class="button button-reverse hide">免费咨询</button>
          </div>
          <div class="right">
            <img src="/images/banner/banner9.png"
                 alt="全场景互动营销">
          </div>
        </div>
      </div>
    </div>
    <div class="cdp-wrapper">
      <div class="container">
        <card>
          <h1>超十年行业研究与深耕，成熟的自主研发实力</h1>
          <p>技术研发团队将国内外技术与电商互动营销的需求相结合，为品牌提供定制化的创意互动玩法</p>
          <div class="cdp-list">
            <div class="cdp-item">
              <div class="cover">
                <img src="/images/icons/icon-6.png"
                     alt="多行业一线品牌选择">
              </div>
              <div class="title">多行业一线品牌选择</div>
              <!--              <p class="desc">二十万中小商家的信任</p>-->
            </div>
            <div class="cdp-item">
              <div class="cover">
                <img src="/images/icons/icon-7.png"
                     alt="多维度活动数据埋点">
              </div>
              <div class="title">多维度活动数据埋点</div>
              <!--              <p class="desc">持续挖掘流量价值</p>-->
            </div>
            <div class="cdp-item">
              <div class="cover">
                <img src="/images/icons/icon-8.png"
                     alt="多渠道触达能力">
              </div>
              <div class="title">多渠道触达能力</div>
              <!--              <p class="desc">可支持多端互动能力</p>-->
            </div>
          </div>
        </card>
      </div>
    </div>
    <div class="block block-1">
      <div class="container">
        <div class="media-body">
          <h2 class="title-3 upper-line">多行业一线品牌选择</h2>
          <h3>二十万中小商家的信任</h3>
          <p>目前服务400家以上SKA/KA品牌客户，涵盖母婴、宠物、个护清洁、<br>
            食品、3C电子等数十个行业</p>
        </div>
        <div class="media-image">
          <img src="/images/db1.png"
               alt="多行业一线品牌选择">
        </div>
      </div>
    </div>
    <div class="block block-2">
      <div class="container">
        <div class="media-image">
          <img src="/images/db2.png"
               alt="多维度活动数据埋点">
        </div>
        <div class="media-body">
          <h2 class="title-3 upper-line">多维度活动数据埋点</h2>
          <h3>持续挖掘流量价值</h3>
          <p>可视化数据展现及活动复盘，实现获客全链路流量效果追踪，<br>
            评估最具效果的转化方式。</p>
        </div>
      </div>
    </div>
    <div class="block block-3">
      <div class="container">
        <div class="media-body">
          <h2 class="title-3 upper-line">多渠道触达能力</h2>
          <h3>可支持多端互动能力</h3>
          <p>H5、微信小程序、京东小程序，天猫小程序等</p>
        </div>
        <div class="media-image">
          <img src="/images/db3.png"
               alt="多渠道触达能力">
        </div>
      </div>
    </div>
    <div class="card-wrapper">
      <div class="container">
        <div class="card card-1">
          <dab-interaction-means-section-item id="1"
                                              :items="dataList1" />
        </div>
        <div class="card card-2">
          <dab-interaction-means-section-item id="2"
                                              :items="dataList2"
                                              media-position="left" />
        </div>
      </div>
    </div>
    <div class="bg">
      <div class="container">
        <div class="cooperation-mode-wrapper">
          <h2>合作方式</h2>
          <p>一站式全方位专属互动定制服务，从0到1解决消费者互动营销难题</p>
          <div class="mode-flow">
            <div class="mode-item active">
              <icon-arrow-angle :reverse="true"
                                direction="right" />
              <div class="content">
                <div class="indicator">STEP1</div>
                <div class="title">确定活动档期</div>
              </div>
              <img src="/images/db4.png"
                   class="cover"
                   alt="确定活动档期">
            </div>
            <div class="mode-item">
              <icon-arrow-angle direction="down" />
              <div class="content">
                <div class="indicator">STEP2</div>
                <div class="title">选择玩法&确定方案</div>
              </div>
              <img src="/images/db5.png"
                   class="cover"
                   alt="选择玩法&确定方案">
            </div>
            <div class="mode-item">
              <icon-arrow-angle direction="down" />
              <div class="content">
                <div class="indicator">STEP4</div>
                <div class="title">互动研发&资源部署</div>
              </div>
              <img src="/images/db6.png"
                   class="cover"
                   alt="互动研发&资源部署">
            </div>
            <div class="mode-item">
              <icon-arrow-angle direction="left" />
              <div class="content">
                <div class="indicator">STEP3</div>
                <div class="title">素材设计</div>
              </div>
              <img src="/images/db7.png"
                   class="cover"
                   alt="素材设计">
            </div>
            <div class="mode-item">
              <icon-arrow-angle direction="right" />
              <div class="content">
                <div class="indicator">STEP5</div>
                <div class="title">目标投放&线上体验</div>
              </div>
              <img src="/images/db8.png"
                   class="cover"
                   alt="目标投放&线上体验">
            </div>
            <div class="mode-item">
              <icon-arrow-angle direction="down" />
              <div class="content">
                <div class="indicator">STEP6</div>
                <div class="title">实时监控</div>
              </div>
              <img src="/images/db9.png"
                   class="cover"
                   alt="实时监控">
            </div>
            <div class="mode-item">
              <button class="button button-primary">了解详情</button>
              <img src="/images/db10.png"
                   class="cover">
            </div>
            <div class="mode-item">
              <icon-arrow-angle direction="left" />
              <div class="content">
                <div class="indicator">STEP7</div>
                <div class="title">活动总结&项目复盘</div>
              </div>
              <img src="/images/db11.png"
                   class="cover"
                   alt="活动总结&项目复盘">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconArrowAngle from '@/components/IconArrowAngle'
import DabInteractionMeansSectionItem from '@/components/DabInteractionMeansSectionItem'

export default {
  name: 'SolutionMarketing',
  components: {
    IconArrowAngle,
    DabInteractionMeansSectionItem
  },
  data () {
    return {
      dataList1: [
        {
          title: '通过不同的营销目的，使用不同的互动活动',
          targetTitle: '营销目的',
          targetContent: '拉新增粉',
          pointTitle: '营销重点',
          pointContent: '对店铺新用户做触达，为店铺提高粉丝量及关注度',
          methodTitle: '经典玩法',
          methodContent: ['分享有礼', '日历签到'],
          images: ['/images/game/game27.jpg', '/images/game/game28.jpg']
        },
        {
          title: '通过不同的营销目的，使用不同的互动活动',
          targetTitle: '营销目的',
          targetContent: '用户互动',
          pointTitle: '营销重点',
          pointContent: '高效互动给用户带来极致体验感，增加店铺好感度',
          methodTitle: '经典玩法',
          methodContent: ['盖楼有礼', '大转盘抽奖'],
          images: ['/images/game/game16.jpg', '/images/game/game30.jpg']
        },
        {
          title: '通过不同的营销目的，使用不同的互动活动',
          targetTitle: '营销目的',
          targetContent: '高效裂变',
          pointTitle: '营销重点',
          pointContent: '分享活动为店铺带来高流量高关注高口碑',
          methodTitle: '经典玩法',
          methodContent: ['裂变神券', '组队瓜分奖品'],
          images: ['/images/game/game31.jpg', '/images/game/game32.jpg']
        },
        {
          title: '通过不同的营销目的，使用不同的互动活动',
          targetTitle: '营销目的',
          targetContent: '增加权重',
          pointTitle: '营销重点',
          pointContent: '引导用户加购、购买、关注店铺等第一次来增加权重',
          methodTitle: '经典玩法',
          methodContent: ['购物车锦鲤', '关注店铺有礼'],
          images: ['/images/game/game33.jpg', '/images/game/game34.jpg']
        },
        {
          title: '通过不同的营销目的，使用不同的互动活动',
          targetTitle: '营销目的',
          targetContent: '转化提升',
          pointTitle: '营销重点',
          pointContent: '召回店铺沉睡客户，最大程度将客户转变付费用户',
          methodTitle: '经典玩法',
          methodContent: ['评价有礼', '知识超人'],
          images: ['/images/game/game14.jpg', '/images/game/game36.jpg']
        }
      ],
      dataList2: [
        {
          title: '通过不同品类，使用不同的互动活动',
          targetTitle: '品类',
          targetContent: '家电3C',
          pointTitle: '营销重点',
          pointContent: '精准锁定兴趣人群，培养种草。新品上市后快速传播品牌调性，提升会员粘性，提高转化率',
          methodTitle: '经典玩法',
          methodContent: ['知识超人', '日历签到', '组队瓜分奖品', '店铺抽奖', '会员礼包等'],
          images: ['/images/game/game37.jpg', '/images/game/game38.jpg']
        },
        {
          title: '通过不同品类，使用不同的互动活动',
          targetTitle: '品类',
          targetContent: '消费品品类',
          pointTitle: '营销重点',
          pointContent: '注重引流+转化，主推爆款产品，提高升单品销量',
          methodTitle: '经典玩法',
          methodContent: ['优惠券营销', '大转盘抽奖', '加购有礼', '组队瓜分奖品', '会员礼包等'],
          images: ['/images/game/game39.jpg', '/images/game/game40.jpg']
        },
        {
          title: '通过不同品类，使用不同的互动活动',
          targetTitle: '品类',
          targetContent: '母婴品类',
          pointTitle: '营销重点',
          pointContent: '受众面较为固定，通过产品试用提升品牌知名度，持续拉新引，扩大私域会员流量池，提升复购率，强化会员黏性，打造消费者全生命周期精细化管理',
          methodTitle: '经典玩法',
          methodContent: ['N元试用', '优惠券营销', '评价有礼', '店铺抽奖', '会员礼包等'],
          images: ['/images/game/game41.jpg', '/images/game/game9.jpg']
        },
        {
          title: '通过不同品类，使用不同的互动活动',
          targetTitle: '品类',
          targetContent: '食品饮料',
          pointTitle: '营销重点',
          pointContent: '抓住高价值客户，打造多渠道互动，推行差异化营销方案，实现品牌流量引入。',
          methodTitle: '经典玩法',
          methodContent: ['组队瓜分奖品', '加购有礼', '关注商品有礼', '会员礼包等'],
          images: ['/images/game/game15.jpg', '/images/game/game11.jpg']
        },
        {
          title: '通过不同品类，使用不同的互动活动',
          targetTitle: '品类',
          targetContent: '美妆个护',
          pointTitle: '营销重点',
          pointContent: '打造亮点趣味互动，营销模式多样化，高效引流，智能导购，实现种草-拔草-带货的互动营销业务闭环',
          methodTitle: '经典玩法',
          methodContent: ['关注店铺有礼', '分享有礼', '组队瓜分奖品', '会员礼包等'],
          images: ['/images/game/game12.jpg', '/images/game/game13.jpg']
        }
      ]
    }
  },
  head () {
    return {
      // title: '全场景互动营销'
    }
  }

}
</script>

<style lang="scss" scoped>
.page-digital-assets {
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

  .cdp-wrapper {
    position: relative;
    margin-top: -1.83rem;
    text-align: center;

    h1 {
      font-size: 0.6rem;
      line-height: 0.5rem;
      color: $--color-primary;
      padding-top: 1.2rem;
      padding-bottom: 0.38rem;

    }

    p {
      font-size: 0.24rem;
      color: $--color-text;
    }

    .cdp-list {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin: 1.2rem 1.29rem 0 1.29rem;

      .cdp-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .cover {
          width: .80rem;
          height: .80rem;
          margin-bottom: .28rem;

          img {
            height: 100%;
          }
        }

        .title {
          font-size: .24rem;
          color: #0083ff;
          margin-bottom: .25rem;
        }

        .desc {
          font-size: 0.14rem;
          color: $--color-text;
          line-height: 1.5;
        }
      }
    }
  }

  .block {
    display: flex;
    align-items: center;
    justify-content: space-around;

    .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
    }

    .media-body {
      h2 {
        font-size: 0.48rem;
        color: $--color-title;
        padding-bottom: .33rem;
      }

      h3 {
        font-size: 0.3rem;
        line-height: 0.5rem;
        color: $--color-primary;
        margin-bottom: 0.45rem;
      }

      p {
        font-size: 0.18rem;
        line-height: 0.3rem;
        color: $--color-text;
        padding-bottom: .5rem;
      }

      ul {
        list-style-type: disc;
        list-style-position: inside;

        li {
          font-size: 0.18rem;
          line-height: 0.42rem;
          color: $--color-primary;
        }
      }
    }
  }

  .block-1 {
    background-image: url("/images/bg/bg8.png");
    background-repeat: no-repeat;
    background-size: auto 90%;
    background-position: right center;
    height: 8.67rem;

    .media-image {
      img {
        width: 7.91rem;
      }
    }
  }

  .block-2 {
    background-image: url("/images/bg/bg9.png");
    background-repeat: no-repeat;
    background-size: auto 90%;
    background-position: left center;
    height: 9.52rem;

    .media-image {
      img {
        width: 6.87rem;
      }
    }
  }

  .block-3 {
    background-image: url("/images/bg/bg8.png");
    background-repeat: no-repeat;
    background-size: auto 90%;
    background-position: right center;
    height: 9.93rem;

    .media-image {
      img {
        width: 7.02rem;
      }
    }
  }

  .bg {
    padding-top: 2rem;
    height: 13rem;
    margin-top: -2.4rem;
    z-index: -1;
    width: 100%;
    background-image: linear-gradient(0deg,
      #4296ff 0%,
      #004ebf 100%);
    position: relative;
  }

  .card-wrapper {
    height: 16.4rem;
    left: 0;
    width: 100%;

    .card {
      width: 17rem;
      height: 7.2rem;
      margin-bottom: 1rem;
      background-color: #ffffff;
      box-shadow: 0rem 0.01rem 1.33rem 0rem rgba(38, 71, 200, 0.15);
      border-radius: 0.2rem;
    }
  }

  .cooperation-mode-wrapper {
    text-align: center;

    h2 {
      font-size: 0.6rem;
      color: $--color-white;
      margin-bottom: 0.3rem;

    }

    p {
      font-size: 0.24rem;
      color: $--color-white;
    }
  }

  .mode-flow {
    margin-top: 0.71rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-row-gap: 0.6rem;
    grid-column-gap: 1.2rem;

    .mode-item {
      width: 7.9rem;
      height: 2rem;
      background-color: $--color-white;
      box-shadow: 0rem 0.01rem 1.33rem 0rem rgba(38, 71, 200, 0.15);
      border-radius: 0.2rem;
      position: relative;
      display: flex;
      align-items: center;
      box-sizing: border-box;

      .icon-arrow-angle {
        margin-left: 0.63rem;
      }

      .content {
        text-align: left;
        margin-left: 0.25rem;

        .indicator {
          font-size: 0.24rem;
          color: $--color-primary;
          padding-bottom: 0.14rem;
        }

        .title {
          font-size: 0.3rem;
          color: $--color-title;
        }
      }

      .button {
        margin-left: 0.63rem;
        width: 1.9rem;
        height: 0.6rem;
      }

      .cover {
        position: absolute;
        bottom: 0;
        right: 0;
      }

      &.active {
        background-color: #2dd5ff;
      }

      &:before, &:after {
        content: '';
        display: block;
        border-style: dashed;
        border-color: $--color-white;
        position: absolute;
        border-width: 0;
      }

      &:nth-child(1),
      &:nth-child(3),
      &:nth-child(5),
      &:nth-child(7) {
        &:after {
          width: 1.2rem;
          height: 0;
          border-bottom-width: 0.05rem;
          top: 50%;
          transform: translateY(-50%) translateX(100%);
          right: 0;
        }
      }

      &:nth-child(2),
      &:nth-child(3),
      &:nth-child(6) {
        &:before {
          height: 0.6rem;
          width: 0;
          border-right-width: 0.05rem;
          bottom: -0.6rem;
          left: 0.95rem;
        }
      }

      &:nth-child(1) {
        .cover {
          width: 2.93rem;
          height: 1.75rem;
          right: 0.39rem;
        }
      }

      &:nth-child(2) {
        .cover {
          width: 1.72rem;
          height: 1.8rem;
          right: 0.99rem;
        }
      }

      &:nth-child(3) {
        .cover {
          width: 1.31rem;
          height: 1.85rem;
          right: 0.79rem;
        }
      }

      &:nth-child(4) {
        .cover {
          width: 3.32rem;
          height: 1.75rem;
          right: 0.66rem;
        }
      }

      &:nth-child(5) {
        .cover {
          width: 1.78rem;
          height: 1.75rem;
          right: 0.62rem;
        }
      }

      &:nth-child(6) {
        .cover {
          width: 2.13rem;
          height: 1.87rem;
          right: 0.6rem;
        }
      }

      &:nth-child(7) {
        .cover {
          width: 1.78rem;
          height: 1.75rem;
          right: 0.55rem;
        }
      }

      &:nth-child(8) {
        .cover {
          width: 1.61rem;
          height: 1.75rem;
          right: 0.78rem;
        }
      }
    }
  }
}
</style>
