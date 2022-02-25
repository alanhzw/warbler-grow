<template>
  <div class="page1-about-us">
    <div class="banner-wrapper">
      <div class="container">
        <div class="banner-box">
          <div class="banner-body">
            <h1>选择加入我们的理由</h1>
            <p>
              在风口上，做一只御风成长的飞鹰！<br>
              在这里，有梦想大胆闯，公司是你最坚强的后盾！
            </p>
          </div>
        </div>
        <div class="card-list">
          <div class="brd-item brd-item1">
            <div class="brd-hover">
              <i></i>
              <p>
                电商—朝阳行业，“人货场”在不断演变，每天都有新的机遇，我们所处的电商用户营销领域更是行业未来的发展趋势。
              </p>
            </div>
            <img src="/images/brd1.png">
            <p class="brd-desc">优秀的赛道</p>
          </div>
          <div class="brd-item brd-item2">
            <div class="brd-hover">
              <i></i>
              <p>
                比肩世界500强，长期与600多个各行各业的头部品牌、以及各大主流电商平台深度合作，与优秀的人共事。
              </p>
            </div>
            <img src="/images/brd2.png">
            <p class="brd-desc">优秀的同伴</p>
          </div>
          <div class="brd-item brd-item3">
            <div class="brd-hover">
              <i></i>
              <p>
                公司积累了丰富的行业知识和专业技术，可以让员工快速成长，也会指定师傅带着新员工了解业务，有跨部门跨地区的轮岗机会。
              </p>
            </div>
            <img src="/images/brd3.png">
            <p class="brd-desc">学习机会多</p>
          </div>
          <div class="brd-item brd-item4">
            <div class="brd-hover">
              <i></i>
              <p>
                拥有领先的平台经验和先进的技术能力，并且能够与时俱进，立于行业领先地位，这些是公司的核心竞争力。
              </p>
            </div>
            <img src="/images/brd4.png">
            <p class="brd-desc">业务有实力</p>
          </div>
          <div class="brd-item brd-item5">
            <div class="brd-hover">
              <i></i>
              <p>
                提供两个方向的晋升通道：技术业务线和管理线。每年两次晋升机会，有着清晰、灵活的职业发展路径。
              </p>
            </div>
            <img src="/images/brd5.png">
            <p class="brd-desc">晋升有门路</p>
          </div>
          <div class="brd-item brd-item6">
            <div class="brd-hover">
              <i></i>
              <p>
                有竞争力的薪酬体系，让你凭借能力、贡献获得合理报酬；人性化待遇，给努力、奋进的员工及时反馈。
              </p>
            </div>
            <img src="/images/brd6.png">
            <p class="brd-desc">努力有回报</p>
          </div>
          <div class="brd-item brd-item7">
            <div class="brd-hover">
              <i></i>
              <p>
                工作氛围好、福利待遇好，公司能帮助员工在生活和家庭方面解决后顾之忧，在这里快乐工作，得到尊重和认同。
              </p>
            </div>
            <img src="/images/brd7.png">
            <p class="brd-desc">团队有温度</p>
          </div>
        </div>
      </div>
    </div>
    <div class="recruit-wrapper">
      <div class="container">
        <h2>招聘岗位</h2>
        <div class="recruit-city">
          <ul>
            <li class="dalian-scruit">
              <a :href="`/about/jobRecruit?cityIndex=1`">
                <p>大连社招</p>
                <p>Dalian</p>
              </a>
            </li>
            <li class="beijing-scruit">
              <a :href="`/about/jobRecruit?cityIndex=2`">
                <p>北京社招</p>
                <p>Beijing</p>
              </a>
            </li>
            <li class="shanghai-scruit">
              <a :href="`/about/jobRecruit?cityIndex=3`">
                <p>上海社招</p>
                <p>Shanghai</p>
              </a>
            </li>
            <li class="school-scruit">
              <a :href="`/about/jobRecruit?cityIndex=4`">
                <p>校园招聘</p>
                <p>Campus</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="personnel-wrapper">
      <div class="container">
        <h2>人才发展体系</h2>
        <div class="system">
          <div v-for="(item, index) in systemList"
               :key="index"
               class="item">
            <div class="media-body">
              <div class="title-3 under-line">{{ item.title }}</div>
              <ul>
                <li v-for="(obj, i) in item.desc"
                    :key="i">{{ obj }}</li>
              </ul>
            </div>
            <div class="media-image">
              <img :src="`/images/au${index + 1}.png`">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutUs',
  data () {
    return {
      num: 0,
      brdDisplay: false,
      isfocus: true,
      noimg: true,
      timeAxis: [
        {
          year: '2009',
          content: '成为最早入驻淘宝的ISV服务商之一'
        },
        {
          year: '2016',
          content: '成为京东ISV服务商'
        },
        {
          year: '2018',
          content: '荣获京东服务市场“京卓越”奖项'
        },
        {
          year: '2019',
          content: '成为苏宁核心ISV服务商，与苏宁<br>多个团队深度合作'
        },
        {
          year: '2020',
          content: '陆泽科技北京运营总部成立'
        },
        {
          year: '2020',
          content:
            '第九届中国创新创业<br>大赛大中小企业融通<br>专业赛（京东专场）<br>一等奖'
        },
        {
          year: '2021',
          content: '南京、上海分公司成立'
        }
      ],
      systemList: [
        {
          title: '完善的发展机制',
          desc: ['双通道职级发展体系', '职级胜任力模型', '人才盘点机制']
        },
        {
          title: '赋能的培养体系',
          desc: [
            '促进业务发展的企业大学',
            '线上线下的学习平台',
            '用于实践的学习项目'
          ]
        },
        {
          title: '全面的绩效管理',
          desc: ['客观的衡量工具', '科学的管理流程', '自上而下的监督机制']
        },
        {
          title: '透明的晋升机制',
          desc: ['明确的晋升标准', '公开的晋升流程', '完善的晋升制度']
        }
      ],
      honimgurl: [
        '/images/honimg/hon1.png',
        '/images/honimg/hon2.png',
        '/images/honimg/hon3.png',
        '/images/honimg/hon4.png',
        '/images/honimg/hon5.png',
        '/images/honimg/hon6.png',
        '/images/honimg/hon7.png',
        '/images/honimg/hon8.png',
        '/images/honimg/hon9.png',
        '/images/honimg/hon10.png',
        '/images/honimg/hon11.png',
        '/images/honimg/hon12.png',
        '/images/honimg/hon13.png'
      ],
      authimgurl: [
        '/images/auimg/au1.png',
        '/images/auimg/au2.png',
        '/images/auimg/au3.png',
        '/images/auimg/au4.png',
        '/images/auimg/au5.png',
        '/images/auimg/au6.png'
      ],
      hondesc: [
        '2013第八届中国网上零售年会-杰出电商促销服务',
        '2014思路电商服务年度风云奖-杰出电商促销服务',
        '2018年度京东京卓越奖杯',
        '2020第九届中国创新创业大赛（京东专场）一等奖',
        '2020年度京东京卓越奖杯',
        '2021第八届中国行业影响力品牌峰会-电商用户营销行业领导品牌奖',
        '2021第八届中国行业影响力品牌峰会-星级合作伙伴认证',
        '2021第六届世界零售峰会WRE最佳数字营销奖',
        '大连软件和信息技术服务业核心竞争力企业',
        '大连软件行业协会监事单位',
        '宝洁CRM特别顾问奖',
        '促销工具类金牌淘拍档',
        '京东零售用增-品牌用户运营2021.618案例共建优秀服务商'
      ],
      audesc: [
        '信息系统安全等级保护-等保三级认证',
        '高新技术企业证书',
        'ISO9001质量管理体系认证证书',
        'ISO27001信息安全管理体系认证证书',
        '软件著作权登记证书',
        'CMMI3（软件能力成熟度-三级）'
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
  methods: {
    toggle1 () {
      this.num = 0
    },
    toggle2 () {
      this.num = 1
    },
    prev1 () {
      console.log('111')
      this.index1 -= 4
      this.descindex1 -= 4
    },
    next1 () {
      this.index1 += 4
      this.descindex1 += 4
    },
    prev2 () {
      this.index2 -= 4
      this.descindex2 -= 4
    },
    next2 () {
      this.index2 += 4
      this.descindex2 += 4
    }
  }
}
</script>

<style lang="scss" scoped>
.page1-about-us {
  h2 {
    font-size: 0.6rem;
    text-align: center;
  }

  p {
    font-size: 0.18rem;
    line-height: 0.36rem;
  }

  .banner-wrapper {
    height: 10.1rem;
    background-image: url(/images/banner/banner18.png);
    background-repeat: no-repeat;
    background-position: left bottom;
    background-size: 100% 3.26rem;
    padding-top: 1.63rem;
    box-sizing: border-box;
    position: relative;
    .container {
      position: relative;
      .banner-box {
        height: 3.75rem;
        display: flex;
        align-items: stretch;
        justify-content: center;
        // background-image: url("/images/banner/banner12.png");
        background-size: 100%;

        .banner-body {
          color: $--color-white;
          text-align: center;

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
      .card-list {
        width: 16rem;
        height: 5rem;
        position: relative;
        margin: 0 auto;
        .brd-item {
          width: 2.16rem;
          height: 3rem;
          background: url('/images/bg/bg18.png') no-repeat;
          background-color: #ffffff;
          background-position: left bottom;
          box-shadow: 0 0.06rem 0.28rem 0 rgba(21, 22, 25, 0.09);
          text-align: center;
          position: absolute;
          border-radius: 0.03rem;
          bottom: 0;
          left: 0;
          &:hover {
            box-shadow: 0 0.06rem 0.28rem 0 rgba(21, 22, 25, 0.09);
            background-color: #fff;
            .brd-hover {
              opacity: 1;
              p {
                opacity: 1;
                color: #333333;
              }
            }
            img {
              opacity: 0;
            }
            .brd-desc {
              opacity: 0;
            }
          }
          img {
            width: 0.67rem;
            height: 0.67rem;
            margin: 0;
          }

          .brd-arrow {
            position: absolute;
            bottom: -0.08rem;
            left: 0.9rem;
            border-right: 0.08rem solid transparent;
            border-left: 0.08rem solid transparent;
            border-top: 0.08rem solid #ffffff;
          }
          .brd-hover {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 3rem;
            line-height: 3rem;
            font-size: 0.16rem;
            color: #ffffff;
            opacity: 0;
            transition: all 0.6s ease-in-out;

            p {
              display: inline-block;
              width: 1.76rem;
              font-size: 0.16rem;
              line-height: 0.3rem;
              color: #ffffff;
              margin-top: 0.6rem;
              text-align: left;
            }
          }
        }
        .brd-item1 {
          bottom: 1.2rem;
          left: 0rem;
          z-index: 10;
          img {
            margin: 0.7rem 0 0.69rem 0;
          }
          .brd-hover {
            p {
              width: 1.61rem;
            }
          }
        }
        .brd-item2 {
          bottom: 2.8rem;
          left: 2.34rem;
          img {
            margin: 0.53rem 0;
            width: 0.72rem;
            height: 0.72rem;
          }
          .brd-hover {
            p {
              width: 1.79rem;
            }
          }
        }
        .brd-item3 {
          bottom: 1.2rem;
          left: 4.68rem;
          z-index: 10;
          img {
            margin: 0.53rem 0;
            width: 0.72rem;
            height: 0.8rem;
          }
          .brd-hover {
            span {
              width: 1.76rem;
              display: block;
              font-size: 0.19rem;
              font-weight: 600;
              line-height: 0.25rem;
              text-align: left;
            }
            p {
              text-align: left;
              width: 1.76rem;
            }
          }
        }
        .brd-item4 {
          bottom: 2.8rem;
          left: 7.02rem;
          img {
            margin: 0.71rem 0 0.41rem 0;
          }
          .brd-hover {
            p {
              width: 1.87rem;
            }
          }
        }
        .brd-item5 {
          bottom: 1.2rem;
          left: 9.35rem;
          img {
            margin: 0.55rem 0 0.48rem 0;
            width: 0.8rem;
            height: 0.66rem;
          }
          .brd-hover {
            p {
            }
          }
        }
        .brd-item6 {
          bottom: 2.8rem;
          left: 11.7rem;
          img {
            margin: 0.47rem 0 0.51rem 0;
          }
          .brd-hover {
            p {
            }
          }
        }
        .brd-item7 {
          bottom: 1.2rem;
          left: 14.05rem;
          img {
            margin: 0.64rem 0 0.57rem 0;
            width: 0.77rem;
            height: 0.72rem;
          }
          .brd-hover {
            p {
            }
          }
        }
      }
    }
  }
  .recruit-wrapper {
    width: 100%;
    height: 6.2rem;
    background: url('/images/bg/bg17.png');
    text-align: center;
    padding-top: 0.92rem;
    h2 {
      color: #2445c5;
    }
    ul {
      display: flex;
      margin-top: 0.73rem;
      li {
        margin-left: 0.5rem;
        box-sizing: border-box;
        cursor: pointer;
        transition: all 0.6s;
        &:hover {
          transform: scale(1.1);
        }
        a {
          display: block;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          position: relative;
          &::after {
            content: '点击查看具体岗位';
            display: inline-block;
            padding: 10px 14px;
            background-color: #fff5c6;
            position: absolute;
            color: #000000;
            top: 0.4rem;
            left: 0.2rem;
            font-size: 0.16rem;
            opacity: 0;
          }
          &:hover {
            &::after {
              opacity: 1;
            }
          }
        }
        p {
          font-size: 0.32rem;
          color: #ffffff;
        }
      }
      .dalian-scruit {
        width: 4.24rem;
        height: 2.5rem;
        background: url('/images/city/dalian.png') no-repeat;
        background-size: 100%;
        margin-top: 0.8rem;
        a {
          padding-top: 0.8rem;
          padding-right: 0.5rem;
        }
      }
      .beijing-scruit {
        width: 3.3rem;
        height: 3.36rem;
        background-color: green;
        background: url('/images/city/beijing.png') no-repeat;
        background-size: 100%;
        a {
          padding-top: 1.6rem;
          padding-right: 0.4rem;
        }
      }
      .shanghai-scruit {
        width: 3.07rem;
        height: 3.51rem;
        background-color: blue;
        background: url('/images/city/shanghai.png') no-repeat;
        background-size: 100%;
        margin-right: 1rem;
        a {
          padding-top: 1.7rem;
        }
      }
      .school-scruit {
        width: 3.11rem;
        height: 2.83rem;
        background-color: purple;
        background: url('/images/city/school.png') no-repeat;
        background-size: 100%;
        margin-top: 0.5rem;
        a {
          padding-right: 1.3rem;
          padding-top: 1.2rem;
          &::after {
            left: 1.5rem;
          }
        }
      }
    }
  }
  .milestone-wrapper {
    height: 7.92rem;
    display: flow-root;

    .card {
      padding: 1.2rem 1.01rem;
      box-sizing: border-box;

      h2 {
        color: $--color-primary;
        margin-bottom: 0.87rem;
      }
    }
  }

  .personnel-wrapper {
    height: 11rem;

    h2 {
      height: 2rem;
      line-height: 2rem;
      color: #2445c6;
    }

    .system {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      grid-row-gap: 0.4rem;
      grid-column-gap: 0.4rem;

      .item {
        width: 8.3rem;
        height: 3.6rem;
        background-color: $--color-white;
        box-shadow: 0rem 0.01rem 1.33rem 0rem rgba(38, 71, 200, 0.15);
        border-radius: 0.2rem;
        background-image: url('/images/bg/bg13.png');
        background-size: 100% 100%;
        display: flex;
        justify-content: space-between;
        align-items: stretch;
        box-sizing: border-box;

        .media-body {
          padding: 0.8rem 1rem;
        }

        .media-image {
          width: 2.45rem;
          padding: 0.5rem;

          img {
            max-height: 100%;
            max-width: 100%;
          }
        }

        .title-3 {
          font-size: 0.3rem;
          line-height: 1;
          color: $--color-primary;
          margin-bottom: 0.62rem;
        }

        ul {
          li {
            font-size: 0.24rem;
            color: $--color-text;
            line-height: 0.36rem;
          }
        }
      }
    }
  }

  .time-axis {
    width: 15.22rem;
    height: 3rem;
    position: relative;
    //background-image: url("/images/flow.png");
    //background-repeat: no-repeat;
    //background-position: left top;
    //background-size: 15.17rem 2.53rem;

    .items {
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      &:before,
      &:after {
        position: absolute;
        content: '';
        display: block;
      }

      &:before {
        left: 0;
        right: 0;
        height: 0.1rem;
        background-color: #cedbfc;
        border-radius: 0.05rem;
        top: 1.233rem;
      }

      &:after {
        left: 0;
        width: 14.5%;
        height: 0.1rem;
        border-radius: 0.05rem;
        top: 1.233rem;
        background-color: #5b79ef;
      }

      .item {
        box-sizing: border-box;
        flex: 1;
        white-space: nowrap;
        position: relative;
        height: 1.28rem;
        padding-left: 0.14rem;

        .year {
          font-size: 0.6rem;
          color: #5b79ef;
          margin-bottom: 0.17rem;
          cursor: default;
        }

        .desc {
          font-size: 0.18rem;
          line-height: 1.5;
          color: #999999;
          cursor: default;
          position: absolute;
        }

        &:before,
        &:after {
          position: absolute;
          content: '';
          display: block;
        }

        //line
        &:before {
          border-left: dashed 1px #cedbfc;
          border-right: dashed 1px #eef2fe;
          width: 0;
          left: 0;
          top: 0;
          height: 1.27rem;
        }

        //point
        &:after {
          width: 16px;
          height: 16px;
          background-color: #5b79ef;
          box-shadow: 0px 1px 9px 0px rgba(38, 71, 200, 0.37);
          border: solid 3px #ffffff;
          border-radius: 100%;
          z-index: 2;
        }

        &:hover {
          .year {
            color: #2647c8;
          }

          .desc {
            color: $--color-title;
          }
        }

        &:nth-child(1) {
          &:after {
            width: 28px;
            height: 28px;
            background-color: #2647c8;
            box-shadow: 0px 1px 9px 0px rgba(38, 71, 200, 0.37);
            background-image: url('/images/icons/icon-arrow-right-white.png');
            background-size: 8px 13px;
            background-repeat: no-repeat;
            background-position: 10px center;
            border: none;
          }
        }

        &:nth-child(odd) {
          &:after {
            left: 0;
            bottom: 0;
            transform: translate(-50%, 50%);
          }
        }

        &:nth-child(even) {
          margin-top: 1.29rem;
          padding-top: 0.75rem;
          //line
          &:before {
            top: 0;
          }

          &:after {
            left: 0;
            top: 0;
            transform: translate(-50%, -50%);
          }
        }
      }
    }
  }
}
</style>
