<template>
  <div ref="scroll_top"
       class="page-about-us">
    <div class="banner-wrapper">
      <div class="container">
        <div class="banner-box">
          <div class="banner-body ">
            <div class="banner-text">
              <h1>做品牌信赖的生意增长伙伴</h1>
              <p>
                致力于成为世界知名、行业领先的消费者营销服务商，<br>
                以伙伴的视角聚焦长期合作，用优质的服务赢得品牌信赖。
              </p>
            </div>
          </div>
        </div>
        <div class="time-swiper">
          <time-swiper :time-axis="timeAxis" />
        </div>
      </div>
      <div v-show="logoIsDisplay"
           class="luze-logo"
           :class="isDropDown ? 'logoFallDown' : ''"></div>
    </div>
    <div class="about-wrapper">
      <div class="introduce wow fadeInUp"
           data-wow-delay="0.2s">
        <div class="company-instrouce-head">
          <h2>公司介绍</h2>
        </div>
        <div class="company-instrouce-body">
          <div class="introduce-text">
            <p>
              陆泽科技有限公司是国内领先的全域消费者增长服务商。公司与国内外各主流电商平台建立深度合作关系，基于AI人工智能和电商大数据，依托强大的软件研发实力和深厚的电商行业经验，通过更全面、准确、快速地洞察消费者，聚焦品牌消费者运营，为品牌提供以数据驱动的智慧化营销增长解决方案和体系化SaaS软件产品，助力品牌解决消费者运营与增长难题。
            </p>
            <p>
              陆泽科技在北京、上海设立运营中心，在大连设立研发中心，现已为600余家头部电商品牌提供深度融合式服务和一站式解决方案，涵盖个护、家清、美妆、母婴、食品、酒水、3C电子、宠物、医药保健、服饰等多个类目；累计已有超20万商家使用过公司自主设计研发的SaaS软件系列产品。
            </p>
            <p>
              陆泽科技以“数智化驱动品牌持续确定性增长”为使命，坚持创新驱动发展，提升服务品质，打造陆泽名片，与行业共同成长，做品牌最信赖的生意增长伙伴。
            </p>
          </div>
          <image-carousel :imagelist="introImages" />
        </div>
        <div class="background-logo"></div>
        <div v-show="logoIsBlock"
             class="dropLogo1 wow zoomIn"
             data-wow-delay="1s">
          <img src="/images/dropLogo1.png"
               alt=""
               class=" dance">
        </div>
      </div>
      <div class="video wow fadeInUp">
        <div class="video-left">
          <h2>陆泽科技赋能电商时代</h2>
          <p>央视栏目组记录电商大促幕后的英雄</p>
          <p>
            中央新影发现之旅栏目组来到陆泽科技，用镜头记录了电商行业的幕后服务商是如何通过专业的研发技术、丰富的运营经验和新奇的创新策划，帮助平台和品牌顺利完成每一次重要营销节点的支持与保障，从行业洞察、运营策略、技术保障等维度展现陆泽人在电商营销行业的专注和付出，与行业共赢，为时代加冕。
          </p>
        </div>
        <div class="video-right wow fadeInUp"
             @click="showVideo()">
          <div class="brocast">
            <img src="/images/button_breathe.png"
                 alt="">
          </div>
          <img class="cover"
               :src="companyVideo.cover">
        </div>
      </div>
      <div class="culture">
        <h2 class="wow fadeInUp">企业文化</h2>
        <div class="company-culture-banner wow fadeInUp"></div>
        <div class="culture-swiper">
          <image-swiper :cultureimages="cultureImages" />
        </div>
        <div class="dropLogo2 wow zoomIn"
             data-wow-delay="0.1s">
          <img src="/images/dropLogo2.png"
               alt=""
               class=" dance">
        </div>
      </div>
      <div class="prize">
        <h2 class="wow fadeInUp">荣誉奖项</h2>
        <div class="prize-swiper">
          <prize-swiper :swiper-list="prizeList" />
        </div>
        <div class="dropLogo3 wow zoomIn"
             data-wow-delay="1s">
          <img src="/images/dropLogo3.png"
               alt=""
               class="dance">
        </div>
      </div>
      <div class="quality">
        <h2 class="wow fadeInUp">资质认证</h2>
        <div class="quality-swiper">
          <quality-swiper :swiper-list="intelligenceList" />
        </div>
        <div class="dropLogo4 wow zoomIn"
             data-wow-delay="0.1s">
          <img src="/images/dropLogo4.png"
               alt=""
               class="dance">
        </div>
      </div>
    </div>
    <video-player v-model="currentVideoShow"
                  :data="companyVideo" />
  </div>
</template>

<script>
import TimeSwiper from '@/components/TimeSwiper'
import ImageCarousel from '~/components/ImageCarousel.vue'
import VideoPlayer from '~/components/VideoPlayer'
import videos from '~/assets/videos'
import PrizeSwiper from '~/components/PrizeSwiper.vue'
import QualitySwiper from '~/components/qualitySwiper.vue'
import ImageSwiper from '~/components/ImageSwiper.vue'

export default {
  name: 'AboutUs',
  components: {
    TimeSwiper,
    ImageCarousel,
    VideoPlayer,
    PrizeSwiper,
    QualitySwiper,
    ImageSwiper
  },
  data () {
    return {
      num: 0,
      brdDisplay: false,
      isfocus: true,
      noimg: true,
      videoList: videos.companyVideo,
      currentVideoShow: false,
      usScrollTop: 0,
      flag: true,
      introduceFade: false,
      logoIsDisplay: true,
      isDropDown: false,
      logoIsBlock: false,
      companyVideo: {
        cover:
          '/images/video/cover/央视-发现之旅-纪录片-陆泽赋能电商时代/cover.jpg',
        path: '央视-发现之旅-纪录片-陆泽赋能电商时代'
      },
      timeAxis: [
        {
          year: '2009',
          content:
            '成为最早入驻淘宝开放平台的ISV服务商之一，连续多年荣获淘宝“淘拍档”奖'
        },
        {
          year: '2016',
          content:
            '京东京麦服务市场核心ISV服务商、首批入驻京麦服务市场的ISV服务商。'
        },
        {
          year: '2018',
          content: '连续多年荣获京东京麦服务市场“京卓越”奖'
        },
        {
          year: '2019',
          content: '成为苏宁核心ISV服务商，与多个行业线和事业部深度合作'
        },
        {
          year: '2020',
          content:
            '9月，北京运营总部正式成立，与更多头部品牌和平台开启协同发展新模式',
          content2: '10月，荣获第九届全国创新创业大赛（京东专场）一等奖'
        },
        {
          year: '2021',
          content: ' 1月，荣获世界零售大会最佳数字营销卓越服务商奖',
          content2: '7月，荣获中国行业影响力品牌峰会电商用户营销行业领导品牌奖',
          content3: '8月，上海分公司正式成立，打造全域布局新篇章'
        }
      ],
      prizeList: [
        {
          ImgUrl: '/images/honimg/hon15.png',
          Desc: '2022年数据服务商高级认证'
        },
        {
          ImgUrl: '/images/honimg/hon16.png',
          Desc: '2021年双11大促杰出贡献奖'
        },
        {
          ImgUrl: '/images/honimg/hon17.png',
          Desc: '2021年京东营销360超星合作伙伴'
        },
        {
          ImgUrl: '/images/honimg/hon14.png',
          Desc: '2021年京东京牌营销认证共建单位'
        },
        {
          ImgUrl: '/images/honimg/hon13.png',
          Desc: '2021年京东品牌用户运营618案例共建优秀服务商'
        },
        {
          ImgUrl: '/images/honimg/hon7.png',
          Desc: '2021年第八届中国行业影响力品牌峰会-星级合作伙伴认证'
        },
        {
          ImgUrl: '/images/honimg/hon6.png',
          Desc: '2021年第八届中国行业影响力品牌峰会-电商用户营销行业领导品牌奖'
        },
        {
          ImgUrl: '/images/honimg/hon8.png',
          Desc: '2021年第六届世界零售峰会WRE最佳数字营销卓越服务商奖'
        },
        {
          ImgUrl: '/images/honimg/hon4.png',
          Desc: '2020年第九届中国创新创业大赛（京东专场）一等奖'
        },
        {
          ImgUrl: '/images/honimg/hon5.png',
          Desc: '2020年京东京卓越服务商'
        },
        {
          ImgUrl: '/images/honimg/hon3.png',
          Desc: '2018年京东京卓越服务商'
        },
        {
          ImgUrl: '/images/honimg/hon2.png',
          Desc: '2014年思路电商服务年度风云奖-杰出电商促销服务'
        },
        {
          ImgUrl: '/images/honimg/hon1.png',
          Desc: '2013年第八届中国网上零售年会-杰出电商促销服务'
        },
        {
          ImgUrl: '/images/honimg/hon12.png',
          Desc: '2013年淘宝金牌淘拍档'
        },
        {
          ImgUrl: '/images/honimg/hon11.png',
          Desc: '宝洁CRM特别顾问奖'
        },
        {
          ImgUrl: '/images/honimg/hon9.png',
          Desc: '大连软件行业协会监事单位'
        }
      ],
      intelligenceList: [
        {
          ImgUrl: '/images/auimg/au6.png',
          Desc: 'CMMI3（软件能力成熟度-三级）'
        },
        {
          ImgUrl: '/images/auimg/au1.png',
          Desc: '信息系统安全等级保护-等保三级认证'
        },
        {
          ImgUrl: '/images/auimg/au4.png',
          Desc: 'ISO27001信息安全管理体系认证'
        },
        {
          ImgUrl: '/images/auimg/au3.png',
          Desc: 'ISO9001质量管理体系认证'
        },
        {
          ImgUrl: '/images/auimg/au5.png',
          Desc: '三十余项计算机软件著作权'
        },
        {
          ImgUrl: '/images/auimg/au2.png',
          Desc: '高新技术企业'
        },
        {
          ImgUrl: '/images/auimg/au7.png',
          Desc: '大连软件和信息技术服务业核心竞争力企业'
        }
      ],
      introImages: [
        {
          ImgUrl: '/images/swiperimgs/intro1.png'
        },
        {
          ImgUrl: '/images/swiperimgs/intro2.png'
        },
        {
          ImgUrl: '/images/swiperimgs/intro3.png'
        },
        {
          ImgUrl: '/images/swiperimgs/intro4.png'
        }
      ],
      cultureImages: [
        {
          ImgUrl: '/images/swiperimgs/culture1.png'
        },
        {
          ImgUrl: '/images/swiperimgs/culture2.png'
        },
        {
          ImgUrl: '/images/swiperimgs/culture3.png'
        },
        {
          ImgUrl: '/images/swiperimgs/culture4.png'
        }
      ],
      index1: 0,
      index2: 0,
      descindex1: 0,
      descindex2: 0
    }
  },
  head () {
    return {
      // title: '关于我们'
    }
  },
  // 自动触发
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
    this.$nextTick(() => {
      const wow = new window.WOW({
        live: false
      })
      wow.init()
      console.log('wow', wow)
    })
  },
  // 页面销毁前
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    showVideo () {
      this.currentVideoShow = true
    },
    // 获取滚动条的滚动距离
    handleScroll (e) {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      if (scrollTop >= 100) {
        this.isDropDown = true
        this.logoIsBlock = true
      } else if (scrollTop >= 500) {
        this.isDropDown = false
      }
      console.log(this.logoFallDown)
      // console.log(scrollTop,offsetTop)
    }
  }
}
</script>

<style lang="scss">
body {
  background-image: linear-gradient(180deg, #09239d 0%, #4296ff 100%);
  background-size: 100% 15.5rem;
  font-size: 0.24rem;
  .page-about-us {
    h2 {
      font-size: 0.6rem;
      text-align: center;
    }

    p {
      font-size: 0.18rem;
      line-height: 0.36rem;
    }

    .banner-wrapper {
      height: 10.7rem;
      background-repeat: no-repeat;
      background-position: left bottom;
      background-size: 100% 3.26rem;
      padding-top: 1.63rem;
      box-sizing: border-box;
      .container {
        position: relative;
        .banner-box {
          height: 6rem;
          display: flex;
          align-items: stretch;
          justify-content: center;
          background-image: url('/images/banner/banner12.png');
          background-size: 100%;

          .banner-body {
            color: $--color-white;
            text-align: center;

            .banner-text {
              h1 {
                font-size: 0.6rem;
                margin-bottom: 0.5rem;
              }

              p {
                font-size: 0.24rem;
                line-height: 0.42rem;
              }
            }
          }
        }
      }
      .luze-logo {
        width: 1.86rem;
        height: 1.69rem;
        background: url('/images/luzelogo.png') no-repeat;
        background-size: 100%;
        position: absolute;
        top: 2.77rem;
        right: 3.5rem;
        z-index: 996;
      }
    }

    .about-wrapper {
      position: relative;
      .introduce {
        padding: 0.8rem 0.5rem 0;
        box-sizing: border-box;
        margin: 0 auto 1rem;
        height: 7.5rem;
        width: 18rem;
        position: relative;
        background-color: #fff;
        box-shadow: 0 0.01rem 1.33rem 0 rgb(38 71 200 / 15%);
        border-radius: 0.2rem;
        .company-instrouce-head {
          h2 {
            color: $--color-primary;
            margin-bottom: 0.9rem;
          }
        }
        .company-instrouce-body {
          width: 17.2rem;
          height: 3.88rem;
          display: flex;
          margin-top: 0.5rem;
          .introduce-text {
            width: 51%;
            p {
              font-size: 0.24rem;
              color: #666666;
              text-indent: 2em;
            }
          }
          p {
            i {
              display: block;
              margin-top: 0.45rem;
              font-size: 0.24rem;
              color: #666666;
            }
          }
          .images-list {
            margin-left: 0.45rem;
          }
        }
        .background-logo {
          width: 2.11rem;
          height: 3.33rem;
          background: url('/images/banner/banner17.png') no-repeat;
          background-size: 100%;
          position: absolute;
          bottom: 0;
          left: 0.7rem;
        }
        .dropLogo1 {
          position: absolute;
          top: 0.08rem;
          right: 1.1rem;
        }
      }
      .video {
        width: 18rem;
        height: 6.68rem;
        box-sizing: border-box;
        margin: 0 auto 0.92rem;
        position: relative;
        overflow: hidden;
        display: flex;
        padding: 1.29rem 1.02rem 1.17rem 1.03rem;
        background-color: #fff;
        box-shadow: 0 0.01rem 1.33rem 0 rgb(38 71 200 / 15%);
        border-radius: 0.2rem;
        .video-left {
          width: 49%;
          margin-top: 0.56rem;
          text-align: center;
          h2 {
            color: #2647c8;
            font-size: 0.48rem;
          }
          :nth-child(2) {
            margin: 0.36rem auto;
            font-size: 0.3rem;
            color: #2647c8;
          }
          :nth-child(3) {
            width: 6.72rem;
            height: 1.68rem;
            margin: 0 auto;
            font-size: 0.24rem;
            line-height: 0.36rem;
            color: #666666;
            text-align: left;
          }
        }
        .video-right {
          width: 49%;
          height: 4.22rem;
          margin: 0 auto;
          border-radius: 0.1rem;
          cursor: pointer;
          background-color: pink;
          position: relative;
          // margin-top: 1.1rem;
          .brocast {
            display: flex;
            width: 0.64rem;
            height: 0.64rem;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            img {
              width: 100%;
            }
          }
          img {
            width: 100%;
            border-radius: 0.1rem;
            transition: all 0.5s ease-out 0.1s;
          }
          :hover {
            transform: scale(1.03);
          }
        }
      }
      .culture {
        height: 13.81rem;
        background-color: #f5f9ff !important;
        padding-top: 1.3rem;
        background: url('/images/bg/bg16.png') -2rem center no-repeat;
        position: relative;

        h2 {
          color: #2647c8;
        }
        .company-culture-banner {
          margin: 0.57rem auto 1.18rem;
          width: 15rem;
          height: 6rem;
          background: url('/images/banner/banner16.png') no-repeat;
          background-size: 100%;
        }
        .culture-swiper {
          margin: 0 auto;
        }
        .dropLogo2 {
          position: absolute;
          top: -0.6rem;
          left: 1.1rem;
        }
      }
      .prize {
        height: 9.79rem;
        padding-top: 1.61rem;
        box-sizing: border-box;
        overflow: hidden;
        position: relative;
        h2 {
          color: $--color-primary;
          margin-bottom: 0.6rem;
        }
        .prize-swiper {
          width: 15rem;
          height: 6.5rem;
          margin: 0 auto;
          overflow: hidden;
        }
        .dropLogo3 {
          position: absolute;
          top: 0.48rem;
          right: 0.75rem;
        }
      }
      .quality {
        height: 9.79rem;
        background-color: #f5f9ff !important;
        padding-top: 1.61rem;
        box-sizing: border-box;
        position: relative;
        h2 {
          color: $--color-primary;
          margin-bottom: 0.7rem;
        }
        .quality-swiper {
          width: 15rem;
          height: 4.1rem;
          margin: 0 auto;
          overflow: hidden;
        }
        .dropLogo4 {
          position: absolute;
          top: 0.71rem;
          left: 0.52rem;
        }
      }
    }
  }
  @keyframes up-and-down {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(0.8rem) rotate(20deg);
    }
    100% {
      transform: translateY(0);
    }
  }
  .dance {
    transform-origin: center;
    -webkit-animation-name: up-and-down;
    animation-name: up-and-down;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
    -webkit-animation-duration: 10s;
    animation-duration: 10s;
  }
  @keyframes fall {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(5.5rem);
      opacity: 0;
    }
  }
  .logoFallDown {
    transform-origin: center;
    animation-name: fall;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }
}
</style>
