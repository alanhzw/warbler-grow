<template>
  <div class="join-us-page">
    <div class="job-wrapper" :class="{ anotherHeight: isAnotherHeight }">
      <div class="detail-container">
        <div class="page-header">
          <div class="link">
            <a href="/about/joinUs" class="arrow1">加入我们</a>
            <a
              :href="`/about/jobRecruit?cityIndex=${cityRecruitIndex}`"
              class="arrow2"
            >招聘岗位</a>
            <a href="javascript:;" class="arrow3">{{ jobName }}</a>
          </div>
        </div>
        <div class="detailContent">
          <h2>{{ jobName }}</h2>
          <p>
            {{ jobCity }} | {{ jobName }} |
            {{ employType }}
          </p>
          <div class="job-responsibility">
            <h3>岗位职责</h3>
            <div class="duty-content" v-html="dutyContent"></div>
          </div>
          <div class="job-require">
            <h3>任职要求</h3>
            <div class="require-content" v-html="requireContent"></div>
          </div>
          <a href="mailto:hrhiring@lucidata.cn" class="join-email">立即投递</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JobRecruitDetails',
  components: {},
  props: [],
  data () {
    return {
      cityRecruitIndex: 0,
      jobContentDetailList: [],
      changeJobText: '',
      dutyContent: '',
      requireContent: '',
      jobName: '',
      employType: '',
      jobCity: '',
      isAnotherHeight: false,
      dalianJobDetailList: [
        {
          positionName: '前端开发工程师',
          city: '大连',
          recruitType: '社招',
          jobDuty:
            '1、负责前端页面开发制作和维护，配合后台开发人员实现网站界面和功能；\n 2、有扎实的Javascript基础，能独立完成相关工作任务；\n 3、改善当前的产品的用户体验, 提升产品的稳定性和壮硕性；\n4、参与前端组件/框架的开发工作。',
          jobRequire:
            '1、有html/css 开发经验(有html5/css3的开发经验优先), 考虑浏览器的兼容特性；\n2、了解Javascript，能独立完成Javascript代码的编写和优化工作，熟悉jquery、kissy等库；\n3、熟练使用vue，能够独立开发vue组件；\n4、熟悉vue-router、vuex、axios，有react相关项目经验的优先；\n5、能够自己写出简单的js组件供给其他开发调用；\n6、了解至少一种后端语言, 如Java, PHP等；\n7、有blog, github等描叙自己产出的优先；\n8、性格开朗, 具有亲和力,工作态度严谨,具有很好的团队合作能力。'
        },
        {
          positionName: 'Java开发工程师',
          city: '大连',
          recruitType: '社招',
          jobDuty:
            '1、负责产品代码开发；\n 2、针对高并发系统的持续优化和改进\n 3、解决项目一般技术难题；\n4、新技术、组件持续学习及推广。',
          jobRequire:
            '1、要求本科及以上学历,相关工作经验3年及以上；\n2、精通java语言编程,有良好的数据结构及算法功底；\n3、熟练掌握SpringMvc、SpringBoot、SpringCloud等开发框架配置使用；\n4、熟悉设计模式；\n5、熟悉Mysql数据库及SQL、存储过程编写,具备数据库设计和优化能力；\n6、有良好的软件工程知识和质量意识,具备较强的系统设计能力和代码开发能力；\n7、具备设计和部署优化架构的经验。'
        },
        {
          positionName: '大数据开发工程师',
          city: '大连',
          recruitType: '社招',
          jobDuty:
            '1、参与公司商业产品数据中台建设，包括BI平台，CDP平台及DMP平台等；\n 2、参与大数据基础架构和技术体系的规划建设；\n 3、参与公司数据仓库建设，包括数据建模，数据采集，转换，存储等；\n4、协助相关业务数据服务接口的制定。',
          jobRequire:
            '1、本科或以上学历，计算机、数学、通信等相关专业；4年以上软件开发从业经验；2年以上大数据开发经验；\n2、熟悉Linux，精通Java/Scala/python语言中的一种或多种，熟悉Java技术栈；java功底扎实，优秀的工程开发能力；\n3、熟悉大数据领域的技术栈，如Spark/Flink/Hadoop/Hive等；\n4、对mysql、clickhouse, elk, mongo有较好的使用与开发经验；\n5、对spark执行原理及使用调优有深入见解者优先，有Flink开发经验；\n6、有海量数据的处理和并行计算开发经验，熟悉hadopp生态，有实际大数据项目经验优先；\n7、分析问题解决问题能力、学习能力、良好的团队合作意识。'
        },
        {
          positionName: '用户运营',
          city: '大连',
          recruitType: '社招',
          jobDuty:
            '1、根据方案和要求，进行内外部沟通及协调相关资源，把握任务&时间节点，确保活动按照方案执行；\n 2、项目结束后进行效果评估，跟进效果，建立方案通案库；\n 3、根据公司项目安排，协助项目团队或行政部门完成项目和日常辅助工作；\n4、根据客户需求并结合项目实际情况，优化及改善项目实施流程协助上级，与内部协作团队保持有效沟通，促成项目工作按计划执行和完成。',
          jobRequire:
            '1、教育背景：本科及以上学历，专业不限；\n2、工作经验：2年以上电商数据或者人群运营相关经验；\n3、职位技能：能独立完成策划设计及执行工作，较强组织、协调和交际能力；\n4、沟通能力：优秀的沟通能力，对外能深入了解客户需求，对内能高效沟通协调。\n'
        }
      ],
      beijingJobDetailList: [
        {
          positionName: '营销策划',
          city: '北京',
          recruitType: '社招',
          jobDuty:
            '1、设计品牌用户营销活动：\n日常与客户经理配合，负责公司合作的KA客户（如宝洁、联合利华等）在电商平台上日常用户营销活动的规划。\n2、电商互动活动整体策划：\n1）参与较为复杂的日常互动活动策划，以支持客户经理为品牌提供高水平的互动服务。\n2）基于客户特殊营销活动需求，例如超级品牌日、大牌日等，策划配套的用户互动活动。\n3、对接电商品类营销，发起用户相关大型营销项目：\n结合品类营销的运营需求，策划用户相关大型营销项目，以撬动品牌营销投入，推广本公司的用户业务，形成品类、品牌和我司的三方共赢。',
          jobRequire:
            '1、具备市场营销、新媒体、广告策划等相关知识；\n 2、熟悉各种品牌推广手段及新媒体的应用；\n3、熟悉电商平台的营销活动玩法，以及电商平台站内的资源渠道优先；\n4、三年以上Top广告公司营销策划经验，有成功的社交互动项目经验，服务过快消品类客户优先；\n5、熟悉互联网产品推广和内容营销；\n6、负责过品牌在电商平台的营销活动策划和推广优先；\n7、具备扎实的策划功底和敏锐的策略思维，对品牌和消费者有独到的洞察，创意及整合能力强，能够开拓性的展开工作；\n8、具有积极探索的精神及互联网思维，对用户营销感兴趣，能快速学习新知识；\n9、有良好的沟通和协调能力，能精准把握客户需求，并推进落地；10、年龄在26~32岁。'
        },
        {
          positionName: '用户运营',
          city: '北京',
          recruitType: '社招',
          jobDuty:
            '1、根据方案和要求，进行内外部沟通及协调相关资源，把握任务&时间节点，确保活动按照方案执行；\n2、项目结束后进行效果评估，跟进效果，建立方案通案库；\n3、根据公司项目安排，协助项目团队或行政部门完成项目和日常辅助工作；\n4、根据客户需求并结合项目实际情况，优化及改善项目实施流程；\n5、协助上级，与内部协作团队保持有效沟通，促成项目工作按计划执行和完成。',
          jobRequire:
            '1、教育背景：本科及以上学历，专业不限；\n2、工作经验：2年以上电商数据或者人群运营相关经验；\n3、职位技能：能独立完成策划设计及执行工作，较强组织、协调和交际能力；\n4、沟通能力：优秀的沟通能力，对外能深入了解客户需求，对内能高效沟通协调。'
        },
        {
          positionName: '资深客户经理',
          city: '北京',
          recruitType: '社招',
          jobDuty:
            '1、协助客户经理处理品牌基础运营事务，针对各项目进行基础流程优化和改善，建立基础运营管理流程；\n2、协助客户经理进行运营数据分析，建立日、周、月、季度等数据报告。并持续迭代报告内容，通过数据分析挖掘问题和机会点；\n3、参与品牌其他各个项目的分工和执行，如营销项目、运营改善项目等。',
          jobRequire:
            '1、本科学历， 985/211及以上学历优先，工商管理、金融商务类专业优先；\n2、有一年以上的工作经验，有过电商平台运营经验优先：如京东、苏宁、天猫等；\n3、良好的沟通表达能力及较强的数据处理能力，熟练掌握Office工具；\n4、能承担和突破工作压力，能快速理解业务，对商业和业务逻辑敏感，具备良好的逻辑分析能力和系统性思维能力；\n5、具备强烈的责任心、求知欲及团队合作精神。'
        },
        {
          positionName: '销售经理',
          city: '北京',
          recruitType: '社招',
          jobDuty:
            '1、了解各主流电商平台用户互动的基本玩法，可独立对接品牌、平台的互动营销需求；\n2、结合品牌或平台的生意运营痛点，制定人群解决方案，落地人群规划。对电商数智化转型具有自己的见解；\n3、善于发现机会、挖掘机会，协助拓宽公司的战略业务。',
          jobRequire:
            '1、1-2年广告公司或电商TP服务商相关工作经验，4A广告公司优先；\n2、责任心、学习力、沟通力、担当力，对工作保持激情；\n3、良好的沟通表达能力及较强的数据处理能力，熟练掌握Office工具。'
        },
        {
          positionName: '销售专员',
          city: '北京',
          recruitType: '社招',
          jobDuty:
            '1、协助销售经理日常对接品牌&平台的各项需求，具有良好的服务意识，持续跟进并反馈结果；\n2、协助销售经理对品牌的用户运营做深度剖析，挖掘痛点及生意机会改善点，并提供定制化解决方案；\n3、参与公司内外其他各个项目的分工和执行，如用户运营项目、营销项目、品类方案策划等。',
          jobRequire:
            '1、责任心、学习力、沟通力、团队精神。对工作保持激情。\n2、两年以内应届毕业生，具有电商相关工作或实习经验，985/211工商管理、市场营销专业优先。\n3、熟练掌握Office工具，尤其是PowerPoint、Excel的应用。'
        }
      ],
      shanghaiJobDetailList: [
        {
          positionName: '客户经理',
          city: '上海',
          recruitType: '社招',
          jobDuty:
            '1、作为多个/复杂客户与陆泽的对接点去审查相关问题，避免相应风险，提升服务合作等级，确保具体项目的管理与交付；\n2、管理好客户与公司之间的交付预期，与相对应的部门保持好联系；\n3、确保与客户和团队及时沟通，反馈相关问题并一同解决相关困难；\n4、帮助树立以及维护客户在交付和数据需求方面的优先级；\n5、主动与团队沟通客户处理能力需求和工作流程管理需求；\n6、在成本管理、质量和生产力提高方面驱动适当的资源分配。建立、维护和推动利润改善计划，使用各种过程管理规程。',
          jobRequire:
            '1、有5年以上相关客户服务经验，数据以及CRM等相关领域优先；\n2、良好的领悟及分析需求的能力；\n3、良好的沟通技巧，客户服务以及项目管理能力；\n4、有处理过多个项目的经验。'
        },
        {
          positionName: '销售经理',
          city: '上海',
          recruitType: '社招',
          jobDuty:
            '1、了解各主流电商平台用户互动的基本玩法，可独立对接品牌、平台的互动营销需求；\n2、结合品牌或平台的生意运营痛点，制定人群解决方案，落地人群规划，对电商数智化转型具有自己的见解；3、\n善于发现机会、挖掘机会，协助拓宽公司的战略业务。',
          jobRequire:
            '1、1-2年广告公司或电商TP服务商相关工作经验，4A广告公司优先；\n2、责任心、学习力、沟通力、担当力。对工作保持激情；\n3、良好的沟通表达能力及较强的数据处理能力，熟练掌握Office工具。'
        },
        {
          positionName: '销售专员',
          city: '上海',
          recruitType: '社招',
          jobDuty:
            '1、协助销售经理日常对接品牌&平台的各项需求，具有良好的服务意识，持续跟进并反馈结果；\n2、协助销售经理对品牌的用户运营做深度剖析，挖掘痛点及生意机会改善点，并提供定制化解决方案；\n3、参与公司内外其他各个项目的分工和执行，如用户运营项目、营销项目、品类方案策划等。',
          jobRequire:
            '1、责任心、学习力、沟通力、团队精神。对工作保持激情；\n2、两年以内应届毕业生，具有电商相关工作或实习经验，985/211工商管理、市场营销专业优先；\n3、熟练掌握Office工具，尤其是PowerPoint、Excel的应用。'
        },
        {
          positionName: '营销策划',
          city: '上海',
          jobDuty:
            '1、设计品牌用户营销活动：\n日常与客户经理配合，负责公司合作的KA客户（如宝洁、联合利华等）在电商平台上日常用户营销活动的规划。\n2、电商互动活动整体策划：\n1）参与较为复杂的日常互动活动策划，以支持客户经理为品牌提供高水平的互动服务。\n2）基于客户特殊营销活动需求，例如超级品牌日、大牌日等，策划配套的用户互动活动。\n3、对接电商品类营销，发起用户相关大型营销项目：\n结合品类营销的运营需求，策划用户相关大型营销项目，以撬动品牌营销投入，推广本公司的用户业务，形成品类、品牌和我司的三方共赢。',
          jobRequire:
            '1、具备市场营销、新媒体、广告策划等相关知识；\n2、熟悉各种品牌推广手段及新媒体的应用；\n 3、熟悉电商平台的营销活动玩法，以及电商平台站内的资源渠道优先；\n4、三年以上Top广告公司营销策划经验，有成功的社交互动项目经验，服务过快消品类客户优先；\n5、熟悉互联网产品推广和内容营销；\n6、负责过品牌在电商平台的营销活动策划和推广优先；\n7、具备扎实的策划功底和敏锐的策略思维，对品牌和消费者有独到的洞察，创意及整合能力强，能够开拓性的展开工作；\n8、具有积极探索的精神及互联网思维，对用户营销感兴趣，能快速学习新知识；\n9、有良好的沟通和协调能力，能精准把握客户需求，并推进落地；\n10、年龄在26~32岁。'
        },
        {
          positionName: '客户经理',
          city: '上海',
          recruitType: '社招',
          jobDuty:
            '1、作为多个/复杂客户与陆泽的对接点去审查相关问题，避免相应风险，提升服务合作等级，确保具体项目的管理与交付；\n2、管理好客户与公司之间的交付预期，与相对应的部门保持好联系；\n3、确保与客户和团队及时沟通，反馈相关问题并一同解决相关困难；\n4、帮助树立以及维护客户在交付和数据需求方面的优先级；\n5、主动与团队沟通客户处理能力需求和工作流程管理需求；\n6、在成本管理、质量和生产力提高方面驱动适当的资源分配，建立、维护和推动利润改善计划，使用各种过程管理规程。',
          jobRequire:
            '1、有5年以上相关客户服务经验，数据以及CRM等相关领域优先；\n2、良好的领悟及分析需求的能力；\n3、良好的沟通技巧，客户服务以及项目管理能力；\n4、有处理过多个项目的经验。'
        }
      ],
      campusJobDetailList: [
        {
          positionName: '前端实习生',
          recruitType: '校招',
          recruitDesc1: ' 负责移动端和PC端前端web页面开发',
          jobDuty: '负责移动端和PC端前端web页面开发。',
          jobRequire:
            '1、要求计算机及软件工程相关专业；\n2、了解前端开发，有HTML、css、js基础；\n3、积极乐观，上进好学。'
        },
        {
          positionName: '后端实习生',
          recruitType: '校招',
          jobDuty:
            '1、积极主动的完成指派的任务，确保交付时间及品质；\n2、对待工作认真负责，对自己所负责的任务需要进行阶段性回顾及检查，确保准确；\n3、工作过程中的知识积累及记录，分享工作中的经验；\n4、完成上级交付的任务；',
          jobRequire:
            '1、计算机或软件工程相关专业毕业；\n2、熟练使用java语言编程；\n3、了解SpringMvc、SpringBoot、SpringCloud等开发框架使用；\n4、了解Mysql数据库及SQL；\n5、积极乐观，上进好学。'
        },
        {
          positionName: '测试实习生',
          recruitType: '校招',
          jobDuty:
            '1、由测试经理带领,根据产品需求编写测试用例;\n2、实施测试用例,并对产品问题进行跟踪分析和报告;\n3、收集整理各种产品问题,及时反馈;4.负责产品的功能测试,接口测试等;',
          jobRequire:
            '1、大专及以上学历,计算机软件相关专业；\n2、热爱互联网行业,打算在此行业长期发展,有一定逻辑思维能力;\n3、工作踏实,责任心强,工作积极主动,可承担一定的工作压力;\n4、积极乐观，上进好学。'
        },
        {
          positionName: '数据分析实习生',
          recruitType: '校招',
          jobDuty:
            '1、协助数据经理日常对接品牌的各项数据需求，输出数据报表；\n2、 协助对电商平台数据的收集整理分析，及时出具相关报表；\n3、 负责业务部门所需数据的收集整理分析并反馈；\n4、 能根据实际业务，独立进行专项数据分析，分析项目的运营状况，并形成数据分析报告。',
          jobRequire:
            '1、统计学、数学类及相关专业专业优先；\n2、对数据感兴趣且具有一定的敏感性，熟练掌握Office工具；\n3、学习能力强，对商业和业务逻辑敏感，具备良好的逻辑分析能力和系统性思维能力；\n4、积极乐观，上进好学。'
        }
      ]
    }
  },
  created () {
    this.cityRecruitIndex = this.$route.query.cityIndex
    this.jobRecruitIndex = this.$route.query.recruitIndex
    console.log(this.jobRecruitIndex)
  },
  mounted () {
    const _this = this
    if (_this.cityRecruitIndex == 1) {
      _this.jobContentDetailList = this.dalianJobDetailList
    } else if (_this.cityRecruitIndex == 2) {
      _this.jobContentDetailList = this.beijingJobDetailList
    } else if (_this.cityRecruitIndex == 3) {
      _this.jobContentDetailList = this.shanghaiJobDetailList
    } else {
      _this.jobContentDetailList = this.campusJobDetailList
    }
    console.log(_this.jobContentDetailList)
    console.log(_this.jobRecruitIndex)
    _this.dutyContent = _this.changeText(
      _this.jobContentDetailList[_this.jobRecruitIndex].jobDuty
    )
    _this.requireContent = _this.changeText(
      _this.jobContentDetailList[_this.jobRecruitIndex].jobRequire
    )
    _this.jobName =
      _this.jobContentDetailList[_this.jobRecruitIndex].positionName
    _this.employType =
      _this.jobContentDetailList[_this.jobRecruitIndex].recruitType
    _this.jobCity = _this.jobContentDetailList[_this.jobRecruitIndex].city
    if (_this.cityRecruitIndex == 2 && _this.jobRecruitIndex == 0) {
      _this.isAnotherHeight = true
    }
  },
  methods: {
    changeText (isChangedText) {
      const text = isChangedText.split('\n')
      return text.join('<br/>')
    }
  }
}
</script>

<style lang="scss" scoped>
.join-us-page {
  .job-wrapper {
    display: flow-root;
    margin-top: 1rem;
    background-color: #fff !important;
    .detail-container {
      margin-left: 3.89rem;
      .page-header {
        width: 13.86rem;
        height: 0.82rem;
        line-height: 0.82rem;
        position: relative;
        .link {
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
        }
        span {
          font-size: 0.2rem;
          color: #333333;
        }
      }
      .detailContent {
        margin-top: 0.79rem;
        h2 {
          color: #2647c8;
          font-size: 0.4rem;
        }
        p {
          color: #646a73;
          font-size: 0.19rem;
          margin: 0.25rem 0;
        }
        .job-responsibility,
        .job-require {
          margin-top: 0.46rem;
          h3 {
            color: #1f2329;
            font-size: 0.28rem;
          }
          .duty-content,
          .require-content {
            color: #646a73;
            font-size: 0.19rem;
            line-height: 0.36rem;
            margin-top: 0.22rem;
          }
        }
        .job-require {
          margin-top: 0.52rem;
        }
            .join-email {
      display: block;
      width: 1.71rem;
      height: 0.45rem;
      line-height: 0.45rem;
      text-align: center;
      background: #2647c8;
      border-radius: 0.5rem;
      font-size: 0.21rem;
      color: #ffffff;
      margin-top: 0.78rem;
      margin-bottom: 0.86rem;
      margin-left: 4.86rem;
    }
      }
    }
  }
  .anotherHeight {
    height: 12rem;
  }
  .moreHeight {
    height: 18.3rem;
  }
}
</style>
