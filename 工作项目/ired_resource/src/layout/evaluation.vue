<template>
  <Wrapper><IredHeader/></Wrapper>
  <div class="evaluation-container main-body">
    <router-view />
  </div>
</template>
<script lang="ts" setup>
import Wrapper from './components/Wrapper.vue';
import IredHeader from './components/Header.vue';
</script>

<style lang="scss">
.layout-evaluation {
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.evaluation-container{
  flex: 1;
  background: #f8f8f8;
}
</style>
