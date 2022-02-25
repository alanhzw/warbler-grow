<template>
  <div class="page-brand-service">
    <div class="banner-wrapper">
      <div class="container">
        <div class="banner-box">
          <div class="left">
            <h1>陆泽动态</h1>
            <button class="button button-reverse hide">免费咨询</button>
          </div>
        </div>
      </div>
    </div>
    <div class="block-wrapper">
      <div class="container">
        <card class="card-1">
          <div class="cul-tab-box">
            <ul class="cul-tab">
              <li>
                <a href="javascript:;"
                   class="cul-tab-item1"
                   :class="{ active: num == 0 }"
                   @click="toggle1()">视频集锦</a>
              </li>
              <li>
                <a href="javascript:;"
                   class="cul-tab-item2"
                   :class="{ active: num == 1 }"
                   @click="toggle2()">新闻动态</a>
              </li>
            </ul>
          </div>
          <div class="cul-tab-content">
            <div v-show="num == 0"
                 class="cul-video">
              <a href="/about/videoMore?"
                 class="more more1">更多></a>
              <div v-for="(item, index) in videoList"
                   :key="index"
                   class="cul-video-item"
                   @click="showVideo(item)">
                <img class="cover"
                     :src="item.cover"
                     :alt="item.title">
                <p class="desc">{{ item.title }}</p>
              </div>
            </div>
            <div v-show="num == 1"
                 class="news-tab-content">
              <div class="news-item">
                <a href="/about/newsMore?"
                   class="more more2">更多></a>
                <div v-for="(item, index) in newsList"
                     :key="index"
                     class="news-item-content">
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
        </card>
      </div>
    </div>
    <video-player v-model="currentVideoShow"
                  :data="currentVideo" />
  </div>
</template>

<script>
import VideoPlayer from '~/components/VideoPlayer'
import videos from '~/assets/videos'
export default {
  name: 'LuzeCulture',
  components: { VideoPlayer },
  data () {
    return {
      num: 0,
      currentVideoShow: false,
      currentVideo: {},
      videoList: videos.face.splice(0, 8),
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
          imgUrl: '/images/news/news17.png',
          title: '陆泽科技上海分公司正式成立啦！',
          content: '公司高层领导、分公司全体员工齐聚上海，共同见证陆泽科技上海分公司正式开业！开业仪式上，陆泽科技有限公司董事长李世祥代表全公司，对上海分公司正式成立表示衷心的祝贺，对分公司所有新同学送上热烈的欢迎和美好的祝福...',
          contentLink: 'https://mp.weixin.qq.com/s/FGWrGxx8JXY0FX5t4weKcw'
        }
      ]
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
    showVideo (item) {
      this.currentVideo = item
      this.currentVideoShow = true
    }
  }
}
</script>

<style lang="scss">
body {
  background-size: 100% 8.61rem !important;
}
.page-brand-service {
  .banner-wrapper {
    height: 10.1rem;
    display: flow-root;

    .banner-box {
      margin: 0.98rem 1rem 0 0;
      color: $--color-white;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      background-image: url(/images/banner/banner20.png);
      background-repeat: no-repeat;
      background-position: left bottom;
      background-size: 100% 4.99rem;
      height: 4.99rem;
      position: relative;
      .active-banner {
        width: 6.9rem;
        height: 3.65rem;
        position: absolute;
        right: 2rem;
        top: 0;
        img {
          width: 100%;
          height: 100%;
        }
      }

      .left {
        h1 {
          padding-top: 1.48rem;
          height: 0.57rem;
          font-size: 0.6rem;
          padding-left: 4.58rem;
        }

        p {
          font-size: 0.24rem;
          white-space: nowrap;
          padding-top: 0.25rem;
        }

        button {
          width: 1.7rem;
          height: 0.5rem;
        }
      }

      .right {
        align-self: flex-end;

        img {
          width: 7.9rem;
          height: 7.68rem;
        }
      }
    }
  }

  .block-wrapper {
    margin-top: -1.83rem;

    h1 {
      font-size: 0.6rem;
      color: $--color-primary;
      padding-top: 0.82rem;
      padding-bottom: 0.38rem;
    }

    h2 {
      font-size: 0.48rem;
      color: $--color-title;
    }

    p {
      font-size: 0.18rem;
      color: $--color-text;
      line-height: 1.5;
    }

    .card {
      margin-bottom: 1.2rem;
    }

    .card-1 {
      text-align: center;
      width: 17rem;
      padding-bottom: 1rem;
      position: relative;
      margin-top: -4.5rem;

      .cul-tab-box {
        margin-top: 0.38rem;

        .cul-tab {
          width: 15rem;
          height: 0.64rem;
          display: flex;
          margin: 0 auto;
          padding-top: 0.49rem;

          li {
            flex: 1;

            a {
              display: block;
              height: 0.65rem;
              line-height: 0.64rem;
              width: 2.4rem;
              margin-left: 4.3rem;
              text-align: center;
              font-size: 0.48rem;
              color: #737373;
            }

            .cul-tab-item2 {
              margin-left: 0.5rem;
            }

            .active {
              color: #2647c8;
              border-bottom: 0.06rem solid #2647c8;
              border-radius: 0.03rem;
            }
          }
        }
      }

      .more {
        position: absolute;
        top: 1.43rem;
        right: 1.59rem;
        color: #666666;
        font-size: 0.24rem;
      }

      .cul-tab-content {
        .cul-video {
          display: flex;
          flex-wrap: wrap;
          width: 15rem;
          margin: 0.95rem auto 0;

          .cul-video-item {
            width: 3.35rem;
            height: 1.9rem;
            margin-left: 0.36rem;
            margin-bottom: 0.8rem;
            position: relative;

            .cover {
              width: 3.35rem;
              height: 1.9rem;
              background-color: rgba(0, 0, 0, 0.36);
              object-fit: cover;
              cursor: pointer;
              border-radius: 0.08rem;
            }

            .desc {
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              height: 0.37rem;
              line-height: 0.37rem;
              background-color: rgba(0, 0, 0, 0.4);
              color: white;
              font-size: 0.13rem;
              padding: 0 0.2rem;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              word-break: break-all;
              box-sizing: border-box;
            }
            transition: all 200ms linear;

            &:hover {
              transform: scale(1.1);
            }
          }
        }
        .news-tab-content {
          .news-item {
            display: flex;
            flex-wrap: wrap;
            width: 14rem;
            margin: 0.8rem 0 0 1.2rem;

            .news-item-content {
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
    }
  }
}
</style>
