<!--
 * @Descripttion:
 * @Author: yang chenglin
 * @Date: 2021-11-07 09:57:09
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-21 12:34:38
-->
<template>
  <div class="layout-wrapper">
    <div class="wrapper-content">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import 'styles/_variables.scss';
.layout-wrapper {
  border-bottom: 2px solid #F8F8F8;
  .wrapper-content {
    max-width: $MAIN_WIDTH;
    margin: 0 auto;
  }
}
</style>
