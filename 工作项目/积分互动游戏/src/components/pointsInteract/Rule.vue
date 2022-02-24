<!--
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2020-12-04 15:54:30
 * @LastEditTime: 2021-01-06 11:55:45
 * @FilePath: \SNActivity\src\components\pointsInteract\Rule.vue
-->
<template>
  <div class="rule-box" v-show="pointPkForm.isShowRule">
    <transition name="fase">
      <div class="common-mask"></div>
    </transition>
    <transition name="ease">
      <div class="common-content ruler">
        <div v-html="ruleHtml" class="rulerContent"></div>
        <a href="javascript:;" class="ruler-close" @click="setIsShowRule(false)"></a>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState(['form']),
    ...mapState('pointPK', ['pointPkForm']),
    ruleHtml () {
      return this.pointPkForm.rule.replace(/\n/, '').replace(/\n/g, '<br/>');
    }
  },
  mounted () {
    this.pointPkForm.isShowRule = false;
  },
  methods: {
    ...mapMutations('pointPK', ['setIsShowRule']),
  }
};
</script>

<style lang="scss">
.rule-box {
  .common-content {
    margin: auto;
    left: 0 !important;
    right: 0 !important;
  }
}
</style>