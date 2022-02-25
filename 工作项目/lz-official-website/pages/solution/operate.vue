<template>
  <div class="page-digital-assets">
    <div class="banner-wrapper">
      <div class="container">
        <div class="banner-box">
          <div class="left">
            <h1>消费者增长运营</h1>
            <p>全周期、全链路、一站式营销解决方案，</p>
            <p>快速精解决用户资产营销转化难题</p>
            <button class="button button-reverse hide">免费咨询</button>
          </div>
          <div class="right">
            <img src="/images/banner/banner4.png"
                 alt="消费者增长运营">
          </div>
        </div>
      </div>
    </div>
    <div class="cdp-wrapper">
      <div class="container">
        <card>
          <h1>消费者资产管理平台CDP</h1>
          <p>从流量运营到用户运营，全方位构建消费者认知转化，助力品牌沉淀用户资产</p>
          <div class="cdp-list">
            <div v-for="(item,index) in CDPList"
                 :key="index"
                 class="cdp-item">
              <div class="cover">
                <img :src="`/images/icons/icon-${index+1}.png`"
                     :alt="item.title">
              </div>
              <div class="title">{{ item.title }}</div>
              <!--<p class="desc">{{item.desc}}</p>-->
            </div>
          </div>
        </card>
      </div>
    </div>
    <div v-for="(obj,index) in blockList"
         :key="index"
         class="block"
         :class="`block-${index+1}`">
      <div class="container">
        <div class="media-body">
          <h2>{{ obj.title }}</h2>
          <p v-html="obj.desc"></p>
          <ul>
            <li v-for="item in obj.items"
                :key="item">{{ item }}</li>
          </ul>
        </div>
        <div class="media-image">
          <img :src="`/images/da${index+1}.png`"
               :alt="obj.title">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SolutionOperate',
  data () {
    return {
      CDPList: [
        {
          title: '数据基台',
          desc: ''
        }, {
          title: '数据洞察',
          desc: ''
        }, {
          title: '消费者资产',
          desc: ''
        }, {
          title: '创意互动',
          desc: ''
        }, {
          title: '用户营销',
          desc: ''
        }
      ],
      blockList: [
        {
          title: '用户运营中台',
          desc: '打通线上线下用户数据，扩大私域用户池。打造全生命周期用户运营<br>管理中台，赋能品牌数字化变革',
          cover: '',
          items: ['会员权益', '积分任务', '积分商城', '社交裂变', '会员中心', '数据分析']
        },
        {
          title: '全链路自动化营销',
          desc: '智能化、精细化、自动化的精准营销解决方案，为品牌运营<br>赋能提效，全面提升用户价值',
          cover: '',
          items: ['全域精准营销', '智能人群策略', '订单全链路追踪', '营销效果追踪', '人群标签数据', '品牌营销数据']
        },
        {
          title: '全周期用户触达和体验管理',
          desc: '一站式用户运营平台，多渠道获客，私域流量运营，打造会员运营闭环',
          cover: '',
          items: ['会员拉新', '会员促活', '会员首购', '会员复购', '会员激活']
        },
        {
          title: '数据分析与洞察',
          desc: '大数据深度分析，全面了解每一位消费者，为运营决策<br>提供数据支撑',
          cover: '',
          items: ['会员信息', '商品信息', '会员订单', '实时订单', '销量日报', '评价信息', '人群信息', '互动数据']
        }
      ]
    }
  },
  head () {
    return {
      // title: '消费者增长运营'
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
          margin-top: .25rem;
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
        position: relative;

        &:before, &:after {
          content: '';
          background-color: $--color-primary;
          border-radius: 0.03rem;
          position: absolute;
          top: -0.22rem;
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
        max-width: 7.84rem;
      }
    }
  }

  .block-2 {
    background-image: url("/images/bg/bg9.png");
    background-repeat: no-repeat;
    background-size: auto 90%;
    background-position: left center;
    height: 9.52rem;

    .container {
      flex-direction: row-reverse;
    }

    .media-image {
      img {
        max-width: 9.97rem;
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
        max-width: 9.43rem
      }
    }
  }

  .block-4 {
    background-image: url("/images/bg/bg9.png");
    background-repeat: no-repeat;
    background-size: 17.80rem 10.02rem;
    background-position: left center;
    height: 12.28rem;

    .container {
      flex-direction: row-reverse;
    }

    .media-image {
      img {
        max-width: 9.04rem;
      }
    }
  }
}
</style>
