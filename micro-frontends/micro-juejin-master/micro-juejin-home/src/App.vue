<template>
  <div id="app">
    <BasicLayout />
  </div>
</template>

<script>
import BasicLayout from "@/layouts/BasicLayout";
export default {
  components: {
    BasicLayout
  },
  created() {
    console.log(process.env);
  }
};
</script>
<style lang="scss">
@import "//at.alicdn.com/t/font_2058446_rjhl03m5rl.css";
::-webkit-scrollbar {
  width: 12px;
  height: 12px;
  cursor: pointer;
}

::-webkit-scrollbar-thumb {
  border-radius: 6px;
  -webkit-box-shadow: none;
  background: rgba(113, 119, 124, 0.4);
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: none;
  border-radius: 50%;
  background: rgba(187, 222, 251, 0.1);
}
</style>
<style lang="scss" scoped>
#app {
  //box-sizing: content-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  display: flex;
  justify-content: center;
}
</style>
