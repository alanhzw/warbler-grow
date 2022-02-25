<template>
  <div class="page-brand-service">
    <div class="banner-wrapper">
      <div class="container"></div>
    </div>
    <div class="block-wrapper">
      <div class="container">
        <card class="card-1">
          <h1>新闻动态</h1>
          <div class="news">
            <ul class="news-tab">
              <li :class="{ tabstyle: num == 0 }"
                  @click="toggle1()">
                <span>行业认可</span>
              </li>
              <li :class="{ tabstyle: num == 1 }"
                  @click="toggle2()">
                <span>企业资讯</span>
              </li>
              <li :class="{ tabstyle: num == 2 }"
                  @click="toggle3()">
                <span>陆泽观点</span>
              </li>
              <li :class="{ tabstyle: num == 3 }"
                  @click="toggle4()">
                <span>陆泽人</span>
              </li>
            </ul>
            <!-- 行业认可 -->
            <div class="news-more-content">
              <div v-show="num == 0"
                   class="news1-content">
                <div v-for="(item, index) in dataShow"
                     :key="index"
                     class="newsmore-item-content">
                  <a :href="item.contentLink"
                     title="点击进入新闻详情">
                    <div class="pic">
                      <img :src="item.imgUrl"
                           alt=""
                           class="news-img">
                    </div>
                    <div class="item-content-right">
                      <h3>{{ item.title }}</h3>
                      <p class="content">{{ item.content }}</p>
                    </div>
                  </a>
                </div>
              </div>
              <!-- 企业资讯 -->
              <div v-show="num == 1"
                   class="news2-content">
                <div v-for="(item, index) in dataShow"
                     :key="index"
                     class="newsmore-item-content">
                  <a :href="item.contentLink"
                     title="点击进入新闻详情">
                    <div class="pic">
                      <img :src="item.imgUrl"
                           alt=""
                           class="news-img">
                    </div>
                    <div class="item-content-right">
                      <h3>{{ item.title }}</h3>
                      <p class="content">{{ item.content }}</p>
                    </div>
                  </a>
                </div>
              </div>
              <!-- 陆泽观点 -->
              <div v-show="num == 2"
                   class="news3-content">
                <div v-for="(item, index) in dataShow"
                     :key="index"
                     class="newsmore-item-content">
                  <a :href="item.contentLink"
                     title="点击进入新闻详情">
                    <div class="pic">
                      <img :src="item.imgUrl"
                           alt=""
                           class="news-img">
                    </div>
                    <div class="item-content-right">
                      <h3>{{ item.title }}</h3>
                      <p class="content">{{ item.content }}</p>
                    </div>
                  </a>
                </div>
              </div>
              <!-- 陆泽人 -->
              <div v-show="num == 3"
                   class="news4-content">
                <div v-for="(item, index) in dataShow"
                     :key="index"
                     class="newsmore-item-content">
                  <a :href="item.contentLink"
                     title="点击进入新闻详情">
                    <div class="pic">
                      <img :src="item.imgUrl"
                           alt=""
                           class="news-img">
                    </div>
                    <div class="item-content-right">
                      <h3>{{ item.title }}</h3>
                      <p class="content">{{ item.content }}</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="page-bar">
            <ul>
              <li>
                <a :disabled="currentPage == 0 ? true : false"
                   @click="prePage()">上一页</a>
              </li>
              <li v-for="index in indexs"
                  :key="index"
                  :class="{ active: currentPage == index - 1 }">
                <a @click="btnPage(index)">{{ index }}</a>
              </li>
              <li>
                <a :disabled="currentPage == 0 ? true : false"
                   @click="nextPage()">下一页</a>
              </li>
            </ul>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsMore',
  components: {},
  data () {
    return {
      num: 0,
      pageSize: 10, // 每页显示数量
      currentPage: 0, // 当前页数
      all: 1, // 总共页数
      isDisable: true,
      newsList: [
        {
          imgUrl: '/images/news/news13.png',
          title: '2022H1京牌营销认证，陆泽科技再次荣耀摘星！',
          content: '今年的京牌营销认证·公司星级认证全面升级，细分不同营销赛道对各类合作伙伴进行星级认证。陆泽科技以强大的数据研发实力和深度的洞察分析理论，荣获数据服务商高阶认证...',
          contentLink: 'https://mp.weixin.qq.com/s/V3M-go6eGutqCl5sSIXBRA'
        },
        {
          imgUrl: '/images/news/news14.png',
          title: '陆泽科技斩获京东京牌代理双11大促两项殊荣！',
          content: '为了感谢并激励营销伙伴在今年11.11的杰出表现，京东京牌代理设立了“11.11大促杰出贡献奖”，从多维度对优质营销伙伴及电商人才进行加冕...',
          contentLink: 'https://mp.weixin.qq.com/s/NA7815YAV29hugB-l0BvlA'
        },
        {
          imgUrl: '/images/news/news15.png',
          title: '陆泽科技评选为“京牌营销认证共建单位”，成为京东优质共建伙伴！',
          content: '近日，京东发布“京牌代理优质合作伙伴——京牌共建单位”名单，陆泽科技成功入选，成为优质的京牌代理生态合作伙伴...',
          contentLink: 'https://mp.weixin.qq.com/s/z0n-ozovNSZtbtPEMo7hAg'
        },
        {
          imgUrl: '/images/news/news16.png',
          title: '陆泽科技荣获首批京东营销360超星合作伙伴！',
          content: '10月15日，京东京牌代理正式发布“京东营销360超星合作伙伴计划”，陆泽科技作为TOP代理成功入选首批合作伙伴...',
          contentLink: 'https://mp.weixin.qq.com/s/g2-_oUbUDCrVz_nzM5vlHA'
        },
        {
          imgUrl: '/images/news/news5.png',
          title: '陆泽科技成为京东首批品牌用户运营服务商，受邀在第11期京牌训练营宣讲会员运营经验！',
          content: '今年618后，由京东零售用户增长与运营部、联合商业提升广告渠道销售部共同发起了品牌用户运营服务商招募，京东正式公布了招募结果，陆泽科技很荣幸地名列其中...',
          contentLink: 'https://mp.weixin.qq.com/s/JBvGdMkxhhA6lVkvP2dUDQ'
        },
        {
          imgUrl: '/images/news/news6.png',
          title: '我们又又又被京东翻牌子啦！',
          content: '随着各品牌对用户增长与运营业务的重视，品牌对在平台上开展用户业务、提升用户运营效率的需求也日益迫切,今年4月，京东品牌用户增长部启动了品牌用户增长案例共建评选项目，旨在通过案例共...',
          contentLink: 'https://mp.weixin.qq.com/s/fQTE4box-Tg00FGnYzttbA'
        },
        {
          imgUrl: '/images/news/news4.png',
          title: '从4A到GOAL，京东品牌用户增长方法论到底升级了什么？',
          content: '随着移动互联网步入后流量时代，人口红利日渐消失的当下，存量市场的竞争也日益激烈，以流量为主的营销模式...',
          contentLink: 'https://mp.weixin.qq.com/s/q3PA7qb_qiD-ywf6tQVMjg'
        },
        {
          imgUrl: '/images/news/news7.png',
          title: '清扬Goal二期案例，我们被京东翻牌了！',
          content: '联合利华-清扬作为洗护发品类的头部品牌，一直在电商精准营销、精细化运营上走在前列。本次携手 陆泽科技 参加GOAL模型项目的共建历经京东平台方的层层筛选，清扬的案例脱颖而出，被评选...',
          contentLink: 'https://mp.weixin.qq.com/s/JY5Ev8xA3rZNVaMgr9ekAw'
        },
        {
          imgUrl: '/images/news/news8.png',
          title: '陆泽荣获WRE最佳数字营销服务商',
          content: '2021年1月19日第六届WRE消费品CIO峰会2021在上海隆重举行。本次峰会就科技驱动零售数字化转型与创新，聚焦零售科技资讯、数字化转型标杆案例进行了分享与研讨....',
          contentLink: 'https://mp.weixin.qq.com/s/-o_teD04bsaP09EkW2_6Tg'
        }
      ],
      newsList1: [
        {
          imgUrl: '/images/news/news17.png',
          title: '陆泽科技上海分公司正式成立啦！',
          content: '公司高层领导、分公司全体员工齐聚上海，共同见证陆泽科技上海分公司正式开业！开业仪式上，陆泽科技有限公司董事长李世祥代表全公司，对上海分公司正式成立表示衷心的祝贺，对分公司所有新同学送上热烈的欢迎和美好的祝福...',
          contentLink: 'https://mp.weixin.qq.com/s/FGWrGxx8JXY0FX5t4weKcw'
        },
        {
          imgUrl: '/images/news/news3.png',
          title: '看见电商行业背后的英雄 央视为何如此关注这家服务商？',
          content: '电商行业的快速崛起，已然改变了人们的购物习惯。而在电商的茫茫大海之中，有这样一群人，他们用专业的技术、灵活的运营方式，辅助着电商行业的发展...',
          contentLink: 'https://mp.weixin.qq.com/s/w0hIzPFYdQa0ndiYXmhkyA'
        },
        {
          imgUrl: '/images/news/news9.png',
          title: '辽宁省领导考察团莅临陆泽 对陆泽科技的创新发展给予了高度赞扬',
          content: '021年1月28日上午，辽宁省领导考察团莅临陆泽科技进行参观考察。陆泽科技有限公司董事长李世祥与总经理贾宁接待了考察团并以陆泽科技公司发展历程...',
          contentLink: 'https://mp.weixin.qq.com/s/oNxHR9T0oohKNuDaKjeUrw'
        }
      ],
      newsList2: [
        {
          imgUrl: '/images/news/news11.png',
          title: '京东官方白皮书解读：后流量时代，用户增长何去何从？',
          content: '在过去的一年多的时间里，新冠疫情改变了人们的日常生活轨迹，也在无形中改变了人们的消费习惯，突如其来的危机让传统消费市场面临诸多变局与困境...',
          contentLink: 'https://mp.weixin.qq.com/s/vsZWG4jG3yAnIPtqtWmWug'
        }
      ],
      newsList3: [
        {
          imgUrl: '/images/news/news10.png',
          title: '聆听GMV背后电商服务商的心路历程：如何理性看待618？',
          content: '如今的电商都经历了什么?听资深行业专家讲述她与电商的十年...',
          contentLink: 'https://mp.weixin.qq.com/s/mU1Q0doNYtVU4mKTrP7Ghw'
        },
        {
          imgUrl: '/images/news/news12.png',
          title: '蓄势待发 欢迎你的加入 | 陆泽科技2021首届新员工入职培训大会',
          content: '近日，陆泽科技有限公司2021年3月新员工入职培训大会，在大连东软信息软件园B2座陆泽2号办公室顺利举行，二十余位新员工与陆泽科技高管一同参加了大会...',
          contentLink: 'https://mp.weixin.qq.com/s/D3FG341hylzGOUuwEDNFTQ'
        }
      ]
    }
  },
  computed: {
    indexs () {
      let left = 1
      let right = this.all
      const ar = []
      if (this.all >= 5) {
        if (this.currentPage > 3 && this.all - 2) {
          left = this.currentPage - 2
          right = this.currentPage + 2
        } else if (this.currentPage <= 3) {
          left = 1
          right = 5
        } else {
          right = this.all
          left = this.all - 4
        }
      }
      while (left <= right) {
        ar.push(left)
        left++
      }
      return ar
    },
    dataShow () {
      const start = this.currentPage * this.pageSize
      const end = Math.min(
        (this.currentPage + 1) * this.pageSize,
        this.newsList.length
      )
      if (this.num == 0) {
        return this.newsList.slice(start, end)
      } else if (this.num == 1) {
        return this.newsList1.slice(start, end)
      } else if (this.num == 2) {
        return this.newsList2.slice(start, end)
      } else {
        return this.newsList3.slice(start, end)
      }
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
  },
  methods: {
    toggle1 () {
      this.num = 0
    },
    toggle2 () {
      this.num = 1
    },
    toggle3 () {
      this.num = 2
    },
    toggle4 () {
      this.num = 3
    },
    nextPage () {
      if (this.currentPage == 0) {
        return
      }
      this.currentPage++
    },
    prePage () {
      if (this.currentPage == 0) {
        return
      }
      this.currentPage--
    },
    btnPage (page) {
      this.currentPage = page - 1
    }
  }
}
</script>

<style lang="scss" scoped>
.page-brand-service {
  .banner-wrapper {
    height: 10.1rem;
    display: flow-root;
    margin-top: 1rem;
    background-color: #fff !important;
  }

  .block-wrapper {
    margin-top: -9rem;

    .card {
      margin-bottom: 0.7rem;
    }

    .card-1 {
      text-align: center;
      width: 17rem;
      padding-bottom: 0.17rem;
      position: relative;
      padding: 0.82rem 0;
      min-height: 19rem;
      box-sizing: border-box;
      h1 {
        font-size: 0.48rem;
        margin: 0 auto;
        color: $--color-primary;
        font-weight: bold;
      }
      .news {
        width: 100%;
        margin-top: 0.66rem;
        .news-tab {
          width: 7rem;
          height: 0.6rem;
          background-color: #f5f6fa;
          border-radius: 0.25rem;
          display: flex;
          margin: 0 auto;
          li {
            position: relative;
            width: 1.75rem;
            height: 0.6rem;
            cursor: pointer;
            border-radius: 0.42rem;
            overflow: hidden;

            span {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              line-height: 0.6rem;
              color: #999;
              font-size: 0.23rem;
              text-align: center;
              transition: color 0.3s;
              z-index: 2;
            }
          }
          .tabstyle {
            background-color: #ffffff;
            border: 1px solid #f5f6fa;
          }
        }
        .news-more-content {
          width: 14.48rem;
          margin: 0.75rem auto 0;
          .news1-content,
          .news2-content,
          .news3-content,
          .news4-content {
            display: flex;
            flex-wrap: wrap;
            width: 14rem;

            .newsmore-item-content {
              width: 6.2rem;
              height: 1.9rem;
              padding: 0.3rem;
              margin-left: 0.2rem;
              margin-bottom: 0.2rem;
              background: url(/images/culture/bg.png);
              background-size: 100% 100%;
              cursor: pointer;
              transition: all 0.5s;
              a {
                display: flex;
                width: 100%;
                height: 100%;
                .pic {
                  width: 2.5rem;
                  height: 1.4rem;
                  img {
                    width: 100%;
                    height: 100%;
                  }
                }
                .news-img {
                  margin-top: 0.23rem;
                  transition: all 200ms linear;
                }
                .item-content-right {
                  width: 4.36rem;
                  height: 1rem;
                  text-align: left;
                  margin: 0.2rem 0 0 0.3rem;
                  h3 {
                    display: block;
                    font-size: 0.2rem;
                    color: #666666;
                    font-weight: bold;
                    line-height: 0.25rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                  }
                  p {
                    color: #999999;
                    font-size: 0.15rem;
                    margin-top: 0.1rem;
                    line-height: 0.29rem;
                  }
                }
              }
              &:hover {
                transform: scale(1.05);
              }
            }
          }
        }
      }
      .page-bar {
        width: 5.1rem;
        position: absolute;
        bottom: 1.3rem;
        left: 7rem;
        ul {
          width: 100%;
          height: 100%;

          .active {
            a {
              color: #fff;
              cursor: default;
              background-color: #337ab7;
              border-color: #337ab7;
            }
          }

          a {
            border: 1px solid #ddd;
            text-decoration: none;
            position: relative;
            float: left;
            margin-left: 0.1rem;
            padding: 0.1rem 0.15rem;
            color: #999999;
            font-size: 0.23rem;
            cursor: pointer;

            &:hover {
              background-color: #eee;
            }
          }
        }
      }
    }
  }
}
</style>
