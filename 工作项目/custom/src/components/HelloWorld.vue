<template>
  <div>
    {{msg}}
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  msg: String,
});
</script>

<style scoped>

</style>
