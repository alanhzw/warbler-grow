<template>
  <div class="company-block">
    <header class="block-header">{{title}}</header>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  title: {
    type: String,
    default: '',
  },
});
</script>

<style scoped lang="scss">
.company-block {
  margin-bottom: 50px;
  .block-header {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 20px;
  }
}
</style>
