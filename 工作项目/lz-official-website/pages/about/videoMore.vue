<template>
  <div class="page-brand-service">
    <div class="banner-wrapper">
      <div class="container"></div>
    </div>
    <div class="block-wrapper">
      <div class="container">
        <card class="card-1">
          <h1>视频集锦</h1>
          <div class="video">
            <ul class="video-tab">
              <li :class="{ tabstyle: num == 0 }"
                  @click="toggle1()">
                <span>陆泽文化</span>
              </li>
              <li :class="{ tabstyle: num == 1 }"
                  @click="toggle2()">
                <span>爆款直达</span>
              </li>
              <li :class="{ tabstyle: num == 2 }"
                  @click="toggle3()">
                <span>大促专栏</span>
              </li>
            </ul>
            <div class="video-content">
              <div class="video1-content">
                <div v-for="(item, index) in dataShow"
                     :key="index"
                     class="cul-video-item"
                     @click="showVideo(item)">
                  <img class="cover"
                       :src="item.cover"
                       :alt="item.title">
                  <p class="desc">{{ item.title }}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- 分页 -->
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
    <video-player v-model="currentVideoShow"
                  :data="currentVideo" />
  </div>
</template>

<script>
import VideoPlayer from '~/components/VideoPlayer'
import videos from '~/assets/videos'

export default {
  name: 'VideoMore',
  components: { VideoPlayer },
  data () {
    return {
      num: 0,
      pageSize: 20,
      currentPage: 0,
      all: 1,
      currentVideoShow: false,
      currentVideo: {},
      videoList: videos.culture,
      videoList2: videos.popular,
      videoList3: videos.promotion
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
        this.videoList.length
      )
      if (this.num == 0) {
        return this.videoList
      } else if (this.num == 1) {
        return this.videoList2
      } else if (this.num == 2) {
        return this.videoList3
      } else {
        return this.videoList.slice(start, end)
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
    toPage (page) {
      this.currentPage = page
    },
    showVideo (item) {
      this.currentVideo = item
      this.currentVideoShow = true
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
      //padding-bottom: .17rem;
      position: relative;
      padding: 0.82rem 0;
      height: 17.4rem;
      box-sizing: border-box;

      h1 {
        font-size: 0.48rem;
        margin: 0 auto;
        color: $--color-primary;
        font-weight: bold;
      }

      .video {
        width: 100%;
        margin-top: 0.66rem;

        .video-tab {
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

        .video-content {
          width: 14.48rem;
          margin: 0.88rem auto 0;

          .video1-content {
            width: 100%;
            display: flex;
            flex-wrap: wrap;

            .cul-video-item {
              width: 3.25rem;
              height: 1.9rem;
              margin-left: 0.3rem;
              margin-bottom: 0.41rem;
              position: relative;
              background-color: rgba(0, 0, 0, 1);

              .cover {
                width: 100%;
                height: 100%;
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
                font-size: 0.13rem;
                color: #ffffff;
                text-align: left;
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
