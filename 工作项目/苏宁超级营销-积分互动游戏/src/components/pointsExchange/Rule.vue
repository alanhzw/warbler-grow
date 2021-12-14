<!--
 * @Description:规则组件
 * @Autor: hanzhiwei
 * @Date: 2020-12-28 19:08:11
 * @LastEditTime: 2020-12-29 19:25:22
 * @FilePath: \SNActivity\src\components\pointsExchange\Rule.vue
-->
<template>
  <div class="rule-box">
    <div class="top">兑换规则</div>
    <div class="bottom" v-html="activityInfo.activityRule"></div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    options: {
      default: () => ({}),
    },
    activityInfo: {
      default: () => ({}),
    },
  },
  data () {
    return {

    };
  },
  methods: {

  },

};
</script>

<style lang="scss">
.rule-box {
  width: 100%;
  background: #ffffff;
  box-sizing: border-box;
  padding: 0.3rem 0.3rem 0.3rem 0.3rem;
  margin-bottom: 2rem;

  .top {
    font-size: 0.3rem;
    color: #303030;
    text-align: left;
    margin-bottom: 0.24rem;
  }
  .bottom {
    color: #666666;
    font-size: 0.24rem;
    text-align: left;
    margin-bottom: 0.1rem;
  }
}
</style>