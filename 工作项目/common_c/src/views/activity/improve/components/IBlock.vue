<!--
 * @Author: 一尾流莺
 * @Description:空的块元素,用来模拟margin/padding
 * @Date: 2022-01-10 13:59:58
 * @LastEditTime: 2022-01-10 17:15:43
 * @FilePath: \common_c\src\views\activity\improve\components\IBlock.vue
-->
<template>
  <div class="improve-block"
       :style="options.style">
  </div>
</template>

<script>
export default {
  name: 'IBlock',
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
    };
  },
};
</script>

<style lang="scss">
.improve-block{
}
</style>
