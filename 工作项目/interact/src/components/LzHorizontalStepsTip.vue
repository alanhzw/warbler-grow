<!--
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2021-01-20 15:39:05
 * @LastEditTime: 2021-02-27 16:22:22
 * @FilePath: \yunluhuodong\src\components\LzHorizontalStepsTip.vue
-->
<template>
  <ul class="lz-horizontal-steps-tip">
    <li class="step" :class="{activited: index <= currentIndex}" v-for="(step, index) in steps" :key="`step${index}`">
      <i class="tip">{{index + 1}}</i>
      <span>步骤 {{index + 1}}：{{step.title}}</span>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'LzHorizontalStepsTip',
  props: {
    currentIndex: {
      type: Number,
      default: 0,
    },
    steps: {
      type: Array,
      default: () => ([]),
    },
  },
};
</script>
<style lang="scss" scoped>
.lz-horizontal-steps-tip {
  list-style: none;
  display: flex;
  flex-direction: row;
  color: #ffffff;
  font-size: 14px;
  line-height: 40px;
  padding-left: 0;
  overflow: hidden;

  .step {
    position: relative;
    overflow: visible;
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    .tip {
      width: 16px;
      height: 16px;
      font-size: 10px;
      color: #ffffff;
      font-weight: 800;
      line-height: 14px;
      text-align: center;
      border: 2px solid #ffffff;
      border-radius: 50%;
      margin: 0 10px 0 40px;
    }
    background: linear-gradient(90deg, #c3cbd6 0%, #9ca7b6 100%);
    &::after {
      content: '';
      z-index: 1;
      right: -40px;
      position: absolute;
      display: block;
      height: 0;
      width: 0;
      border-top: 20px solid transparent;
      border-right: 20px solid transparent;
      border-bottom: 20px solid transparent;
      border-left: 20px solid #9ca7b6;
    }
    &.activited {
      background: linear-gradient(90deg, #7fcaff 0%, #3dafff 100%);
    }
    &.activited::after {
      border-left-color: #3dafff;
    }
  }
}
</style>
