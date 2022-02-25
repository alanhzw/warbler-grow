<template>
  <div v-if="isActShow">
    <div class="all" @click="handleSideBar(false)" v-cloak>
      <!-- 首页 -->
      <div class="home" :style="getStyle()">
        <div class="info">
          <div class="message">{{ ruleInfo.simpleRule }}</div>
        </div>
        <div class="btn">
          <div class="apply-btn"
               :style="[{background:pageStyle.applyButtonBackgroundColor,color:pageStyle.applyButtonColor}]">
            立即申领
            <van-icon name="arrow"/>
            <!--            <van-icon class-prefix="my-icon" name="jiantou"/>-->
          </div>
        </div>
      </div>

      <div class="rule-btn" @click.stop="handleSideBar(true)"
           :style="[{background:pageStyle.ruleButtonBackgroundColor,color:pageStyle.ruleButtonColor}]">
        活动规则
      </div>
    </div>

    <RuleSideBar :showSideBar="isShowSideBar" :ruleInfo="ruleInfo.complexRule"></RuleSideBar>
  </div>
</template>

<script>
import RuleSideBar from './components/RuleSideBar.vue';
// 网络请求
import { PointsService } from '@/http';
import { qs } from '@/views/purchase/firstPurchase/utils/index';
import Qs from 'qs';

export default {
  name: 'Purchase',
  components: {
    RuleSideBar,
  },
  data() {
    return {
      tplId: '',
      type: '',
      activityId: '',
      cache: '', // 0 tpl 1 缓存

      isActShow: false,
      isShowSideBar: false, // 侧边栏显示状态
      pageStyle: {},
      ruleInfo: {
        complexRule: '',
        simpleRule: '',
        noSatisfyRUle: '',
      },
    };
  },
  async created() {
    this.getParams();
    // 根据cache请求接口
    if (this.cache === '0') {
      // 请求tpl接口
      await this.tplPreview(this.tplId);
    } else {
      // 请求缓存接口
      await this.cachePreview(this.tplId);
    }
  },

  methods: {
    // 获取活动链接参数
    getParams() {
      // const params = qs(window.location.href);
      // const {
      //   tplId,
      //   cache,
      // } = params;
      // this.tplId = tplId;
      // this.cache = cache;

      // 解析url参数
      let params;
      if (window.location.href.indexOf('sid') > -1) {
        params = Qs.parse(window.location.hash.split('?')[1] || '');
      } else {
        params = Qs.parse(window.location.href.split('?')[1] || '');
      }
      const {
        tplId,
        cache,
      } = params;
      this.tplId = tplId;
      this.cache = cache;
    },

    // 操作侧窗
    handleSideBar(isShow) {
      console.log(isShow);
      this.isShowSideBar = isShow;
    },

    // 获取背景图片
    getStyle(name) {
      return `background:${this.pageStyle?.backgroundColor} url(${this.pageStyle?.backgroundImage}) no-repeat;background-size:contain`;
    },

    // tpl预览
    async tplPreview(instanceId) {
      // 获取模板信息
      const { data } = await PointsService.getCTemplateInstanceDetail({
        instanceId,
      });
      this.pageStyle = JSON.parse(data.configJson).page1;

      this.isActShow = true;
    },
    // 缓存预览
    async cachePreview(key) {
      // 获取模板信息
      const { data } = await PointsService.getPageConfig({
        key,
      });
      console.log('🚀🚀~ this.pageStyle:', JSON.parse(data.value));
      const Vo = JSON.parse(data.value);
      this.pageStyle = Vo.template.configJson.page1;
      this.ruleInfo.simpleRule = Vo.demo;
      this.ruleInfo.complexRule = Vo.activityRule;

      this.isActShow = true;
    },
  },
};
</script>

<style scoped lang="scss">

.all {
  height: 100vh;
  background-color: #f3e9e9;

  .home {
    width: 7.5rem;
    min-height: 100vh;
    margin: 0 auto;
    padding-top: 8.39rem;
    box-sizing: border-box;
    background-repeat: no-repeat;
    background-size: contain;

    .info {
      width: 6.54rem;
      height: 2.45rem;
      margin: 0 auto;
      padding-top: .15rem;
      position: relative;
      background: #FFFFFF;
      border: solid 1px #000000;
      box-shadow: 0 0.02rem 0.07rem 0 rgba(0, 0, 0, 0.79);

      .message {
        width: 100%;
        height: 2.2rem;
        font-size: .25rem;
        color: #000000;
        padding: .2rem;
        text-align: left;
        box-sizing: border-box;
        overflow-y: auto;
        white-space: pre-line;
      }
    }

    .btn {
      width: 100%;
      margin-top: .48rem;

      .apply-btn {
        width: 2.5rem;
        height: 0.68rem;
        border-radius: 0.34rem;
        line-height: .68rem;
        margin: 0 auto;
        padding: 0 .3rem 0 .4rem;
        font-size: .36rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #FFFFFF;
        white-space: nowrap;
        background: #000000;
      }
    }
  }

  .rule-btn {
    width: 0.62rem;
    height: 2.19rem;
    position: absolute;
    top: 3rem;
    right: 0;
    padding: .2rem .1rem .1rem;
    box-sizing: border-box;
    background: #000000;
    color: #FFFFFF;
    writing-mode: vertical-lr;
    letter-spacing: .05rem;
  }
}
</style>
