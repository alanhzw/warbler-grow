<template>
  <div class="page-brand-service">
    <div class="banner-wrapper">
      <div class="container">
        <h1>鹿研院</h1>
        <p>
          致力于构建全域消费者增长运营学习平台，
          通过深度的行业洞察和市场分析，<br>
          输出专业运营方法论，分享成功实践经验。
        </p>
        <div class="banner-box">
          <div class="left">
            <button class="button button-reverse hide">免费咨询</button>
          </div>
        </div>
      </div>
    </div>
    <div class="block-wrapper">
      <div class="container">
        <card class="card-2">
          <h1>课程视频</h1>
          <div class="course-list">
            <div
              v-for="(item, index) in videoList"
              :key="index"
              class="course-item"
              @click="showVideo(item)"
            >
              <img class="cover" :src="item.cover" :alt="item.title">
              <p class="desc">{{ item.title }}</p>
            </div>
            <div class="coming-list">
              <img src="/images/coming.png" alt="">
            </div>
          </div>
        </card>
      </div>
      <div class="luze-teacher">
        <h2>鹿研院讲师团</h2>
        <div class="luze-swiper">
          <teacher-swiper
            :construct-list="constructList"
            :analyst-list="analystList"
          />
        </div>
      </div>
    </div>
    <video-player v-model="currentVideoShow" :data="currentVideo" />
  </div>
</template>

<script>
import VideoPlayer from '~/components/VideoPlayer'
import videos from '~/assets/videos'
import TeacherSwiper from '~/components/teacherSwiper.vue'
export default {
  name: 'BusinessCollege',
  components: { VideoPlayer, TeacherSwiper },
  data () {
    return {
      currentIndex: 0,
      currentVideoShow: false,
      currentVideo: {},
      videoList: videos.businessCollege,
      constructList: [
        {
          position: '高级客户经理',
          profile: '/images/profile/pro1.png',
          name: '乔倩',
          identific: '/images/profile/iden1.png',
          desc:
            '6年电商运营与服务经验，服务于母婴、个护、快消等多个类目的10余家SKA品牌，深谙品牌CRM运营策略和消费者增长方法论，精通公/私域短信精准营销，善于基于品牌特性和痛点提供消费者增长运营方案。'
        },
        {
          position: '高级数据咨询经理',
          name: '姜朗',
          profile: '/images/profile/pro2.png',
          identific: '/images/profile/iden1.png',
          desc:
            '丰富的电商数据分析与咨询经验，具有很强的数据敏感性和敏锐的数据洞察力。深耕母婴、食品、个护、家清等多个类目，为数十家SKA和KA品牌输出基于业务场景的个性化数据分析报告和运营增长策略，并多次参与京东GOAL项目共建。'
        },
        {
          position: '高级销售经理',
          name: '王缓',
          profile: '/images/profile/pro3.png',
          identific: '/images/profile/iden1.png',
          desc:
            '10年电商运营与营销经验，互动营销专家，曾多次为京东商家提供互动营销和用户运营培训，尤其擅长推动品牌全渠道数据整合和会员体系打通。能够快速了解品牌痛点，为品牌互动营销和用户运营提供定制化解决方案。'
        },
        {
          position: '高级运营经理',
          name: '周凤彬',
          profile: '/images/profile/pro4.png',
          identific: '/images/profile/iden1.png',
          desc:
            '深耕电商运营领域5年，具备丰富的电商运营实战经验，精通互动营销、会员运营、精准营销等多领域运营技巧，对陆泽各产品系均有深入了解。'
        },
        {
          position: '高级客户经理',
          name: '楼超',
          profile: '/images/profile/ana1.png',
          identific: '/images/profile/iden2.png',
          desc:
            '4年电商品牌方CRM管理经验，曾在某世界500强个护品牌担任营销经理，负责京东、亚马逊、聚美优品、唯品会等多个平台生意管理，主导品牌电商店铺运营与推广项目，负责电商分销渠道及10家分销商的生意管理。现任陆泽科技高级客户经理，对酒水品类的运营与增长具有丰富的理论和实操经验。'
        },
        {
          position: '高级客户经理',
          name: '刘柳',
          profile: '/images/profile/ana2.png',
          identific: '/images/profile/iden2.png',
          desc:
            '深耕电商运营8年，具有丰富的电商整合营销和消费者人群运营经验，深度理解多电商平台运营模式，拥有多平台、多维度的运营方法论实践经验，助力品牌实现智慧、高效、实用的消费者营销体系。'
        }
      ],
      analystList: [
        {
          position: '陆泽商学院讲师 陆泽科技大客户经理',
          name: '楼超',
          profile: '/images/profile/ana1.png',
          identific: '/images/profile/iden2.png'
        },
        {
          position: '陆泽商学院讲师 陆泽科技大客户经理',
          name: '刘柳',
          profile: '/images/profile/ana2.png',
          identific: '/images/profile/iden2.png'
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
    .container {
      margin-top: 1.8rem;
      h1 {
        font-size: 0.6rem;
        font-weight: 500;
        text-align: center;
        color: #ffffff;
        line-height: 0.5rem;
      }

      p {
        width: 4.8rem;
        height: 1.08rem;
        margin: 0.6rem auto 0;
        font-size: 0.24rem;
        line-height: 0.42rem;
        color: #ffffff;
        text-align: center;
      }
      .banner-box {
        color: $--color-white;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        background-image: url(/images/banner/banner13.png);
        background-repeat: no-repeat;
        background-position: left bottom;
        background-size: 100% 7.51rem;
        margin-top: -1.8rem;
        height: 7.51rem;
        .left {
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
  }

  .block-wrapper {
    margin-top: 1.47rem;

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
      margin-bottom: 0.7rem;
    }

    .card-2 {
      text-align: center;
      width: 17rem;
      margin-top: -4.52rem;
      padding-bottom: 0.5rem;
      height: 5rem;

      h1 {
        margin-top: 0.99rem;
        height: 0.57rem;
        font-size: 0.6rem;
      }
      .course-list {
        margin: 0 0 0 0.9rem;
        width: 15.7rem;
        display: flex;
        flex-wrap: wrap;
        position: relative;

        .course-item {
          width: 3.35rem;
          height: 1.9rem;
          position: relative;
          margin-left: 0.38rem;
          margin-bottom: 0.2rem;
          .cover {
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.36);
            border-radius: 0.08rem;
            object-fit: cover;
            cursor: pointer;
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
            text-align: center;
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
        .coming-list {
          width: 5.7rem;
          height: 4.27rem;
          position: absolute;
          top: -1.05rem;
          right: -0.4rem;
          cursor: pointer;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .luze-teacher {
      width: 100%;
      height: 7.5rem;
      text-align: center;
      margin-top: 1.01rem;
      h2 {
        font-size: 0.6rem;
        color: #2647c8;
        margin-bottom: 0.87rem;
      }
      .luze-swiper {
        width: 17rem;
        margin: 0 auto;
      }
    }
  }
}
</style>
