<!--
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-11-15 17:59:57
 * @LastEditTime: 2021-11-18 16:09:24
 * @FilePath: \jest-test\src\views\Home.vue
-->
<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  components: {
    HelloWorld,
  },
});
</script>
