<!--
 * @Author: 一尾流莺
 * @Description:底部按钮
 * @Date: 2022-01-10 13:59:58
 * @LastEditTime: 2022-01-11 18:08:17
 * @FilePath: \common_c\src\views\activity\improve\components\IButton.vue
-->
<template>
  <div class="improve-button"
       :style="options.style">
    <div class="btn"
         @click="submit"
         :style="`backgroundColor:${defaultOption.buttonBackgroundColor};color:${defaultOption.buttonFrontColor}`">提交</div>
  </div>
</template>

<script>
export default {
  name: 'IButton',
  props: {
    options: {
      default: () => ({}),
    },
    defaultOption: {
      default: () => ({}),
    },
  },
  data() {
    return {
      img: '',
    };
  },
  methods: {
    // 判断是不是预览页
    isPreview() {
      return window.location.href.includes('preview');
    },
    // 提交
    submit() {
      // 如果是预览页直接提示
      if (this.isPreview()) {
        this.$toast('仅供预览');
        return;
      }
      // 否则提交
      this.$emit('handle-submit');
    },
  },
};
</script>

<style lang="scss">
.improve-button{
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
  bottom: 0.32rem;

  .btn{
    width: 6.86rem;
    height: 0.88rem;
    line-height: 0.88rem;
    border-radius: 0.63rem;
  }
}
</style>
