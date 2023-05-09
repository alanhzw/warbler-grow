<!--
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2022-05-19 09:05:58
 * @LastEditTime: 2022-06-09 10:16:28
 * @FilePath: \lego-fe\src\views\Home.vue
-->
<template>
  <div>
    123
    <uploader-vue :drag="true"
                  list-type="picture"
                  action="https://jsonplaceholder.typicode.com/posts/"></uploader-vue>
  </div>
</template>

<script setup lang="ts">
import UploaderVue from '@/components/Uploader.vue';
</script>

<style scoped>
</style>
