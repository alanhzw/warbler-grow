<template>
  <div class="image-tip">
    <div>
      <img class="img" alt='' src="../assets/icon-image.png">
    </div>
  </div>
</template>

<style lang="scss">
@import '~lz-crm/style/variables';

.image-tip {
  display: flex;
  background-color: $WHITE;
  align-items: center;
  justify-content: center;
  text-align: center;

  .img {
    vertical-align: top;
    width: 1rem;
  }

  .text {
    color: $FONT_DISABLE_GRAY;
    font-size: 12px;
    margin-top: 5px;
    margin-bottom: 0;
  }
}
</style>
