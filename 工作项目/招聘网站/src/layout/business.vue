<!--
 * @Descripttion:
 * @Author: yang chenglin
 * @Date: 2021-11-13 10:57:40
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-13 18:07:02
-->
<template>
  <div class="header-wrapper">
    <IredHeader />
  </div>
  <div class="layout-business-body">
    <BusinessMenu />
    <div class="main-content">
      <div class="main-wrapper main-body">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IredHeader from './components/Header.vue';
import BusinessMenu from './components/BusinessMenu.vue';
</script>

<style lang="scss">
body {
  background-color: #F8F8F8;
}

.header-wrapper {
  padding-left: 60px;
  padding-right: 40px;
  height: 94px;
  align-items: center;
  box-sizing: border-box;
  background-color: #ffffff;
}
.layout-business-body {
  display: flex;
  flex-direction: row;
  flex: 1;
  overflow: hidden;
}
.main-content {
  flex: 1;
  height: 100%;
  padding: 40px;
  box-sizing: border-box;
  overflow: scroll;
  .main-wrapper {
    min-width: 1200px;
    height: 100%;
  }
}
</style>
