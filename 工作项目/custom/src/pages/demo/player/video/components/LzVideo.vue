<template>
  <div class="lz-video">
    <div class="lz-video-wrapper">
      <div class="cover"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LzVideo',
};
</script>

<style lang="scss" scoped>
.lz-video {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;

  .lz-video-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
}
</style>
