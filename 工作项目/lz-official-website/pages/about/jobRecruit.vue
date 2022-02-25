<template>
  <div class="page-brand-service">
    <div class="job-wrapper"
         :class="{ moreHeight: cityRecruitIndex == 2 || cityRecruitIndex == 3 }">
      <div class="container">
        <div class="article-header">
          <div class="link">
            <a href="/about/joinUs"
               class="arrow1">加入我们</a>
            <a href="javascript:;"
               class="arrow2">招聘岗位</a>
          </div>
        </div>
        <div class="recruitJobContent">
          <ul>
            <li v-for="(item, index) in jobContentList"
                :key="index"
                class="joblist-card">
              <a :href="
                  `/about/jobRecruitDetails?cityIndex=${cityRecruitIndex}&recruitIndex=${index}`
                ">
                <h2>{{ item.positionName }}</h2>
                <p>
                  {{ item.city }} | {{ item.positionName }} |
                  {{ item.recruitType }}
                </p>
                <p>
                  {{ item.recruitDesc1 }} <br>
                  {{ item.recruitDesc2 }}
                </p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsDetails',
  components: {},
  props: [],
  data () {
    return {
      cityRecruitIndex: 0,
      jobContentList: [],
      dalianJobList: [
        {
          positionName: '前端开发工程师',
          city: '大连',
          recruitType: '社招',
          recruitDesc1:
            '1、负责前端页面开发制作和维护，配合后台开发人员实现网站界面和功能；',
          recruitDesc2: '2、有扎实的Javascript基础，能独立完成相关工作任务；'
        },
        {
          positionName: 'Java开发工程师',
          city: '大连',
          recruitType: '社招',
          recruitDesc1: '1、负责产品代码开发； ',
          recruitDesc2: '2、针对高并发系统的持续优化和改进；'
        },
        {
          positionName: '大数据开发工程师',
          city: '大连',
          recruitType: '社招',
          recruitDesc1:
            '1、参与公司商业产品数据中台建设，包括BI平台，CDP平台及DMP平台等；',
          recruitDesc2: '2、参与大数据基础架构和技术体系的规划建设；'
        },
        {
          positionName: '用户运营',
          city: '大连',
          recruitType: '社招',
          recruitDesc1:
            '1、根据方案和要求，进行内外部沟通及协调相关资源，把握任务&时间节点，确保活动按照方案执行；',
          recruitDesc2: '2、项目结束后进行效果评估，跟进效果，建立方案通案库；'
        }
      ],
      beijingJobList: [
        {
          positionName: '营销策划',
          city: '北京',
          recruitType: '社招',
          recruitDesc1:
            '1、设计品牌用户营销活动：日常与客户经理配合，负责公司合作的KA客户（如宝洁、联合利华等)......',
          recruitDesc2: '2、电商互动活动整体策划'
        },
        {
          positionName: '用户运营',
          city: '北京',
          recruitType: '社招',
          recruitDesc1:
            '1、根据方案和要求，进行内外部沟通及协调相关资源，把握任务&时间节点，确保活动按照方案执行；',
          recruitDesc2: '2、项目结束后进行效果评估，跟进效果，建立方案通案库；'
        },
        {
          positionName: '资深客户经理',
          city: '北京',
          recruitType: '社招',
          recruitDesc1:
            '1.协助客户经理处理品牌基础运营事务，针对各项目进行基础流程优化和改善，建立基础运营管理流程；',
          recruitDesc2:
            '2.协助客户经理进行运营数据分析，建立日、周、月、季度等数据报告。并持续迭代报告内容，通过......'
        },
        {
          positionName: '销售经理',
          city: '北京',
          recruitType: '社招',
          recruitDesc1:
            '1、了解各主流电商平台用户互动的基本玩法，可独立对接品牌、平台的互动营销需求；',
          recruitDesc2:
            '2、结合品牌或平台的生意运营痛点，制定人群解决方案，落地人群规划。对电商数智化转型具有自己的见解；'
        },
        {
          positionName: '销售专员',
          city: '北京',
          recruitType: '社招',
          recruitDesc1:
            '1.协助销售经理日常对接品牌&平台的各项需求，具有良好的服务意识，持续跟进并反馈结果；',
          recruitDesc2:
            '2.协助销售经理对品牌的用户运营做深度剖析，挖掘痛点及生意机会改善点，并提供定制化解决方案；'
        }
      ],
      shanghaiJobList: [
        {
          positionName: '客户经理',
          city: '上海',
          recruitType: '社招',
          recruitDesc1:
            '1、作为多个/复杂客户与陆泽的对接点去审查相关问题，避免相应风险，提升服务合作等级，确保......',
          recruitDesc2:
            '2、管理好客户与公司之间的交付预期，与相对应的部门保持好联系；'
        },
        {
          positionName: '销售经理',
          city: '上海',
          recruitType: '社招',
          recruitDesc1:
            '1、了解各主流电商平台用户互动的基本玩法，可独立对接品牌、平台的互动营销需求；',
          recruitDesc2:
            '2、结合品牌或平台的生意运营痛点，制定人群解决方案，落地人群规划，对电商数智化转型具有自己的见解；'
        },
        {
          positionName: '销售专员',
          city: '上海',
          recruitType: '社招',
          recruitDesc1:
            '1、协助销售经理日常对接品牌&平台的各项需求，具有良好的服务意识，持续跟进并反馈结果；',
          recruitDesc2:
            '2、协助销售经理对品牌的用户运营做深度剖析，挖掘痛点及生意机会改善点，并提供定制化解决方案；'
        },
        {
          positionName: '营销策划',
          city: '上海',
          recruitType: '社招',
          recruitDesc1:
            '1、设计品牌用户营销活动：\n日常与客户经理配合，负责公司合作的KA客户(如宝洁、联合利华等)......',
          recruitDesc2: '2、电商互动活动整体策划'
        }
        // {
        //   positionName: '客户经理',
        //   city: '上海',
        //   recruitType: '社招',
        //   recruitDesc1:
        //     '1、作为多个/复杂客户与陆泽的对接点去审查相关问题，避免相应风险，提升服务合作等级，确保具体......',
        //   recruitDesc2:
        //     '2、管理好客户与公司之间的交付预期，与相对应的部门保持好联系；'
        // }
      ],
      campusJobList: [
        {
          positionName: '前端实习生',
          recruitType: '校招',
          recruitDesc1: ' 负责移动端和PC端前端web页面开发'
        },
        {
          positionName: '后端实习生',
          recruitType: '校招',
          recruitDesc1: '1、积极主动的完成指派的任务，确保交付时间及品质；',
          recruitDesc2:
            '2、对待工作认真负责，对自己所负责的任务需要进行阶段性回顾及检查，确保准确；'
        },
        {
          positionName: '测试实习生',
          recruitType: '校招',
          recruitDesc1: '1、由测试经理带领,根据产品需求编写测试用例;',
          recruitDesc2: '2、实施测试用例,并对产品问题进行跟踪分析和报告;'
        },
        {
          positionName: '数据分析实习生',
          recruitType: '校招',
          recruitDesc1:
            '1、协助数据经理日常对接品牌的各项数据需求，输出数据报表；',
          recruitDesc2:
            '2、协助对电商平台数据的收集整理分析，及时出具相关报表；'
        }
      ]
    }
  },
  created () {
    this.cityRecruitIndex = this.$route.query.cityIndex
  },
  mounted () {
    if (this.cityRecruitIndex == 1) {
      this.jobContentList = this.dalianJobList
    } else if (this.cityRecruitIndex == 2) {
      this.jobContentList = this.beijingJobList
    } else if (this.cityRecruitIndex == 3) {
      this.jobContentList = this.shanghaiJobList
    } else {
      this.jobContentList = this.campusJobList
    }
  }
}
</script>

<style lang="scss" scoped>
.page-brand-service {
  .job-wrapper {
    height: 15.49rem;
    display: flow-root;
    margin-top: 1rem;
    background-color: #fff !important;
    .container {
      .article-header {
        width: 13.86rem;
        height: 0.82rem;
        line-height: 0.82rem;
        margin: 0 auto;
        position: relative;
        .link {
          position: absolute;
          top: -0.18rem;
          left: -0.25rem;
          a {
            font-size: 0.2rem;
            position: relative;
          }
          .arrow1 {
            color: #2647c8;
            &:after {
              content: '';
              width: 0.08rem;
              height: 0.08rem;
              color: #2647c8;
              border-top: 0.01em solid #333333;
              border-right: 0.01rem solid #333333;
              transform: rotate(46deg);
              position: absolute;
              top: 0.1rem;
              left: 0.87rem;
            }
          }
          .arrow2 {
          }
        }
        span {
          font-size: 0.2rem;
          color: #333333;
        }
      }
      .recruitJobContent {
        margin-top: 0.86rem;
        .joblist-card {
          width: 14.33rem;
          height: 2.53rem;
          box-shadow: 0 0.01rem 1.3rem 0 rgba(0, 40, 134, 0.15);
          border-radius: 0.1rem;
          margin: 0 auto 0.53rem;
          padding: 0.36rem 0 0 0.99rem;
          box-sizing: border-box;
          transition: all 0.6s;
          a {
            display: block;
            width: 100%;
            height: 100%;
            h2 {
              color: #2647c8;
              font-size: 0.4rem;
            }
            :nth-child(2) {
              color: #646a73;
              font-size: 0.19rem;
              margin: 0.25rem 0;
            }
            :nth-child(3) {
              color: #666666;
              font-size: 0.24rem;
              line-height: 0.36rem;
            }
          }
        }
      }
    }
  }
  .moreHeight {
    height: 18.3rem;
  }
}
[v-cloak] {
  display: none;
}
</style>
