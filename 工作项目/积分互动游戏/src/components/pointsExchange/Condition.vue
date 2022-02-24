<!--
 * @Description:条件组件
 * @Autor: hanzhiwei
 * @Date: 2020-12-28 19:07:25
 * @LastEditTime: 2020-12-29 19:09:40
 * @FilePath: \SNActivity\src\components\pointsExchange\Condition.vue
-->
<template>
  <div class="condition-box">
    <div class="top">兑换条件</div>
    <div class="bottom">
      <div class="text">
        {{activityInfo.supportLevels}}
      </div>
    </div>
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

  }
};
</script>

<style lang="scss">
.condition-box {
  width: 100%;
  background: #ffffff;
  box-sizing: border-box;
  padding: 0.3rem;
  margin-bottom: 0.2rem;

  .top {
    color: #303030;
    font-size: 0.3rem;
    text-align: left;
    margin-bottom: 0.24rem;
  }

  .bottom {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;

    .text {
      padding: 0.08rem;
      background: #e6f2fe;
      color: #0684ff;
      font-size: 0.24rem;
      margin-right: 0.2rem;
      margin-bottom: 0.2rem;
    }
  }
}
</style>