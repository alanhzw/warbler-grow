<template>
  <div class="main-pic" :style="options.style || {}">
    <img class="main-pic-image" v-if="options.pic && options.pic !== ''" :src="options.pic" />
  </div>
</template>
<script>
export default {
  name: 'MainPic',
  props: {
    options: {
      default: () => ({}),
    },
  },
};
</script>
<style lang="scss">
.main-pic {
  .main-pic-image {
    vertical-align: top;
    width: 100%;
  }
}
</style>
