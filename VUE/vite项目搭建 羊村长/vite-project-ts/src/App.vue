<!--
 * @Author: 一尾流莺
 * @Description: 
 * @Date: 2021-03-19 17:05:12
 * @LastEditTime: 2021-07-23 19:06:02
 * @FilePath: \vite-project-ts\src\App.vue
-->
<template>
  <img alt="Vue logo"
       src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>