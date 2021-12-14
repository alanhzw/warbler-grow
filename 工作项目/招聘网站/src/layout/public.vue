<script setup lang="ts">
import IredHeader from './components/Header.vue';
import IredBody from './components/Body.vue';
import IredFooter from './components/Footer.vue';
import Wrapper from './components/Wrapper.vue';
</script>

<template>
  <Wrapper class="public-header-wrapper"><ired-header /></Wrapper>
  <div class="content main-body" >
    <ired-body />
    <ired-footer />
  </div>
</template>

<style lang="scss" scoped>
.public-header-wrapper {
  background-color: #ffffff;;
}
.content {
  flex: 1;
  overflow: scroll;
}
</style>
