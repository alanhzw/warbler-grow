<!--
 * @Description:yili-舒化勋章馆
 * @Date: 2021-08-23 10:46:57
 * @FilePath: \custom\src\pages\1000087921\2108100008792101\App.vue
-->
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

// 超过一行显示省略号
.one-line-omit {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}

// 超过两行显示省略号
.two-line-omit {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
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
