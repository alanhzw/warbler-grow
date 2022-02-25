<template>
  <!-- 活动规则侧边栏 -->
  <div class="sidebar" :class="{'isActive':showSideBar}">
    <div class="title-bg">
      <div class="title">活动规则</div>
    </div>
    <div style="margin-top: .2rem" v-html="ruleInfo"></div>
  </div>
</template>

<script>
export default {
  name: 'RuleSideBar',
  props: {
    showSideBar: {
      required: true,
      default: false,
    },
    ruleInfo: {
      required: true,
      default: '',
    },
  },
  data() {
    return {};
  },
  mounted() {
  },
  methods: {},
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
  text-align: left;

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
