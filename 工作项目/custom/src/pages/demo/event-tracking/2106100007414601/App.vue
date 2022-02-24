<template>
  <div>
    <Button type="primary" v-click-track="`track-value`">点击埋点</Button>
    <Button type="primary" v-click-track="{name:'name',value:'value'}">点击埋点</Button>
  </div>
</template>

<script lang='ts' setup>
import { Button } from 'vant';

</script>

<style scoped>

</style>
