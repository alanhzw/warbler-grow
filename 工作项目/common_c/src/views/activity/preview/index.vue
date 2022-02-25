<!--
 * @Author: 一尾流莺
 * @Description:完善信息有礼预览页
 * @Date: 2022-01-10 13:59:58
 * @LastEditTime: 2022-01-19 11:18:30
 * @FilePath: \common_c\src\views\activity\preview\index.vue
-->
<template>
  <!-- 页面 -->
  <div class="preview-box"
       :style="styles"
       :class="classes">
    <!-- 循环渲染活动所需要的组件 -->
    <div v-for="(item, index) in modules"
         :key="`module-${index}`">
      <!-- 动态组件 数据来源于index.js -->
      <component :is="item.name"
                 :ref="item.name"
                 :options="item.options"
                 :all-collects="allCollects"
                 :activity-info="activityInfo"
                 :apis="apis"
                 :default-option='defaultOption'
                 @handle-submit="handleSubmit" />
    </div>
  </div>
</template>

<script>
// 解析参数
import qs from './utils';
import Qs from 'qs';

// 网络请求
import { PointsService } from '@/http';

// 获取活动配置信息
import getActivitySettings from './index';

// 引入完善信息有礼的组件
import improveComponents from './components';

// 引入其他活动的组件
// import otherComponents from '../other/components/index';

export default {
  name: 'home',
  data() {
    return {
      modules: [],
      defaultOption: {},
      tplId: '',
      cache: '', // 0 tpl 1 缓存
      type: '351',
      apis: {},
      allCollects: {},
      activityInfo: {},
    };
  },
  computed: {
    // 根据活动类型返回类名
    classes() {
      return {
        // 完善信息有礼的样式类名
        improve: this.type === '351',
        // 其他活动的样式类名
        other: this.type === 'other',
      };
    },
    // 根据活动类型返回模板样式
    styles() {
      // 完善信息有礼的模板样式
      if (this.type === '351') {
        return {
          backgroundColor: this.defaultOption.backgroundColor,
        };
      }
      // 其他活动的模板样式
      if (this.type === 'other') {
        return {
          backgroundColor: this.defaultOption.backgroundColor,
        };
      }
      // 默认返回空
      return '';
    },
  },
  methods: {
    // 解析url参数
    getParams() {
      let params;
      if (window.location.href.indexOf('sid') > -1) {
        params = Qs.parse(window.location.hash.split('?')[1] || '');
      } else {
        params = Qs.parse(window.location.href.split('?')[1] || '');
      }
      const { tplId, cache } = params;
      this.tplId = tplId;
      this.cache = cache;
    },
    // 获取活动类型
    getActivityType() {
      this.type = 351; // this.$route.params.type;
    },
    // 根据类型进行初始化活动配置
    init() {
      const {
        apis, modules, defaultOption, allCollects,
      } = getActivitySettings(this.type);
      this.modules = modules;
      this.apis = apis;
      this.defaultOption = defaultOption;
      this.allCollects = allCollects;
    },
    // tpl预览
    async tplPreview(instanceId) {
      // 获取模板信息
      const { data } = await PointsService[this.apis.getCTemplateInstanceDetail]({
        instanceId,
      });
      this.defaultOption = JSON.parse(data.configJson);
    },
    // 缓存预览
    async cachePreview(key) {
      // 获取模板信息
      const { data } = await PointsService[this.apis.getPageConfig]({
        key,
      });
      const jsonStr = JSON.parse(data.value);
      console.log('🚀🚀~ this.defaultOption:', jsonStr);
      this.defaultOption = jsonStr.template.configJson;
      if (jsonStr.activityInfo && jsonStr.activityInfo.itemInfoList) {
        this.allCollects = jsonStr.activityInfo.itemInfoList;
      }
      this.activityInfo = jsonStr.activityInfo;
      console.log('🚀🚀~ this.allCollects:', this.allCollects);
    },
    // 根据不同类型的活动进行表单提交 反正就是主按钮对应的回调
    handleSubmit() {
      // 完善信息有礼的提交
      if (this.type === '351') {
        this.onImproveSubmit();
      }
      // 其他活动的提交
    },
    // 完善信息有礼的提交
    onImproveSubmit() {
      console.log(this.$refs.IForm[0]);
      this.$refs.IForm[0].Validate();
    },
  },
  async created() {
    // 获取活动类型
    this.getActivityType();
    // 获取url参数
    this.getParams();
    // 根据类型进行初始化活动配置
    this.init();
    // 根据cache请求接口
    if (this.cache === '0') {
      // 请求tpl接口
      await this.tplPreview(this.tplId);
    } else {
      // 请求缓存接口
      await this.cachePreview(this.tplId);
    }
  },
};
</script>

<style lang="scss">
.preview-box{

}
// 完善信息有礼的样式
.improve{
    min-height: calc(100vh - 1.52rem);
    position: relative;
    padding-bottom: 1.52rem;
 }
// 其他活动的样式
.other{

}
</style>
