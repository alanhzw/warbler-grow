<template>
  <router-view></router-view>
</template>

<script lang='ts' setup>
</script>

<style lang='scss'>
  html {
    max-width: 750px;
    margin: 0 auto;
    background: url("./assets/home-bg-y.png") repeat-y;
    background-size: 100% 100%;
  }

  // 没有数据 显示的 ‘暂无数据’
  .none-data {
    font-size: .3rem;
    font-weight: bold;
    color: #3069d1
  }

  .gray {
    /*grayscale(val):val值越大灰度就越深*/
    -webkit-filter: grayscale(100%) brightness(1);
    -moz-filter: grayscale(100%) brightness(1);
    -ms-filter: grayscale(100%) brightness(1);
    -o-filter: grayscale(100%) brightness(1);
    filter: grayscale(100%) brightness(1);
    filter: gray brightness;
  }

  .popup {
    background: unset !important;
  }
</style>
