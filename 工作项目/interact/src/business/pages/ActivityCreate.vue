<!--
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2020-10-28 15:54:39
 * @LastEditTime: 2020-11-02 14:01:21
 * @FilePath: \yunlu\src\business\pages\ActivityCreate.vue
-->
<!--<template>-->
<!--</template>-->

<script>
import { appHistory } from '@ice/stark-app';

export default {
  name: 'ActivityCreate',
  data() {
    return {
      type: '', // 活动类型
      url: '', // iframe路径
      entrance: '', // 入口(从哪个位置点击的) 0活动管理  1会员互动  2会员赚积分
    };
  },
  methods: {
    /**
     * @description: 获取url
     */
    getUrl() {
      this.type = parseInt(this.$route.params.type);
      this.entrance = parseInt(this.$route.params.entrance);
      // 判断在哪点击的,返回相应的url
      if (this.entrance === 0) { // 0活动管理
        if (this.type === -1) { // -1 会员互动的活动管理
          appHistory.push('/frame/cjhy/point/manage/pointsTask?type=activity/activityCreate');
        } else if (this.type === -2) { // -2 会员赚积分的活动管理
          appHistory.push('/frame/cjhy/point/manage/pointInteraction?type=activity/activityCreate');
        }
      } else if (this.entrance === 1) { // 1会员互动
        appHistory.push(`/frame/cjhy/template/list?type=${this.type}`);
      } else if (this.entrance === 2) { // 2会员赚积分
        appHistory.push(`/frame/cjhy${this.$route.params.type}`);
      }
    },
  },
  mounted() {
    this.getUrl();
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  border: 0;
  height: 100%;
}

.iframe {
  height: 100%;
}
</style>
