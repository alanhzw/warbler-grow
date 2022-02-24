<!--
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-12-01 15:33:39
 * @LastEditTime: 2021-12-02 10:53:26
 * @FilePath: \interact\src\mobile\modules\durex0\MainPic.vue
-->
<template>
  <div class="main-pic-box"
       :style="options.style || {}">
    <img src="./assets/kv.png"
         class="main-pic-image">
    <img class="main-pic"
         v-if="options.pic && options.pic !== ''"
         :src="options.pic" />
  </div>
</template>
<script>
export default {
  name: 'MainPic',
  props: {
    options: {
      default: () => ({}),
    },
    activityInfo: {
      default: () => ({}),
    },
  },
};
</script>
<style lang="scss">
.main-pic-box {
  .main-pic-image {
    vertical-align: top;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }
  .main-pic{
    vertical-align: top;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
}
</style>
