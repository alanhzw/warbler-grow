<!--
 * @Author: 一尾流莺
 * @Description:页面布局
 * @Date: 2021-12-15 11:26:09
 * @LastEditTime: 2021-12-16 09:40:14
 * @FilePath: \nuxt-template-admin\layouts\default.vue
-->
<template>
  <div class="layout">
    <SideBar class="side-bar"></SideBar>
    <div class="body">
      <Header></Header>
      <div class="content">
        <slot></slot>
      </div>
      <!-- <Footer></Footer> -->
    </div>
  </div>

</template>


<script lang='ts' setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import SideBar from './components/SideBar.vue'
</script>

<style lang="scss" scoped>
.layout {
  height: calc(100vh);
  display: flex;
  justify-content: flex-start;
  .side-bar {
    min-width: 200px;
  }
  .body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background-color: #eee;
    .content {
      overflow: auto;
      display: flex;
      justify-content: center;
      min-width: 1200px;
      margin: 30px;
      background-color: #fff;
      box-sizing: border-box;
      box-shadow: 0 2px 15px 0 rgb(169 182 199 / 20%);
      border-radius: 5px;
    }
  }
}
</style>