<template>
  <!-- 活动规则侧边栏 -->
  <div class="sidebar" :class="{'isActive':showSideBar}">
    <div class="title-bg">
      <div class="title">活动规则</div>
    </div>
    <div style="margin-top: .2rem" v-html="ruleInfo.complexRule"></div>
  </div>
</template>

<script lang='ts' setup>
import { computed, defineEmits, defineProps, ref } from 'vue';
import ruleInfo from '../assets/ts/rules';

const props = defineProps({ showSideBar: Boolean });
const isShowSideBar = computed(() => props.showSideBar);

const emit = defineEmits(['closeDialog']);

const closeDialog = () => {
  emit('closeDialog', 'ruleDialog');
};

</script>

<style lang='scss' scoped>
.sidebar {
  position: fixed;
  left: -6rem;
  top: 0;

  width: 6rem;
  height: 100vh;
  background: rgba(0, 0, 0, 0.85);
  color: #FFFFFF;

  transition: all .8s;
  z-index: 999;
  padding: .4rem;
  box-sizing: border-box;
  font-size: .3rem;
  overflow-y: auto;
  white-space: pre-line;

  .title-bg {
    width: 100%;
    padding-bottom: .2rem;
    border-bottom: #FFFFFF 2px solid;

    .title {
      width: 80%;
      height: .7rem;
      line-height: .7rem;
      text-align: center;
      margin: 0 auto;
      color: #000000;
      background-color: #FFFFFF;
    }
  }
}

.isActive {
  left: 0;
}

</style>
