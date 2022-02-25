<template>
  <div class="card">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Card'
}
</script>

<style lang="scss" scoped>
.card {
  width: 17.00rem;
  height: 7.20rem;
  background-color: $--color-white;
  box-shadow: 0 0.01rem 1.33rem 0 rgba(38, 71, 200, 0.15);
  border-radius: .20rem;
  background-image: url("/images/card-hexagon-1.png"), url("/images/card-hexagon-2.png"), url("/images/card-hexagon-3.png");
  background-repeat: no-repeat;
  background-size: .62rem .72rem, .42rem .49rem, .28rem .33rem;
  background-position: 1.12rem .98rem, 15.94rem 4.02rem, 15.44rem 4.88rem;
}
</style>
