<template>
  <div class="logo-wrapper" :class="{reverse:reverse}">
    <img v-show="!reverse" src="/images/logo.svg" width="164" height="46" alt="陆泽科技">
    <img v-show="reverse" src="/images/logo-reverse.svg" width="164" height="46" alt="陆泽科技">
  </div>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    reverse: Boolean
  }
}
</script>

<style lang="scss" scoped>
.logo-wrapper {
  display: flex;
  align-items: center;

  img {
    object-fit: inherit;
  }
}
</style>
