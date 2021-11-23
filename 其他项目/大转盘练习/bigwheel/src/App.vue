<!--
 * @Description: 
 * @Autor: hanzhiwei
 * @Date: 2021-03-03 09:40:12
 * @LastEditTime: 2021-03-03 10:25:50
 * @FilePath: \bigwheel\src\App.vue
-->
<template>
  <div id="app">
    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
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
