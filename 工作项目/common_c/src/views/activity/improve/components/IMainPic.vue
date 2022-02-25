<!--
 * @Author: 一尾流莺
 * @Description:主图
 * @Date: 2022-01-10 13:59:58
 * @LastEditTime: 2022-01-11 10:38:05
 * @FilePath: \common_c\src\views\activity\improve\components\IMainPic.vue
-->
<template>
  <div class="improve-main-pic"
       :style="options.style">
    <img :src="defaultOption.kv">
  </div>
</template>

<script>
export default {
  name: 'IMainPic',
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
};
</script>

<style lang="scss">
.improve-main-pic{
  img{
    width: 100%;
  }
}
</style>
