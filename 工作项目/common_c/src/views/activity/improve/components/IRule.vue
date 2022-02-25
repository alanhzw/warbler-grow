<!--
 * @Author: 一尾流莺
 * @Description:活动规则弹窗
 * @Date: 2022-01-10 13:59:58
 * @LastEditTime: 2022-01-19 10:04:38
 * @FilePath: \common_c\src\views\activity\improve\components\IRule.vue
-->
<template>
  <div class="improve-rule">
    <div class="rule-icon"
         @click="show = true">
      <img src="../assets/rule.png">
    </div>
    <van-popup v-model="show"
               class="transparent-bottom"
               position="bottom"
               round
               :style="{ height: '30%' }">
      <div class="title">活动规则</div>
      <div class="rule"
           v-html="rule"></div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'IRule',
  props: {
    options: {
      default: () => ({}),
    },
    defaultOption: {
      default: () => ({}),
    },
    activityInfo: {
      default: () => ({}),
    },
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    rule() {
      return this.activityInfo.activityRule ? `${this.activityInfo.activityRule.replace(/\n/g, '</br>')}<br><br><br>` : '活动规则';
    },
  },
};
</script>

<style lang="scss">
.improve-rule{
  .rule-icon{
    position: absolute;
    right: 0rem;
    top: 0.6rem;
    width: 1.28rem;
    height: 0.4rem;
    img{
      width: 100%;
      height: 100%;
    }
  }

}
.transparent-bottom{
  position: fixed;
  bottom: 0;
  .title{
    height: 1rem;
    line-height: 1rem;
    font-weight: 700;
    font-size: 0.32rem;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  .rule{
    width: 6.86rem;
    font-size: 0.28rem;
    text-align: left;
    height: 3.65rem;
    margin: 0 auto;
    overflow: auto;
    margin-top: 1rem;
  }
}
</style>
